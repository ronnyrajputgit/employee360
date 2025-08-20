// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   IconButton,
//   CircularProgress,
//   Paper,
//   Divider,
// } from "@mui/material";
// import {
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";
// import { useRoleBasedAccess } from "context/RoleBasedAccess";
// import { useSearchParams } from "react-router-dom";

// const TasksCompleted = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const { filteredData, loading } = useGlobalFilters();
//   const { currentName, isExecutive } = useRoleBasedAccess();
//   const [searchParams] = useSearchParams();
//   const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);

//   useEffect(() => {
//     // Check if there's an email query parameter (from executive viewing a profile)
//     const emailParam = searchParams.get("email");
//     if (emailParam && isExecutive) {
//       setViewingEmployeeEmail(emailParam);
//     } else {
//       setViewingEmployeeEmail(null);
//     }
//   }, [searchParams, isExecutive]);

//   // Filter tasks based on whether we're viewing a specific employee's tasks or current user's tasks
//   const filteredTasks = (filteredData.tasks || []).filter((task) => {
//     if (viewingEmployeeEmail) {
//       // Show tasks for the employee being viewed (executive view)
//       return task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
//     } else {
//       // Show tasks for the current user (normal view)
//       return task.createdBy?.toLowerCase() === currentName.toLowerCase();
//     }
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
//           💼 {viewingEmployeeEmail ? "Employee's Tasks" : "Tasks Completed"}
//         </Typography>
//         <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
//           {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Paper>

//       <Grid container spacing={3} mt={1}>
//         <Grid item xs={12} sm={3}>
//           <Card
//             sx={{
//               width: 150,
//               height: 150,
//               boxShadow: 3,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               mx: "auto",
//             }}
//           >
//             <CardContent>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {filteredTasks.length > 0 ? (
//         <Card sx={{ mt: 4, boxShadow: 3 }}>
//           <CardContent>
//             <DataTable
//               canSearch={true}
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
//             {viewingEmployeeEmail
//               ? "No tasks found for this employee " + viewingEmployeeEmail
//               : "No tasks found for your name" + currentName}
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default TasksCompleted;

import React, { useState, useEffect } from "react";
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
import { useSearchParams } from "react-router-dom";

const TasksCompleted = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { filteredData, loading } = useGlobalFilters();
  const { currentName, isExecutive } = useRoleBasedAccess();
  const [searchParams] = useSearchParams();
  const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);
  // 1. Add a new state to hold the tasks that should be displayed on the screen.
  const [displayedTasks, setDisplayedTasks] = useState([]);

  useEffect(() => {
    // Check if there's an email query parameter (from executive viewing a profile)
    const emailParam = searchParams.get("email");
    if (emailParam && isExecutive) {
      setViewingEmployeeEmail(emailParam);
    } else {
      setViewingEmployeeEmail(null);
    }
  }, [searchParams, isExecutive]);

  // 2. Use useEffect to filter tasks whenever the source data changes.
  // This hook will run again when `filteredData`, `currentName`, or `viewingEmployeeEmail` is updated.
  useEffect(() => {
    // Make sure we have tasks and a name/email to filter by before proceeding.
    if (!filteredData.tasks || (!currentName && !viewingEmployeeEmail)) {
      setDisplayedTasks([]); // Clear tasks if conditions aren't met
      return;
    }

    const tasksToFilter = filteredData.tasks || [];
    const filtered = tasksToFilter.filter((task) => {
      if (viewingEmployeeEmail) {
        // Show tasks for the employee being viewed (executive view)
        return task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
      } else if (currentName) {
        // Show tasks for the current user (normal view)
        return task.createdBy?.toLowerCase() === currentName.toLowerCase();
      }
      return false; // Return false if neither condition is met
    });

    setDisplayedTasks(filtered);
  }, [filteredData, currentName, viewingEmployeeEmail]); // Dependencies array

  // 3. Use the new `displayedTasks` state from now on.
  const totalTasks = displayedTasks.length;

  const columns = [
    { Header: "Task Name", accessor: "TaskName" },
    { Header: "Description", accessor: "TaskDescription" },
    { Header: "Project Type", accessor: "ProjectType" },
    { Header: "Type", accessor: "TaskType" },
    { Header: "Duration", accessor: "Duration" },
    { Header: "Created By", accessor: "createdBy" },
    { Header: "Created At", accessor: "CreatedDateTime" },
  ];

  const rows = displayedTasks.map((task) => ({
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
          💼 {viewingEmployeeEmail ? "Employee's Tasks" : "Tasks Completed"}
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
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              mx: "auto",
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

      {/* 4. Update the conditional rendering to use the new state */}
      {displayedTasks.length > 0 ? (
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
            {viewingEmployeeEmail
              ? "No tasks found for this employee " + viewingEmployeeEmail
              : "No tasks found for your name " + currentName}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TasksCompleted;
