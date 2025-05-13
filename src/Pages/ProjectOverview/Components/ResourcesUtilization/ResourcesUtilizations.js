// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   LinearProgress,
//   ToggleButtonGroup,
//   ToggleButton,
// } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const mockData = [
//   { name: "Yogesh", billable: 120, nonBillable: 40 },
//   { name: "Ayush Balachandran", billable: 136, nonBillable: 24 },
//   { name: "Neha Gupta", billable: 128, nonBillable: 32 },
//   { name: "Balam Ashok", billable: 144, nonBillable: 16 },
//   { name: "Swati Kumari", billable: 96, nonBillable: 48 },
// ];

// const totalBillable = mockData.reduce((sum, person) => sum + person.billable, 0);
// const totalNonBillable = mockData.reduce((sum, person) => sum + person.nonBillable, 0);
// const billablePercentage = Math.round((totalBillable / (totalBillable + totalNonBillable)) * 100);

// const barChartData = {
//   labels: mockData.map((p) => p.name),
//   datasets: [
//     {
//       label: "Billable Hours",
//       data: mockData.map((p) => p.billable),
//       backgroundColor: "#2196f3",
//     },
//     {
//       label: "Non-Billable Hours",
//       data: mockData.map((p) => p.nonBillable),
//       backgroundColor: "#90a4ae",
//     },
//   ],
// };

// const ResourcesUtilization = () => {
//   return (
//     <Box p={2}>
//       <Typography variant="h5" gutterBottom>
//         Resource Utilization
//       </Typography>

//       <Box display="flex" justifyContent="flex-end" mb={2}>
//         <ToggleButtonGroup exclusive size="small" value={"Month"}>
//           <ToggleButton value="Month">Month</ToggleButton>
//           <ToggleButton value="Quarter">Quarter</ToggleButton>
//           <ToggleButton value="Project">Project</ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <Grid container spacing={2} mb={2}>
//         <Grid item xs={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4">{totalBillable}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4">{totalNonBillable}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Billable Percentage</Typography>
//               <Typography variant="h4">{billablePercentage}%</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card>
//         <CardContent>
//           <Bar
//             data={barChartData}
//             options={{ responsive: true, plugins: { legend: { position: "top" } } }}
//           />
//         </CardContent>
//       </Card>

//       <Box mt={4}>
//         <Typography variant="h6" gutterBottom>
//           Resource Utilization Breakdown
//         </Typography>
//         {mockData.map((person, index) => {
//           const total = person.billable + person.nonBillable;
//           const percent = Math.round((person.billable / total) * 100);
//           return (
//             <Box key={index} mb={2}>
//               <Typography gutterBottom>{person.name}</Typography>
//               <Box display="flex" alignItems="center">
//                 <Box flex={1}>
//                   <LinearProgress
//                     variant="determinate"
//                     value={percent}
//                     sx={{
//                       height: 10,
//                       borderRadius: 5,
//                       backgroundColor: "#cfd8dc",
//                       "& .MuiLinearProgress-bar": { backgroundColor: "#2196f3" },
//                     }}
//                   />
//                 </Box>
//                 <Box ml={2} minWidth={80}>
//                   <Typography variant="body2">
//                     {person.billable} hrs ({percent}%)
//                   </Typography>
//                 </Box>
//                 <Box ml={2} minWidth={80}>
//                   <Typography variant="body2">
//                     {person.nonBillable} hrs ({100 - percent}%)
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// };

// export default ResourcesUtilization;

// import React from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   LinearProgress,
//   useTheme,
//   Divider,
// } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const mockData = {
//   summary: {
//     totalBillable: 720,
//     totalNonBillable: 180,
//     billablePercentage: 80,
//   },
//   resources: [
//     { name: "Yogesh", billable: 120, nonBillable: 40 },
//     { name: "Ayush Balachandran", billable: 136, nonBillable: 24 },
//     { name: "Neha Gupta", billable: 128, nonBillable: 32 },
//     { name: "Balam Ashok", billable: 144, nonBillable: 16 },
//     { name: "Swati Kumari", billable: 96, nonBillable: 48 },
//   ],
// };

// const chartData = {
//   labels: mockData.resources.map((r) => r.name),
//   datasets: [
//     {
//       label: "Billable Hours",
//       data: mockData.resources.map((r) => r.billable),
//       backgroundColor: "#2196f3",
//     },
//     {
//       label: "Non-Billable Hours",
//       data: mockData.resources.map((r) => r.nonBillable),
//       backgroundColor: "#90a4ae",
//     },
//   ],
// };

// const chartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//   },
// };

// const ResourcesUtilization = () => {
//   const theme = useTheme();

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={12}>
//           <Card>
//             <MDBox p={2}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} lg={3}>
//                   <MDButton variant="gradient" color="success" fullWidth>
//                     Weekly
//                   </MDButton>
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                   <MDButton variant="gradient" color="info" fullWidth>
//                     Monthly
//                   </MDButton>
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                   <MDButton variant="gradient" color="warning" fullWidth>
//                     Quarterly
//                   </MDButton>
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                   <MDButton variant="gradient" color="error" fullWidth>
//                     Project
//                   </MDButton>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {mockData.summary.totalBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {mockData.summary.totalNonBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography variant="h6">Billable Percentage</Typography>
//               <Typography variant="h4" color="success.main">
//                 {mockData.summary.billablePercentage}%
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       <Box p={3}>
//         <Box mt={5}>
//           <Typography variant="h6" gutterBottom>
//             Resource Utilization – Monthly
//           </Typography>
//           <Card>
//             <CardContent>
//               <Bar options={chartOptions} data={chartData} height={120} />
//             </CardContent>
//           </Card>
//         </Box>

//         <Box mt={5}>
//           <Typography variant="h6" gutterBottom>
//             Resource Utilization Breakdown
//           </Typography>
//           <Card>
//             <CardContent>
//               {mockData.resources.map((person, idx) => {
//                 const total = person.billable + person.nonBillable;
//                 const percent = Math.round((person.billable / total) * 100);
//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1" gutterBottom>
//                       {person.name}
//                     </Typography>
//                     <Box
//                       sx={{
//                         border: `1px solid ${theme.palette.divider}`,
//                         borderRadius: 2,
//                         overflow: "hidden",
//                         height: 20,
//                         backgroundColor: theme.palette.grey[200],
//                       }}
//                     >
//                       <LinearProgress
//                         variant="determinate"
//                         value={percent}
//                         sx={{
//                           height: "100%",
//                           backgroundColor: theme.palette.grey[300],
//                           "& .MuiLinearProgress-bar": {
//                             backgroundColor: theme.palette.primary.main,
//                           },
//                         }}
//                       />
//                     </Box>
//                     <Box display="flex" justifyContent="space-between">
//                       <Typography variant="body2" color="textSecondary">
//                         ● {person.billable} hrs ({percent}%)
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         ● {person.nonBillable} hrs ({100 - percent}%)
//                       </Typography>
//                     </Box>
//                     {idx !== mockData.resources.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default ResourcesUtilization;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   LinearProgress,
//   Divider,
//   useTheme,
// } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const theme = useTheme();
//   const [resourceData, setResourceData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//   });

//   const transformData = (data) => {
//     const grouped = {};

//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     data.forEach((item) => {
//       const stakeholderName = item.createdBy.user.displayName;
//       const isInternal = item.fields.Internal?.toLowerCase() === "yes";
//       const duration = parseFloat(item.fields["Duration_x0028_inHrs_x0029_"]) || 0;

//       if (!grouped[stakeholderName]) {
//         grouped[stakeholderName] = {
//           name: stakeholderName,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (isInternal) {
//         grouped[stakeholderName].nonBillable += duration;
//         totalNonBillable += duration;
//       } else {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       }
//     });

//     const total = totalBillable + totalNonBillable;
//     const percentage = total ? Math.round((totalBillable / total) * 100) : 0;

//     setSummary({
//       totalBillable,
//       totalNonBillable,
//       billablePercentage: percentage,
//     });

//     return Object.values(grouped);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await taskBreakdownProfilleData();
//         const transformed = transformData(result);
//         setResourceData(transformed);
//       } catch (error) {
//         console.error("Error fetching SharePoint data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const chartData = {
//     labels: resourceData.map((r) => r.name),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: resourceData.map((r) => r.billable),
//         backgroundColor: "#2196f3",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: resourceData.map((r) => r.nonBillable),
//         backgroundColor: "#90a4ae",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//   };

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={12}>
//           <Card>
//             <MDBox p={2}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} lg={3}>
//                   <MDButton variant="gradient" color="success" fullWidth>
//                     Weekly
//                   </MDButton>
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                   <MDButton variant="gradient" color="info" fullWidth>
//                     Monthly
//                   </MDButton>
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                   <MDButton variant="gradient" color="warning" fullWidth>
//                     Quarterly
//                   </MDButton>
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                   <MDButton variant="gradient" color="error" fullWidth>
//                     Project
//                   </MDButton>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Billable Percentage</Typography>
//               <Typography variant="h4" color="success.main">
//                 {summary.billablePercentage}%
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box p={3}>
//         <Box mt={5}>
//           <Typography variant="h6" gutterBottom>
//             Resource Utilization – Monthly
//           </Typography>
//           <Card>
//             <CardContent>
//               <Bar options={chartOptions} data={chartData} height={120} />
//             </CardContent>
//           </Card>
//         </Box>

//         <Box mt={5}>
//           <Typography variant="h6" gutterBottom>
//             Resource Utilization Breakdown
//           </Typography>
//           <Card>
//             <CardContent>
//               {resourceData.map((person, idx) => {
//                 const total = person.billable + person.nonBillable;
//                 const percent = total ? Math.round((person.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1" gutterBottom>
//                       {person.name}
//                     </Typography>
//                     <Box
//                       sx={{
//                         border: `1px solid ${theme.palette.divider}`,
//                         borderRadius: 2,
//                         overflow: "hidden",
//                         height: 20,
//                         backgroundColor: theme.palette.grey[200],
//                       }}
//                     >
//                       <LinearProgress
//                         variant="determinate"
//                         value={percent}
//                         sx={{
//                           height: "100%",
//                           backgroundColor: theme.palette.grey[300],
//                           "& .MuiLinearProgress-bar": {
//                             backgroundColor: theme.palette.primary.main,
//                           },
//                         }}
//                       />
//                     </Box>
//                     <Box display="flex" justifyContent="space-between">
//                       <Typography variant="body2" color="textSecondary">
//                         ● {person.billable} hrs ({percent}%)
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         ● {person.nonBillable} hrs ({100 - percent}%)
//                       </Typography>
//                     </Box>
//                     {idx !== resourceData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default ResourcesUtilization;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   LinearProgress,
//   Divider,
//   useTheme,
// } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const theme = useTheme();
//   const [resourceData, setResourceData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//   });
//   const [filter, setFilter] = useState("Project");
//   const [allTasks, setAllTasks] = useState([]);

//   const FILTER_DAYS = {
//     Weekly: 7,
//     Monthly: 30,
//     Quarterly: 90,
//     Project: null, // no filtering
//   };

//   const filterTasksByDate = (tasks) => {
//     if (!FILTER_DAYS[filter]) return tasks;

//     const daysAgo = FILTER_DAYS[filter];
//     const threshold = new Date();
//     threshold.setDate(threshold.getDate() - daysAgo);

//     return tasks.filter((task) => {
//       const createdDate = new Date(task.created);
//       return createdDate >= threshold;
//     });
//   };

//   const transformData = (data) => {
//     const grouped = {};

//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     data.forEach((item) => {
//       const stakeholderName = item.createdBy.user.displayName;
//       const isInternal = !!item.fields.Internal;

//       console.log(isInternal, "interer");

//       const duration = parseFloat(item.fields["Duration_x0028_inHrs_x0029_"]) || 0;

//       if (!grouped[stakeholderName]) {
//         grouped[stakeholderName] = {
//           name: stakeholderName,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (isInternal) {
//         grouped[stakeholderName].nonBillable += duration;
//         totalNonBillable += duration;
//       } else {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       }
//     });

//     const total = totalBillable + totalNonBillable;
//     const percentage = total ? Math.round((totalBillable / total) * 100) : 0;

//     setSummary({
//       totalBillable,
//       totalNonBillable,
//       billablePercentage: percentage,
//     });

//     return Object.values(grouped);
//   };

//   const applyFilter = () => {
//     const filtered = filterTasksByDate(allTasks);
//     const transformed = transformData(filtered);
//     setResourceData(transformed);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await taskBreakdownProfilleData();
//         setAllTasks(result);
//         const filtered = filterTasksByDate(result);
//         const transformed = transformData(filtered);
//         setResourceData(transformed);
//       } catch (error) {
//         console.error("Error fetching SharePoint data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (allTasks.length) {
//       applyFilter();
//     }
//   }, [filter]);

//   const chartData = {
//     labels: resourceData.map((r) => r.name),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: resourceData.map((r) => r.billable),
//         backgroundColor: "#2196f3",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: resourceData.map((r) => r.nonBillable),
//         backgroundColor: "#90a4ae",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//   };

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={12}>
//           <Card>
//             <MDBox p={2}>
//               <Grid container spacing={2}>
//                 {["Weekly", "Monthly", "Quarterly", "Project"].map((label) => (
//                   <Grid item xs={12} sm={6} lg={3} key={label}>
//                     <MDButton
//                       variant={filter === label ? "contained" : "outlined"}
//                       color={filter === label ? "info" : "secondary"}
//                       fullWidth
//                       onClick={() => setFilter(label)}
//                     >
//                       {label}
//                     </MDButton>
//                   </Grid>
//                 ))}
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>

//         {/* Summary Cards */}
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Billable Percentage</Typography>
//               <Typography variant="h4" color="success.main">
//                 {summary.billablePercentage}%
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Chart */}
//       <Box p={3}>
//         <Box mt={5}>
//           <Typography variant="h6" gutterBottom>
//             Resource Utilization – {filter}
//           </Typography>
//           <Card>
//             <CardContent>
//               <Bar options={chartOptions} data={chartData} height={120} />
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Breakdown List */}
//         <Box mt={5}>
//           <Typography variant="h6" gutterBottom>
//             Resource Utilization Breakdown
//           </Typography>
//           <Card>
//             <CardContent>
//               {resourceData.map((person, idx) => {
//                 const total = person.billable + person.nonBillable;
//                 const percent = total ? Math.round((person.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1" gutterBottom>
//                       {person.name}
//                     </Typography>
//                     <Box
//                       sx={{
//                         border: `1px solid ${theme.palette.divider}`,
//                         borderRadius: 2,
//                         overflow: "hidden",
//                         height: 20,
//                         backgroundColor: theme.palette.grey[200],
//                       }}
//                     >
//                       <LinearProgress
//                         variant="determinate"
//                         value={percent}
//                         sx={{
//                           height: "100%",
//                           backgroundColor: theme.palette.grey[300],
//                           "& .MuiLinearProgress-bar": {
//                             backgroundColor: theme.palette.primary.main,
//                           },
//                         }}
//                       />
//                     </Box>
//                     <Box display="flex" justifyContent="space-between">
//                       <Typography variant="body2" color="textSecondary">
//                         ● {person.billable} hrs ({percent}%)
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         ● {person.nonBillable} hrs ({100 - percent}%)
//                       </Typography>
//                     </Box>
//                     {idx !== resourceData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default ResourcesUtilization;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   LinearProgress,
//   Divider,
//   useTheme,
// } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const theme = useTheme();
//   const [resourceData, setResourceData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });
//   const [filter, setFilter] = useState("Project");
//   const [allTasks, setAllTasks] = useState([]);

//   const FILTER_DAYS = {
//     Weekly: 7,
//     Monthly: 30,
//     Quarterly: 90,
//     Project: null,
//   };

//   const filterTasksByDate = (tasks) => {
//     if (!FILTER_DAYS[filter]) return tasks;
//     const daysAgo = FILTER_DAYS[filter];
//     const threshold = new Date();
//     threshold.setDate(threshold.getDate() - daysAgo);
//     return tasks.filter((task) => {
//       const createdDate = new Date(task.created);
//       return createdDate >= threshold;
//     });
//   };

//   const transformData = (data) => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     data.forEach((item) => {
//       const stakeholderName = item.createdBy?.user?.displayName || "Unknown";
//       const projectType = item.fields?.ProjectType || "";
//       const duration = parseFloat(item.fields?.["Duration_x0028_inHrs_x0029_"]) || 0;

//       if (!grouped[stakeholderName]) {
//         grouped[stakeholderName] = {
//           name: stakeholderName,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Internal Project") {
//         grouped[stakeholderName].nonBillable += duration;
//         totalNonBillable += duration;
//       } else if (projectType === "Customer") {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       }
//     });

//     const total = totalBillable + totalNonBillable;
//     const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
//     const nonBillablePercentage = total ? 100 - billablePercentage : 0;

//     setSummary({
//       totalBillable,
//       totalNonBillable,
//       billablePercentage,
//       nonBillablePercentage,
//     });

//     return Object.values(grouped);
//   };

//   const applyFilter = () => {
//     const filtered = filterTasksByDate(allTasks);
//     const transformed = transformData(filtered);
//     setResourceData(transformed);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await taskBreakdownProfilleData();
//         setAllTasks(result);
//         const filtered = filterTasksByDate(result);
//         const transformed = transformData(filtered);
//         setResourceData(transformed);
//       } catch (error) {
//         console.error("Error fetching SharePoint data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (allTasks.length) {
//       applyFilter();
//     }
//   }, [filter]);

//   const chartData = {
//     labels: resourceData.map((r) => r.name),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: resourceData.map((r) => r.billable),
//         backgroundColor: "#2196f3",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: resourceData.map((r) => r.nonBillable),
//         backgroundColor: "#90a4ae",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//     },
//   };

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={12}>
//           <Card>
//             <MDBox p={2}>
//               <Grid container spacing={2}>
//                 {["Weekly", "Monthly", "Quarterly", "Project"].map((label) => (
//                   <Grid item xs={12} sm={6} lg={3} key={label}>
//                     <MDButton
//                       variant={filter === label ? "contained" : "outlined"}
//                       color={filter === label ? "info" : "secondary"}
//                       fullWidth
//                       onClick={() => setFilter(label)}
//                     >
//                       {label}
//                     </MDButton>
//                   </Grid>
//                 ))}
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>

//         {/* Summary Cards */}
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Billable (%)</Typography>
//               <Typography variant="h4" color="success.main">
//                 {summary.billablePercentage}%
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Non-Billable (%)</Typography>
//               <Typography variant="h4" color="warning.main">
//                 {summary.nonBillablePercentage}%
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Chart */}
//       <Box p={3}>
//         <Box mt={5}>
//           <Typography variant="h6" gutterBottom>
//             Resource Utilization – {filter}
//           </Typography>
//           <Card>
//             <CardContent sx={{ height: 500 }}>
//               <Bar options={chartOptions} data={chartData} height={120} />
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Breakdown List */}
//         <Box mt={5}>
//           <Typography variant="h6" gutterBottom>
//             Resource Utilization Breakdown
//           </Typography>
//           <Card>
//             <CardContent>
//               {resourceData.map((person, idx) => {
//                 const total = person.billable + person.nonBillable;
//                 const percent = total ? Math.round((person.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1" gutterBottom>
//                       {person.name}
//                     </Typography>
//                     <Box
//                       sx={{
//                         border: `1px solid ${theme.palette.divider}`,
//                         borderRadius: 2,
//                         overflow: "hidden",
//                         height: 20,
//                         backgroundColor: theme.palette.grey[200],
//                       }}
//                     >
//                       <LinearProgress
//                         variant="determinate"
//                         value={percent}
//                         sx={{
//                           height: "100%",
//                           backgroundColor: theme.palette.grey[300],
//                           "& .MuiLinearProgress-bar": {
//                             backgroundColor: theme.palette.primary.main,
//                           },
//                         }}
//                       />
//                     </Box>
//                     <Box display="flex" justifyContent="space-between">
//                       <Typography variant="body2" color="textSecondary">
//                         ● {person.billable} hrs ({percent}%)
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         ● {person.nonBillable} hrs ({100 - percent}%)
//                       </Typography>
//                     </Box>
//                     {idx !== resourceData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default ResourcesUtilization;

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Divider,
  useTheme,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { taskBreakdownProfilleData } from "apis/sharepointApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResourcesUtilization = () => {
  const theme = useTheme();
  const [resourceData, setResourceData] = useState([]);
  const [summary, setSummary] = useState({
    totalBillable: 0,
    totalNonBillable: 0,
    billablePercentage: 0,
    nonBillablePercentage: 0,
  });
  const [filter, setFilter] = useState("Project");
  const [allTasks, setAllTasks] = useState([]);

  const FILTER_DAYS = {
    Weekly: 7,
    Monthly: 30,
    Quarterly: 90,
    Project: null,
  };

  // const filterTasksByDate = (tasks) => {
  //   if (!FILTER_DAYS[filter]) return tasks;
  //   const daysAgo = FILTER_DAYS[filter];
  //   const threshold = new Date();
  //   threshold.setDate(threshold.getDate() - daysAgo);

  //   return tasks.filter((task) => {
  //     const taskTimeString = task.fields?.TaskTime || "";
  //     if (!taskTimeString) return false;
  //     const taskTime = new Date(taskTimeString);
  //     return !isNaN(taskTime) && taskTime >= threshold;
  //   });
  // };

  const filterTasksByDate = (tasks) => {
    if (!FILTER_DAYS[filter]) return tasks;

    const daysAgo = FILTER_DAYS[filter];
    const threshold = new Date();
    threshold.setHours(0, 0, 0, 0); // Set time to 00:00:00
    threshold.setDate(threshold.getDate() - daysAgo);

    return tasks.filter((task) => {
      const taskTimeString = task.fields?.TaskTime || "";
      if (!taskTimeString) return false;

      const taskTime = new Date(taskTimeString);
      taskTime.setHours(0, 0, 0, 0); // Normalize task time too

      return !isNaN(taskTime) && taskTime >= threshold;
    });
  };

  const transformData = (data) => {
    const grouped = {};
    let totalBillable = 0;
    let totalNonBillable = 0;

    data.forEach((item) => {
      const stakeholderName = item.createdBy?.user?.displayName || "Unknown";
      const projectType = item.fields?.ProjectType || "";
      const duration = parseFloat(item.fields?.["Duration_x0028_inHrs_x0029_"]) || 0;

      if (!grouped[stakeholderName]) {
        grouped[stakeholderName] = {
          name: stakeholderName,
          billable: 0,
          nonBillable: 0,
        };
      }

      if (projectType === "Internal Project") {
        grouped[stakeholderName].nonBillable += duration;
        totalNonBillable += duration;
      } else if (projectType === "Customer") {
        grouped[stakeholderName].billable += duration;
        totalBillable += duration;
      }
    });

    const total = totalBillable + totalNonBillable;
    const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
    const nonBillablePercentage = total ? 100 - billablePercentage : 0;

    setSummary({
      totalBillable,
      totalNonBillable,
      billablePercentage,
      nonBillablePercentage,
    });

    return Object.values(grouped);
  };

  const applyFilter = () => {
    const filtered = filterTasksByDate(allTasks);
    const transformed = transformData(filtered);
    setResourceData(transformed);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await taskBreakdownProfilleData();
        setAllTasks(result);
        const filtered = filterTasksByDate(result);
        const transformed = transformData(filtered);
        setResourceData(transformed);
      } catch (error) {
        console.error("Error fetching SharePoint data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allTasks.length) {
      applyFilter();
    }
  }, [filter]);

  const chartData = {
    labels: resourceData.map((r) => r.name),
    datasets: [
      {
        label: "Billable Hours",
        data: resourceData.map((r) => r.billable),
        backgroundColor: "#2196f3",
      },
      {
        label: "Non-Billable Hours",
        data: resourceData.map((r) => r.nonBillable),
        backgroundColor: "#90a4ae",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Card>
            <MDBox p={2}>
              <Grid container spacing={2}>
                {["Weekly", "Monthly", "Quarterly", "Project"].map((label) => (
                  <Grid item xs={12} sm={6} lg={3} key={label}>
                    <MDButton
                      variant={filter === label ? "contained" : "outlined"}
                      color={filter === label ? "info" : "secondary"}
                      fullWidth
                      onClick={() => setFilter(label)}
                    >
                      {label}
                    </MDButton>
                  </Grid>
                ))}
              </Grid>
            </MDBox>
          </Card>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Billable Hours</Typography>
              <Typography variant="h4" color="primary">
                {summary.totalBillable}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Non-Billable Hours</Typography>
              <Typography variant="h4" color="error">
                {summary.totalNonBillable}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Billable (%)</Typography>
              <Typography variant="h4" color="success.main">
                {summary.billablePercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Non-Billable (%)</Typography>
              <Typography variant="h4" color="warning.main">
                {summary.nonBillablePercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Box p={3}>
        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            Resource Utilization – {filter}
          </Typography>
          <Card>
            <CardContent sx={{ height: 500 }}>
              <Bar options={chartOptions} data={chartData} height={120} />
            </CardContent>
          </Card>
        </Box>

        {/* Breakdown List */}
        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            Resource Utilization Breakdown
          </Typography>
          <Card>
            <CardContent>
              {resourceData.map((person, idx) => {
                const total = person.billable + person.nonBillable;
                const percent = total ? Math.round((person.billable / total) * 100) : 0;

                return (
                  <Box key={idx} mb={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      {person.name}
                    </Typography>
                    <Box
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        overflow: "hidden",
                        height: 20,
                        backgroundColor: theme.palette.grey[200],
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          height: "100%",
                          backgroundColor: theme.palette.grey[300],
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: theme.palette.primary.main,
                          },
                        }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="textSecondary">
                        ● {person.billable} hrs ({percent}%)
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ● {person.nonBillable} hrs ({100 - percent}%)
                      </Typography>
                    </Box>
                    {idx !== resourceData.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default ResourcesUtilization;
