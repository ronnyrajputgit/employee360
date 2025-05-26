// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Avatar,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Stack,
//   Card,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";
// import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";

// const transformSharePointData = (data) => {
//   const grouped = {};

//   data.forEach((item) => {
//     const fields = item.fields;
//     const stakeholderName = item.createdBy.user.displayName;

//     if (!grouped[stakeholderName]) {
//       grouped[stakeholderName] = {
//         name: stakeholderName,
//         tasks: [],
//       };
//     }

//     grouped[stakeholderName].tasks.push({
//       name: fields.Title || "Untitled",
//       status: fields.Status || "Not Started",
//       description: fields.TaskDescription || "No description",
//       duration: fields.Duration_x0028_inHrs_x0029_ + " hrs",
//       tasktype: fields.TaskType || "General",
//     });
//   });

//   return Object.values(grouped);
// };

// const TaskbreakDown = () => {
//   const [roles, setRoles] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedType, setSelectedType] = useState("all");
//   const [selectedDuration, setSelectedDuration] = useState("all");
//   const [taskTypes, setTaskTypes] = useState([]);
//   const [durationRanges] = useState([
//     { label: "All", value: "all" },
//     { label: "0-4 hours", value: "0-4" },
//     { label: "4-8 hours", value: "4-8" },
//     { label: "8+ hours", value: "8+" },
//   ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const transformed = await taskBreakdownProfilleData();
//         setRoles(transformed);

//         // Extract unique task types
//         const types = new Set();
//         transformed.forEach((role) => {
//           role.tasks.forEach((task) => {
//             types.add(task.tasktype);
//           });
//         });
//         setTaskTypes(["all", ...Array.from(types)]);
//       } catch (err) {
//         console.error("Failed to fetch SharePoint data", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const filterTasks = (role) => {
//     return {
//       ...role,
//       tasks: role.tasks.filter((task) => {
//         const matchesSearch =
//           task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           task.description.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesType = selectedType === "all" || task.tasktype === selectedType;
//         const duration = parseInt(task.duration);
//         let matchesDuration = true;

//         if (selectedDuration !== "all") {
//           const [min, max] = selectedDuration.split("-").map(Number);
//           if (max) {
//             matchesDuration = duration >= min && duration < max;
//           } else {
//             matchesDuration = duration >= min;
//           }
//         }

//         return matchesSearch && matchesType && matchesDuration;
//       }),
//     };
//   };

//   const filteredRoles = roles.map(filterTasks).filter((role) => role.tasks.length > 0);

//   return (
//     <>
//       <Grid item xs={12} lg={12}>
//         <Card>
//           <MDBox p={2}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6} lg={4}>
//                 <TextField
//                   size="small"
//                   label="Search tasks"
//                   variant="standard"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   fullWidth
//                 />
//                 {/* <MDButton variant="gradient" color="success" fullWidth>
//                   Weekly
//                 </MDButton> */}
//               </Grid>
//               <Grid item xs={12} sm={6} lg={4}>
//                 <TextField
//                   select
//                   size="small"
//                   label="Task Type"
//                   value={selectedType}
//                   fullWidth
//                   variant="standard"
//                   onChange={(e) => setSelectedType(e.target.value)}
//                   sx={{
//                     gap: 2,
//                     flexDirection: { xs: "column", sm: "row" },
//                   }}
//                 >
//                   {taskTypes.map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type.charAt(0).toUpperCase() + type.slice(1)}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 {/* <MDButton variant="gradient" color="info" fullWidth>
//                   Monthly
//                 </MDButton> */}
//               </Grid>
//               <Grid item xs={12} sm={6} lg={4}>
//                 <TextField
//                   select
//                   fullWidth
//                   variant="standard"
//                   size="small"
//                   label="Duration"
//                   value={selectedDuration}
//                   onChange={(e) => setSelectedDuration(e.target.value)}
//                   sx={{
//                     gap: 2,
//                     flexDirection: { xs: "column", sm: "row" },
//                   }}
//                 >
//                   {durationRanges.map((range) => (
//                     <MenuItem key={range.value} value={range.value}>
//                       {range.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             </Grid>
//           </MDBox>
//         </Card>
//       </Grid>
//       <Box p={{ xs: 1, sm: 2 }}>
//         {filteredRoles.map((role, index) => (
//           <Paper
//             key={index}
//             elevation={3}
//             sx={{
//               mb: { xs: 2, sm: 4 },
//               p: { xs: 1, sm: 2 },
//               overflow: "hidden",
//             }}
//           >
//             <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
//               <Avatar sx={{ bgcolor: "primary.main" }} src={role.photoUrl}>
//                 {!role.photoUrl && <PersonIcon />}
//               </Avatar>

//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontSize: { xs: "1rem", sm: "1.25rem" },
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {role.name}
//               </Typography>
//             </Box>

//             <Grid
//               container
//               spacing={{ xs: 1, sm: 2 }}
//               sx={{
//                 fontWeight: "bold",
//                 bgcolor: "#f5f5f5",
//                 py: 1,
//                 mb: 1,
//                 p: { xs: 1, sm: 2 },
//                 borderBottom: "1px solid #eee",
//               }}
//             >
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Task Name
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Description
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Task Type
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Duration
//                 </Typography>
//               </Grid>
//             </Grid>

//             {role.tasks.map((task, idx) => (
//               <Grid
//                 key={idx}
//                 container
//                 spacing={{ xs: 1, sm: 2 }}
//                 sx={{
//                   mb: 1,
//                   p: { xs: 1, sm: 2 },
//                   borderBottom: "1px solid #eee",
//                   "&:last-child": {
//                     borderBottom: "none",
//                   },
//                 }}
//               >
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       wordBreak: "break-word",
//                       fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {task.name}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       wordBreak: "break-word",
//                       fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {task.description}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       wordBreak: "break-word",
//                       fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {task.tasktype}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       wordBreak: "break-word",
//                       fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {task.duration}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             ))}
//           </Paper>
//         ))}
//       </Box>
//     </>
//   );
// };

// export default TaskbreakDown;

// import React, { useEffect, useState } from "react";
// import { Box, Typography, Paper, Grid, Avatar, Card } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import MDBox from "components/MDBox";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const TaskbreakDown = () => {
//   const { filteredData, loading } = useGlobalFilters();

//   const roles = filteredData.tasks || [];

//   console.log(roles);

//   return (
//     <>
//       <Grid item xs={12} lg={12}>
//         <Card>
//           <MDBox p={2}>
//             <Typography variant="h6">Task Breakdown</Typography>
//           </MDBox>
//         </Card>
//       </Grid>
//       <Box p={{ xs: 1, sm: 2 }}>
//         <Paper
//           key={"index"}
//           elevation={3}
//           sx={{
//             mb: { xs: 2, sm: 4 },
//             p: { xs: 1, sm: 2 },
//             overflow: "hidden",
//           }}
//         >
//           <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
//             {/* <Avatar sx={{ bgcolor: "primary.main" }} src={role.photoUrl}>
//                 {!role.photoUrl && <PersonIcon />}
//               </Avatar> */}

//             <Typography
//               variant="h6"
//               sx={{
//                 fontSize: { xs: "1rem", sm: "1.25rem" },
//                 wordBreak: "break-word",
//               }}
//             >
//               {"role.createdBy"}
//             </Typography>
//           </Box>

//           <Grid
//             container
//             spacing={{ xs: 1, sm: 2 }}
//             sx={{
//               fontWeight: "bold",
//               bgcolor: "#f5f5f5",
//               py: 1,
//               mb: 1,
//               p: { xs: 1, sm: 2 },
//               borderBottom: "1px solid #eee",
//             }}
//           >
//             <Grid item xs={6} sm={3}>
//               <Typography variant="subtitle2" noWrap>
//                 Task Name
//               </Typography>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Typography variant="subtitle2" noWrap>
//                 Description
//               </Typography>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Typography variant="subtitle2" noWrap>
//                 Task Type
//               </Typography>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Typography variant="subtitle2" noWrap>
//                 Duration
//               </Typography>
//             </Grid>
//           </Grid>

//           <Grid
//             key={"idx"}
//             container
//             spacing={{ xs: 1, sm: 2 }}
//             sx={{
//               mb: 1,
//               p: { xs: 1, sm: 2 },
//               borderBottom: "1px solid #eee",
//               "&:last-child": {
//                 borderBottom: "none",
//               },
//             }}
//           >
//             <Grid item xs={6} sm={3}>
//               <Typography
//                 variant="subtitle2"
//                 sx={{
//                   wordBreak: "break-word",
//                   fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                 }}
//               >
//                 {"task.name"}
//               </Typography>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Typography
//                 variant="subtitle2"
//                 sx={{
//                   wordBreak: "break-word",
//                   fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                 }}
//               >
//                 {"task.description"}
//               </Typography>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Typography
//                 variant="subtitle2"
//                 sx={{
//                   wordBreak: "break-word",
//                   fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                 }}
//               >
//                 {"task.tasktype"}
//               </Typography>
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <Typography
//                 variant="subtitle2"
//                 sx={{
//                   wordBreak: "break-word",
//                   fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                 }}
//               >
//                 {"task.duration"}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default TaskbreakDown;

// import React from "react";
// import { Box, Typography, Paper, Grid, Avatar, Card } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import MDBox from "components/MDBox";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const TaskbreakDown = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const roles = filteredData.tasks || [];

//   // console.log(roles);
//   // Grouping by createdBy
//   const groupedByUser = roles.reduce((acc, task) => {
//     const key = task.createdBy;
//     if (!acc[key]) {
//       acc[key] = {
//         createdBy: task.createdBy,
//         photoUrl: task.photoUrl,
//         tasks: [],
//       };
//     }
//     acc[key].tasks.push(task);
//     return acc;
//   }, {});

//   return (
//     <>
//       <Grid item xs={12} lg={12}>
//         <Card>
//           <MDBox p={2}>
//             <Typography variant="h6">Task Breakdown</Typography>
//           </MDBox>
//         </Card>
//       </Grid>

//       {Object.values(groupedByUser).map((user, index) => (
//         <Box key={index} p={{ xs: 1, sm: 2 }}>
//           <Paper
//             elevation={3}
//             sx={{
//               mb: { xs: 2, sm: 4 },
//               p: { xs: 1, sm: 2 },
//               overflow: "hidden",
//             }}
//           >
//             <Box display="flex" alignItems="center" mb={2} gap={1}>
//               <Avatar src={user.photoUrl} sx={{ bgcolor: "primary.main" }}>
//                 {!user.photoUrl && <PersonIcon />}
//               </Avatar>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontSize: { xs: "1rem", sm: "1.25rem" },
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {user.createdBy}
//               </Typography>
//             </Box>

//             {/* Header Row */}
//             <Grid
//               container
//               spacing={{ xs: 1, sm: 2 }}
//               sx={{
//                 fontWeight: "bold",
//                 bgcolor: "#f5f5f5",
//                 py: 1,
//                 mb: 1,
//                 p: { xs: 1, sm: 2 },
//                 borderBottom: "1px solid #eee",
//               }}
//             >
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Task Name
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Description
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Task Type
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Duration (hrs)
//                 </Typography>
//               </Grid>
//             </Grid>

//             {/* Task Rows */}
//             {user.tasks.map((task, idx) => (
//               <Grid
//                 key={idx}
//                 container
//                 spacing={{ xs: 1, sm: 2 }}
//                 sx={{
//                   mb: 1,
//                   p: { xs: 1, sm: 2 },
//                   borderBottom: "1px solid #eee",
//                   "&:last-child": {
//                     borderBottom: "none",
//                   },
//                 }}
//               >
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       wordBreak: "break-word",
//                       fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {task.TaskName}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       wordBreak: "break-word",
//                       fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {task.TaskDescription}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       wordBreak: "break-word",
//                       fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {task.TaskType}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       wordBreak: "break-word",
//                       fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {task.Duration}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             ))}
//           </Paper>
//         </Box>
//       ))}
//     </>
//   );
// };

// export default TaskbreakDown;

// reduced code

// import React from "react";
// import { Box, Typography, Paper, Grid, Avatar, Card, CardContent } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import MDBox from "components/MDBox";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";

// const TaskbreakDown = () => {
//   const { filteredData } = useGlobalFilters();
//   const roles = filteredData.tasks || [];

//   // Grouping by createdBy
//   const groupedByUser = roles.reduce((acc, task) => {
//     const key = task.createdBy;
//     if (!acc[key]) {
//       acc[key] = {
//         createdBy: key,
//         photoUrl: task.photoUrl,
//         tasks: [],
//       };
//     }
//     acc[key].tasks.push(task);
//     return acc;
//   }, {});

//   // Convert grouped object to array
//   const groupedUsers = Object.keys(groupedByUser).map((key) => groupedByUser[key]);

//   return (
//     <>
//       <Grid item xs={12} lg={12}>
//         <Card>
//           <MDBox p={2}>
//             <Typography variant="h6">Task Breakdown</Typography>
//           </MDBox>
//         </Card>
//       </Grid>

//       {groupedUsers.map((user, index) => (
//         <Box key={index} p={{ xs: 1, sm: 2 }}>
//           <Paper
//             elevation={3}
//             sx={{
//               mb: { xs: 2, sm: 4 },
//               p: { xs: 1, sm: 2 },
//               overflow: "hidden",
//             }}
//           >
//             <Box display="flex" alignItems="center" mb={2} gap={1}>
//               <Avatar src={user.photoUrl} sx={{ bgcolor: "primary.main" }}>
//                 {!user.photoUrl && <PersonIcon />}
//               </Avatar>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontSize: { xs: "1rem", sm: "1.25rem" },
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {user.createdBy}
//               </Typography>
//             </Box>

//             <Card sx={{ mt: 4, boxShadow: 3 }}>
//               <CardContent>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </CardContent>
//             </Card>

//             {/* Header Row */}
//             <Grid
//               container
//               spacing={{ xs: 1, sm: 2 }}
//               sx={{
//                 fontWeight: "bold",
//                 bgcolor: "#f5f5f5",
//                 py: 1,
//                 mb: 1,
//                 p: { xs: 1, sm: 2 },
//                 borderBottom: "1px solid #eee",
//               }}
//             >
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Task Name
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Description
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Task Type
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2" noWrap>
//                   Duration (hrs)
//                 </Typography>
//               </Grid>
//             </Grid>

//             {/* Task Rows */}
//             {user.tasks.map((task, idx) => (
//               <Grid
//                 key={idx}
//                 container
//                 spacing={{ xs: 1, sm: 2 }}
//                 sx={{
//                   mb: 1,
//                   p: { xs: 1, sm: 2 },
//                   borderBottom: "1px solid #eee",
//                   "&:last-child": {
//                     borderBottom: "none",
//                   },
//                 }}
//               >
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{ wordBreak: "break-word", fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                   >
//                     {task.TaskName}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{ wordBreak: "break-word", fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                   >
//                     {task.TaskDescription}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{ wordBreak: "break-word", fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                   >
//                     {task.TaskType}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{ wordBreak: "break-word", fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                   >
//                     {task.Duration}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             ))}
//           </Paper>
//         </Box>
//       ))}
//     </>
//   );
// };

// export default TaskbreakDown;

import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MDBox from "components/MDBox";
import { useGlobalFilters } from "context/GlobalFilterContext";
import DataTable from "examples/Tables/DataTable";

const TaskbreakDown = () => {
  const { filteredData, loading } = useGlobalFilters();
  const tasks = filteredData.tasks || [];
  const tasks1 = filteredData.skillsInventry || [];
  console.log(tasks1);

  // Group by createdBy
  const groupedByUser = tasks.reduce((acc, task) => {
    const key = task.createdBy;
    if (!acc[key]) {
      acc[key] = {
        createdBy: key,
        photoUrl: task.photoUrl,
        tasks: [],
      };
    }
    acc[key].tasks.push(task);
    return acc;
  }, {});

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }
  const groupedUsers = Object.values(groupedByUser);

  // Define reusable columns for the DataTable
  const columns = [
    { Header: "Task Name", accessor: "TaskName", width: "30%" },
    { Header: "Task Description", accessor: "TaskDescription", width: "30%" },
    { Header: "Task Type", accessor: "TaskType", width: "20%" },
    { Header: "Duration (hrs)", accessor: "Duration", width: "20%" },
    { Header: "Created At ", accessor: "CreatedDateTime", width: "20%" },
  ];

  return (
    <>
      {groupedUsers.map((user, index) => {
        // Prepare rows for the current user
        const rows = user.tasks.map((task) => ({
          TaskName: task.TaskName,
          TaskDescription: task.TaskDescription,
          TaskType: task.TaskType,
          Duration: task.Duration,
          // CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(  ),
          CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        }));

        return (
          <Box key={index} p={{ xs: 1, sm: 2 }}>
            <Paper
              elevation={3}
              sx={{
                mb: { xs: 2, sm: 4 },
                p: { xs: 1, sm: 2 },
                overflow: "hidden",
              }}
            >
              <Box display="flex" alignItems="center" mb={2} gap={1}>
                <Avatar src={user.photoUrl} sx={{ bgcolor: "primary.main" }}>
                  {!user.photoUrl && <PersonIcon />}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    wordBreak: "break-word",
                  }}
                >
                  {user.createdBy}
                </Typography>
              </Box>

              <Card sx={{ mt: 2, boxShadow: 3 }}>
                <CardContent>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={true}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                    canSearch={true}
                  />
                </CardContent>
              </Card>
            </Paper>
          </Box>
        );
      })}
    </>
  );
};

export default TaskbreakDown;
