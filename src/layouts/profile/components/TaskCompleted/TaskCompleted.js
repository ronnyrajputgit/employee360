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

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useGlobalFilters } from "context/GlobalFilterContext";
import DataTable from "examples/Tables/DataTable";
import MDAvatar from "components/MDAvatar";

const TasksCompleted = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { filteredData, loading } = useGlobalFilters();

  const filteredTasks = filteredData.tasks || [];
  // console.log(filteredTasks);
  const currentName = (localStorage.getItem("currentName") || "").trim().toLowerCase();

  const myTasks = filteredTasks.filter((task) => {
    if (!task.createdBy) return false;
    return task.createdBy.trim().toLowerCase() === currentName;
  });

  const totalTasks = myTasks.length;

  const columns = [
    { Header: "Task Name", accessor: "TaskName" },
    { Header: "Description", accessor: "TaskDescription" },
    { Header: "Project Type", accessor: "ProjectType" },
    { Header: "Type", accessor: "TaskType" },
    { Header: "Duration", accessor: "Duration" },
    { Header: "Created By", accessor: "createdBy" },
    { Header: "Created At", accessor: "CreatedDateTime" },
  ];

  const rows = myTasks.map((task) => ({
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

  if (!loading && totalTasks === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="textSecondary" textAlign="center">
          No tasks found for your profile.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: isFullscreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: isFullscreen ? "100vh" : "auto",
        bgcolor: isFullscreen ? "#fff" : "#f0f8ff",
        zIndex: isFullscreen ? 9999 : "auto",
        overflow: "auto",
        transition: "all 0.3s ease-in-out",
        p: isFullscreen ? 2 : 3,
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AssessmentIcon sx={{ mr: 1, color: "#1e88e5" }} />
            <Typography variant="h6" color="inherit" fontWeight="bold">
              Tasks Completed
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
                {totalTasks}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Total Tasks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 4, boxShadow: 3 }}>
        <CardContent>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={true}
            noEndBorder
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TasksCompleted;
