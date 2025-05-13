// with filter options
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { taskBreakdownProfilleData } from "apis/sharepointApi";

// Transform SharePoint data
const transformSharePointData = (data) => {
  return data.map((item) => {
    const fields = item.fields;
    return {
      taskName: fields.Title || "Untitled",
      description: fields.TaskDescription || "No description",
      duration: (fields.Duration_x0028_inHrs_x0029_ || 0) + " hrs",
      tasktype: fields.TaskType || "General",
      project: fields.ProjectType || "Other",
      customer: fields.Customer || "None",
      internal: fields.Internal || "None",
      createdBy: item.createdBy?.user?.displayName || "Unknown",
    };
  });
};

const TasksCompleted = () => {
  const [taskData, setTaskData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [projectType, setProjectType] = useState("");
  // const [customer, setCustomer] = useState("");
  // const [internal, setInternal] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const rawData = await taskBreakdownProfilleData();
        const transformed = transformSharePointData(rawData);
        setTaskData(transformed);
        setFilteredData(transformed);
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = [...taskData];

    if (searchName) {
      filtered = filtered.filter((task) =>
        task.taskName.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (projectType) {
      filtered = filtered.filter((task) => task.project === projectType);
    }
    if (createdBy) {
      filtered = filtered.filter((task) => task.createdBy === createdBy);
    }

    setFilteredData(filtered);
  }, [searchName, projectType, createdBy, taskData]);

  const totalTasks = filteredData.length;

  // Extract distinct filter options
  const createdByOptions = [...new Set(taskData.map((t) => t.createdBy))];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f8ff" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#1e90ff" }}>
        Tasks Completed
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Project Type</InputLabel>
            <Select
              value={projectType}
              label="Project Type"
              onChange={(e) => setProjectType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Internal Project">Internal Project</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Created By</InputLabel>
            <Select
              value={createdBy}
              label="Created By"
              onChange={(e) => setCreatedBy(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {createdByOptions.map((user, i) => (
                <MenuItem key={i} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Summary Card */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
                {totalTasks}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Tasks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Task Table */}
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container sx={{ fontWeight: "bold", py: 1, borderBottom: "1px solid #e0e0e0" }}>
            <Grid item xs={2} sx={{ color: "#1e90ff" }}>
              Task Name
            </Grid>
            <Grid item xs={3} sx={{ color: "#1e90ff" }}>
              Description
            </Grid>
            <Grid item xs={2} sx={{ color: "#1e90ff" }}>
              Project
            </Grid>
            <Grid item xs={2} sx={{ color: "#1e90ff" }}>
              Type
            </Grid>
            <Grid item xs={2} sx={{ color: "#1e90ff" }}>
              Duration
            </Grid>
            {/* <Grid item xs={1} sx={{ color: "#1e90ff" }}>
              Created By
            </Grid> */}
          </Grid>

          {filteredData.map((task, index) => (
            <Grid
              container
              key={index}
              sx={{ py: 1, borderBottom: "1px solid #e0e0e0", alignItems: "center" }}
            >
              <Grid item xs={2}>
                {task.taskName}
              </Grid>
              <Grid item xs={3}>
                {task.description}
              </Grid>
              <Grid item xs={2}>
                {task.project}
              </Grid>
              <Grid item xs={2}>
                {task.tasktype}
              </Grid>
              <Grid item xs={2}>
                {task.duration}
              </Grid>
              {/* <Grid item xs={1}>
                {task.createdBy}
              </Grid> */}
            </Grid>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TasksCompleted;

// import React, { useEffect, useState } from "react";
// import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";

// // Status color helper

// // Transform SharePoint data
// const transformSharePointData = (data) => {
//   const grouped = [];

//   data.forEach((item) => {
//     const fields = item.fields;
//     grouped.push({
//       taskName: fields.Title || "Untitled",
//       // status: fields.Status || "Not Started",
//       description: fields.TaskDescription || "No description",
//       duration: fields.Duration_x0028_inHrs_x0029_ + " hrs",
//       tasktype: fields.TaskType || "General",
//       project: fields.ProjectType,
//       // stakeholder: item.createdBy.user.displayName,
//     });
//   });

//   return grouped;
// };

// const TasksCompleted = () => {
//   const [taskData, setTaskData] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const rawData = await taskBreakdownProfilleData();
//         const transformed = transformSharePointData(rawData);
//         setTaskData(transformed);
//       } catch (error) {
//         console.error("Failed to load tasks", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const totalTasks = taskData.length;
//   const completedTasks = taskData.filter((task) => task.status === "Completed").length;
//   const inProgressTasks = taskData.filter((task) => task.status === "In Progress").length;
//   const onTimeCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

//   return (
//     <Box sx={{ padding: 3, backgroundColor: "#f0f8ff" }}>
//       <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 2, color: "#1e90ff" }}>
//           Tasks Completed
//         </Typography>
//       </Box>

//       {/* Summary Cards */}
//       <Grid container spacing={3} mb={3}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
//             <CardContent sx={{ textAlign: "center" }}>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Task List Table */}
//       <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
//         <CardContent>
//           <Grid container sx={{ fontWeight: "bold", py: 1, borderBottom: "1px solid #e0e0e0" }}>
//             <Grid item xs={2} sx={{ color: "#1e90ff" }}>
//               Task Name
//             </Grid>
//             <Grid item xs={4} sx={{ color: "#1e90ff" }}>
//               Description
//             </Grid>
//             <Grid item xs={2} sx={{ color: "#1e90ff" }}>
//               Project
//             </Grid>
//             <Grid item xs={2} sx={{ color: "#1e90ff" }}>
//               Type
//             </Grid>
//             <Grid item xs={2} sx={{ color: "#1e90ff" }}>
//               Duration
//             </Grid>
//           </Grid>

//           {taskData.map((task, index) => (
//             <Grid
//               container
//               key={index}
//               sx={{ py: 1, borderBottom: "1px solid #e0e0e0", alignItems: "center" }}
//             >
//               <Grid item xs={2}>
//                 {task.taskName}
//               </Grid>
//               <Grid item xs={4}>
//                 {task.description}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.project}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.tasktype}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.duration}
//               </Grid>
//             </Grid>
//           ))}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TasksCompleted;

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Grid,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   AppBar,
//   Toolbar,
// } from "@mui/material";
// import EventIcon from "@mui/icons-material/Event";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import AssessmentIcon from "@mui/icons-material/Assessment";

// const TasksCompleted = () => {
//   const [fullscreen, setFullscreen] = useState(false);

//   const mockData = {
//     tasksCompleted: 12,
//     inProgress: 3,
//     onTimeCompletion: "95%",
//     month: "April 2025",
//   };

//   const taskData = [
//     {
//       id: 1,
//       taskName: "Certificate Migration",
//       project: "DataINFA India Partner Account",
//       dueDate: "Mar 28, 2025",
//       status: "Completed",
//     },
//     {
//       id: 2,
//       taskName: "CDQ Bundle Requirement",
//       project: "Internal Process",
//       dueDate: "Mar 25, 2025",
//       status: "Completed",
//     },
//     {
//       id: 3,
//       taskName: "Exception Report Re-design",
//       project: "GE",
//       dueDate: "Apr 10, 2025",
//       status: "In Progress",
//     },
//     {
//       id: 4,
//       taskName: "Security Audit",
//       project: "Authentication Service",
//       dueDate: "Mar 20, 2025",
//       status: "Completed",
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: fullscreen ? "100vh" : "auto",
//         bgcolor: fullscreen ? "#fff" : "#f0f8ff", // Match BG color
//         zIndex: fullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: fullscreen ? 2 : 3, // Adjust padding
//       }}
//     >
//       <Box boxShadow={3} borderRadius={2} overflow="hidden">
//         {/* App Bar */}
//         <AppBar
//           position="static"
//           sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
//         >
//           <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <AssessmentIcon sx={{ mr: 1, color: "#1e88e5" }} />
//               <Typography variant="h6" color="inherit" fontWeight="bold">
//                 Tasks Completed
//               </Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Button color="primary" sx={{ mr: 1, textTransform: "capitalize" }}>
//                 Week
//               </Button>
//               <Button color="primary" sx={{ mr: 1, textTransform: "capitalize" }}>
//                 Month
//               </Button>
//               <Button color="primary" sx={{ mr: 1, textTransform: "capitalize" }}>
//                 Year
//               </Button>
//               <IconButton>
//                 <CalendarMonthIcon />
//               </IconButton>
//               <IconButton onClick={() => setFullscreen(!fullscreen)} sx={{ color: "#333" }}>
//                 {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//               </IconButton>
//               <IconButton>
//                 <MoreVertIcon />
//               </IconButton>
//             </Box>
//           </Toolbar>
//         </AppBar>

//         <Box px={3} py={3} bgcolor="#f0f8ff">
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={4}>
//               <Card
//                 sx={{
//                   textAlign: "center",
//                   boxShadow: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
//                   borderRadius: 1,
//                   p: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" color="#1e88e5" fontWeight="bold">
//                     {mockData.tasksCompleted}
//                   </Typography>
//                   <Typography color="textSecondary">Tasks Completed</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Card
//                 sx={{
//                   textAlign: "center",
//                   boxShadow: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
//                   borderRadius: 1,
//                   p: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" color="#1e88e5" fontWeight="bold">
//                     {mockData.inProgress}
//                   </Typography>
//                   <Typography color="textSecondary">In Progress</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Card
//                 sx={{
//                   textAlign: "center",
//                   boxShadow: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
//                   borderRadius: 1,
//                   p: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" color="#1e88e5" fontWeight="bold">
//                     {mockData.onTimeCompletion}
//                   </Typography>
//                   <Typography color="textSecondary">On-Time Completion</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>

//         <TableContainer
//         // component={Paper}
//         // sx={{
//         //   boxShadow: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
//         //   borderRadius: 1,
//         // }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableCell>Task Name</TableCell>
//                 <TableCell>Project</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {taskData.map((task) => (
//                 <TableRow key={task.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
//                   <TableCell component="th" scope="row">
//                     {task.taskName}
//                   </TableCell>
//                   <TableCell>{task.project}</TableCell>
//                   <TableCell>{task.dueDate}</TableCell>
//                   <TableCell >
//                     <Button
//                       variant="contained"
//                       size="small"
//                       style={{
//                         backgroundColor: task.status === "Completed" ? "#4caf50" : "#ff9800",
//                         color: "white",
//                         boxShadow: "none",
//                       }}
//                     >
//                       {task.status}
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default TasksCompleted;
