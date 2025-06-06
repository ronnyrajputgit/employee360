// import React, { useState, useMemo } from "react";
// import { Card, CardContent, Typography, Box, Grid, Stack, IconButton } from "@mui/material";
// import PieChartIcon from "@mui/icons-material/PieChart";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import MDButton from "components/MDButton";
// import { useRoleBasedAccess } from "context/RoleBasedAccess";
// import dayjs from "dayjs";
// import quarterOfYear from "dayjs/plugin/quarterOfYear";
// import weekOfYear from "dayjs/plugin/weekOfYear";

// // Extend dayjs with necessary plugins
// dayjs.extend(quarterOfYear);
// dayjs.extend(weekOfYear);

// // Register Chart.js components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // --- Constants for Configuration ---
// const CHART_OPTIONS = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: "bottom",
//     },
//   },
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//       title: {
//         display: true,
//         text: "Hours",
//       },
//       beginAtZero: true,
//     },
//   },
// };

// const PERIOD_OPTIONS = ["Yearly", "Quarterly", "Monthly", "Weekly"];
// const CHART_COLORS = { billable: "#2196f3", nonBillable: "#9e9e9e" };

// // Helper to get descriptive key for aggregation
// const getKey = (dateString, period) => {
//   const date = dayjs(dateString);
//   switch (period) {
//     case "Yearly":
//       // Example: "2025 Q2"
//       return `${date.year()} Q${date.quarter()}`;
//     case "Quarterly":
//       // Example: "June"
//       return date.format("MMMM");
//     case "Monthly":
//       // Example: "Week 1 (Jun 1-7)"
//       const startOfMonth = date.startOf("month");
//       const dayOfMonth = date.date();
//       const weekNumber = Math.ceil(dayOfMonth / 7);
//       const weekStartDate = startOfMonth.add((weekNumber - 1) * 7, "day");
//       const weekEndDate = weekStartDate.add(6, "day");
//       const formattedStartDate = weekStartDate.format("MMM D");
//       const formattedEndDate =
//         weekEndDate.date() > date.endOf("month").date()
//           ? date.endOf("month").format("MMM D")
//           : weekEndDate.format("MMM D");
//       return `Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`;
//     case "Weekly":
//       // Example: "Sun", "Mon", etc.
//       return date.format("ddd");
//     default:
//       return "";
//   }
// };

// // Helper to get comprehensive labels for the chart dynamically
// const getLabels = (period, tasks) => {
//   const currentMoment = dayjs();
//   switch (period) {
//     case "Yearly":
//       // Labels for all 4 quarters of the current year
//       return Array.from({ length: 4 }, (_, i) => `${currentMoment.year()} Q${i + 1}`);
//     case "Quarterly":
//       // Labels for all 12 months
//       return Array.from({ length: 12 }, (_, i) => currentMoment.month(i).format("MMMM"));
//     case "Monthly":
//       const monthStart = currentMoment.startOf("month");
//       const monthEnd = currentMoment.endOf("month");
//       const labels = [];
//       let currentWeekStart = monthStart;

//       // Generate labels for all weeks in the current month
//       while (currentWeekStart.isBefore(monthEnd) || currentWeekStart.isSame(monthEnd, "day")) {
//         const weekNumber = Math.ceil(currentWeekStart.date() / 7);
//         const weekEndDate = currentWeekStart.add(6, "day");
//         const formattedStartDate = currentWeekStart.format("MMM D");
//         const formattedEndDate =
//           weekEndDate.date() > monthEnd.date()
//             ? monthEnd.format("MMM D")
//             : weekEndDate.format("MMM D");
//         labels.push(`Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`);
//         currentWeekStart = currentWeekStart.add(7, "day");
//       }
//       return labels;
//     case "Weekly":
//       // Dynamically generate labels for days of the week (Sun-Sat)
//       return Array.from({ length: 7 }, (_, i) => dayjs().day(i).format("ddd"));
//     default:
//       return [];
//   }
// };

// const aggregateTaskData = (tasks, period) => {
//   const result = {};
//   let totalBillable = 0;
//   let totalNonBillable = 0;

//   tasks.forEach((task) => {
//     const key = getKey(task.CreatedDateTime, period);
//     const duration = Number(task.Duration) || 0;
//     const isBillable = task.ProjectType === "Customer";

//     result[key] = result[key] || { billable: 0, nonBillable: 0 };
//     if (isBillable) {
//       result[key].billable += duration;
//       totalBillable += duration;
//     } else {
//       result[key].nonBillable += duration;
//       totalNonBillable += duration;
//     }
//   });

//   const chartLabels = getLabels(period, tasks);

//   // Determine the final labels for the chart.
//   // If there are tasks, we primarily use labels for which we have aggregated data.
//   // If no tasks exist or no data for specific labels within the tasks, we show all default labels.
//   const finalLabels =
//     tasks.length > 0 && chartLabels.some((label) => result[label])
//       ? chartLabels.filter((label) => result[label]) // Filter to only show labels with actual data if tasks exist
//       : chartLabels; // If no tasks or no data, show all possible labels for the period

//   return {
//     labels: finalLabels,
//     billableData: finalLabels.map((l) => result[l]?.billable || 0),
//     nonBillableData: finalLabels.map((l) => result[l]?.nonBillable || 0),
//     totalBillable,
//     totalNonBillable,
//   };
// };

// // --- Main Component ---
// const UtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const [period, setPeriod] = useState("Monthly"); // Default to Monthly
//   const { filteredData } = useGlobalFilters();
//   const { currentName } = useRoleBasedAccess();

//   // Memoize filtered tasks to avoid re-filtering on every render
//   const relevantTasks = useMemo(
//     () =>
//       (filteredData.tasks || []).filter((task) =>
//         task.createdBy?.toLowerCase().includes(currentName?.toLowerCase() || "")
//       ),
//     [filteredData, currentName]
//   );

//   // Memoize aggregated data based on relevant tasks and selected period
//   const { labels, billableData, nonBillableData, totalBillable, totalNonBillable } = useMemo(
//     () => aggregateTaskData(relevantTasks, period),
//     [relevantTasks, period]
//   );

//   const totalOverallHours = totalBillable + totalNonBillable;
//   const calculatePercentage = (value) =>
//     totalOverallHours ? Math.round((value / totalOverallHours) * 100) : 0;

//   // Chart data derived from aggregated data
//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: billableData,
//         backgroundColor: CHART_COLORS.billable,
//         stack: "stack1",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: nonBillableData,
//         backgroundColor: CHART_COLORS.nonBillable,
//         stack: "stack1",
//       },
//     ],
//   };

//   // Stats data derived from aggregated data
//   const stats = [
//     { label: "Total Billable Hours", value: totalBillable },
//     { label: "Total Non-Billable Hours", value: totalNonBillable },
//     { label: "Billable %", value: `${calculatePercentage(totalBillable)}%` },
//     { label: "Non-Billable %", value: `${calculatePercentage(totalNonBillable)}%` },
//     { label: "Target", value: "75%" }, // Example static value, can be dynamic
//     { label: "Department Average", value: "72%" }, // Example static value, can be dynamic
//   ];

//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         overflow: "hidden",
//         boxShadow: 3,
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: fullscreen ? "100vw" : "100%",
//         height: fullscreen ? "100vh" : "auto",
//         zIndex: fullscreen ? 1300 : "auto",
//         bgcolor: "#fff",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           background: "linear-gradient(to right, #1d4e89, #1e88e5)",
//           color: "#fff",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           px: { xs: 1, sm: 2, md: 3 },
//           py: 1.5,
//         }}
//       >
//         <Stack direction="row" alignItems="center" spacing={1}>
//           <PieChartIcon />
//           <Typography variant="h6" fontWeight="bold" fontSize={{ xs: "1rem", sm: "1.25rem" }}>
//             Utilization Metrics
//           </Typography>
//         </Stack>
//         <IconButton
//           onClick={() => setFullscreen(!fullscreen)}
//           color="inherit"
//           aria-label={fullscreen ? "close fullscreen" : "open fullscreen"}
//         >
//           {fullscreen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Box>

//       {/* Period Selection Buttons */}
//       <Grid container spacing={1} p={2} mt={0}>
//         {PERIOD_OPTIONS.map((opt) => (
//           <Grid item xs={6} sm={3} key={opt}>
//             <MDButton
//               fullWidth
//               color={period === opt ? "info" : "dark"}
//               variant={period === opt ? "gradient" : "contained"}
//               onClick={() => setPeriod(opt)}
//               sx={{ textTransform: "capitalize" }}
//             >
//               {opt}
//             </MDButton>
//           </Grid>
//         ))}
//       </Grid>

//       <CardContent
//         sx={{
//           flexGrow: 1,
//           height: fullscreen ? "calc(100vh - 180px)" : "auto",
//           overflowY: fullscreen ? "auto" : "visible",
//           p: { xs: 1, sm: 2 },
//         }}
//       >
//         <Box sx={{ height: { xs: 250, sm: 300, md: 350 }, minHeight: 250 }}>
//           {labels.length ? (
//             <Bar data={chartData} options={CHART_OPTIONS} />
//           ) : (
//             <Typography variant="subtitle1" textAlign="center" mt={5}>
//               No data available for the selected period.
//             </Typography>
//           )}
//         </Box>

//         {/* Stats */}
//         <Grid container spacing={2} mt={2}>
//           {stats.map(({ label, value }, i) => (
//             <Grid item xs={12} sm={6} md={3} key={i}>
//               <Box
//                 sx={{
//                   textAlign: "center",
//                   bgcolor: "#f9fcff",
//                   p: 2,
//                   borderRadius: 2,
//                   border: "1px solid #e0e0e0",
//                   height: "100%",
//                 }}
//               >
//                 <Typography variant="subtitle2" color="textSecondary">
//                   {label}:
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   color="#1e88e5"
//                   fontWeight="bold"
//                   fontSize={{ xs: "1.1rem", sm: "1.25rem" }}
//                 >
//                   {value}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default UtilizationMetrics;

// import React, { useState, useMemo } from "react";
// import { Card, CardContent, Typography, Box, Grid, Stack, IconButton } from "@mui/material";
// import PieChartIcon from "@mui/icons-material/PieChart";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import MDButton from "components/MDButton";
// import { useRoleBasedAccess } from "context/RoleBasedAccess";
// import dayjs from "dayjs";
// import quarterOfYear from "dayjs/plugin/quarterOfYear";
// import weekOfYear from "dayjs/plugin/weekOfYear";

// // Extend dayjs with necessary plugins
// dayjs.extend(quarterOfYear);
// dayjs.extend(weekOfYear);

// // Register Chart.js components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // --- Constants for Configuration ---
// const CHART_OPTIONS = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: "bottom",
//     },
//   },
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//       title: {
//         display: true,
//         text: "Hours",
//       },
//       beginAtZero: true,
//     },
//   },
// };

// const PERIOD_OPTIONS = ["Yearly", "Quarterly", "Monthly", "Weekly"];
// const CHART_COLORS = { billable: "#2196f3", nonBillable: "#9e9e9e" };

// // Helper to get descriptive key for aggregation
// const getKey = (dateString, period) => {
//   const date = dayjs(dateString);
//   switch (period) {
//     case "Yearly":
//       // Example: "2025 Q2" (for aggregation key, full name in labels)
//       return `${date.year()} Q${date.quarter()}`;
//     case "Quarterly":
//       // Example: "June"
//       return date.format("MMMM");
//     case "Monthly":
//       // Example: "Week 1 (Jun 1-7)"
//       const startOfMonth = date.startOf("month");
//       const dayOfMonth = date.date();
//       // Calculate week number within the month (1-indexed, starts from 1st day of month)
//       const weekNumber = Math.ceil(dayOfMonth / 7);
//       const weekStartDate = startOfMonth.add((weekNumber - 1) * 7, "day");
//       const weekEndDate = weekStartDate.add(6, "day");

//       const formattedStartDate = weekStartDate.format("MMM D");
//       // Ensure the end date doesn't exceed the actual end of the month
//       const formattedEndDate =
//         weekEndDate.date() > date.endOf("month").date() || weekEndDate.month() !== date.month()
//           ? date.endOf("month").format("MMM D")
//           : weekEndDate.format("MMM D");
//       return `Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`;
//     case "Weekly":
//       // Example: "Monday", "Tuesday"
//       return date.format("dddd"); // 'dddd' for full day name (Sunday, Monday)
//     default:
//       return "";
//   }
// };

// // Helper to get comprehensive labels for the chart dynamically
// const getLabels = (period) => {
//   const currentMoment = dayjs();
//   switch (period) {
//     case "Yearly":
//       // Labels for all 4 quarters of the current year with full names
//       return Array.from({ length: 4 }, (_, i) => {
//         const quarterNum = i + 1;
//         const startMonth = dayjs().quarter(quarterNum).startOf("quarter").format("MMM");
//         const endMonth = dayjs().quarter(quarterNum).endOf("quarter").format("MMM");
//         return `Quarter ${quarterNum} (${startMonth} - ${endMonth})`;
//       });
//     case "Quarterly":
//       // Labels for all 12 months
//       return Array.from({ length: 12 }, (_, i) => currentMoment.month(i).format("MMMM"));
//     case "Monthly":
//       const monthStart = currentMoment.startOf("month");
//       const monthEnd = currentMoment.endOf("month");
//       const labels = [];
//       let currentWeekStart = monthStart;

//       // Generate labels for all weeks in the current month
//       while (currentWeekStart.isBefore(monthEnd) || currentWeekStart.isSame(monthEnd, "day")) {
//         const weekNumber = Math.ceil(currentWeekStart.date() / 7);
//         const weekEndDate = currentWeekStart.add(6, "day");
//         const formattedStartDate = currentWeekStart.format("MMM D");
//         const formattedEndDate =
//           weekEndDate.date() > monthEnd.date() || weekEndDate.month() !== monthEnd.month()
//             ? monthEnd.format("MMM D")
//             : weekEndDate.format("MMM D");
//         labels.push(`Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`);
//         currentWeekStart = currentWeekStart.add(7, "day");
//       }
//       return labels;
//     case "Weekly":
//       // Dynamically generate full day names, excluding Saturday (6) and Sunday (0)
//       // dayjs().day(0) is Sunday, dayjs().day(1) is Monday, etc.
//       return Array.from({ length: 7 }, (_, i) => dayjs().day(i).format("dddd")).filter(
//         (dayName, index) => index !== 0 && index !== 6
//       ); // Exclude Sunday (index 0) and Saturday (index 6)
//     default:
//       return [];
//   }
// };

// const aggregateTaskData = (tasks, period) => {
//   const result = {};
//   let totalBillable = 0;
//   let totalNonBillable = 0;

//   tasks.forEach((task) => {
//     const date = dayjs(task.CreatedDateTime);
//     // Exclude tasks created on Saturday (6) and Sunday (0) for Weekly view only
//     if (period === "Weekly" && (date.day() === 0 || date.day() === 6)) {
//       return; // Skip this task
//     }

//     const key = getKey(task.CreatedDateTime, period);
//     const duration = Number(task.Duration) || 0;
//     const isBillable = task.ProjectType === "Customer";

//     result[key] = result[key] || { billable: 0, nonBillable: 0 };
//     if (isBillable) {
//       result[key].billable += duration;
//       totalBillable += duration;
//     } else {
//       result[key].nonBillable += duration;
//       totalNonBillable += duration;
//     }
//   });

//   const chartLabels = getLabels(period); // getLabels no longer needs tasks for its primary function

//   // Determine the final labels for the chart.
//   // If there are tasks, we primarily use labels for which we have aggregated data AND are part of chartLabels.
//   // If no tasks exist or no data for specific labels within the tasks, we show all default labels.
//   let finalLabels = chartLabels;

//   if (tasks.length > 0) {
//     // Create a set of keys present in the aggregated data
//     const aggregatedKeys = new Set(Object.keys(result));
//     // Filter chartLabels to only include those for which we have data
//     const labelsWithData = chartLabels.filter((label) => aggregatedKeys.has(label));

//     // If there's any data, use only the labels for which data exists
//     // Otherwise, fall back to all default chartLabels (e.g., if filtered tasks don't match any period)
//     if (labelsWithData.length > 0) {
//       finalLabels = labelsWithData;
//     }
//   }

//   return {
//     labels: finalLabels,
//     billableData: finalLabels.map((l) => result[l]?.billable || 0),
//     nonBillableData: finalLabels.map((l) => result[l]?.nonBillable || 0),
//     totalBillable,
//     totalNonBillable,
//   };
// };

// // --- Main Component ---
// const UtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const [period, setPeriod] = useState("Monthly"); // Default to Monthly
//   const { filteredData } = useGlobalFilters();
//   const { currentName } = useRoleBasedAccess();

//   // Memoize filtered tasks to avoid re-filtering on every render
//   const relevantTasks = useMemo(
//     () =>
//       (filteredData.tasks || []).filter((task) =>
//         task.createdBy?.toLowerCase().includes(currentName?.toLowerCase() || "")
//       ),
//     [filteredData, currentName]
//   );

//   // Memoize aggregated data based on relevant tasks and selected period
//   const { labels, billableData, nonBillableData, totalBillable, totalNonBillable } = useMemo(
//     () => aggregateTaskData(relevantTasks, period),
//     [relevantTasks, period]
//   );

//   const totalOverallHours = totalBillable + totalNonBillable;
//   const calculatePercentage = (value) =>
//     totalOverallHours ? Math.round((value / totalOverallHours) * 100) : 0;

//   // Chart data derived from aggregated data
//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: billableData,
//         backgroundColor: CHART_COLORS.billable,
//         stack: "stack1",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: nonBillableData,
//         backgroundColor: CHART_COLORS.nonBillable,
//         stack: "stack1",
//       },
//     ],
//   };

//   // Stats data derived from aggregated data
//   const stats = [
//     { label: "Total Billable Hours", value: totalBillable },
//     { label: "Total Non-Billable Hours", value: totalNonBillable },
//     { label: "Billable %", value: `${calculatePercentage(totalBillable)}%` },
//     { label: "Non-Billable %", value: `${calculatePercentage(totalNonBillable)}%` },
//     { label: "Target", value: "75%" }, // Example static value, can be dynamic
//     { label: "Department Average", value: "72%" }, // Example static value, can be dynamic
//   ];

//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         overflow: "hidden",
//         boxShadow: 3,
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: fullscreen ? "100vw" : "100%",
//         height: fullscreen ? "100vh" : "auto",
//         zIndex: fullscreen ? 1300 : "auto",
//         bgcolor: "#fff",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           background: "linear-gradient(to right, #1d4e89, #1e88e5)",
//           color: "#fff",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           px: { xs: 1, sm: 2, md: 3 },
//           py: 1.5,
//         }}
//       >
//         <Stack direction="row" alignItems="center" spacing={1}>
//           <PieChartIcon />
//           <Typography variant="h6" fontWeight="bold" fontSize={{ xs: "1rem", sm: "1.25rem" }}>
//             Utilization Metrics
//           </Typography>
//         </Stack>
//         <IconButton
//           onClick={() => setFullscreen(!fullscreen)}
//           color="inherit"
//           aria-label={fullscreen ? "close fullscreen" : "open fullscreen"}
//         >
//           {fullscreen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Box>

//       {/* Period Selection Buttons */}
//       <Grid container spacing={1} p={2} mt={0}>
//         {PERIOD_OPTIONS.map((opt) => (
//           <Grid item xs={6} sm={3} key={opt}>
//             <MDButton
//               fullWidth
//               color={period === opt ? "primary" : "info"}
//               variant={period === opt ? "contained" : "gradient"}
//               onClick={() => setPeriod(opt)}
//               sx={{ textTransform: "capitalize" }}
//             >
//               {opt}
//             </MDButton>
//           </Grid>
//         ))}
//       </Grid>

//       <CardContent
//         sx={{
//           flexGrow: 1,
//           height: fullscreen ? "calc(100vh - 180px)" : "auto",
//           overflowY: fullscreen ? "auto" : "visible",
//           p: { xs: 1, sm: 2 },
//         }}
//       >
//         <Box sx={{ height: { xs: 250, sm: 300, md: 350 }, minHeight: 250 }}>
//           {labels.length ? (
//             <Bar data={chartData} options={CHART_OPTIONS} />
//           ) : (
//             <Typography variant="subtitle1" textAlign="center" mt={5}>
//               No data available for the selected period.
//             </Typography>
//           )}
//         </Box>

//         {/* Stats */}
//         <Grid container spacing={2} mt={2}>
//           {stats.map(({ label, value }, i) => (
//             <Grid item xs={12} sm={6} md={3} key={i}>
//               <Box
//                 sx={{
//                   textAlign: "center",
//                   bgcolor: "#f9fcff",
//                   p: 2,
//                   borderRadius: 2,
//                   border: "1px solid #e0e0e0",
//                   height: "100%",
//                 }}
//               >
//                 <Typography variant="subtitle2" color="textSecondary">
//                   {label}:
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   color="#1e88e5"
//                   fontWeight="bold"
//                   fontSize={{ xs: "1.1rem", sm: "1.25rem" }}
//                 >
//                   {value}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default UtilizationMetrics;

import React, { useState, useMemo } from "react";
import { Card, CardContent, Typography, Box, Grid, Stack, IconButton } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGlobalFilters } from "context/GlobalFilterContext";
import MDButton from "components/MDButton";
import { useRoleBasedAccess } from "context/RoleBasedAccess";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";

// Extend dayjs with necessary plugins
dayjs.extend(quarterOfYear);
dayjs.extend(weekOfYear);

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// --- Constants for Configuration ---
const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Hours",
      },
      beginAtZero: true,
    },
  },
};

const PERIOD_OPTIONS = ["Yearly", "Quarterly", "Monthly", "Weekly"];
const CHART_COLORS = { billable: "#2196f3", nonBillable: "#9e9e9e" };

// Helper to get the descriptive label for a given date and period.
// This label will serve as the key for aggregation and also for chart display.
const getFormattedPeriodLabel = (dateString, period) => {
  const date = dayjs(dateString);
  if (!date.isValid()) {
    console.warn("Invalid date provided to getFormattedPeriodLabel:", dateString);
    return "Invalid Date";
  }

  const currentYear = dayjs().year(); // Get current year for default quarter labels

  switch (period) {
    case "Yearly":
      // Example: "Quarter 1 (Jan - Mar)" for the year of the task
      const year = date.year();
      const quarterNum = date.quarter();
      const startMonth = dayjs().year(year).quarter(quarterNum).startOf("quarter").format("MMM");
      const endMonth = dayjs().year(year).quarter(quarterNum).endOf("quarter").format("MMM");
      return `Quarter ${quarterNum} (${startMonth} - ${endMonth})`;
    case "Quarterly":
      // Example: "June"
      return date.format("MMMM");
    case "Monthly":
      // Example: "Week 1 (Jun 1-7)"
      const startOfMonth = date.startOf("month");
      const dayOfMonth = date.date();
      const weekNumber = Math.ceil(dayOfMonth / 7);
      const weekStartDate = startOfMonth.add((weekNumber - 1) * 7, "day");
      const weekEndDate = weekStartDate.add(6, "day");
      const formattedStartDate = weekStartDate.format("MMM D");
      const formattedEndDate =
        weekEndDate.month() !== date.month() || weekEndDate.date() > date.endOf("month").date()
          ? date.endOf("month").format("MMM D")
          : weekEndDate.format("MMM D");
      return `Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`;
    case "Weekly":
      // Example: "Monday", "Tuesday"
      return date.format("dddd"); // 'dddd' for full day name (Sunday, Monday)
    default:
      return "";
  }
};

// Helper to get comprehensive labels for the chart based on the selected period.
// These are the *expected* labels for a given period, regardless of data presence.
const getExpectedLabelsForPeriod = (period) => {
  const currentMoment = dayjs();
  switch (period) {
    case "Yearly":
      // Labels for all 4 quarters of the current year with full names
      return Array.from({ length: 4 }, (_, i) => {
        const quarterNum = i + 1;
        const startMonth = dayjs().quarter(quarterNum).startOf("quarter").format("MMM");
        const endMonth = dayjs().quarter(quarterNum).endOf("quarter").format("MMM");
        return `Quarter ${quarterNum} (${startMonth} - ${endMonth})`;
      });
    case "Quarterly":
      // Labels for all 12 months
      return Array.from({ length: 12 }, (_, i) => currentMoment.month(i).format("MMMM"));
    case "Monthly":
      const monthStart = currentMoment.startOf("month");
      const monthEnd = currentMoment.endOf("month");
      const labels = [];
      let currentWeekStart = monthStart;

      // Generate labels for all weeks in the current month
      while (currentWeekStart.isBefore(monthEnd) || currentWeekStart.isSame(monthEnd, "day")) {
        const weekNumber = Math.ceil(currentWeekStart.date() / 7);
        const weekEndDate = currentWeekStart.add(6, "day");
        const formattedStartDate = currentWeekStart.format("MMM D");
        const formattedEndDate =
          weekEndDate.month() !== monthEnd.month() || weekEndDate.date() > monthEnd.date()
            ? monthEnd.format("MMM D")
            : weekEndDate.format("MMM D");
        labels.push(`Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`);
        currentWeekStart = currentWeekStart.add(7, "day");
      }
      return labels;
    case "Weekly":
      // Dynamically generate full day names, excluding Saturday (6) and Sunday (0)
      // dayjs().day(0) is Sunday, dayjs().day(1) is Monday, etc.
      return Array.from({ length: 7 }, (_, i) => dayjs().day(i).format("dddd")).filter(
        (dayName, index) => index !== 0 && index !== 6
      ); // Exclude Sunday (index 0) and Saturday (index 6)
    default:
      return [];
  }
};

const aggregateTaskData = (tasks, period) => {
  const result = {};
  let totalBillable = 0;
  let totalNonBillable = 0;

  tasks.forEach((task) => {
    const date = dayjs(task.CreatedDateTime);

    // Skip task if date is invalid
    if (!date.isValid()) {
      console.warn("Skipping task due to invalid CreatedDateTime:", task.CreatedDateTime);
      return;
    }

    // Exclude tasks created on Saturday (6) and Sunday (0) for Weekly view only
    if (period === "Weekly" && (date.day() === 0 || date.day() === 6)) {
      return; // Skip this task for weekly aggregation
    }

    // Use the descriptive label as the key for aggregation
    const key = getFormattedPeriodLabel(task.CreatedDateTime, period);
    const duration = Number(task.Duration) || 0;
    const isBillable = task.ProjectType === "Customer";

    result[key] = result[key] || { billable: 0, nonBillable: 0 };
    if (isBillable) {
      result[key].billable += duration;
      totalBillable += duration;
    } else {
      result[key].nonBillable += duration;
      totalNonBillable += duration;
    }
  });

  // Get the complete set of labels expected for the current period
  const expectedLabels = getExpectedLabelsForPeriod(period);

  // Filter `expectedLabels` to only include those for which we have aggregated data,
  // or if there's no data at all, use all expected labels to show an empty chart.
  let finalLabels = expectedLabels;
  if (tasks.length > 0) {
    // Only filter if there are actual tasks to consider
    const labelsWithData = expectedLabels.filter((label) => result[label]);
    if (labelsWithData.length > 0) {
      finalLabels = labelsWithData;
    }
  }

  return {
    labels: finalLabels,
    billableData: finalLabels.map((l) => result[l]?.billable || 0),
    nonBillableData: finalLabels.map((l) => result[l]?.nonBillable || 0),
    totalBillable,
    totalNonBillable,
  };
};

// --- Main Component ---
const UtilizationMetrics = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [period, setPeriod] = useState("Monthly"); // Default to Monthly
  const { filteredData } = useGlobalFilters();
  const { currentName } = useRoleBasedAccess();

  // Memoize filtered tasks to avoid re-filtering on every render
  const relevantTasks = useMemo(
    () =>
      (filteredData.tasks || []).filter((task) =>
        task.createdBy?.toLowerCase().includes(currentName?.toLowerCase() || "")
      ),
    [filteredData, currentName]
  );

  // Memoize aggregated data based on relevant tasks and selected period
  const { labels, billableData, nonBillableData, totalBillable, totalNonBillable } = useMemo(
    () => aggregateTaskData(relevantTasks, period),
    [relevantTasks, period]
  );

  const totalOverallHours = totalBillable + totalNonBillable;
  const calculatePercentage = (value) =>
    totalOverallHours ? Math.round((value / totalOverallHours) * 100) : 0;

  // Chart data derived from aggregated data
  const chartData = {
    labels,
    datasets: [
      {
        label: "Billable Hours",
        data: billableData,
        backgroundColor: CHART_COLORS.billable,
        stack: "stack1",
      },
      {
        label: "Non-Billable Hours",
        data: nonBillableData,
        backgroundColor: CHART_COLORS.nonBillable,
        stack: "stack1",
      },
    ],
  };

  // Stats data derived from aggregated data
  const stats = [
    { label: "Total Billable Hours", value: totalBillable },
    { label: "Total Non-Billable Hours", value: totalNonBillable },
    { label: "Billable %", value: `${calculatePercentage(totalBillable)}%` },
    { label: "Non-Billable %", value: `${calculatePercentage(totalNonBillable)}%` },
    { label: "Target", value: "75%" }, // Example static value, can be dynamic
    { label: "Department Average", value: "72%" }, // Example static value, can be dynamic
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        position: fullscreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: fullscreen ? "100vw" : "100%",
        height: fullscreen ? "100vh" : "auto",
        zIndex: fullscreen ? 1300 : "auto",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1d4e89, #1e88e5)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, sm: 2, md: 3 },
          py: 1.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <PieChartIcon />
          <Typography variant="h6" fontWeight="bold" fontSize={{ xs: "1rem", sm: "1.25rem" }}>
            Utilization Metrics
          </Typography>
        </Stack>
        <IconButton
          onClick={() => setFullscreen(!fullscreen)}
          color="inherit"
          aria-label={fullscreen ? "close fullscreen" : "open fullscreen"}
        >
          {fullscreen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>

      {/* Period Selection Buttons */}
      <Grid container spacing={1} p={2} mt={0}>
        {PERIOD_OPTIONS.map((opt) => (
          <Grid item xs={6} sm={3} key={opt}>
            <MDButton
              fullWidth
              color={period === opt ? "info" : "dark"}
              variant={period === opt ? "gradient" : "contained"}
              onClick={() => setPeriod(opt)}
              sx={{ textTransform: "capitalize" }}
            >
              {opt}
            </MDButton>
          </Grid>
        ))}
      </Grid>

      <CardContent
        sx={{
          flexGrow: 1,
          height: fullscreen ? "calc(100vh - 180px)" : "auto",
          overflowY: fullscreen ? "auto" : "visible",
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ height: { xs: 250, sm: 300, md: 350 }, minHeight: 250 }}>
          {labels.length ? (
            <Bar data={chartData} options={CHART_OPTIONS} />
          ) : (
            <Typography variant="subtitle1" textAlign="center" mt={5}>
              No data available for the selected period.
            </Typography>
          )}
        </Box>

        {/* Stats */}
        <Grid container spacing={2} mt={2}>
          {stats.map(({ label, value }, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box
                sx={{
                  textAlign: "center",
                  bgcolor: "#f9fcff",
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  height: "100%",
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {label}:
                </Typography>
                <Typography
                  variant="h5"
                  color="#1e88e5"
                  fontWeight="bold"
                  fontSize={{ xs: "1.1rem", sm: "1.25rem" }}
                >
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UtilizationMetrics;
