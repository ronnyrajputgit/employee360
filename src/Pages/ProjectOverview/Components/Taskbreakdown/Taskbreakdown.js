// import React from "react";
// import { Box, Typography, Paper, Avatar, Card, CardContent, CircularProgress } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";

// const TaskbreakDown = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const tasksBreakDownData = filteredData.tasks || [];

//   // Group by createdBy
//   const groupedByUser = tasksBreakDownData.reduce((acc, task) => {
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

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   const groupedUsers = Object.values(groupedByUser);

//   // Check if there are no records
//   if (groupedUsers.length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh" p={2}>
//         <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
//           <Typography variant="h6" color="textSecondary">
//             No records found
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             There are no tasks available to display.
//           </Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   // Define reusable columns for the DataTable
//   const columns = [
//     { Header: "Task Name", accessor: "TaskName", width: "30%" },
//     { Header: "Task Description", accessor: "TaskDescription", width: "30%" },
//     { Header: "Task Type", accessor: "TaskType", width: "20%" },
//     { Header: "Duration (hrs)", accessor: "Duration", width: "20%" },
//     { Header: "Created At ", accessor: "CreatedDateTime", width: "20%" },
//   ];

//   return (
//     <>
//       {groupedUsers.map((user, index) => {
//         // Prepare rows for the current user
//         const rows = user.tasks.map((task) => ({
//           TaskName: task.TaskName,
//           TaskDescription: task.TaskDescription,
//           TaskType: task.TaskType,
//           Duration: task.Duration,
//           CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString("en-GB", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false,
//           }),
//         }));

//         return (
//           <Box key={index} p={{ xs: 1, sm: 2 }}>
//             <Paper
//               elevation={3}
//               sx={{
//                 mb: { xs: 2, sm: 4 },
//                 p: { xs: 1, sm: 2 },
//                 overflow: "hidden",
//               }}
//             >
//               <Box display="flex" alignItems="center" mb={2} gap={1}>
//                 <Avatar src={user.photoUrl} sx={{ bgcolor: "primary.main" }}>
//                   {!user.photoUrl && <PersonIcon />}
//                 </Avatar>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.25rem" },
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {user.createdBy}
//                 </Typography>
//               </Box>

//               <Card sx={{ mt: 2, boxShadow: 3 }}>
//                 <CardContent>
//                   <DataTable
//                     table={{ columns, rows }}
//                     isSorted={true}
//                     entriesPerPage={true}
//                     showTotalEntries={true}
//                     noEndBorder
//                     canSearch={true}
//                   />
//                 </CardContent>
//               </Card>
//             </Paper>
//           </Box>
//         );
//       })}
//     </>
//   );
// };

// export default TaskbreakDown;

// src/Pages/ProjectOverview/Components/Taskbreakdown/Taskbreakdown.js

import React from "react";
import PropTypes from "prop-types"; // <-- 1. Yahan import add karein
import { Box, Typography, Paper, Avatar, Card, CardContent, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useGlobalFilters } from "context/GlobalFilterContext";
import DataTable from "examples/Tables/DataTable";

const TaskbreakDown = ({ isFullscreen }) => {
  // Default value ko propTypes se handle kar sakte hain
  const { filteredData, loading } = useGlobalFilters();
  const tasksBreakDownData = filteredData.tasks || [];

  const groupedByUser = tasksBreakDownData.reduce((acc, task) => {
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

  if (groupedUsers.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh" p={2}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            No records found
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            There are no tasks available to display.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const usersToRender = isFullscreen ? groupedUsers : groupedUsers.slice(0, 1);

  const columns = [
    { Header: "Task Name", accessor: "TaskName", width: "30%" },
    { Header: "Task Description", accessor: "TaskDescription", width: "30%" },
    { Header: "Task Type", accessor: "TaskType", width: "20%" },
    { Header: "Duration (hrs)", accessor: "Duration", width: "20%" },
    { Header: "Created At ", accessor: "CreatedDateTime", width: "20%" },
  ];

  return (
    <>
      {usersToRender.map((user, index) => {
        const rows = user.tasks.map((task) => ({
          TaskName: task.TaskName,
          TaskDescription: task.TaskDescription,
          TaskType: task.TaskType,
          Duration: task.Duration,
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
              sx={{ mb: { xs: 2, sm: 4 }, p: { xs: 1, sm: 2 }, overflow: "hidden" }}
            >
              <Box display="flex" alignItems="center" mb={2} gap={1}>
                <Avatar src={user.photoUrl} sx={{ bgcolor: "primary.main" }}>
                  {!user.photoUrl && <PersonIcon />}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, wordBreak: "break-word" }}
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

      {!isFullscreen && groupedUsers.length > 1 && (
        <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ mt: 2 }}>
          Showing 1 of {groupedUsers.length} resources. Click the fullscreen icon to view all.
        </Typography>
      )}
    </>
  );
};

// <-- 2. Yahan prop validation add karein -->
TaskbreakDown.propTypes = {
  isFullscreen: PropTypes.bool, // isFullscreen ek boolean (true/false) hona chahiye
};

// Default value set karne ka standard tareeka
TaskbreakDown.defaultProps = {
  isFullscreen: false,
};

export default TaskbreakDown;
