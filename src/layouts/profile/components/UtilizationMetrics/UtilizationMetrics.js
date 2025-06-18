// import React, { useState, useMemo, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Grid,
//   Stack,
//   IconButton,
//   useMediaQuery,
// } from "@mui/material";
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

// // Helper to get the descriptive label for a given date and period.
// const getFormattedPeriodLabel = (dateString, period) => {
//   const date = dayjs(dateString);
//   if (!date.isValid()) {
//     console.warn("Invalid date provided to getFormattedPeriodLabel:", dateString);
//     return "Invalid Date";
//   }

//   const currentYear = dayjs().year();

//   switch (period) {
//     case "Yearly":
//       const year = date.year();
//       const quarterNum = date.quarter();
//       const startMonth = dayjs().year(year).quarter(quarterNum).startOf("quarter").format("MMM");
//       const endMonth = dayjs().year(year).quarter(quarterNum).endOf("quarter").format("MMM");
//       return `Quarter ${quarterNum} (${startMonth} - ${endMonth})`;
//     case "Quarterly":
//       return date.format("MMMM");
//     case "Monthly":
//       const startOfMonth = date.startOf("month");
//       const dayOfMonth = date.date();
//       const weekNumber = Math.ceil(dayOfMonth / 7);
//       const weekStartDate = startOfMonth.add((weekNumber - 1) * 7, "day");
//       const weekEndDate = weekStartDate.add(6, "day");
//       const formattedStartDate = weekStartDate.format("MMM D");
//       const formattedEndDate =
//         weekEndDate.month() !== date.month() || weekEndDate.date() > date.endOf("month").date()
//           ? date.endOf("month").format("MMM D")
//           : weekEndDate.format("MMM D");
//       return `Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`;
//     case "Weekly":
//       return date.format("dddd");
//     default:
//       return "";
//   }
// };

// const getExpectedLabelsForPeriod = (period) => {
//   const currentMoment = dayjs();
//   switch (period) {
//     case "Yearly":
//       return Array.from({ length: 4 }, (_, i) => {
//         const quarterNum = i + 1;
//         const startMonth = dayjs().quarter(quarterNum).startOf("quarter").format("MMM");
//         const endMonth = dayjs().quarter(quarterNum).endOf("quarter").format("MMM");
//         return `Quarter ${quarterNum} (${startMonth} - ${endMonth})`;
//       });
//     case "Quarterly":
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
//           weekEndDate.month() !== monthEnd.month() || weekEndDate.date() > monthEnd.date()
//             ? monthEnd.format("MMM D")
//             : weekEndDate.format("MMM D");
//         labels.push(`Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`);
//         currentWeekStart = currentWeekStart.add(7, "day");
//       }
//       return labels;
//     case "Weekly":
//       return Array.from({ length: 7 }, (_, i) => dayjs().day(i).format("dddd")).filter(
//         (dayName, index) => index !== 0 && index !== 6
//       );
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

//     if (!date.isValid()) {
//       console.warn("Skipping task due to invalid CreatedDateTime:", task.CreatedDateTime);
//       return;
//     }

//     if (period === "Weekly" && (date.day() === 0 || date.day() === 6)) {
//       return;
//     }

//     const key = getFormattedPeriodLabel(task.CreatedDateTime, period);
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

//   const expectedLabels = getExpectedLabelsForPeriod(period);
//   let finalLabels = expectedLabels;
//   if (tasks.length > 0) {
//     const labelsWithData = expectedLabels.filter((label) => result[label]);
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

// const UtilizationMetrics = () => {
//   const [searchParams] = useSearchParams();
//   const [fullscreen, setFullscreen] = useState(false);
//   const [period, setPeriod] = useState("Monthly");
//   const { filteredData } = useGlobalFilters();
//   const { currentName, isExecutive } = useRoleBasedAccess();
//   const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

//   useEffect(() => {
//     const emailParam = searchParams.get("email");
//     if (emailParam && isExecutive) {
//       setViewingEmployeeEmail(emailParam);
//     } else {
//       setViewingEmployeeEmail(null);
//     }
//   }, [searchParams, isExecutive]);

//   const relevantTasks = useMemo(() => {
//     const filterByName = viewingEmployeeEmail
//       ? (task) => task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase()
//       : (task) => task.createdBy?.toLowerCase() === currentName?.toLowerCase();

//     return (filteredData.tasks || []).filter(filterByName);
//   }, [filteredData, currentName, viewingEmployeeEmail]);

//   const { labels, billableData, nonBillableData, totalBillable, totalNonBillable } = useMemo(
//     () => aggregateTaskData(relevantTasks, period),
//     [relevantTasks, period]
//   );

//   const totalOverallHours = totalBillable + totalNonBillable;
//   const calculatePercentage = (value) =>
//     totalOverallHours ? Math.round((value / totalOverallHours) * 100) : 0;

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

//   const stats = [
//     { label: "Total Billable Hours", value: totalBillable },
//     { label: "Total Non-Billable Hours", value: totalNonBillable },
//     { label: "Billable %", value: `${calculatePercentage(totalBillable)}%` },
//     { label: "Non-Billable %", value: `${calculatePercentage(totalNonBillable)}%` },
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
//       <Box
//         sx={{
//           background: "linear-gradient(to right, rgb(78, 105, 138), #1e88e5)",
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
//             {viewingEmployeeEmail ? `${viewingEmployeeEmail}'s Utilization` : "Utilization Metrics"}
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
//               {viewingEmployeeEmail
//                 ? `No utilization data available for ${viewingEmployeeEmail}`
//                 : "No utilization data available for the selected period."}
//             </Typography>
//           )}
//         </Box>

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

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Stack,
  IconButton,
  useMediaQuery,
} from "@mui/material";
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
const getFormattedPeriodLabel = (dateString, period) => {
  const date = dayjs(dateString);
  if (!date.isValid()) {
    console.warn("Invalid date provided to getFormattedPeriodLabel:", dateString);
    return "Invalid Date";
  }

  const currentYear = dayjs().year();

  switch (period) {
    case "Yearly":
      const year = date.year();
      const quarterNum = date.quarter();
      const startMonth = dayjs().year(year).quarter(quarterNum).startOf("quarter").format("MMM");
      const endMonth = dayjs().year(year).quarter(quarterNum).endOf("quarter").format("MMM");
      return `Quarter ${quarterNum} (${startMonth} - ${endMonth})`;
    case "Quarterly":
      return date.format("MMMM");
    case "Monthly":
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
      return date.format("dddd");
    default:
      return "";
  }
};

const getExpectedLabelsForPeriod = (period) => {
  const currentMoment = dayjs();
  switch (period) {
    case "Yearly":
      return Array.from({ length: 4 }, (_, i) => {
        const quarterNum = i + 1;
        const startMonth = dayjs().quarter(quarterNum).startOf("quarter").format("MMM");
        const endMonth = dayjs().quarter(quarterNum).endOf("quarter").format("MMM");
        return `Quarter ${quarterNum} (${startMonth} - ${endMonth})`;
      });
    case "Quarterly":
      return Array.from({ length: 12 }, (_, i) => currentMoment.month(i).format("MMMM"));
    case "Monthly":
      const monthStart = currentMoment.startOf("month");
      const monthEnd = currentMoment.endOf("month");
      const labels = [];
      let currentWeekStart = monthStart;

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
      // Only show current day for weekly view
      return [currentMoment.format("dddd")];
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

    if (!date.isValid()) {
      console.warn("Skipping task due to invalid CreatedDateTime:", task.CreatedDateTime);
      return;
    }

    // For weekly period, only process tasks from the current day
    if (period === "Weekly") {
      if (!date.isSame(dayjs(), "day")) {
        return;
      }
    }
    // For other periods, skip weekends
    else if (period === "Weekly" || date.day() === 0 || date.day() === 6) {
      return;
    }

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

  const expectedLabels = getExpectedLabelsForPeriod(period);

  // For weekly view, always show current day even with no data
  if (period === "Weekly") {
    const currentDay = dayjs().format("dddd");
    return {
      labels: [currentDay],
      billableData: [result[currentDay]?.billable || 0],
      nonBillableData: [result[currentDay]?.nonBillable || 0],
      totalBillable,
      totalNonBillable,
    };
  }

  // For other periods, use existing logic
  let finalLabels = expectedLabels;
  if (tasks.length > 0) {
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

const UtilizationMetrics = () => {
  const [searchParams] = useSearchParams();
  const [fullscreen, setFullscreen] = useState(false);
  const [period, setPeriod] = useState("Monthly");
  const { filteredData } = useGlobalFilters();
  const { currentName, isExecutive } = useRoleBasedAccess();
  const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam && isExecutive) {
      setViewingEmployeeEmail(emailParam);
    } else {
      setViewingEmployeeEmail(null);
    }
  }, [searchParams, isExecutive]);

  const relevantTasks = useMemo(() => {
    const filterByName = viewingEmployeeEmail
      ? (task) => task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase()
      : (task) => task.createdBy?.toLowerCase() === currentName?.toLowerCase();

    return (filteredData.tasks || []).filter(filterByName);
  }, [filteredData, currentName, viewingEmployeeEmail]);

  const { labels, billableData, nonBillableData, totalBillable, totalNonBillable } = useMemo(
    () => aggregateTaskData(relevantTasks, period),
    [relevantTasks, period]
  );

  const totalOverallHours = totalBillable + totalNonBillable;
  const calculatePercentage = (value) =>
    totalOverallHours ? Math.round((value / totalOverallHours) * 100) : 0;

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

  const stats = [
    { label: "Total Billable Hours", value: totalBillable },
    { label: "Total Non-Billable Hours", value: totalNonBillable },
    { label: "Billable %", value: `${calculatePercentage(totalBillable)}%` },
    { label: "Non-Billable %", value: `${calculatePercentage(totalNonBillable)}%` },
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
      <Box
        sx={{
          background: "linear-gradient(to right, rgb(78, 105, 138), #1e88e5)",
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
            {viewingEmployeeEmail ? `${viewingEmployeeEmail}'s Utilization` : "Utilization Metrics"}
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
              {viewingEmployeeEmail
                ? `No utilization data available for ${viewingEmployeeEmail}`
                : "No utilization data available for the selected period."}
            </Typography>
          )}
        </Box>

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
