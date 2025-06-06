// import React, { useState } from "react";
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

// const TasksCompleted = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const { filteredData, loading } = useGlobalFilters();
//   const { currentName } = useRoleBasedAccess();

//   const filteredTasks = (filteredData.tasks || []).filter(
//     (task) => task.createdBy?.toLowerCase() === currentName
//   );
//   console.log(filteredTasks);

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
//           💼 Tasks Completed
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
//               // borderRadius: "50%",
//               boxShadow: 3,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               mx: "auto", // center in grid
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
//             No tasks found for your name
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
import { useLocation } from "react-router-dom"; // Import useLocation

const TasksCompleted = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { filteredData, loading } = useGlobalFilters(); // filteredData.tasks contains all tasks
  const { currentName, isExecutive } = useRoleBasedAccess(); // Get logged-in user's name/email and executive status
  const location = useLocation(); // Hook to access the URL's query parameters

  const [tasksToDisplay, setTasksToDisplay] = useState([]);
  const [displayingForEmail, setDisplayingForEmail] = useState(""); // State to hold the email whose tasks are being displayed

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const employeeEmailFromUrl = queryParams.get("email"); // Get email from URL query parameter

    let targetEmailForTasks = "";

    // Determine which email's tasks to display
    if (employeeEmailFromUrl && isExecutive) {
      // If an email is provided in the URL AND the user is an executive,
      // display tasks for that specific employee.
      targetEmailForTasks = employeeEmailFromUrl;
    } else {
      // Otherwise (no email in URL, or not an executive),
      // display tasks for the currently logged-in user.
      // IMPORTANT: currentName from useRoleBasedAccess must be the email or a unique identifier that matches task.Email
      targetEmailForTasks = currentName;
    }

    // Set the email that is currently being displayed (for UI messages)
    setDisplayingForEmail(targetEmailForTasks);

    // Filter tasks based on the determined target email
    const filtered = (filteredData.tasks || []).filter((task) => {
      // Use task.Email for comparison, as per your clarification
      const taskEmail = String(task.Email || "")
        .trim()
        .toLowerCase(); // Ensure task.Email is used
      const target = String(targetEmailForTasks || "")
        .trim()
        .toLowerCase();

      return taskEmail === target;
    });

    setTasksToDisplay(filtered);

    // Log for debugging:
    console.log(
      "TasksCompleted - Current filteredData.tasks (first few):",
      filteredData.tasks.slice(0, 5)
    ); // Log only first few for brevity
    if (filteredData.tasks.length > 0) {
      console.log("TasksCompleted - Example task.Email:", filteredData.tasks[0]?.Email);
      console.log(
        "TasksCompleted - Example task.createdBy (display name):",
        filteredData.tasks[0]?.createdBy
      );
    }
    console.log("TasksCompleted - Email from URL:", employeeEmailFromUrl);
    console.log("TasksCompleted - Logged-in currentName (expected email):", currentName);
    console.log("TasksCompleted - Is Executive:", isExecutive);
    console.log("TasksCompleted - Target Email for Filtering:", targetEmailForTasks);
    console.log("TasksCompleted - Tasks to Display (count):", filtered.length);
    console.log("TasksCompleted - Actual Tasks Displayed:", filtered);
  }, [filteredData.tasks, currentName, isExecutive, location.search]); // Dependencies: re-run when these values change

  const totalTasks = tasksToDisplay.length;

  const columns = [
    { Header: "Task Name", accessor: "TaskName" },
    { Header: "Description", accessor: "TaskDescription" },
    { Header: "Project Type", accessor: "ProjectType" },
    { Header: "Type", accessor: "TaskType" },
    { Header: "Duration", accessor: "Duration" },
    { Header: "Created By (Display Name)", accessor: "createdBy" }, // Still display name here
    { Header: "Created By (Email)", accessor: "Email" }, // Added for clarity, if you want to show email
    { Header: "Created At", accessor: "CreatedDateTime" },
  ];

  const rows = tasksToDisplay.map((task) => ({
    TaskName: task.TaskName,
    TaskDescription: task.TaskDescription,
    ProjectType: task.ProjectType || "N/A",
    TaskType: task.TaskType,
    Duration: task.Duration,
    createdBy: task.createdBy, // This will be the display name
    Email: task.Email, // This will be the email
    CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
  }));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // Access control for displaying other employee's tasks
  const queryParams = new URLSearchParams(location.search);
  const employeeEmailFromUrl = queryParams.get("email");

  // If a non-executive tries to view someone else's tasks via URL email
  if (
    !isExecutive &&
    employeeEmailFromUrl &&
    String(employeeEmailFromUrl).toLowerCase() !== String(currentName || "").toLowerCase()
  ) {
    return (
      <Box sx={{ p: 2 }}>
        <Card sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            You are not authorized to view other employees tasks.
          </Typography>
          <Typography variant="body2" mt={2}>
            Only executive users can access this feature.
          </Typography>
        </Card>
      </Box>
    );
  }

  // If there's no data to display after filtering (could be empty tasks list or no match)
  if (tasksToDisplay.length === 0) {
    return (
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
          p: 2, // Added padding
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No tasks found for{" "}
          {displayingForEmail &&
          displayingForEmail.toLowerCase() !== String(currentName || "").toLowerCase()
            ? displayingForEmail.split("@")[0]
            : "you"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please check the selected filters or if tasks are assigned.
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
          💼 Tasks Completed{" "}
          {displayingForEmail &&
          displayingForEmail.toLowerCase() !== String(currentName || "").toLowerCase()
            ? `for ${displayingForEmail.split("@")[0]}` // Display for the clicked user if not current user
            : "for You"}{" "}
          {/* Default text for logged-in user */}
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

      {/* DataTable is rendered only if tasksToDisplay.length > 0 */}
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
    </Box>
  );
};

export default TasksCompleted;
