// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   IconButton,
// } from "@mui/material";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const TasksCompleted = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filters } = useGlobalFilters();

//   // Get tasks from global context
//   const taskData = filters.tasksData || [];

//   // Apply project type filter
//   const filteredTasks = taskData.filter((task) => {
//     if (!filters.selectedProjectType) return true;

//     const taskType = (task.ProjectType || "").trim();
//     const selectedType = filters.selectedProjectType.trim();

//     console.log("Comparing:", { taskType, selectedType }); // Debug log
//     return taskType === selectedType;
//   });

//   console.log("Current filters:", {
//     selectedType: filters.selectedProjectType,
//     totalTasks: taskData.length,
//     filteredCount: filteredTasks.length,
//   });

//   const totalTasks = filteredTasks.length;
//   const completedTasks = filteredTasks.filter((t) => t.status === "Completed").length;
//   const inProgressTasks = filteredTasks.filter((t) => t.status === "In Progress").length;

//   return (
//     <Box
//       sx={{
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: fullscreen ? "100vh" : "auto",
//         bgcolor: fullscreen ? "#fff" : "#f0f8ff",
//         zIndex: fullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: fullscreen ? 2 : 3,
//       }}
//     >
//       <AppBar
//         position="static"
//         sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <AssessmentIcon sx={{ mr: 1, color: "#1e88e5" }} />
//             <Typography variant="h6" color="inherit" fontWeight="bold">
//               Tasks Completed
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton onClick={() => setFullscreen(!fullscreen)} sx={{ color: "#333" }}>
//               {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3} mt={2}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card sx={{ mt: 4, boxShadow: 3 }}>
//         <CardContent>
//           <Grid container sx={{ fontWeight: "bold", py: 1, borderBottom: "1px solid #ccc" }}>
//             <Grid item xs={2}>
//               Task Name
//             </Grid>
//             <Grid item xs={3}>
//               Description
//             </Grid>
//             <Grid item xs={2}>
//               Project Type
//             </Grid>
//             <Grid item xs={2}>
//               Type
//             </Grid>
//             <Grid item xs={1}>
//               Duration
//             </Grid>
//             <Grid item xs={2}>
//               Stakeholder
//             </Grid>
//           </Grid>

//           {filteredTasks.map((task, idx) => (
//             <Grid
//               key={idx}
//               container
//               sx={{ py: 1, borderBottom: "1px solid #e0e0e0", alignItems: "center" }}
//             >
//               <Grid item xs={2}>
//                 {task.name}
//               </Grid>
//               <Grid item xs={3}>
//                 {task.description}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.ProjectType || "N/A"}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.tasktype}
//               </Grid>
//               <Grid item xs={1}>
//                 {task.duration}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.stakeholder}
//               </Grid>
//             </Grid>
//           ))}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TasksCompleted;

// ye shi kam kr rha ha
// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const TasksCompleted = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filteredData, loading } = useGlobalFilters();

//   // Get pre-filtered tasks directly from global context
//   const filteredTasks = filteredData.tasks || [];
//   console.log(filteredTasks);

//   const currentName = localStorage.getItem("currentName");

//   const totalTasks = filteredTasks.length;
//   const completedTasks = filteredTasks.filter((t) => t.status === "Completed").length;
//   const inProgressTasks = filteredTasks.filter((t) => t.status === "In Progress").length;

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (!loading && filteredTasks.length === 0) {
//     return null; // Don't render anything
//   }

//   return (
//     <Box
//       sx={{
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: fullscreen ? "100vh" : "auto",
//         bgcolor: fullscreen ? "#fff" : "#f0f8ff",
//         zIndex: fullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: fullscreen ? 2 : 3,
//       }}
//     >
//       <AppBar
//         position="static"
//         sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <AssessmentIcon sx={{ mr: 1, color: "#1e88e5" }} />
//             <Typography variant="h6" color="inherit" fontWeight="bold">
//               Tasks Completed
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton onClick={() => setFullscreen(!fullscreen)} sx={{ color: "#333" }}>
//               {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3} mt={2}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card sx={{ mt: 4, boxShadow: 3 }}>
//         <CardContent>
//           <Grid container sx={{ fontWeight: "bold", py: 1, borderBottom: "1px solid #ccc" }}>
//             <Grid item xs={2}>
//               Task Name
//             </Grid>
//             <Grid item xs={3}>
//               Description
//             </Grid>
//             <Grid item xs={2}>
//               Project Type
//             </Grid>
//             <Grid item xs={2}>
//               Type
//             </Grid>
//             <Grid item xs={1}>
//               Duration
//             </Grid>
//             <Grid item xs={2}>
//               Stakeholder
//             </Grid>
//           </Grid>

//           {filteredTasks.map((task, idx) => (
//             <Grid
//               key={idx}
//               container
//               sx={{ py: 1, borderBottom: "1px solid #e0e0e0", alignItems: "center" }}
//             >
//               <Grid item xs={2}>
//                 {task.TaskName}
//               </Grid>
//               <Grid item xs={3}>
//                 {task.TaskDescription}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.ProjectType || "N/A"}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.TaskType}
//               </Grid>
//               <Grid item xs={1}>
//                 {task.Duration}
//               </Grid>
//               <Grid item xs={2}>
//                 {task.createdBy}
//               </Grid>
//             </Grid>
//           ))}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TasksCompleted;

// isme apna dikhega
// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";
// import MDAvatar from "components/MDAvatar";

// const TasksCompleted = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const { filteredData, loading } = useGlobalFilters();

//   const filteredTasks = filteredData.tasks || [];
//   console.log(filteredTasks);

//   const currentName = (localStorage.getItem("currentName") || "").trim().toLowerCase();

//   const myTasks = filteredTasks.filter((task) => {
//     if (!task.createdBy) return false;
//     return task.createdBy.trim().toLowerCase() === currentName;
//   });

//   const totalTasks = myTasks.length;

//   const columns = [
//     { Header: "Photo", accessor: "photo" },
//     { Header: "Task Name", accessor: "TaskName" },
//     { Header: "Description", accessor: "TaskDescription" },
//     { Header: "Project Type", accessor: "ProjectType" },
//     { Header: "Type", accessor: "TaskType" },
//     { Header: "Duration", accessor: "Duration" },
//     { Header: "Created By", accessor: "createdBy" },
//     { Header: "Created At", accessor: "CreatedDateTime" },
//   ];

//   const rows = myTasks.map((task) => ({
//     photo: (
//       <MDAvatar
//         src={task.photoUrl || "https://via.placeholder.com/40"}
//         name={task.createdBy}
//         size="sm"
//       />
//     ),
//     TaskName: task.TaskName,
//     TaskDescription: task.TaskDescription,
//     ProjectType: task.ProjectType || "N/A",
//     TaskType: task.TaskType,
//     Duration: task.Duration,
//     createdBy: task.createdBy,
//     CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
//   }));

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (!loading && totalTasks === 0) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h6" color="textSecondary" textAlign="center">
//           No tasks found for your profile.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: fullscreen ? "100vh" : "auto",
//         bgcolor: fullscreen ? "#fff" : "#f0f8ff",
//         zIndex: fullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: fullscreen ? 2 : 3,
//       }}
//     >
//       <AppBar
//         position="static"
//         sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <AssessmentIcon sx={{ mr: 1, color: "#1e88e5" }} />
//             <Typography variant="h6" color="inherit" fontWeight="bold">
//               Tasks Completed
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton onClick={() => setFullscreen(!fullscreen)} sx={{ color: "#333" }}>
//               {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3} mt={2}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card sx={{ mt: 4, boxShadow: 3 }}>
//         <CardContent>
//           <DataTable
//             table={{ columns, rows }}
//             isSorted={false}
//             entriesPerPage={false}
//             showTotalEntries={true}
//             noEndBorder
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TasksCompleted;

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";
// import MDAvatar from "components/MDAvatar";

// const TasksCompleted = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const { filteredData, loading } = useGlobalFilters();

//   const filteredTasks = filteredData.tasks || [];
//   // console.log(filteredTasks);
//   const currentName = (localStorage.getItem("currentName") || "").trim().toLowerCase();

//   // alert(currentName);
//   const myTasks = filteredTasks.filter((task) => {
//     if (!task.createdBy) return false;
//     return task.createdBy.trim().toLowerCase() === currentName;
//   });

//   const totalTasks = myTasks.length;

//   const columns = [
//     { Header: "Task Name", accessor: "TaskName" },
//     { Header: "Description", accessor: "TaskDescription" },
//     { Header: "Project Type", accessor: "ProjectType" },
//     { Header: "Type", accessor: "TaskType" },
//     { Header: "Duration", accessor: "Duration" },
//     { Header: "Created By", accessor: "createdBy" },
//     { Header: "Created At", accessor: "CreatedDateTime" },
//   ];

//   const rows = myTasks.map((task) => ({
//     TaskName: task.TaskName,
//     TaskDescription: task.TaskDescription,
//     ProjectType: task.ProjectType || "N/A",
//     TaskType: task.TaskType,
//     Duration: task.Duration,
//     createdBy: task.createdBy,
//     CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
//   }));

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (!loading && totalTasks === 0) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h6" color="textSecondary" textAlign="center">
//           No tasks found for your profile.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         position: isFullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: isFullscreen ? "100vh" : "auto",
//         bgcolor: isFullscreen ? "#fff" : "#f0f8ff",
//         zIndex: isFullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: isFullscreen ? 2 : 3,
//       }}
//     >
//       <AppBar
//         position="static"
//         sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <AssessmentIcon sx={{ mr: 1, color: "#1e88e5" }} />
//             <Typography variant="h6" color="inherit" fontWeight="bold">
//               Tasks Completed
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
//               {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3} mt={2}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card sx={{ mt: 4, boxShadow: 3 }}>
//         <CardContent>
//           <DataTable
//             table={{ columns, rows }}
//             isSorted={false}
//             entriesPerPage={false}
//             showTotalEntries={true}
//             noEndBorder
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TasksCompleted;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";

// const TasksCompleted = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [currentName, setCurrentName] = useState("");

//   const { filteredData, loading } = useGlobalFilters();
//   const filteredTasks = filteredData.tasks || [];

//   useEffect(() => {
//     const name = (localStorage.getItem("currentName") || "").trim().toLowerCase();
//     setCurrentName(name);
//   }, []); // Runs only once on mount

//   const myTasks = filteredTasks.filter((task) => {
//     if (!task.createdBy) return false;
//     return task.createdBy.trim().toLowerCase() === currentName;
//   });

//   const totalTasks = myTasks.length;

//   const columns = [
//     { Header: "Task Name", accessor: "TaskName" },
//     { Header: "Description", accessor: "TaskDescription" },
//     { Header: "Project Type", accessor: "ProjectType" },
//     { Header: "Type", accessor: "TaskType" },
//     { Header: "Duration", accessor: "Duration" },
//     { Header: "Created By", accessor: "createdBy" },
//     { Header: "Created At", accessor: "CreatedDateTime" },
//   ];

//   const rows = myTasks.map((task) => ({
//     TaskName: task.TaskName,
//     TaskDescription: task.TaskDescription,
//     ProjectType: task.ProjectType || "N/A",
//     TaskType: task.TaskType,
//     Duration: task.Duration,
//     createdBy: task.createdBy,
//     CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
//   }));

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (!loading && totalTasks === 0) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h6" color="textSecondary" textAlign="center">
//           No tasks found for your profile.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         position: isFullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: isFullscreen ? "100vh" : "auto",
//         bgcolor: isFullscreen ? "#fff" : "#f0f8ff",
//         zIndex: isFullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: isFullscreen ? 2 : 3,
//       }}
//     >
//       <AppBar
//         position="static"
//         sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <AssessmentIcon sx={{ mr: 1, color: "#1e88e5" }} />
//             <Typography variant="h6" color="inherit" fontWeight="bold">
//               Tasks Completed
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
//               {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3} mt={2}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card sx={{ mt: 4, boxShadow: 3 }}>
//         <CardContent>
//           <DataTable
//             table={{ columns, rows }}
//             isSorted={false}
//             entriesPerPage={false}
//             showTotalEntries={true}
//             noEndBorder
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TasksCompleted;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";

// const TasksCompleted = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const { filteredData, loading } = useGlobalFilters();
//   const filteredTasks = filteredData.tasks || [];

//   const [currentName, setCurrentName] = useState(() => {
//     try {
//       const profile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
//       return (profile.displayName || "").trim().toLowerCase();
//     } catch (e) {
//       return "";
//     }
//   });

//   const myTasks = filteredTasks.filter((task) => {
//     if (!task.createdBy) return false;
//     return task.createdBy.trim().toLowerCase() === currentName;
//   });

//   const totalTasks = myTasks.length;

//   const columns = [
//     { Header: "Task Name", accessor: "TaskName" },
//     { Header: "Description", accessor: "TaskDescription" },
//     { Header: "Project Type", accessor: "ProjectType" },
//     { Header: "Type", accessor: "TaskType" },
//     { Header: "Duration", accessor: "Duration" },
//     { Header: "Created By", accessor: "createdBy" },
//     { Header: "Created At", accessor: "CreatedDateTime" },
//   ];

//   const rows = myTasks.map((task) => ({
//     TaskName: task.TaskName,
//     TaskDescription: task.TaskDescription,
//     ProjectType: task.ProjectType || "N/A",
//     TaskType: task.TaskType,
//     Duration: task.Duration,
//     createdBy: task.createdBy,
//     CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
//   }));

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (!loading && totalTasks === 0) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h6" color="textSecondary" textAlign="center">
//           No tasks found for your profile.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         position: isFullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: isFullscreen ? "100vh" : "auto",
//         // bgcolor: isFullscreen ? "#fff" : "#f0f8ff",
//         zIndex: isFullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: isFullscreen ? 2 : 3,
//       }}
//     >
//       <AppBar
//         position="static"
//         // sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
//         sx={{
//           backgroundColor: "#fff",
//           color: "#333",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           borderRadius: "12px", // Rounded corners
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <AssessmentIcon sx={{ mr: 1, color: "#1e88e5" }} />
//             <Typography variant="h6" color="inherit" fontWeight="bold">
//               Tasks Completed
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
//               {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3} mt={2}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card sx={{ mt: 4, boxShadow: 3 }}>
//         <CardContent>
//           <DataTable
//             canSearch
//             table={{ columns, rows }}
//             isSorted={false}
//             entriesPerPage={false}
//             showTotalEntries={true}
//             noEndBorder
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TasksCompleted;

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   IconButton,
//   CircularProgress,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   InputAdornment,
//   Paper,
//   Divider,
// } from "@mui/material";
// import {
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
//   Search as SearchIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";

// const TasksCompleted = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [createdByFilter, setCreatedByFilter] = useState("");
//   const { filteredData, loading } = useGlobalFilters();

//   // Get user profile and role
//   // const userProfile = {
//   //   displayName: "Test Executive",
//   //   jobTitle: "COO", // Hardcoded executive role
//   // };
//   const userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
//   const currentName = (userProfile.displayName || "").trim().toLowerCase();
//   const userRole = (userProfile.jobTitle || "").trim();

//   // Define role-based access
//   const executiveRoles = ["COO", "CPTO", "Director of Cloud Innovation", "AI & Program Management"];

//   const isExecutive = executiveRoles.some((role) =>
//     userRole.toLowerCase().includes(role.toLowerCase())
//   );

//   // Get all unique creators for filter dropdown
//   const allCreators = [
//     ...new Set(filteredData.tasks?.map((task) => task.createdBy).filter(Boolean)),
//   ];

//   // Filter tasks based on role and filters
//   const filteredTasks = (filteredData.tasks || []).filter((task) => {
//     // Role-based filtering
//     if (!isExecutive && task.createdBy?.toLowerCase() !== currentName) {
//       return false;
//     }

//     // Search term filtering
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       if (
//         !(
//           task.TaskName?.toLowerCase().includes(searchLower) ||
//           task.TaskDescription?.toLowerCase().includes(searchLower) ||
//           task.ProjectType?.toLowerCase().includes(searchLower) ||
//           task.TaskType?.toLowerCase().includes(searchLower) ||
//           task.createdBy?.toLowerCase().includes(searchLower)
//         )
//       ) {
//         return false;
//       }
//     }

//     // CreatedBy filter
//     if (createdByFilter && task.createdBy !== createdByFilter) {
//       return false;
//     }

//     return true;
//   });

//   const totalTasks = filteredTasks.length;

//   const columns = [
//     { Header: "Task Name", accessor: "TaskName" },
//     { Header: "Description", accessor: "TaskDescription" },
//     { Header: "Project Type", accessor: "ProjectType" },
//     { Header: "Type", accessor: "TaskType" },
//     { Header: "Duration", accessor: "Duration" },
//     { Header: "Created By", accessor: "createdBy" },
//     { Header: "Created At", accessor: "CreatedDateTime" },
//   ];

//   const rows = filteredTasks.map((task) => ({
//     TaskName: task.TaskName,
//     TaskDescription: task.TaskDescription,
//     ProjectType: task.ProjectType || "N/A",
//     TaskType: task.TaskType,
//     Duration: task.Duration,
//     createdBy: task.createdBy,
//     CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
//   }));

//   const handleResetFilters = () => {
//     setSearchTerm("");
//     setCreatedByFilter("");
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         position: isFullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         // background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
//         backgroundColor: "#fff",
//         width: "100%",
//         height: isFullscreen ? "100vh" : "auto",
//         zIndex: isFullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: isFullscreen ? 2 : 3,
//       }}
//     >
//       <Divider sx={{ my: 3 }} />
//       <Paper
//         elevation={3}
//         sx={{
//           borderRadius: 2,
//           p: 2,
//           background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
//           mb: 3,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
//           💼 Tasks Completed
//           {/* {isExecutive && "(Admin View)"} */}
//         </Typography>
//         <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
//           {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Paper>

//       {/* Filter Controls */}
//       {isExecutive && (
//         <Box
//           sx={{
//             mt: 3,
//             display: "flex",
//             alignItems: "flex-end",
//             gap: 2,
//             "& .MuiFormControl-root": {
//               marginTop: 0,
//               marginBottom: 0,
//             },
//             "& .MuiInputBase-root": {
//               height: "56px",
//               display: "flex",
//               alignItems: "center",
//             },
//           }}
//         >
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search tasks..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{
//               flex: 2,
//               "& .MuiInputBase-input": {
//                 padding: "16.5px 14px",
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start" sx={{ mr: 1 }}>
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//               endAdornment: searchTerm && (
//                 <InputAdornment position="end">
//                   <IconButton size="small" onClick={() => setSearchTerm("")}>
//                     <ClearIcon fontSize="small" />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {isExecutive && (
//             <FormControl sx={{ flex: 1, minWidth: 180 }}>
//               <InputLabel>Filter by Creator</InputLabel>
//               <Select
//                 value={createdByFilter}
//                 onChange={(e) => setCreatedByFilter(e.target.value)}
//                 label="Filter by Creator"
//                 sx={{
//                   "& .MuiSelect-select": {
//                     padding: "16.5px 14px",
//                   },
//                 }}
//               >
//                 <MenuItem value="">All Creators</MenuItem>
//                 {allCreators.map((creator) => (
//                   <MenuItem key={creator} value={creator}>
//                     {creator}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {(searchTerm || createdByFilter) && (
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleResetFilters}
//               startIcon={<ClearIcon />}
//               sx={{
//                 height: "56px",
//                 whiteSpace: "nowrap",
//                 mb: 0,
//                 px: 2,
//               }}
//             >
//               Reset
//             </Button>
//           )}
//         </Box>
//       )}

//       <Grid container spacing={3} mt={1}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {filteredTasks.length > 0 ? (
//         <Card sx={{ mt: 4, boxShadow: 3 }}>
//           <CardContent>
//             <DataTable
//               canSearch={false} // We're using our own search now
//               table={{ columns, rows }}
//               isSorted={false}
//               entriesPerPage={false}
//               showTotalEntries={true}
//               noEndBorder
//             />
//           </CardContent>
//         </Card>
//       ) : (
//         <Box
//           sx={{
//             mt: 4,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "200px",
//             backgroundColor: "#f5f5f5",
//             borderRadius: "16px",
//             gap: 2,
//           }}
//         >
//           <Typography variant="h6" color="textSecondary">
//             {searchTerm || createdByFilter
//               ? "No tasks found matching your criteria"
//               : "No tasks found"}
//           </Typography>
//           {(searchTerm || createdByFilter) && (
//             <Button
//               variant="contained"
//               color="warning"
//               onClick={handleResetFilters}
//               startIcon={<ClearIcon />}
//             >
//               Go Back
//             </Button>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default TasksCompleted;

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   IconButton,
//   CircularProgress,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   InputAdornment,
//   Paper,
//   Divider,
// } from "@mui/material";
// import {
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
//   Search as SearchIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";

// const TasksCompleted = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [createdByFilter, setCreatedByFilter] = useState("");
//   const { filteredData, loading } = useGlobalFilters();

//   // Get user profile and current name
//   const userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
//   const currentName = (userProfile.displayName || "").trim().toLowerCase();

//   // Get all unique creators for filter dropdown
//   const allCreators = [
//     ...new Set(filteredData.tasks?.map((task) => task.createdBy).filter(Boolean)),
//   ];

//   // Filter tasks assigned to current user only, and apply search/filter logic
//   const filteredTasks = (filteredData.tasks || []).filter((task) => {
//     if (task.createdBy?.toLowerCase() !== currentName) {
//       return false;
//     }

//     // Search term filtering
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       if (
//         !(
//           task.TaskName?.toLowerCase().includes(searchLower) ||
//           task.TaskDescription?.toLowerCase().includes(searchLower) ||
//           task.ProjectType?.toLowerCase().includes(searchLower) ||
//           task.TaskType?.toLowerCase().includes(searchLower) ||
//           task.createdBy?.toLowerCase().includes(searchLower)
//         )
//       ) {
//         return false;
//       }
//     }

//     // CreatedBy filter
//     if (createdByFilter && task.createdBy !== createdByFilter) {
//       return false;
//     }

//     return true;
//   });

//   const totalTasks = filteredTasks.length;

//   const columns = [
//     { Header: "Task Name", accessor: "TaskName" },
//     { Header: "Description", accessor: "TaskDescription" },
//     { Header: "Project Type", accessor: "ProjectType" },
//     { Header: "Type", accessor: "TaskType" },
//     { Header: "Duration", accessor: "Duration" },
//     { Header: "Created By", accessor: "createdBy" },
//     { Header: "Created At", accessor: "CreatedDateTime" },
//   ];

//   const rows = filteredTasks.map((task) => ({
//     TaskName: task.TaskName,
//     TaskDescription: task.TaskDescription,
//     ProjectType: task.ProjectType || "N/A",
//     TaskType: task.TaskType,
//     Duration: task.Duration,
//     createdBy: task.createdBy,
//     CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
//   }));

//   const handleResetFilters = () => {
//     setSearchTerm("");
//     setCreatedByFilter("");
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         position: isFullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         backgroundColor: "#fff",
//         width: "100%",
//         height: isFullscreen ? "100vh" : "auto",
//         zIndex: isFullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: isFullscreen ? 2 : 3,
//       }}
//     >
//       <Divider sx={{ my: 3 }} />
//       <Paper
//         elevation={3}
//         sx={{
//           borderRadius: 2,
//           p: 2,
//           background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
//           mb: 3,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
//           💼 Tasks Completed
//         </Typography>
//         <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
//           {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Paper>

//       {/* Filter Controls */}
//       <Box
//         sx={{
//           mt: 3,
//           display: "flex",
//           alignItems: "flex-end",
//           gap: 2,
//           "& .MuiFormControl-root": {
//             marginTop: 0,
//             marginBottom: 0,
//           },
//           "& .MuiInputBase-root": {
//             height: "56px",
//             display: "flex",
//             alignItems: "center",
//           },
//         }}
//       >
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search tasks..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{
//             flex: 2,
//             "& .MuiInputBase-input": {
//               padding: "16.5px 14px",
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start" sx={{ mr: 1 }}>
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//             endAdornment: searchTerm && (
//               <InputAdornment position="end">
//                 <IconButton size="small" onClick={() => setSearchTerm("")}>
//                   <ClearIcon fontSize="small" />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <FormControl sx={{ flex: 1, minWidth: 180 }}>
//           <InputLabel>Filter by Creator</InputLabel>
//           <Select
//             value={createdByFilter}
//             onChange={(e) => setCreatedByFilter(e.target.value)}
//             label="Filter by Creator"
//             sx={{
//               "& .MuiSelect-select": {
//                 padding: "16.5px 14px",
//               },
//             }}
//           >
//             <MenuItem value="">All Creators</MenuItem>
//             {allCreators.map((creator) => (
//               <MenuItem key={creator} value={creator}>
//                 {creator}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {(searchTerm || createdByFilter) && (
//           <Button
//             variant="contained"
//             color="success"
//             onClick={handleResetFilters}
//             startIcon={<ClearIcon />}
//             sx={{
//               height: "56px",
//               whiteSpace: "nowrap",
//               mb: 0,
//               px: 2,
//             }}
//           >
//             Reset
//           </Button>
//         )}
//       </Box>
//       <Grid container spacing={3} mt={1}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {filteredTasks.length > 0 ? (
//         <Card sx={{ mt: 4, boxShadow: 3 }}>
//           <CardContent>
//             <DataTable
//               canSearch={false}
//               table={{ columns, rows }}
//               isSorted={false}
//               entriesPerPage={false}
//               showTotalEntries={true}
//               noEndBorder
//             />
//           </CardContent>
//         </Card>
//       ) : (
//         <Box
//           sx={{
//             mt: 4,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "200px",
//             backgroundColor: "#f5f5f5",
//             borderRadius: "16px",
//             gap: 2,
//           }}
//         >
//           <Typography variant="h6" color="textSecondary">
//             {searchTerm || createdByFilter
//               ? "No tasks found matching your criteria"
//               : "No tasks found"}
//           </Typography>
//           {(searchTerm || createdByFilter) && (
//             <Button
//               variant="contained"
//               color="warning"
//               onClick={handleResetFilters}
//               startIcon={<ClearIcon />}
//             >
//               Go Back
//             </Button>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default TasksCompleted;

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@mui/icons-material";
import { useGlobalFilters } from "context/GlobalFilterContext";
import DataTable from "examples/Tables/DataTable";
import { useRoleBasedAccess } from "context/RoleBasedAccess";

const TasksCompleted = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { filteredData, loading } = useGlobalFilters();
  const { currentName } = useRoleBasedAccess();

  const filteredTasks = (filteredData.tasks || []).filter(
    (task) => task.createdBy?.toLowerCase() === currentName
  );

  const totalTasks = filteredTasks.length;

  const columns = [
    { Header: "Task Name", accessor: "TaskName" },
    { Header: "Description", accessor: "TaskDescription" },
    { Header: "Project Type", accessor: "ProjectType" },
    { Header: "Type", accessor: "TaskType" },
    { Header: "Duration", accessor: "Duration" },
    { Header: "Created By", accessor: "createdBy" },
    { Header: "Created At", accessor: "CreatedDateTime" },
  ];

  const rows = filteredTasks.map((task) => ({
    TaskName: task.TaskName,
    TaskDescription: task.TaskDescription,
    ProjectType: task.ProjectType || "N/A",
    TaskType: task.TaskType,
    Duration: task.Duration,
    createdBy: task.createdBy,
    CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
  }));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: isFullscreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
        width: "100%",
        height: isFullscreen ? "100vh" : "auto",
        zIndex: isFullscreen ? 9999 : "auto",
        overflow: "auto",
        transition: "all 0.3s ease-in-out",
        p: isFullscreen ? 2 : 3,
      }}
    >
      <Divider sx={{ my: 3 }} />
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 2,
          background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          💼 Tasks Completed
        </Typography>
        <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Paper>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} sm={3}>
          <Card
            sx={{
              width: 150,
              height: 150,
              // borderRadius: "50%",
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              mx: "auto", // center in grid
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                Total Tasks
              </Typography>
              <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
                {totalTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {filteredTasks.length > 0 ? (
        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <CardContent>
            <DataTable
              canSearch={true}
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={true}
              noEndBorder
            />
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            backgroundColor: "#f5f5f5",
            borderRadius: "16px",
            gap: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary">
            No tasks found for your name
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TasksCompleted;
