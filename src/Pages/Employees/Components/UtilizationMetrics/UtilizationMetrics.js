// import React, { useState, useEffect, useMemo } from "react";
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
// import { useGlobalFilters } from "context/GlobalFilterContext"; // Assuming this path is correct
// import MDButton from "components/MDButton"; // Assuming this path is correct

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // Helper function to get Monday of the week for a given date
// function getMonday(date) {
//   const d = new Date(date);
//   const day = d.getDay(); // 0 (Sun) to 6 (Sat)
//   const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust if Sunday to go to previous Monday
//   return new Date(d.setDate(diff));
// }

// // Helper to format keys into human-readable labels
// function formatKeyToLabel(key, period) {
//   const parts = key.split("-");
//   const year = parseInt(parts[0], 10);

//   if (period === "Yearly") {
//     // Key: YYYY-Q#
//     return `Q${parts[1].substring(1)} ${year}`;
//   }
//   if (period === "Quarterly") {
//     // Key: YYYY-MM
//     const month = parseInt(parts[1], 10) - 1;
//     const date = new Date(year, month);
//     return date.toLocaleString("en-US", { month: "long", year: "numeric" });
//   }
//   if (period === "Monthly") {
//     // Key: YYYY-MM-W#
//     const month = parseInt(parts[1], 10) - 1;
//     const weekNum = parseInt(parts[2].substring(1), 10);

//     const firstOfMonth = new Date(year, month, 1);
//     const lastOfMonth = new Date(year, month + 1, 0); // Last day of current month

//     let weekStartDay = (weekNum - 1) * 7 + 1;
//     // Adjust if the first day of the month is not Monday, for simplified week alignment
//     // This part can be complex if strict ISO weeks or specific company week defs are needed
//     // For simplicity, we'll use day numbers within the month for week ranges.

//     let weekEndDay = weekNum * 7;

//     const startDate = new Date(year, month, weekStartDay);
//     const endDate = new Date(year, month, Math.min(weekEndDay, lastOfMonth.getDate()));

//     const monthStr = firstOfMonth.toLocaleString("en-US", { month: "short" });

//     if (startDate.getMonth() !== month) {
//       // handles weeks starting in prev month for W1
//       return `Week ${weekNum} (${monthStr}, ${year})`; // simplified label if date range is complex
//     }

//     return `Week ${weekNum} (${monthStr} ${startDate.getDate()}-${endDate.getDate()}, ${year})`;
//   }
//   if (period === "Weekly") {
//     // Key: YYYY-MM-DD (actual date of Mon-Fri)
//     const date = new Date(year, parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
//     // Add T00:00:00 to ensure it's treated as local time, not UTC midnight
//     const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//     return localDate.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   }
//   return key; // Fallback
// }

// // Main aggregation function
// const aggregateTaskData = (tasks, period) => {
//   const aggregated = {};
//   let overallBillable = 0;
//   let overallNonBillable = 0;

//   tasks.forEach((task) => {
//     const date = new Date(task.CreatedDateTime);
//     const duration = typeof task.Duration === "number" ? task.Duration : 0;
//     const isBillable = task.ProjectType === "Customer";
//     const userName = task.createdBy || "Unknown User";

//     if (isBillable) {
//       overallBillable += duration;
//     } else {
//       overallNonBillable += duration;
//     }

//     const year = date.getFullYear();
//     const month = date.getMonth(); // 0-11
//     const dayOfMonth = date.getDate();
//     const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

//     let key;

//     switch (period) {
//       case "Yearly":
//         const quarter = Math.floor(month / 3) + 1;
//         key = `${year}-Q${quarter}`;
//         break;
//       case "Quarterly":
//         key = `${year}-${String(month + 1).padStart(2, "0")}`; // YYYY-MM
//         break;
//       case "Monthly":
//         const weekOfMonth = Math.ceil(dayOfMonth / 7);
//         key = `${year}-${String(month + 1).padStart(2, "0")}-W${weekOfMonth}`; // YYYY-MM-W#
//         break;
//       case "Weekly":
//         if (dayOfWeek === 0 || dayOfWeek === 6) {
//           // Skip Sunday & Saturday
//           return; // Don't include tasks from weekends in weekly aggregation
//         }
//         key = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayOfMonth).padStart(
//           2,
//           "0"
//         )}`; // YYYY-MM-DD
//         break;
//       default:
//         return; // Should not happen
//     }

//     if (!aggregated[key]) {
//       aggregated[key] = { billable: 0, nonBillable: 0, billableUsers: new Set() };
//     }

//     if (isBillable) {
//       aggregated[key].billable += duration;
//       aggregated[key].billableUsers.add(userName);
//     } else {
//       aggregated[key].nonBillable += duration;
//     }
//   });

//   const sortedKeys = Object.keys(aggregated).sort();

//   const labelsWithContext = sortedKeys.map((key) => formatKeyToLabel(key, period));

//   const billableData = sortedKeys.map((key) => aggregated[key]?.billable || 0);
//   const nonBillableData = sortedKeys.map((key) => aggregated[key]?.nonBillable || 0);
//   const billableUsersPerLabel = sortedKeys.map((key) =>
//     aggregated[key] ? Array.from(aggregated[key].billableUsers) : []
//   );

//   return {
//     labels: labelsWithContext,
//     billableData,
//     nonBillableData,
//     overallBillable,
//     overallNonBillable,
//     billableUsersPerLabel,
//   };
// };

// const EmployeeUtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filteredData } = useGlobalFilters();
//   const taskData = filteredData.tasks || [];

//   const targetUtilization = filteredData.targetUtilizationPercentage;
//   const departmentAverageUtilization = filteredData.departmentAveragePercentage;

//   const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       { label: "Billable Hours", data: [], backgroundColor: "#2196f3", stack: "stack1", users: [] },
//       { label: "Non-Billable Hours", data: [], backgroundColor: "#9e9e9e", stack: "stack1" },
//     ],
//   });

//   const initialStats = useMemo(
//     () => [
//       { label: "Billable Hours", value: "0%" },
//       { label: "Non-Billable Hours", value: "0%" },
//       { label: "Target", value: targetUtilization ? `${targetUtilization}%` : "N/A" },
//       {
//         label: "Department Average",
//         value: departmentAverageUtilization ? `${departmentAverageUtilization}%` : "N/A",
//       },
//       { label: "Total Billable Hours", value: "0.0" },
//       { label: "Total NonBillable Hours", value: "0.0" },
//     ],
//     [targetUtilization, departmentAverageUtilization]
//   );

//   const [statsData, setStatsData] = useState(initialStats);

//   const chartOptions = useMemo(
//     () => ({
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: { position: "bottom" },
//         tooltip: {
//           callbacks: {
//             footer: (tooltipItems) => {
//               const tooltipItem = tooltipItems[0];
//               if (!tooltipItem || !tooltipItem.chart.data.datasets[tooltipItem.datasetIndex])
//                 return "";
//               const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
//               if (dataset.label === "Billable Hours" && dataset.users) {
//                 const usersForThisBar = dataset.users[tooltipItem.dataIndex];
//                 if (usersForThisBar && usersForThisBar.length > 0) {
//                   const maxUsersToShow = 3;
//                   let userString = usersForThisBar.slice(0, maxUsersToShow).join(", ");
//                   if (usersForThisBar.length > maxUsersToShow) {
//                     userString += `, and ${usersForThisBar.length - maxUsersToShow} more`;
//                   }
//                   return `Users: ${userString}`;
//                 }
//               }
//               return "";
//             },
//           },
//         },
//       },
//       scales: {
//         x: { stacked: true },
//         y: { stacked: true, title: { display: true, text: "Hours" }, beginAtZero: true },
//       },
//     }),
//     []
//   );

//   useEffect(() => {
//     const tasks = Array.isArray(taskData) ? taskData : [];

//     if (tasks.length === 0) {
//       setChartData({
//         // No default labels, chart will show "No data"
//         labels: [],
//         datasets: [
//           {
//             label: "Billable Hours",
//             data: [],
//             backgroundColor: "#2196f3",
//             stack: "stack1",
//             users: [],
//           },
//           { label: "Non-Billable Hours", data: [], backgroundColor: "#9e9e9e", stack: "stack1" },
//         ],
//       });
//       setStatsData(initialStats);
//       return;
//     }

//     const {
//       labels,
//       billableData,
//       nonBillableData,
//       overallBillable,
//       overallNonBillable,
//       billableUsersPerLabel,
//     } = aggregateTaskData(tasks, selectedPeriod);

//     setChartData({
//       labels: labels,
//       datasets: [
//         {
//           label: "Billable Hours",
//           data: billableData,
//           backgroundColor: "#2196f3",
//           stack: "stack1",
//           users: billableUsersPerLabel,
//         },
//         {
//           label: "Non-Billable Hours",
//           data: nonBillableData,
//           backgroundColor: "#9e9e9e",
//           stack: "stack1",
//         },
//       ],
//     });

//     const totalHours = overallBillable + overallNonBillable;
//     const billablePercentage =
//       totalHours > 0 ? Math.round((overallBillable / totalHours) * 100) : 0;
//     const nonBillablePercentage =
//       totalHours > 0 ? Math.round((overallNonBillable / totalHours) * 100) : 0;

//     setStatsData([
//       { label: "Billable Hours", value: `${billablePercentage}%` },
//       { label: "Non-Billable Hours", value: `${nonBillablePercentage}%` },
//       { label: "Target", value: targetUtilization ? `${targetUtilization}%` : "N/A" },
//       {
//         label: "Department Average",
//         value: departmentAverageUtilization ? `${departmentAverageUtilization}%` : "N/A",
//       },
//       { label: "Total Billable Hours", value: overallBillable.toFixed(1) },
//       { label: "Total NonBillable Hours", value: overallNonBillable.toFixed(1) },
//     ]);
//   }, [taskData, selectedPeriod, targetUtilization, departmentAverageUtilization, initialStats]);

//   const periodButtons = [
//     { label: "Yearly", period: "Yearly", color: "success" },
//     { label: "Quarterly", period: "Quarterly", color: "success" },
//     { label: "Monthly", period: "Monthly", color: "info" },
//     { label: "Weekly", period: "Weekly", color: "info" },
//   ];

//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         overflow: "hidden",
//         boxShadow: 3,
//         position: fullscreen ? "fixed" : "relative",
//         top: fullscreen ? 0 : "auto",
//         left: fullscreen ? 0 : "auto",
//         width: fullscreen ? "100vw" : "100%",
//         height: fullscreen ? "100vh" : "auto",
//         zIndex: fullscreen ? 1300 : "auto",
//         bgcolor: "#fff",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
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

//       <Grid container spacing={1} p={2} mt={0}>
//         {periodButtons.map((item) => (
//           <Grid item xs={6} sm={3} key={item.period}>
//             <MDButton
//               variant={selectedPeriod === item.period ? "contained" : "gradient"}
//               color={selectedPeriod === item.period ? "primary" : item.color}
//               fullWidth
//               onClick={() => setSelectedPeriod(item.period)}
//               sx={{ textTransform: "capitalize" }}
//             >
//               {item.label}
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
//           {chartData.labels && chartData.labels.length > 0 ? (
//             <Bar data={chartData} options={chartOptions} />
//           ) : (
//             <Typography variant="subtitle1" textAlign="center" mt={5}>
//               No data available for the selected period or filters.
//             </Typography>
//           )}
//         </Box>

//         <Grid container spacing={2} mt={2}>
//           {statsData.map((item, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
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
//                   {item.label}:
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   color="#1e88e5"
//                   fontWeight="bold"
//                   fontSize={{ xs: "1.1rem", sm: "1.25rem" }}
//                 >
//                   {item.value}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default EmployeeUtilizationMetrics;

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
// // import MDButton from "components/MDButton"; // Assuming MDButton is still needed
// // import { useRoleBasedAccess } from "context/RoleBasedAccess"; // No longer needed for currentName
// import dayjs from "dayjs";
// import quarterOfYear from "dayjs/plugin/quarterOfYear";
// import weekOfYear from "dayjs/plugin/weekOfYear";

// // If MDButton is a custom component, ensure it's imported correctly.
// // For demonstration, I'm assuming it's available or can be replaced with a standard MUI Button.
// import MDButton from "components/MDButton"; // Keep this if it's a real component
// // If useRoleBasedAccess is not needed for anything else, you can remove it.
// // For safety, I'll comment it out, you can remove the import entirely if confirmed unused.
// // import { useRoleBasedAccess } from "context/RoleBasedAccess";

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
//       // THIS IS THE KEY CHANGE: Match the label format for aggregation
//       const quarterNumYearly = date.quarter();
//       const startMonthYearly = date.startOf("quarter").format("MMM");
//       const endMonthYearly = date.endOf("quarter").format("MMM");
//       return `Quarter ${quarterNumYearly} (${startMonthYearly} - ${endMonthYearly})`;
//     case "Quarterly":
//       return date.format("MMMM"); // e.g., "June"
//     case "Monthly":
//       const startOfMonth = date.startOf("month");
//       const dayOfMonth = date.date();
//       const weekNumber = Math.ceil(dayOfMonth / 7);
//       const weekStartDate = startOfMonth.add((weekNumber - 1) * 7, "day");
//       const weekEndDate = weekStartDate.add(6, "day");
//       const formattedStartDate = weekStartDate.format("MMM D");
//       const formattedEndDate =
//         weekEndDate.date() > date.endOf("month").date() || weekEndDate.month() !== date.month()
//           ? date.endOf("month").format("MMM D")
//           : weekEndDate.format("MMM D");
//       return `Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`;
//     case "Weekly":
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
//         // Use a dayjs object specifically for that quarter to get its start/end month
//         const quarterStartMoment = dayjs().quarter(quarterNum).startOf("quarter");
//         const quarterEndMoment = dayjs().quarter(quarterNum).endOf("quarter");

//         const startMonth = quarterStartMoment.format("MMM");
//         const endMonth = quarterEndMoment.format("MMM");
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
//       // Dynamically generate full day names (Monday-Friday), excluding Saturday (6) and Sunday (0)
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
//       return; // Skip this task for weekly view
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

//   const chartLabels = getLabels(period);

//   // Determine the final labels for the chart.
//   // If there are tasks, we primarily use labels for which we have aggregated data AND are part of chartLabels.
//   // If no tasks exist or no data for specific labels within the tasks, we show all default labels.
//   let finalLabels = chartLabels;

//   if (tasks.length > 0) {
//     const aggregatedKeys = new Set(Object.keys(result));
//     const labelsWithData = chartLabels.filter((label) => aggregatedKeys.has(label));

//     // If there's any data, use only the labels for which data exists.
//     // Otherwise, fall back to all default chartLabels (e.g., if filtered tasks don't match any period).
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
//   console.log(filteredData);
//   // const { currentName } = useRoleBasedAccess(); // Removed as it's no longer used

//   // No longer filtering tasks by currentName, taking all tasks from filteredData
//   const relevantTasks = useMemo(
//     () => filteredData.tasks || [],
//     [filteredData] // Dependency array simplified
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
// import { useRoleBasedAccess } from "context/RoleBasedAccess"; // No longer needed for currentName filtering
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

// Helper to get descriptive key for aggregation
const getKey = (dateString, period) => {
  const date = dayjs(dateString);
  switch (period) {
    case "Yearly":
      // Example: "Quarter 2 (Apr - Jun)"
      const quarterNumYearly = date.quarter();
      const startMonthYearly = date.startOf("quarter").format("MMM");
      const endMonthYearly = date.endOf("quarter").format("MMM");
      return `Quarter ${quarterNumYearly} (${startMonthYearly} - ${endMonthYearly})`;
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
      // Ensure the end date doesn't exceed the actual end of the month
      const formattedEndDate =
        weekEndDate.date() > date.endOf("month").date() || weekEndDate.month() !== date.month()
          ? date.endOf("month").format("MMM D")
          : weekEndDate.format("MMM D");
      return `Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`;
    case "Weekly":
      // Example: "Monday", "Tuesday"
      return date.format("dddd"); // 'dddd' for full day name
    default:
      return "";
  }
};

// Helper to get comprehensive labels for the chart dynamically
const getLabels = (period) => {
  const currentMoment = dayjs(); // Used to derive current year for quarters
  switch (period) {
    case "Yearly":
      // Labels for all 4 quarters of the current year with full names
      return Array.from({ length: 4 }, (_, i) => {
        const quarterNum = i + 1;
        // Use a dayjs object specifically for that quarter to get its start/end month
        const quarterStartMoment = dayjs().quarter(quarterNum).startOf("quarter");
        const quarterEndMoment = dayjs().quarter(quarterNum).endOf("quarter");

        const startMonth = quarterStartMoment.format("MMM");
        const endMonth = quarterEndMoment.format("MMM");
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
          weekEndDate.date() > monthEnd.date() || weekEndDate.month() !== monthEnd.month()
            ? monthEnd.format("MMM D")
            : weekEndDate.format("MMM D");
        labels.push(`Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`);
        currentWeekStart = currentWeekStart.add(7, "day");
      }
      return labels;
    case "Weekly":
      // Dynamically generate full day names (Monday-Friday), excluding Saturday (6) and Sunday (0)
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

  // Sample object structure you provided:
  // {
  //   "ProjectType": "Customer",
  //   "Customer": "GE",
  //   "TaskName": "dsaf",
  //   "Internal": "Employee 360",
  //   "TaskDescription": "fsd",
  //   "TaskType": "Development",
  //   "createdBy": "Krishna Kumar",
  //   "CreatedDateTime": "2025-06-06T13:12:39Z", // This is used
  //   "Duration": 3, // This is used
  //   "photoUrl": "..."
  // }

  tasks.forEach((task) => {
    const date = dayjs(task.CreatedDateTime); // Using CreatedDateTime from your object

    // Exclude tasks created on Saturday (6) and Sunday (0) for Weekly view only
    if (period === "Weekly" && (date.day() === 0 || date.day() === 6)) {
      return; // Skip this task for weekly view
    }

    const key = getKey(task.CreatedDateTime, period);
    const duration = Number(task.Duration) || 0; // Ensure Duration is a number
    const isBillable = task.ProjectType === "Customer"; // Using ProjectType from your object

    result[key] = result[key] || { billable: 0, nonBillable: 0 };
    if (isBillable) {
      result[key].billable += duration;
      totalBillable += duration;
    } else {
      result[key].nonBillable += duration;
      totalNonBillable += duration;
    }
  });

  const chartLabels = getLabels(period);

  // Determine the final labels for the chart.
  // If there are tasks, we primarily use labels for which we have aggregated data AND are part of chartLabels.
  // If no tasks exist or no data for specific labels within the tasks, we show all default labels.
  let finalLabels = chartLabels;

  if (tasks.length > 0) {
    const aggregatedKeys = new Set(Object.keys(result));
    const labelsWithData = chartLabels.filter((label) => aggregatedKeys.has(label));

    // If there's any data, use only the labels for which data exists.
    // Otherwise, fall back to all default chartLabels (e.g., if filtered tasks don't match any period).
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
  // Removed useRoleBasedAccess as currentName filtering is no longer in use here.
  // const { currentName } = useRoleBasedAccess();

  // relevantTasks now directly uses filteredData.tasks without filtering by currentName
  const relevantTasks = useMemo(() => filteredData.tasks || [], [filteredData]);

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
    { label: "Total Non-Billable Hours", value: totalNonBillable.toFixed(2) },
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
