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
// const totalShadowResources = mockData.reduce((sum, person) => sum + person.nonBillable, 0);
// const billablePercentage = Math.round((totalBillable / (totalBillable + totalShadowResources)) * 100);

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
//               <Typography variant="h4">{totalShadowResources}</Typography>
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
//     totalShadowResources: 180,
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
//                 {mockData.summary.totalShadowResources}
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
//     totalShadowResources: 0,
//     billablePercentage: 0,
//   });

//   const transformData = (data) => {
//     const grouped = {};

//     let totalBillable = 0;
//     let totalShadowResources = 0;

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
//         totalShadowResources += duration;
//       } else {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       }
//     });

//     const total = totalBillable + totalShadowResources;
//     const percentage = total ? Math.round((totalBillable / total) * 100) : 0;

//     setSummary({
//       totalBillable,
//       totalShadowResources,
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
//                 {summary.totalShadowResources}
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
//     totalShadowResources: 0,
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
//     let totalShadowResources = 0;

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
//         totalShadowResources += duration;
//       } else {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       }
//     });

//     const total = totalBillable + totalShadowResources;
//     const percentage = total ? Math.round((totalBillable / total) * 100) : 0;

//     setSummary({
//       totalBillable,
//       totalShadowResources,
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
//                 {summary.totalShadowResources}
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
//     totalShadowResources: 0,
//     billablePercentage: 0,
//     shadowResources: 0,
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
//     let totalShadowResources = 0;

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
//         totalShadowResources += duration;
//       } else if (projectType === "Customer") {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       }
//     });

//     const total = totalBillable + totalShadowResources;
//     const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
//     const shadowResources = total ? 100 - billablePercentage : 0;

//     setSummary({
//       totalBillable,
//       totalShadowResources,
//       billablePercentage,
//       shadowResources,
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
//                 {summary.totalShadowResources}
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
//                 {summary.shadowResources}%
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();

//   const resoucesData = filteredData.tasks || [];

//   console.log(resoucesData);
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const theme = useTheme();
//   const [resourceData, setResourceData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalShadowResources: 0,
//     billablePercentage: 0,
//     shadowResources: 0,
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
//     threshold.setHours(0, 0, 0, 0); // Set time to 00:00:00
//     threshold.setDate(threshold.getDate() - daysAgo);

//     return tasks.filter((task) => {
//       const taskTimeString = task.fields?.TaskTime || "";
//       if (!taskTimeString) return false;

//       const taskTime = new Date(taskTimeString);
//       taskTime.setHours(0, 0, 0, 0); // Normalize task time too

//       return !isNaN(taskTime) && taskTime >= threshold;
//     });
//   };

//   const transformData = (data) => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalShadowResources = 0;

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
//         totalShadowResources += duration;
//       } else if (projectType === "Customer") {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       }
//     });

//     const total = totalBillable + totalShadowResources;
//     const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
//     const shadowResources = total ? 100 - billablePercentage : 0;

//     setSummary({
//       totalBillable,
//       totalShadowResources,
//       billablePercentage,
//       shadowResources,
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
//               <Typography variant="h6">Shadow Resources</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalShadowResources}
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
//               <Typography variant="h6">Shadow Resources (%)</Typography>
//               <Typography variant="h4" color="warning.main">
//                 {summary.shadowResources}%
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();

//   const resoucesData = filteredData.tasks || [];

//   console.log(resoucesData);
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const theme = useTheme();
//   const [resourceData, setResourceData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalShadowResources: 0,
//     billablePercentage: 0,
//     shadowResources: 0,
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
//     threshold.setHours(0, 0, 0, 0); // Set time to 00:00:00
//     threshold.setDate(threshold.getDate() - daysAgo);

//     return tasks.filter((task) => {
//       const taskTimeString = task.fields?.TaskTime || "";
//       if (!taskTimeString) return false;

//       const taskTime = new Date(taskTimeString);
//       taskTime.setHours(0, 0, 0, 0); // Normalize task time too

//       return !isNaN(taskTime) && taskTime >= threshold;
//     });
//   };

//   const transformData = (data) => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalShadowResources = 0;

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
//         totalShadowResources += duration;
//       } else if (projectType === "Customer") {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       }
//     });

//     const total = totalBillable + totalShadowResources;
//     const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
//     const shadowResources = total ? 100 - billablePercentage : 0;

//     setSummary({
//       totalBillable,
//       totalShadowResources,
//       billablePercentage,
//       shadowResources,
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
//               <Typography variant="h6">Shadow Resources</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalShadowResources}
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
//               <Typography variant="h6">Shadow Resources (%)</Typography>
//               <Typography variant="h4" color="warning.main">
//                 {summary.shadowResources}%
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

// modifed code with global calculation
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resoucesData = filteredData.tasks || [];
//   console.log(resoucesData);

//   const theme = useTheme();
//   const [resourceData, setResourceData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalShadowResources: 0,
//     billablePercentage: 0,
//     shadowResources: 0,
//   });
//   const [filter, setFilter] = useState("Project");

//   useEffect(() => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalShadowResources = 0;

//     resoucesData.forEach((item) => {
//       const stakeholderName = item.createdBy || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       if (!grouped[stakeholderName]) {
//         grouped[stakeholderName] = {
//           name: stakeholderName,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[stakeholderName].billable += duration;
//         totalBillable += duration;
//       } else {
//         grouped[stakeholderName].nonBillable += duration;
//         totalShadowResources += duration;
//       }
//     });

//     const total = totalBillable + totalShadowResources;
//     const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
//     const shadowResources = total ? 100 - billablePercentage : 0;

//     setSummary({
//       totalBillable,
//       totalShadowResources,
//       billablePercentage,
//       shadowResources,
//     });

//     setResourceData(Object.values(grouped));
//   }, [resoucesData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

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
//               <Typography variant="h6">Shadow Resources</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalShadowResources}
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
//               <Typography variant="h6">Shadow Resources (%)</Typography>
//               <Typography variant="h4" color="warning.main">
//                 {summary.shadowResources}%
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resoucesData = filteredData.tasks || [];
//   const theme = useTheme();

//   const [resourceData, setResourceData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalShadowResources: 0,
//     billablePercentage: 0,
//     shadowResources: 0,
//   });
//   const [filter, setFilter] = useState("Project");

//   useEffect(() => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalShadowResources = 0;

//     resoucesData.forEach((item) => {
//       const name = item.createdBy || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       if (!grouped[name]) {
//         grouped[name] = {
//           name,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[name].billable += duration;
//         totalBillable += duration;
//       } else {
//         grouped[name].nonBillable += duration;
//         totalShadowResources += duration;
//       }
//     });

//     const total = totalBillable + totalShadowResources;
//     const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;

//     setSummary({
//       totalBillable,
//       totalShadowResources,
//       billablePercentage,
//       shadowResources: 100 - billablePercentage,
//     });

//     setResourceData(Object.values(grouped));
//   }, [resoucesData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

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
//         <Grid item xs={12}>
//           <Card>
//             <MDBox p={2}>
//               <Grid container spacing={2}>
//                 {["Weekly", "Monthly", "Quarterly", "Project"].map((label) => (
//                   <Grid item xs={6} sm={3} key={label}>
//                     <MDButton
//                       fullWidth
//                       variant={filter === label ? "contained" : "outlined"}
//                       color={filter === label ? "info" : "secondary"}
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

//         {/* Summary */}
//         {[
//           { label: "Total Billable Hours", value: summary.totalBillable, color: "primary" },
//           { label: "Shadow Resources", value: summary.totalShadowResources, color: "error" },
//           { label: "Billable (%)", value: `${summary.billablePercentage}%`, color: "success.main" },
//           {
//             label: "Shadow Resources (%)",
//             value: `${summary.shadowResources}%`,
//             color: "warning.main",
//           },
//         ].map((item, idx) => (
//           <Grid item xs={12} md={3} key={idx}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{item.label}</Typography>
//                 <Typography variant="h4" color={item.color}>
//                   {item.value}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Chart */}
//       <Box p={3}>
//         <Typography variant="h6" mt={4} mb={2}>
//           Resource Utilization – {filter}
//         </Typography>
//         <Card>
//           <CardContent sx={{ height: 500 }}>
//             <Bar options={chartOptions} data={chartData} />
//           </CardContent>
//         </Card>

//         {/* Breakdown */}
//         <Typography variant="h6" mt={5} mb={2}>
//           Resource Utilization Breakdown
//         </Typography>
//         <Card>
//           <CardContent>
//             {resourceData.map((person, idx) => {
//               const total = person.billable + person.nonBillable;
//               const percent = total ? Math.round((person.billable / total) * 100) : 0;

//               return (
//                 <Box key={idx} mb={3}>
//                   <Typography variant="subtitle1">{person.name}</Typography>
//                   <Box
//                     sx={{
//                       border: `1px solid ${theme.palette.divider}`,
//                       borderRadius: 2,
//                       overflow: "hidden",
//                       height: 20,
//                       backgroundColor: theme.palette.grey[200],
//                     }}
//                   >
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: "100%",
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.primary.main,
//                         },
//                       }}
//                     />
//                   </Box>
//                   <Box display="flex" justifyContent="space-between">
//                     <Typography variant="body2" color="textSecondary">
//                       ● {person.billable} hrs ({percent}%)
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       ● {person.nonBillable} hrs ({100 - percent}%)
//                     </Typography>
//                   </Box>
//                   {idx !== resourceData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                 </Box>
//               );
//             })}
//           </CardContent>
//         </Card>
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resoucesData = filteredData.tasks || [];
//   const theme = useTheme();

//   const [customerData, setCustomerData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });

//   useEffect(() => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     resoucesData.forEach((item) => {
//       const customer = item.Customer || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       if (!grouped[customer]) {
//         grouped[customer] = {
//           name: customer,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[customer].billable += duration;
//         totalBillable += duration;
//       } else if (["Admin", "Shadow", "Internal Project"].includes(projectType)) {
//         grouped[customer].nonBillable += duration;
//         totalNonBillable += duration;
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

//     setCustomerData(Object.values(grouped));
//   }, [resoucesData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const chartData = {
//     labels: customerData.map((r) => r.name),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: customerData.map((r) => r.billable),
//         backgroundColor: "#4caf50",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: customerData.map((r) => r.nonBillable),
//         backgroundColor: "#f44336",
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
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Resource Utilization by Customer
//               </Typography>
//               <Bar options={chartOptions} data={chartData} />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown
//               </Typography>
//               {customerData.map((item, idx) => {
//                 const total = item.billable + item.nonBillable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">{item.name}</Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between">
//                       <Typography variant="body2">
//                         ✅ {item.billable} hrs ({percent}% Billable)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable} hrs ({100 - percent}% Non-Billable)
//                       </Typography>
//                     </Box>
//                     {idx !== customerData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resoucesData = filteredData.tasks || [];
//   const theme = useTheme();

//   const [groupedData, setGroupedData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });

//   useEffect(() => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     resoucesData.forEach((item) => {
//       const customer = item.Customer || "Unknown";
//       const createdBy = item.createdBy || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       const key = `${customer}__${createdBy}`;
//       if (!grouped[key]) {
//         grouped[key] = {
//           customer,
//           createdBy,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[key].billable += duration;
//         totalBillable += duration;
//       } else if (["Admin", "Shadow", "Internal Project"].includes(projectType)) {
//         grouped[key].nonBillable += duration;
//         totalNonBillable += duration;
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

//     setGroupedData(Object.values(grouped));
//   }, [resoucesData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const chartData = {
//     labels: groupedData.map((r) => `${r.customer} - ${r.createdBy}`),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: groupedData.map((r) => r.billable),
//         backgroundColor: "#4caf50",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: groupedData.map((r) => r.nonBillable),
//         backgroundColor: "#f44336",
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
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Resource Utilization (Customer → Created By)
//               </Typography>
//               <Bar options={chartOptions} data={chartData} />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown by Customer and User
//               </Typography>
//               {groupedData.map((item, idx) => {
//                 const total = item.billable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">
//                       {item.customer} → {item.createdBy}
//                     </Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between">
//                       <Typography variant="body2">
//                         ✅ {item.billable} hrs ({percent}% Billable)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable} hrs ({100 - percent}% Non-Billable)
//                       </Typography>
//                     </Box>
//                     {idx !== groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resoucesData = filteredData.tasks || [];
//   const theme = useTheme();

//   const [groupedData, setGroupedData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });

//   useEffect(() => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     resoucesData.forEach((item) => {
//       const customer = item.Customer || "Unknown";
//       const createdBy = item.createdBy || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       const key = `${customer}__${createdBy}`;
//       if (!grouped[key]) {
//         grouped[key] = {
//           customer,
//           createdBy,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[key].billable += duration;
//         totalBillable += duration;
//       } else {
//         // Everything else is non-billable
//         grouped[key].nonBillable += duration;
//         totalNonBillable += duration;
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

//     setGroupedData(Object.values(grouped));
//   }, [resoucesData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const chartData = {
//     labels: groupedData.map((r) => `${r.customer} → ${r.createdBy}`),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: groupedData.map((r) => r.billable),
//         backgroundColor: "#4caf50",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: groupedData.map((r) => r.nonBillable),
//         backgroundColor: "#f44336",
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
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable.toFixed(1)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable.toFixed(1)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Resource Utilization (Customer → Created By)
//               </Typography>
//               <Bar options={chartOptions} data={chartData} />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown by Customer and User
//               </Typography>
//               {groupedData.map((item, idx) => {
//                 const total = item.billable + item.nonBillable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">
//                       {item.customer} → {item.createdBy}
//                     </Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between">
//                       <Typography variant="body2">
//                         ✅ {item.billable.toFixed(1)} hrs ({percent}% Billable)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable.toFixed(1)} hrs ({100 - percent}% Non-Billable)
//                       </Typography>
//                     </Box>
//                     {idx !== groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resoucesData = filteredData.tasks || [];
//   const theme = useTheme();

//   const [groupedData, setGroupedData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });

//   useEffect(() => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     resoucesData.forEach((item) => {
//       const customer = item.Customer || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       if (!grouped[customer]) {
//         grouped[customer] = {
//           customer,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[customer].billable += duration;
//         totalBillable += duration;
//       } else {
//         grouped[customer].nonBillable += duration;
//         totalNonBillable += duration;
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

//     setGroupedData(Object.values(grouped));
//   }, [resoucesData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const chartData = {
//     labels: groupedData.map((r) => r.customer),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: groupedData.map((r) => r.billable),
//         backgroundColor: "#4caf50",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: groupedData.map((r) => r.nonBillable),
//         backgroundColor: "#f44336",
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
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable.toFixed(1)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable.toFixed(1)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Resource Utilization by Customer
//               </Typography>
//               <Bar options={chartOptions} data={chartData} />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown by Customer
//               </Typography>
//               {groupedData.map((item, idx) => {
//                 const total = item.billable + item.nonBillable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">{item.customer}</Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between">
//                       <Typography variant="body2">
//                         ✅ {item.billable.toFixed(1)} hrs ({percent}% Billable)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable.toFixed(1)} hrs ({100 - percent}% Non-Billable)
//                       </Typography>
//                     </Box>
//                     {idx !== groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ResourcesUtilization;

// perprecity ka code

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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resourcesData = filteredData.tasks || [];
//   const theme = useTheme();

//   const [groupedData, setGroupedData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });

//   useEffect(() => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     resourcesData.forEach((item) => {
//       const customer = item.Customer || "";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       // Skip if customer is empty string or null for billable/non-billable grouping
//       if (!customer) {
//         return;
//       }

//       if (!grouped[customer]) {
//         grouped[customer] = {
//           customer,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[customer].billable += duration;
//         totalBillable += duration;
//       } else {
//         // Non-billable only if customer is present
//         grouped[customer].nonBillable += duration;
//         totalNonBillable += duration;
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

//     setGroupedData(Object.values(grouped));
//   }, [resourcesData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   // Enhanced stacked bar chart data and options
//   const chartData = {
//     labels: groupedData.map((r) => r.customer),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: groupedData.map((r) => r.billable),
//         backgroundColor: theme.palette.success.main,
//         stack: "Stack 0",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: groupedData.map((r) => r.nonBillable),
//         backgroundColor: theme.palette.error.main,
//         stack: "Stack 0",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//       title: {
//         display: true,
//         text: "Resource Utilization by Customer",
//         font: { size: 18 },
//       },
//     },
//     interaction: {
//       mode: "nearest",
//       axis: "x",
//       intersect: false,
//     },
//     scales: {
//       x: {
//         stacked: true,
//         title: {
//           display: true,
//           text: "Customer",
//         },
//       },
//       y: {
//         stacked: true,
//         title: {
//           display: true,
//           text: "Hours",
//         },
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable.toFixed(1)}
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={summary.billablePercentage}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   mt: 1,
//                   backgroundColor: theme.palette.grey[300],
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor: theme.palette.success.main,
//                   },
//                 }}
//               />
//               <Typography variant="body2" color="textSecondary" mt={0.5}>
//                 {summary.billablePercentage}% Billable
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable.toFixed(1)}
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={summary.nonBillablePercentage}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   mt: 1,
//                   backgroundColor: theme.palette.grey[300],
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor: theme.palette.error.main,
//                   },
//                 }}
//               />
//               <Typography variant="body2" color="textSecondary" mt={0.5}>
//                 {summary.nonBillablePercentage}% Non-Billable
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Bar options={chartOptions} data={chartData} />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown by Customer
//               </Typography>
//               {groupedData.map((item, idx) => {
//                 const total = item.billable + item.nonBillable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">{item.customer}</Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between" mt={0.5}>
//                       <Typography variant="body2">
//                         ✅ {item.billable.toFixed(1)} hrs ({percent}% Billable)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable.toFixed(1)} hrs ({100 - percent}% Non-Billable)
//                       </Typography>
//                     </Box>
//                     {idx !== groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
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
//   CircularProgress,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resourcesData = filteredData.tasks || [];
//   const theme = useTheme();

//   const [groupedData, setGroupedData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });

//   useEffect(() => {
//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     resourcesData.forEach((item) => {
//       const customer = item.Customer || "";
//       const createdBy = item.createdBy || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       // Exclude entries with empty Customer
//       if (!customer) return;

//       const key = `${customer}__${createdBy}`;
//       if (!grouped[key]) {
//         grouped[key] = {
//           customer,
//           createdBy,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[key].billable += duration;
//         totalBillable += duration;
//       } else {
//         grouped[key].nonBillable += duration;
//         totalNonBillable += duration;
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

//     setGroupedData(Object.values(grouped));
//   }, [resourcesData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   // Original style chart: side-by-side bars grouped by Customer → CreatedBy
//   const chartData = {
//     labels: groupedData.map((r) => `${r.customer} → ${r.createdBy}`),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: groupedData.map((r) => r.billable),
//         backgroundColor: "#4caf50",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: groupedData.map((r) => r.nonBillable),
//         backgroundColor: "#f44336",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: "Resource Utilization (Customer → Created By)",
//         font: { size: 18 },
//       },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//     },
//     interaction: {
//       mode: "nearest",
//       axis: "x",
//       intersect: false,
//     },
//     scales: {
//       x: {
//         stacked: false,
//         title: {
//           display: true,
//           text: "Customer → Created By",
//         },
//       },
//       y: {
//         stacked: false,
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Hours",
//         },
//       },
//     },
//   };

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable.toFixed(1)}
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={summary.billablePercentage}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   mt: 1,
//                   backgroundColor: theme.palette.grey[300],
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor: theme.palette.success.main,
//                   },
//                 }}
//               />
//               <Typography variant="body2" color="textSecondary" mt={0.5}>
//                 {summary.billablePercentage}% Billable
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable.toFixed(1)}
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={summary.nonBillablePercentage}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   mt: 1,
//                   backgroundColor: theme.palette.grey[300],
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor: theme.palette.error.main,
//                   },
//                 }}
//               />
//               <Typography variant="body2" color="textSecondary" mt={0.5}>
//                 {summary.nonBillablePercentage}% Non-Billable
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Bar options={chartOptions} data={chartData} redraw />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown by Customer and User
//               </Typography>
//               {groupedData.map((item, idx) => {
//                 const total = item.billable + item.nonBillable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">
//                       {item.customer} → {item.createdBy}
//                     </Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between" mt={0.5}>
//                       <Typography variant="body2">
//                         ✅ {item.billable.toFixed(1)} hrs ({percent}% Billable)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable.toFixed(1)} hrs ({100 - percent}% Non-Billable)
//                       </Typography>
//                     </Box>
//                     {idx !== groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
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
//   CircularProgress,
//   ButtonGroup,
//   Button,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resourcesData = filteredData.tasks || [];
//   const theme = useTheme();

//   // State for filter selection
//   const [filter, setFilter] = useState("Weekly");

//   const [groupedData, setGroupedData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });

//   useEffect(() => {
//     // You can extend this effect to filter resourcesData based on 'filter' state if needed
//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     resourcesData.forEach((item) => {
//       const customer = item.Customer || "";
//       const createdBy = item.createdBy || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       // Exclude entries with empty Customer
//       if (!customer) return;

//       const key = `${customer}__${createdBy}`;
//       if (!grouped[key]) {
//         grouped[key] = {
//           customer,
//           createdBy,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[key].billable += duration;
//         totalBillable += duration;
//       } else {
//         grouped[key].nonBillable += duration;
//         totalNonBillable += duration;
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

//     setGroupedData(Object.values(grouped));
//   }, [resourcesData, filter]); // Added filter to dependencies if you want to extend filtering logic

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const chartData = {
//     labels: groupedData.map((r) => `${r.customer} → ${r.createdBy}`),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: groupedData.map((r) => r.billable),
//         backgroundColor: "#4caf50",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: groupedData.map((r) => r.nonBillable),
//         backgroundColor: "#f44336",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: "Resource Utilization (Customer → Created By)",
//         font: { size: 18 },
//       },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//     },
//     interaction: {
//       mode: "nearest",
//       axis: "x",
//       intersect: false,
//     },
//     scales: {
//       x: {
//         stacked: false,
//         title: {
//           display: true,
//           text: "Customer → Created By",
//         },
//       },
//       y: {
//         stacked: false,
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Hours",
//         },
//       },
//     },
//   };

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Filter Button Group */}
//         <Grid item xs={12}>
//           <Card>
//             <Box p={2}>
//               <ButtonGroup variant="outlined" color="secondary" fullWidth>
//                 {["Weekly", "Monthly", "Quarterly", "Project"].map((label) => (
//                   <Button
//                     key={label}
//                     variant={filter === label ? "contained" : "outlined"}
//                     color={filter === label ? "info" : "secondary"}
//                     onClick={() => setFilter(label)}
//                   >
//                     {label}
//                   </Button>
//                 ))}
//               </ButtonGroup>
//             </Box>
//           </Card>
//         </Grid>

//         {/* Summary Cards */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable.toFixed(1)}
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={summary.billablePercentage}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   mt: 1,
//                   backgroundColor: theme.palette.grey[300],
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor: theme.palette.success.main,
//                   },
//                 }}
//               />
//               <Typography variant="body2" color="textSecondary" mt={0.5}>
//                 {summary.billablePercentage}% Billable
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable.toFixed(1)}
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={summary.nonBillablePercentage}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   mt: 1,
//                   backgroundColor: theme.palette.grey[300],
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor: theme.palette.error.main,
//                   },
//                 }}
//               />
//               <Typography variant="body2" color="textSecondary" mt={0.5}>
//                 {summary.nonBillablePercentage}% Non-Billable
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Chart */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Bar options={chartOptions} data={chartData} redraw />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Breakdown */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown by Customer and User
//               </Typography>
//               {groupedData.map((item, idx) => {
//                 const total = item.billable + item.nonBillable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">
//                       {item.customer} → {item.createdBy}
//                     </Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between" mt={0.5}>
//                       <Typography variant="body2">
//                         ✅ {item.billable.toFixed(1)} hrs ({percent}% Billable)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable.toFixed(1)} hrs ({100 - percent}% Non-Billable)
//                       </Typography>
//                     </Box>
//                     {idx !== groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
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
//   CircularProgress,
//   ButtonGroup,
//   Button,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import MDButton from "components/MDButton";
// import MDBox from "components/MDBox";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resourcesData = filteredData.tasks || [];
//   const theme = useTheme();

//   // State for filter selection
//   const [filter, setFilter] = useState("Weekly");

//   const [groupedData, setGroupedData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });

//   useEffect(() => {
//     // Filter resourcesData based on 'filter' state
//     let filteredResources = resourcesData;

//     // Example filter logic - adapt as per your actual data fields
//     if (filter === "Weekly") {
//       // Filter for last 7 days data
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       filteredResources = resourcesData.filter((item) => {
//         const date = new Date(item.Date);
//         return date >= oneWeekAgo;
//       });
//     } else if (filter === "Monthly") {
//       // Filter for current month
//       const now = new Date();
//       filteredResources = resourcesData.filter((item) => {
//         const date = new Date(item.Date);
//         return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
//       });
//     } else if (filter === "Quarterly") {
//       // Filter for current quarter
//       const now = new Date();
//       const quarter = Math.floor(now.getMonth() / 3);
//       filteredResources = resourcesData.filter((item) => {
//         const date = new Date(item.Date);
//         const itemQuarter = Math.floor(date.getMonth() / 3);
//         return itemQuarter === quarter && date.getFullYear() === now.getFullYear();
//       });
//     } else if (filter === "Project") {
//       // Filter by project if applicable, e.g., only certain projects
//       // Placeholder: no filtering or you can add your own logic here
//       filteredResources = resourcesData;
//     }

//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     filteredResources.forEach((item) => {
//       const customer = item.Customer || "";
//       const createdBy = item.createdBy || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;

//       if (!customer) return;

//       const key = `${customer}__${createdBy}`;
//       if (!grouped[key]) {
//         grouped[key] = {
//           customer,
//           createdBy,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[key].billable += duration;
//         totalBillable += duration;
//       } else {
//         grouped[key].nonBillable += duration;
//         totalNonBillable += duration;
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

//     setGroupedData(Object.values(grouped));
//   }, [resourcesData, filter]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const chartData = {
//     labels: groupedData.map((r) => `${r.customer} → ${r.createdBy}`),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: groupedData.map((r) => r.billable),
//         backgroundColor: "#4caf50",
//       },
//       {
//         label: "Non-Billable Hours",
//         data: groupedData.map((r) => r.nonBillable),
//         backgroundColor: "#f44336",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: "Resource Utilization (Customer → Created By)",
//         font: { size: 18 },
//       },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//     },
//     interaction: {
//       mode: "nearest",
//       axis: "x",
//       intersect: false,
//     },
//     scales: {
//       // x: {
//       //   stacked: false,
//       //   title: {
//       //     display: true,
//       //     text: "Customer → Created By",
//       //   },
//       // },
//       y: {
//         stacked: false,
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Hours",
//         },
//       },
//     },
//   };

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Filter Button Group */}
//         <Grid item xs={12}>
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
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4" color="primary">
//                 {summary.totalBillable.toFixed(1)}
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={summary.billablePercentage}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   mt: 1,
//                   backgroundColor: theme.palette.grey[300],
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor: theme.palette.success.main,
//                   },
//                 }}
//               />
//               <Typography variant="body2" color="textSecondary" mt={0.5}>
//                 {summary.billablePercentage}% Billable
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4" color="error">
//                 {summary.totalNonBillable.toFixed(1)}
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={summary.nonBillablePercentage}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   mt: 1,
//                   backgroundColor: theme.palette.grey[300],
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor: theme.palette.error.main,
//                   },
//                 }}
//               />
//               <Typography variant="body2" color="textSecondary" mt={0.5}>
//                 {summary.nonBillablePercentage}% Non-Billable
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Chart */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Bar options={chartOptions} data={chartData} redraw />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Breakdown */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown by Customer and User
//               </Typography>
//               {groupedData.map((item, idx) => {
//                 const total = item.billable + item.nonBillable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;

//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">
//                       {item.customer} → {item.createdBy}
//                     </Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between" mt={0.5}>
//                       <Typography variant="body2">
//                         ✅ {item.billable.toFixed(1)} hrs ({percent}% Billable)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable.toFixed(1)} hrs ({100 - percent}% Non-Billable)
//                       </Typography>
//                     </Box>
//                     {idx !== groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
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
  CircularProgress,
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
import { useGlobalFilters } from "context/GlobalFilterContext";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResourcesUtilization = () => {
  const { filteredData, loading } = useGlobalFilters();
  const resourcesData = filteredData.tasks || [];
  const theme = useTheme();

  const [filter, setFilter] = useState("Project");
  const [groupedData, setGroupedData] = useState([]);
  const [summary, setSummary] = useState({
    totalBillable: 0,
    totalNonBillable: 0,
    billablePercentage: 0,
    nonBillablePercentage: 0,
  });

  useEffect(() => {
    let filteredResources = resourcesData;

    const now = new Date();
    if (filter === "Weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filteredResources = resourcesData.filter((item) => {
        const date = new Date(item.Date);
        return date >= oneWeekAgo;
      });
    } else if (filter === "Monthly") {
      filteredResources = resourcesData.filter((item) => {
        const date = new Date(item.Date);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      });
    } else if (filter === "Quarterly") {
      const quarter = Math.floor(now.getMonth() / 3);
      filteredResources = resourcesData.filter((item) => {
        const date = new Date(item.Date);
        return (
          Math.floor(date.getMonth() / 3) === quarter && date.getFullYear() === now.getFullYear()
        );
      });
    }

    const grouped = {};
    let totalBillable = 0;
    let totalNonBillable = 0;

    filteredResources.forEach((item) => {
      const customer = item.Customer || "";
      const createdBy = item.createdBy || "Unknown";
      const projectType = item.ProjectType || "";
      const duration = parseFloat(item.Duration) || 0;
      if (!customer) return;

      const key = `${customer}__${createdBy}`;
      if (!grouped[key]) {
        grouped[key] = {
          customer,
          createdBy,
          billable: 0,
          nonBillable: 0,
        };
      }

      if (projectType === "Customer") {
        grouped[key].billable += duration;
        totalBillable += duration;
      } else {
        grouped[key].nonBillable += duration;
        totalNonBillable += duration;
      }
    });

    const total = totalBillable + totalNonBillable;
    const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
    const nonBillablePercentage = 100 - billablePercentage;

    setSummary({ totalBillable, totalNonBillable, billablePercentage, nonBillablePercentage });
    setGroupedData(Object.values(grouped));
  }, [resourcesData, filter]);

  const chartData = {
    labels: groupedData.map((r) => `${r.customer} → ${r.createdBy}`),
    datasets: [
      {
        label: "Billable Hours",
        data: groupedData.map((r) => r.billable),
        backgroundColor: theme.palette.success.main,
      },
      {
        label: "Non-Billable Hours",
        data: groupedData.map((r) => r.nonBillable),
        backgroundColor: theme.palette.error.main,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Resource Utilization (Customer → Created By)",
        font: { size: 18 },
      },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Hours" },
      },
    },
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Filter Buttons */}
        <Grid item xs={12}>
          <Card>
            <MDBox p={2}>
              <Grid container spacing={2}>
                {["Project", "Weekly", "Monthly", "Quarterly"].map((label) => (
                  <Grid item xs={6} sm={3} key={label}>
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
        {[
          ["Total Billable Hours", summary.totalBillable, summary.billablePercentage, "success"],
          [
            "Total Non-Billable Hours",
            summary.totalNonBillable,
            summary.nonBillablePercentage,
            "error",
          ],
        ].map(([title, value, percentage, color], idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Card>
              <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h4" color={color}>
                  {value.toFixed(1)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mt: 1,
                    backgroundColor: theme.palette.grey[300],
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: theme.palette[color].main,
                    },
                  }}
                />
                <Typography variant="body2" color="textSecondary" mt={0.5}>
                  {percentage}% {color === "success" ? "Billable" : "Non-Billable"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Bar options={chartOptions} data={chartData} redraw />
            </CardContent>
          </Card>
        </Grid>

        {/* Breakdown Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Breakdown by Customer and User
              </Typography>
              {groupedData.map((item, idx) => {
                const total = item.billable + item.nonBillable;
                const percent = total ? Math.round((item.billable / total) * 100) : 0;
                return (
                  <Box key={idx} mb={3}>
                    <Typography variant="subtitle1">
                      {item.customer} → {item.createdBy}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={percent}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.palette.grey[300],
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.success.main,
                        },
                      }}
                    />
                    <Box display="flex" justifyContent="space-between" mt={0.5}>
                      <Typography variant="body2">
                        ✅ {item.billable.toFixed(1)} hrs ({percent}%)
                      </Typography>
                      <Typography variant="body2">
                        ❌ {item.nonBillable.toFixed(1)} hrs ({100 - percent}%)
                      </Typography>
                    </Box>
                    {idx < groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourcesUtilization;
