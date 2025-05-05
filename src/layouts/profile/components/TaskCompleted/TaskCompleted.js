import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";

// Mock Data
const taskData = [
  {
    taskName: "Certificate Migration",
    project: "DataINFA India Partner Account",
    dueDate: "Mar 28, 2025",
    status: "Completed",
  },
  {
    taskName: "CDQ Bundle Requirement",
    project: "Internal Process",
    dueDate: "Mar 25, 2025",
    status: "Completed",
  },
  {
    taskName: "Exception Report Re-design",
    project: "GE",
    dueDate: "Apr 10, 2025",
    status: "In Progress",
  },
  {
    taskName: "Security Audit",
    project: "Authentication Service",
    dueDate: "Mar 20, 2025",
    status: "Completed",
  },
];

const TasksCompleted = () => {
  // Calculate summary data
  const totalTasks = taskData.length;
  const completedTasks = taskData.filter((task) => task.status === "Completed").length;
  const inProgressTasks = taskData.filter((task) => task.status === "In Progress").length;
  const onTimeCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f8ff" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 2, color: "#1e90ff" }}>
          Tasks Completed
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
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
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
                {inProgressTasks}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
                {onTimeCompletion}%
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                On-Time Completion
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Task List Table */}
      <Card sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container sx={{ fontWeight: "bold", py: 1, borderBottom: "1px solid #e0e0e0" }}>
            <Grid item xs={3} sx={{ color: "#1e90ff" }}>
              Task Name
            </Grid>
            <Grid item xs={3} sx={{ color: "#1e90ff" }}>
              Project
            </Grid>
            <Grid item xs={3} sx={{ color: "#1e90ff" }}>
              Due Date
            </Grid>
            <Grid item xs={3} sx={{ color: "#1e90ff" }}>
              Status
            </Grid>
          </Grid>

          {/* Mapped Task Items */}
          {taskData.map((task, index) => (
            <Grid
              container
              key={index}
              sx={{ py: 1, borderBottom: "1px solid #e0e0e0", alignItems: "center" }}
            >
              <Grid item xs={3}>
                {task.taskName}
              </Grid>
              <Grid item xs={3}>
                {task.project}
              </Grid>
              <Grid item xs={3}>
                {task.dueDate}
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: task.status === "Completed" ? "#4caf50" : "#ff9800",
                    color: "white",
                  }}
                >
                  {task.status}
                </Button>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TasksCompleted;

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
