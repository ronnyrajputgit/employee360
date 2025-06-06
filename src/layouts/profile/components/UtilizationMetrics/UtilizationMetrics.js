// import React, { useState, useEffect } from "react";
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

// const chartOptions = {
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

// // Helper function to aggregate data
// const aggregateTaskData = (tasks, period) => {
//   const aggregated = {};
//   let overallBillable = 0;
//   let overallNonBillable = 0;

//   tasks.forEach((task) => {
//     const date = new Date(task.CreatedDateTime);
//     const duration = typeof task.Duration === "number" ? task.Duration : 0;
//     const isBillable = task.ProjectType === "Customer";

//     if (isBillable) {
//       overallBillable += duration;
//     } else {
//       overallNonBillable += duration;
//     }

//     let key;
//     switch (period) {
//       case "Yearly":
//         key = `Quarter ${Math.floor(date.getMonth() / 3) + 1}`;
//         break;
//       case "Quarterly":
//         key = date.toLocaleString("default", { month: "long" });
//         break;
//       case "Monthly":
//         const dayOfMonth = date.getDate();
//         key = `Week ${Math.ceil(dayOfMonth / 7)}`;
//         break;
//       case "Weekly":
//         let dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday ... 6 for Saturday
//         dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek; // Map Sunday to Day 7, Monday to Day 1
//         key = `Day ${dayOfWeek}`;
//         break;
//       default:
//         return {
//           labels: [],
//           billableData: [],
//           nonBillableData: [],
//           overallBillable: 0,
//           overallNonBillable: 0,
//         };
//     }

//     if (!aggregated[key]) {
//       aggregated[key] = { billable: 0, nonBillable: 0 };
//     }

//     if (isBillable) {
//       aggregated[key].billable += duration;
//     } else {
//       aggregated[key].nonBillable += duration;
//     }
//   });

//   let sortedLabels;
//   if (period === "Yearly") {
//     sortedLabels = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
//   } else if (period === "Quarterly") {
//     sortedLabels = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//   } else if (period === "Monthly") {
//     sortedLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].filter((weekLabel) =>
//       tasks.some((task) => {
//         const date = new Date(task.CreatedDateTime);
//         const dayOfMonth = date.getDate();
//         return `Week ${Math.ceil(dayOfMonth / 7)}` === weekLabel;
//       })
//     );
//     if (sortedLabels.length === 0 && tasks.length > 0) {
//       // ensure at least one week if data exists
//       sortedLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
//     }
//   } else if (period === "Weekly") {
//     sortedLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
//   } else {
//     sortedLabels = Object.keys(aggregated).sort(); // Fallback
//   }

//   const labels = sortedLabels;
//   const billableData = labels.map((label) => aggregated[label]?.billable || 0);
//   const nonBillableData = labels.map((label) => aggregated[label]?.nonBillable || 0);

//   return { labels, billableData, nonBillableData, overallBillable, overallNonBillable };
// };

// const UtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filteredData } = useGlobalFilters(); // Comes from context
//   const taskData = filteredData.tasks || [];

//   const [selectedPeriod, setSelectedPeriod] = useState("Monthly"); // Default period
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: [],
//         backgroundColor: "#2196f3",
//         stack: "stack1",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: [],
//         backgroundColor: "#9e9e9e",
//         stack: "stack1",
//       },
//     ],
//   });
//   const [statsData, setStatsData] = useState([
//     { label: "Billable Hours", value: "0%" },
//     { label: "Non-Billable Hours", value: "0%" },
//     { label: "Target", value: "75%" }, // Kept from mock, can be made dynamic
//     { label: "Department Average", value: "72%" }, // Kept from mock
//   ]);

//   useEffect(() => {
//     const tasks = Array.isArray(taskData) ? taskData : [];

//     if (tasks.length === 0) {
//       // Reset to empty/default state if no tasks
//       const defaultLabels = ((period) => {
//         switch (period) {
//           case "Yearly":
//             return ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
//           case "Quarterly":
//             return [
//               "January",
//               "February",
//               "March",
//               "April",
//               "May",
//               "June",
//               "July",
//               "August",
//               "September",
//               "October",
//               "November",
//               "December",
//             ];
//           case "Monthly":
//             return ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
//           case "Weekly":
//             return ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
//           default:
//             return [];
//         }
//       })(selectedPeriod);
//       setChartData({
//         labels: defaultLabels,
//         datasets: [
//           {
//             label: "Billable Hours",
//             data: defaultLabels.map(() => 0),
//             backgroundColor: "#2196f3",
//             stack: "stack1",
//           },
//           {
//             label: "Non-Billable Hours",
//             data: defaultLabels.map(() => 0),
//             backgroundColor: "#9e9e9e",
//             stack: "stack1",
//           },
//         ],
//       });
//       setStatsData([
//         { label: "Billable Hours", value: "0%" },
//         { label: "Non-Billable Hours", value: "0%" },
//         { label: "Target", value: "75%" },
//         { label: "Department Average", value: "72%" },
//       ]);
//       return;
//     }

//     const { labels, billableData, nonBillableData, overallBillable, overallNonBillable } =
//       aggregateTaskData(tasks, selectedPeriod);

//     setChartData({
//       labels: labels,
//       datasets: [
//         {
//           label: "Billable Hours",
//           data: billableData,
//           backgroundColor: "#2196f3",
//           stack: "stack1",
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
//     const totalBillableHours = overallBillable;
//     const totalNonBillableHours = overallNonBillable;

//     setStatsData([
//       { label: "Billable Hours", value: `${billablePercentage}% ` },
//       { label: "Non-Billable Hours", value: `${nonBillablePercentage}%` },
//       { label: "Target", value: "75%" }, // This can be dynamic if needed
//       { label: "Department Average", value: "72%" }, // This can be dynamic if needed
//       { label: "Total Billable Hours", value: `${totalBillableHours}` }, // This can be dynamic if needed
//       { label: "Total NonBillable Hours", value: `${totalNonBillableHours}` }, // This can be dynamic if needed
//     ]);
//   }, [taskData, selectedPeriod]);

//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         overflow: "hidden",
//         boxShadow: 3,
//         position: fullscreen ? "fixed" : "relative",
//         top: fullscreen ? 0 : "auto",
//         left: fullscreen ? 0 : "auto",
//         width: fullscreen ? "100vw" : "100%", // Changed to 100% for better responsiveness
//         height: fullscreen ? "100vh" : "auto",
//         zIndex: fullscreen ? 1300 : "auto",
//         bgcolor: "#fff",
//         display: "flex", // Added for flex column layout
//         flexDirection: "column", // Added for flex column layout
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
//           px: { xs: 1, sm: 2, md: 3 }, // Responsive padding
//           py: 1.5, // Adjusted padding
//         }}
//       >
//         <Stack direction="row" alignItems="center" spacing={1}>
//           <PieChartIcon />
//           <Typography variant="h6" fontWeight="bold" fontSize={{ xs: "1rem", sm: "1.25rem" }}>
//             {" "}
//             {/* Responsive font size */}
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
//         {" "}
//         {/* Reduced spacing and margin */}
//         {[
//           { label: "Yearly", period: "Yearly" },
//           { label: "Quarterly", period: "Quarterly" },
//           { label: "Monthly", period: "Monthly" },
//           { label: "Weekly", period: "Weekly" },
//         ].map((item) => (
//           <Grid item xs={6} sm={3} key={item.period}>
//             {" "}
//             {/* Adjusted xs for better small screen layout */}
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
//           flexGrow: 1, // Allow content to grow
//           height: fullscreen ? "calc(100vh - 180px)" : "auto", // Adjust 180px if header/button height changes
//           overflowY: fullscreen ? "auto" : "visible", // Changed to overflowY
//           p: { xs: 1, sm: 2 }, // Responsive padding
//         }}
//       >
//         <Box sx={{ height: { xs: 250, sm: 300, md: 350 }, minHeight: 250 }}>
//           {" "}
//           {/* Responsive height */}
//           {chartData.labels && chartData.labels.length > 0 ? (
//             <Bar data={chartData} options={chartOptions} />
//           ) : (
//             <Typography variant="subtitle1" textAlign="center" mt={5}>
//               No data available for the selected period.
//             </Typography>
//           )}
//         </Box>

//         {/* Stats */}
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
//                   height: "100%", // Ensure all stat boxes are same height
//                 }}
//               >
//                 <Typography variant="subtitle2" color="textSecondary">
//                   {" "}
//                   {/* Adjusted variant for smaller text */}
//                   {item.label}:
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   color="#1e88e5"
//                   fontWeight="bold"
//                   fontSize={{ xs: "1.1rem", sm: "1.25rem" }}
//                 >
//                   {" "}
//                   {/* Responsive font size */}
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

// export default UtilizationMetrics;

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

// // Helper function to aggregate data
// const aggregateTaskData = (tasks, period) => {
//   const aggregated = {}; // Stores { billable: number, nonBillable: number, billableUsers: Set<string> }
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

//     let key;
//     switch (period) {
//       case "Yearly":
//         key = `Quarter ${Math.floor(date.getMonth() / 3) + 1}`;
//         break;
//       case "Quarterly":
//         key = date.toLocaleString("default", { month: "long" });
//         break;
//       case "Monthly":
//         const dayOfMonth = date.getDate();
//         key = `Week ${Math.ceil(dayOfMonth / 7)}`;
//         break;
//       case "Weekly":
//         let dayOfWeek = date.getDay();
//         dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
//         key = `Day ${dayOfWeek}`;
//         break;
//       default: // Should not happen with controlled selection
//         key = "Unknown";
//         break;
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

//   let sortedLabels;
//   if (period === "Yearly") {
//     sortedLabels = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
//   } else if (period === "Quarterly") {
//     sortedLabels = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//   } else if (period === "Monthly") {
//     // Dynamic weeks based on data, up to 5 weeks
//     const presentWeeks = new Set();
//     tasks.forEach((task) => {
//       const date = new Date(task.CreatedDateTime);
//       const dayOfMonth = date.getDate();
//       presentWeeks.add(`Week ${Math.ceil(dayOfMonth / 7)}`);
//     });
//     sortedLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].filter((w) =>
//       presentWeeks.has(w)
//     );
//     if (sortedLabels.length === 0 && tasks.length > 0) {
//       // If tasks exist but somehow weeks don't match standard labels
//       const exampleDate = new Date(tasks[0].CreatedDateTime);
//       sortedLabels = [`Week ${Math.ceil(exampleDate.getDate() / 7)}`]; // fallback to first task's week
//     } else if (sortedLabels.length === 0) {
//       // No tasks, no relevant weeks. Default to show structure.
//       sortedLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
//     }
//   } else if (period === "Weekly") {
//     sortedLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
//   } else {
//     sortedLabels = Object.keys(aggregated).sort();
//   }

//   const labels = sortedLabels;
//   const billableData = labels.map((label) => aggregated[label]?.billable || 0);
//   const nonBillableData = labels.map((label) => aggregated[label]?.nonBillable || 0);
//   const billableUsersPerLabel = labels.map((label) =>
//     aggregated[label] ? Array.from(aggregated[label].billableUsers) : []
//   );

//   return {
//     labels,
//     billableData,
//     nonBillableData,
//     overallBillable,
//     overallNonBillable,
//     billableUsersPerLabel, // Added this
//   };
// };

// const UtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filteredData } = useGlobalFilters();
//   const taskData = filteredData.tasks || [];

//   // Dynamic Target and Department Average from filteredData or defaults
//   const targetUtilization = filteredData.targetUtilizationPercentage;
//   const departmentAverageUtilization = filteredData.departmentAveragePercentage;

//   const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: [],
//         backgroundColor: "#2196f3",
//         stack: "stack1",
//         users: [], // To store billable users for each data point
//       },
//       {
//         label: "Non-Billable Hours",
//         data: [],
//         backgroundColor: "#9e9e9e",
//         stack: "stack1",
//       },
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
//         legend: {
//           position: "bottom",
//         },
//         tooltip: {
//           callbacks: {
//             footer: (tooltipItems) => {
//               const tooltipItem = tooltipItems[0];
//               if (!tooltipItem || !tooltipItem.chart.data.datasets[tooltipItem.datasetIndex]) {
//                 return "";
//               }

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
//         x: {
//           stacked: true,
//         },
//         y: {
//           stacked: true,
//           title: {
//             display: true,
//             text: "Hours",
//           },
//           beginAtZero: true,
//         },
//       },
//     }),
//     []
//   );

//   useEffect(() => {
//     const tasks = Array.isArray(taskData) ? taskData : [];

//     if (tasks.length === 0) {
//       const defaultLabels = ((period) => {
//         switch (period) {
//           case "Yearly":
//             return ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
//           case "Quarterly":
//             return [
//               "January",
//               "February",
//               "March",
//               "April",
//               "May",
//               "June",
//               "July",
//               "August",
//               "September",
//               "October",
//               "November",
//               "December",
//             ];
//           case "Monthly":
//             return ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
//           case "Weekly":
//             return ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
//           default:
//             return [];
//         }
//       })(selectedPeriod);
//       setChartData({
//         labels: defaultLabels,
//         datasets: [
//           {
//             label: "Billable Hours",
//             data: defaultLabels.map(() => 0),
//             backgroundColor: "#2196f3",
//             stack: "stack1",
//             users: defaultLabels.map(() => []),
//           },
//           {
//             label: "Non-Billable Hours",
//             data: defaultLabels.map(() => 0),
//             backgroundColor: "#9e9e9e",
//             stack: "stack1",
//           },
//         ],
//       });
//       setStatsData(initialStats); // Reset to initial stats with potentially dynamic target/avg
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
//           users: billableUsersPerLabel, // Store users here
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
//           height: fullscreen ? "calc(100vh - 180px)" : "auto", // Adjust 180px if header/button height changes
//           overflowY: fullscreen ? "auto" : "visible",
//           p: { xs: 1, sm: 2 },
//         }}
//       >
//         <Box sx={{ height: { xs: 250, sm: 300, md: 350 }, minHeight: 250 }}>
//           {chartData.labels &&
//           chartData.labels.length > 0 &&
//           chartData.datasets[0].data.some((d) => d > 0) ? ( // Check if there's actual data to display
//             <Bar data={chartData} options={chartOptions} />
//           ) : (
//             <Typography variant="subtitle1" textAlign="center" mt={5}>
//               No data available for the selected period.
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

// export default UtilizationMetrics;

// with details view

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
// import { useRoleBasedAccess } from "context/RoleBasedAccess";

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

//     console.log(userName);
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

// const UtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filteredData } = useGlobalFilters();
//   const taskData = filteredData.tasks || [];
//   const { currentName } = useRoleBasedAccess();

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

// export default UtilizationMetrics;

// import React, { useState, useEffect } from "react";
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

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const chartOptions = {
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

// // Helper function to aggregate data
// const aggregateTaskData = (tasks, period) => {
//   const aggregated = {};
//   let overallBillable = 0;
//   let overallNonBillable = 0;

//   tasks.forEach((task) => {
//     const date = new Date(task.CreatedDateTime);
//     const duration = typeof task.Duration === "number" ? task.Duration : 0;
//     const isBillable = task.ProjectType === "Customer";

//     if (isBillable) {
//       overallBillable += duration;
//     } else {
//       overallNonBillable += duration;
//     }

//     let key;
//     switch (period) {
//       case "Yearly":
//         key = `Quarter ${Math.floor(date.getMonth() / 3) + 1}`;
//         break;
//       case "Quarterly":
//         key = date.toLocaleString("default", { month: "long" });
//         break;
//       case "Monthly":
//         const dayOfMonth = date.getDate();
//         key = `Week ${Math.ceil(dayOfMonth / 7)}`;
//         break;
//       case "Weekly":
//         let dayOfWeek = date.getDay();
//         dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
//         key = `Day ${dayOfWeek}`;
//         break;
//       default:
//         return {
//           labels: [],
//           billableData: [],
//           nonBillableData: [],
//           overallBillable: 0,
//           overallNonBillable: 0,
//         };
//     }

//     if (!aggregated[key]) {
//       aggregated[key] = { billable: 0, nonBillable: 0 };
//     }

//     if (isBillable) {
//       aggregated[key].billable += duration;
//     } else {
//       aggregated[key].nonBillable += duration;
//     }
//   });

//   let sortedLabels;
//   if (period === "Yearly") {
//     sortedLabels = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
//   } else if (period === "Quarterly") {
//     sortedLabels = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//   } else if (period === "Monthly") {
//     sortedLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].filter((weekLabel) =>
//       tasks.some((task) => {
//         const date = new Date(task.CreatedDateTime);
//         const dayOfMonth = date.getDate();
//         return `Week ${Math.ceil(dayOfMonth / 7)}` === weekLabel;
//       })
//     );
//     if (sortedLabels.length === 0 && tasks.length > 0) {
//       sortedLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
//     }
//   } else if (period === "Weekly") {
//     sortedLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
//   } else {
//     sortedLabels = Object.keys(aggregated).sort();
//   }

//   const labels = sortedLabels;
//   const billableData = labels.map((label) => aggregated[label]?.billable || 0);
//   const nonBillableData = labels.map((label) => aggregated[label]?.nonBillable || 0);

//   return { labels, billableData, nonBillableData, overallBillable, overallNonBillable };
// };

// const UtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filteredData } = useGlobalFilters();
//   const taskData = filteredData.tasks || [];
//   const { currentName } = useRoleBasedAccess();
//   const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: [],
//         backgroundColor: "#2196f3",
//         stack: "stack1",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: [],
//         backgroundColor: "#9e9e9e",
//         stack: "stack1",
//       },
//     ],
//   });
//   const [statsData, setStatsData] = useState([
//     { label: "Billable Hours", value: "0%" },
//     { label: "Non-Billable Hours", value: "0%" },
//     { label: "Target", value: "75%" },
//     { label: "Department Average", value: "72%" },
//   ]);

//   useEffect(() => {
//     // Filter tasks where createdBy matches currentName
//     const filteredTasks = Array.isArray(taskData)
//       ? taskData.filter(
//           (task) =>
//             task.createdBy &&
//             currentName &&
//             task.createdBy.toLowerCase().includes(currentName.toLowerCase())
//         )
//       : [];

//     if (filteredTasks.length === 0) {
//       const defaultLabels = ((period) => {
//         switch (period) {
//           case "Yearly":
//             return ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
//           case "Quarterly":
//             return [
//               "January",
//               "February",
//               "March",
//               "April",
//               "May",
//               "June",
//               "July",
//               "August",
//               "September",
//               "October",
//               "November",
//               "December",
//             ];
//           case "Monthly":
//             return ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
//           case "Weekly":
//             return ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
//           default:
//             return [];
//         }
//       })(selectedPeriod);
//       setChartData({
//         labels: defaultLabels,
//         datasets: [
//           {
//             label: "Billable Hours",
//             data: defaultLabels.map(() => 0),
//             backgroundColor: "#2196f3",
//             stack: "stack1",
//           },
//           {
//             label: "Non-Billable Hours",
//             data: defaultLabels.map(() => 0),
//             backgroundColor: "#9e9e9e",
//             stack: "stack1",
//           },
//         ],
//       });
//       setStatsData([
//         { label: "Billable Hours", value: "0%" },
//         { label: "Non-Billable Hours", value: "0%" },
//         { label: "Target", value: "75%" },
//         { label: "Department Average", value: "72%" },
//       ]);
//       return;
//     }

//     const { labels, billableData, nonBillableData, overallBillable, overallNonBillable } =
//       aggregateTaskData(filteredTasks, selectedPeriod);

//     setChartData({
//       labels: labels,
//       datasets: [
//         {
//           label: "Billable Hours",
//           data: billableData,
//           backgroundColor: "#2196f3",
//           stack: "stack1",
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
//     const totalBillableHours = overallBillable;
//     const totalNonBillableHours = overallNonBillable;

//     setStatsData([
//       { label: "Billable Hours", value: `${billablePercentage}% ` },
//       { label: "Non-Billable Hours", value: `${nonBillablePercentage}%` },
//       { label: "Target", value: "75%" },
//       { label: "Department Average", value: "72%" },
//       { label: "Total Billable Hours", value: `${totalBillableHours}` },
//       { label: "Total NonBillable Hours", value: `${totalNonBillableHours}` },
//     ]);
//   }, [taskData, selectedPeriod, currentName]);

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
//         {[
//           { label: "Yearly", period: "Yearly" },
//           { label: "Quarterly", period: "Quarterly" },
//           { label: "Monthly", period: "Monthly" },
//           { label: "Weekly", period: "Weekly" },
//         ].map((item) => (
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
//               No data available for the selected period.
//             </Typography>
//           )}
//         </Box>

//         {/* Stats */}
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

// const PERIOD_OPTIONS = [
//   { label: "Yearly", period: "Yearly" },
//   { label: "Quarterly", period: "Quarterly" },
//   { label: "Monthly", period: "Monthly" },
//   { label: "Weekly", period: "Weekly" },
// ];

// const CHART_COLORS = {
//   billable: "#2196f3", // Blue
//   nonBillable: "#9e9e9e", // Grey
// };

// // --- Helper function to aggregate data ---
// const aggregateTaskData = (tasks, period) => {
//   const aggregated = {};
//   let overallBillable = 0;
//   let overallNonBillable = 0;

//   tasks.forEach((task) => {
//     const date = new Date(task.CreatedDateTime);
//     const duration = typeof task.Duration === "number" ? task.Duration : 0;
//     const isBillable = task.ProjectType === "Customer";

//     if (isBillable) {
//       overallBillable += duration;
//     } else {
//       overallNonBillable += duration;
//     }

//     let key;
//     switch (period) {
//       case "Yearly":
//         key = `Quarter ${Math.floor(date.getMonth() / 3) + 1}`;
//         break;
//       case "Quarterly":
//         key = date.toLocaleString("default", { month: "long" });
//         break;
//       case "Monthly":
//         const dayOfMonth = date.getDate();
//         key = `Week ${Math.ceil(dayOfMonth / 7)}`;
//         break;
//       case "Weekly":
//         let dayOfWeek = date.getDay();
//         dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek; // Adjust Sunday from 0 to 7
//         key = `Day ${dayOfWeek}`;
//         break;
//       default:
//         // This case should ideally not be hit with controlled period selection
//         console.warn("Invalid period selected for aggregation:", period);
//         return;
//     }

//     if (!aggregated[key]) {
//       aggregated[key] = { billable: 0, nonBillable: 0 };
//     }

//     if (isBillable) {
//       aggregated[key].billable += duration;
//     } else {
//       aggregated[key].nonBillable += duration;
//     }
//   });

//   const getSortedLabels = (currentPeriod, allTasks) => {
//     switch (currentPeriod) {
//       case "Yearly":
//         return ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
//       case "Quarterly":
//         return [
//           "January",
//           "February",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//           "August",
//           "September",
//           "October",
//           "November",
//           "December",
//         ];
//       case "Monthly":
//         const existingWeeks = new Set();
//         allTasks.forEach((task) => {
//           const date = new Date(task.CreatedDateTime);
//           existingWeeks.add(`Week ${Math.ceil(date.getDate() / 7)}`);
//         });
//         const allPossibleWeeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
//         // If there's data, show only weeks with data, otherwise show all possible weeks
//         return allTasks.length > 0 && existingWeeks.size > 0
//           ? allPossibleWeeks.filter((week) => existingWeeks.has(week))
//           : allPossibleWeeks;
//       case "Weekly":
//         return ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
//       default:
//         return Object.keys(aggregated).sort();
//     }
//   };

//   const labels = getSortedLabels(period, tasks);
//   const billableData = labels.map((label) => aggregated[label]?.billable || 0);
//   const nonBillableData = labels.map((label) => aggregated[label]?.nonBillable || 0);

//   return { labels, billableData, nonBillableData, overallBillable, overallNonBillable };
// };

// // --- Main Component ---
// const UtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filteredData } = useGlobalFilters();
//   const taskData = filteredData.tasks || [];
//   const { currentName } = useRoleBasedAccess();
//   const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

//   // Filter tasks once, then use useMemo for aggregation
//   const relevantTasks = useMemo(() => {
//     return Array.isArray(taskData)
//       ? taskData.filter(
//           (task) =>
//             task.createdBy &&
//             currentName &&
//             task.createdBy.toLowerCase().includes(currentName.toLowerCase())
//         )
//       : [];
//   }, [taskData, currentName]);

//   // Aggregate data based on relevant tasks and selected period
//   const { labels, billableData, nonBillableData, overallBillable, overallNonBillable } =
//     useMemo(() => {
//       return aggregateTaskData(relevantTasks, selectedPeriod);
//     }, [relevantTasks, selectedPeriod]);

//   // Chart data derived from aggregated data
//   const chartData = useMemo(() => {
//     // If no aggregated data, show default labels for the period with zero values
//     const getChartDisplayLabels = (currentPeriod) => {
//       switch (currentPeriod) {
//         case "Yearly":
//           return ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
//         case "Quarterly":
//           return [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ];
//         case "Monthly":
//           return ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
//         case "Weekly":
//           return ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
//         default:
//           return [];
//       }
//     };

//     const displayLabels = labels.length > 0 ? labels : getChartDisplayLabels(selectedPeriod);
//     const displayBillableData = labels.length > 0 ? billableData : displayLabels.map(() => 0);
//     const displayNonBillableData = labels.length > 0 ? nonBillableData : displayLabels.map(() => 0);

//     return {
//       labels: displayLabels,
//       datasets: [
//         {
//           label: "Billable Hours",
//           data: displayBillableData,
//           backgroundColor: CHART_COLORS.billable,
//           stack: "stack1",
//         },
//         {
//           label: "Non-Billable Hours",
//           data: displayNonBillableData,
//           backgroundColor: CHART_COLORS.nonBillable,
//           stack: "stack1",
//         },
//       ],
//     };
//   }, [labels, billableData, nonBillableData, selectedPeriod]);

//   // Stats data derived from aggregated data
//   const statsData = useMemo(() => {
//     const totalHours = overallBillable + overallNonBillable;
//     const billablePercentage =
//       totalHours > 0 ? Math.round((overallBillable / totalHours) * 100) : 0;
//     const nonBillablePercentage =
//       totalHours > 0 ? Math.round((overallNonBillable / totalHours) * 100) : 0;

//     return [
//       { label: "Billable Hours", value: `${billablePercentage}%` },
//       { label: "Non-Billable Hours", value: `${nonBillablePercentage}%` },
//       { label: "Target", value: "75%" }, // These can be made dynamic if targets are stored elsewhere
//       { label: "Department Average", value: "72%" }, // These can be made dynamic if averages are stored elsewhere
//       { label: "Total Billable Hours", value: `${overallBillable}` },
//       { label: "Total Non-Billable Hours", value: `${overallNonBillable}` },
//     ];
//   }, [overallBillable, overallNonBillable]);

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
//         {PERIOD_OPTIONS.map((item) => (
//           <Grid item xs={6} sm={3} key={item.period}>
//             <MDButton
//               variant={selectedPeriod === item.period ? "contained" : "gradient"}
//               color={selectedPeriod === item.period ? "primary" : "info"}
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
//             <Bar data={chartData} options={CHART_OPTIONS} />
//           ) : (
//             <Typography variant="subtitle1" textAlign="center" mt={5}>
//               No data available for the selected period.
//             </Typography>
//           )}
//         </Box>

//         {/* Stats */}
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

// export default UtilizationMetrics;

// Refactored version of UtilizationMetrics component

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

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const PERIOD_OPTIONS = ["Yearly", "Quarterly", "Monthly", "Weekly"];
// const CHART_COLORS = { billable: "#2196f3", nonBillable: "#9e9e9e" };

// const getKey = (date, period) => {
//   switch (period) {
//     case "Yearly":
//       return `Q${Math.floor(dayjs(date).month() / 3) + 1}`;
//     case "Quarterly":
//       return dayjs(date).format("MMMM");
//     case "Monthly":
//       return `W${Math.ceil(dayjs(date).date() / 7)}`;
//     case "Weekly":
//       return `D${dayjs(date).day() || 7}`;
//     default:
//       return "";
//   }
// };

// const getLabels = (period, tasks) => {
//   const weeks = [
//     ...new Set(tasks.map((t) => `W${Math.ceil(dayjs(t.CreatedDateTime).date() / 7)}`)),
//   ];
//   return (
//     {
//       Yearly: ["Q1", "Q2", "Q3", "Q4"],
//       Quarterly: Array.from({ length: 12 }, (_, i) => dayjs().month(i).format("MMMM")),
//       Monthly: weeks.length ? weeks : ["W1", "W2", "W3", "W4", "W5"],
//       Weekly: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"],
//     }[period] || []
//   );
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

//   const labels = getLabels(period, tasks);
//   return {
//     labels,
//     billableData: labels.map((l) => result[l]?.billable || 0),
//     nonBillableData: labels.map((l) => result[l]?.nonBillable || 0),
//     totalBillable,
//     totalNonBillable,
//   };
// };

// const UtilizationMetrics = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const [period, setPeriod] = useState("Monthly");
//   const { filteredData } = useGlobalFilters();
//   const { currentName } = useRoleBasedAccess();

//   const tasks = useMemo(
//     () =>
//       (filteredData.tasks || []).filter((task) =>
//         task.createdBy?.toLowerCase().includes(currentName?.toLowerCase())
//       ),
//     [filteredData, currentName]
//   );

//   const { labels, billableData, nonBillableData, totalBillable, totalNonBillable } = useMemo(
//     () => aggregateTaskData(tasks, period),
//     [tasks, period]
//   );

//   const total = totalBillable + totalNonBillable;
//   const percentage = (v) => (total ? Math.round((v / total) * 100) : 0);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Billable",
//         data: billableData,
//         backgroundColor: CHART_COLORS.billable,
//         stack: "stack1",
//       },
//       {
//         label: "Non-Billable",
//         data: nonBillableData,
//         backgroundColor: CHART_COLORS.nonBillable,
//         stack: "stack1",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { position: "bottom" } },
//     scales: {
//       x: { stacked: true },
//       y: { stacked: true, beginAtZero: true, title: { display: true, text: "Hours" } },
//     },
//   };

//   const stats = [
//     { label: "Total Billable", value: totalBillable },
//     { label: "Total Non-Billable", value: totalNonBillable },
//     { label: "Billable %", value: `${percentage(totalBillable)}%` },
//     { label: "Non-Billable %", value: `${percentage(totalNonBillable)}%` },
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
//           background: "linear-gradient(to right, #1d4e89, #1e88e5)",
//           color: "#fff",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           px: 2,
//           py: 1.5,
//         }}
//       >
//         <Stack direction="row" spacing={1} alignItems="center">
//           <PieChartIcon />
//           <Typography variant="h6">Utilization Metrics</Typography>
//         </Stack>
//         <IconButton color="inherit" onClick={() => setFullscreen(!fullscreen)}>
//           {fullscreen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Box>

//       <Grid container spacing={1} p={2}>
//         {PERIOD_OPTIONS.map((opt) => (
//           <Grid item xs={6} sm={3} key={opt}>
//             <MDButton
//               fullWidth
//               color={period === opt ? "primary" : "info"}
//               variant={period === opt ? "contained" : "gradient"}
//               onClick={() => setPeriod(opt)}
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
//           p: 2,
//         }}
//       >
//         <Box sx={{ height: { xs: 250, sm: 300, md: 350 } }}>
//           {labels.length ? (
//             <Bar data={chartData} options={chartOptions} />
//           ) : (
//             <Typography align="center">No data available.</Typography>
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
//                 }}
//               >
//                 <Typography variant="subtitle2" color="textSecondary">
//                   {label}
//                 </Typography>
//                 <Typography variant="h5" color="#1e88e5" fontWeight="bold">
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
//       return `${date.year()} Q${date.quarter()}`; // e.g., "2025 Q2"
//     case "Quarterly":
//       // Get the month name (e.g., "June")
//       return date.format("MMMM");
//     case "Monthly":
//       // Get Week X (Month Day1-Day7) e.g., "Week 1 (Jun 1-7)"
//       const startOfMonth = date.startOf("month");
//       const dayOfMonth = date.date();
//       const weekNumber = Math.ceil(dayOfMonth / 7); // Calculate week number within the month
//       const weekStartDate = startOfMonth.add((weekNumber - 1) * 7, "day");
//       const weekEndDate = weekStartDate.add(6, "day");
//       const formattedStartDate = weekStartDate.format("MMM D");
//       const formattedEndDate =
//         weekEndDate.date() > date.endOf("month").date()
//           ? date.endOf("month").format("MMM D")
//           : weekEndDate.format("MMM D");
//       return `Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`;
//     case "Weekly":
//       // Get day name (e.g., "Sunday", "Monday")
//       return date.format("ddd"); // 'ddd' for short day name (Sun, Mon)
//     default:
//       return "";
//   }
// };

// // Helper to get comprehensive labels for the chart
// const getLabels = (period, tasks) => {
//   const currentYear = dayjs().year();
//   switch (period) {
//     case "Yearly":
//       // Return all 4 quarters for the current year
//       return Array.from({ length: 4 }, (_, i) => `${currentYear} Q${i + 1}`);
//     case "Quarterly":
//       // Return all 12 months
//       return Array.from({ length: 12 }, (_, i) => dayjs().month(i).format("MMMM"));
//     case "Monthly":
//       const now = dayjs();
//       const monthStart = now.startOf("month");
//       const monthEnd = now.endOf("month");
//       const labels = [];
//       let currentWeekStart = monthStart;

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
//       // Return short day names from Monday to Sunday
//       return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

//   // Filter labels to only include those present in aggregated data for non-full periods
//   // or if no tasks exist, show default labels
//   const finalLabels = tasks.length > 0 ? chartLabels.filter((label) => result[label]) : chartLabels;

//   // If no specific labels are found for the filtered tasks, default to all period labels
//   if (tasks.length > 0 && finalLabels.length === 0) {
//     finalLabels.push(...chartLabels); // Add all general labels if no data exists for current filters
//   } else if (tasks.length === 0) {
//     // If no tasks at all, ensure all default labels are present for the period
//     finalLabels.push(...chartLabels);
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

// Helper to get descriptive key for aggregation
const getKey = (dateString, period) => {
  const date = dayjs(dateString);
  switch (period) {
    case "Yearly":
      // Example: "2025 Q2"
      return `${date.year()} Q${date.quarter()}`;
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
        weekEndDate.date() > date.endOf("month").date()
          ? date.endOf("month").format("MMM D")
          : weekEndDate.format("MMM D");
      return `Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`;
    case "Weekly":
      // Example: "Sun", "Mon", etc.
      return date.format("ddd");
    default:
      return "";
  }
};

// Helper to get comprehensive labels for the chart dynamically
const getLabels = (period, tasks) => {
  const currentMoment = dayjs();
  switch (period) {
    case "Yearly":
      // Labels for all 4 quarters of the current year
      return Array.from({ length: 4 }, (_, i) => `${currentMoment.year()} Q${i + 1}`);
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
          weekEndDate.date() > monthEnd.date()
            ? monthEnd.format("MMM D")
            : weekEndDate.format("MMM D");
        labels.push(`Week ${weekNumber} (${formattedStartDate}-${formattedEndDate})`);
        currentWeekStart = currentWeekStart.add(7, "day");
      }
      return labels;
    case "Weekly":
      // Dynamically generate labels for days of the week (Sun-Sat)
      return Array.from({ length: 7 }, (_, i) => dayjs().day(i).format("ddd"));
    default:
      return [];
  }
};

const aggregateTaskData = (tasks, period) => {
  const result = {};
  let totalBillable = 0;
  let totalNonBillable = 0;

  tasks.forEach((task) => {
    const key = getKey(task.CreatedDateTime, period);
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

  const chartLabels = getLabels(period, tasks);

  // Determine the final labels for the chart.
  // If there are tasks, we primarily use labels for which we have aggregated data.
  // If no tasks exist or no data for specific labels within the tasks, we show all default labels.
  const finalLabels =
    tasks.length > 0 && chartLabels.some((label) => result[label])
      ? chartLabels.filter((label) => result[label]) // Filter to only show labels with actual data if tasks exist
      : chartLabels; // If no tasks or no data, show all possible labels for the period

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
              color={period === opt ? "primary" : "info"}
              variant={period === opt ? "contained" : "gradient"}
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
