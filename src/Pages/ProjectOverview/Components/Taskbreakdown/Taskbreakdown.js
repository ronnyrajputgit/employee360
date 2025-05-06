// import React from "react";
// import { Box, Grid, Paper, Typography, Chip, Divider, Stack } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";

// const mockData = [
//   {
//     name: "Yogesh",
//     role: "Project Manager",
//     tasks: [
//       {
//         taskName: "Project Planning",
//         status: "Completed",
//         description: "Create project plan and resource allocation",
//         duration: "2 weeks",
//       },
//       {
//         taskName: "Stakeholder Meetings",
//         status: "In Progress",
//         description: "Regular meetings with key stakeholders",
//         duration: "Ongoing",
//       },
//       {
//         taskName: "Risk Assessment",
//         status: "Not Started",
//         description: "Identify and mitigate project risks",
//         duration: "1 week",
//       },
//     ],
//   },
//   {
//     name: "Ayush Balachandran",
//     role: "IDMC Lead Developer",
//     tasks: [
//       {
//         taskName: "Technical Architecture",
//         status: "Completed",
//         description: "Design system architecture and components",
//         duration: "3 weeks",
//       },
//       {
//         taskName: "ETL Framework Development",
//         status: "In Progress",
//         description: "Develop core ETL framework components",
//         duration: "6 weeks",
//       },
//       {
//         taskName: "Code Reviews",
//         status: "In Progress",
//         description: "Review team's code for quality and standards",
//         duration: "Ongoing",
//       },
//     ],
//   },
// ];

// const getStatusColor = (status) => {
//   switch (status) {
//     case "Completed":
//       return "success";
//     case "In Progress":
//       return "warning";
//     case "Not Started":
//       return "default";
//     default:
//       return "info";
//   }
// };

// const TaskBreakdown = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={3} sx={{ mb: 3, p: 2, bgcolor: "#0d6efd", color: "white" }}>
//         <Typography variant="h6">📊 Task Breakdown by Resources</Typography>
//       </Paper>

//       {mockData.map((resource, index) => (
//         <Paper key={index} elevation={2} sx={{ mb: 4, p: 2 }}>
//           <Grid container alignItems="center" spacing={1}>
//             <Grid item>
//               <PersonIcon fontSize="medium" color="primary" />
//             </Grid>
//             <Grid item>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 {resource.name} ({resource.role})
//               </Typography>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 2 }} />

//           <Grid container sx={{ fontWeight: "medium", mb: 1 }}>
//             <Grid item xs={3}>
//               Task Name
//             </Grid>
//             <Grid item xs={2}>
//               Status
//             </Grid>
//             <Grid item xs={5}>
//               Description
//             </Grid>
//             <Grid item xs={2}>
//               Duration
//             </Grid>
//           </Grid>

//           {resource.tasks.map((task, taskIndex) => (
//             <Grid container key={taskIndex} sx={{ mb: 1 }}>
//               <Grid item xs={3}>
//                 <Typography>{task.taskName}</Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <Chip label={task.status} color={getStatusColor(task.status)} size="small" />
//               </Grid>
//               <Grid item xs={5}>
//                 <Typography>{task.description}</Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <Typography>{task.duration}</Typography>
//               </Grid>
//             </Grid>
//           ))}
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default TaskBreakdown;

// import React from "react";
// import { Box, Typography, Paper, Grid, Chip, Avatar } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";

// const handleFetch = async () => {
//   // setLoading(true);
//   // setError("");

//   try {
//     const result = await taskBreakdownProfilleData();
//     // setData(result);
//     console.log(result);
//   } catch (err) {
//     console.error(err);
//     // setError("Failed to fetch SharePoint data.");
//   } finally {
//     // setLoading(false);
//   }
// };

// handleFetch();

// const roles = [
//   {
//     name: "Yogesh (Project Manager)",
//     tasks: [
//       {
//         name: "Project Planning",
//         status: "Completed",
//         description: "Create project plan and resource allocation",
//         duration: "2 weeks",
//       },
//       {
//         name: "Stakeholder Meetings",
//         status: "In Progress",
//         description: "Regular meetings with key stakeholders",
//         duration: "Ongoing",
//       },
//       {
//         name: "Risk Assessment",
//         status: "Not Started",
//         description: "Identify and mitigate project risks",
//         duration: "1 week",
//       },
//     ],
//   },
//   {
//     name: "Ayush Balachandran (IDMC Lead Developer)",
//     tasks: [
//       {
//         name: "Technical Architecture",
//         status: "Completed",
//         description: "Design system architecture and components",
//         duration: "3 weeks",
//       },
//     ],
//   },
// ];

// const getStatusColor = (status) => {
//   switch (status) {
//     case "Completed":
//       return "success";
//     case "In Progress":
//       return "warning";
//     case "Not Started":
//       return "default";
//     default:
//       return "primary";
//   }
// };

// const ProjectOverview = () => {
//   return (
//     <Box p={2}>
//       {roles.map((role, index) => (
//         <Paper key={index} elevation={3} sx={{ mb: 4, p: 2 }}>
//           {/* Role Header */}
//           <Box display="flex" alignItems="center" mb={2}>
//             <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
//               <PersonIcon />
//             </Avatar>
//             <Typography variant="h6">{role.name}</Typography>
//           </Box>

//           {/* Column Headers */}
//           <Grid
//             container
//             spacing={2}
//             sx={{
//               fontWeight: "bold",
//               bgcolor: "#f5f5f5",
//               py: 1,
//               borderBottom: "2px solid #ccc",
//               mb: 1,
//               p: 1,
//               borderBottom: "1px solid #eee",
//               alignItems: "center",
//             }}
//           >
//             <Grid item xs={12} md={3}>
//               <Typography variant="subtitle2">Task Name</Typography>
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <Typography variant="subtitle2">Status</Typography>
//             </Grid>
//             <Grid item xs={12} md={5}>
//               <Typography variant="subtitle2">Description</Typography>
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <Typography variant="subtitle2">Duration</Typography>
//             </Grid>
//           </Grid>

//           {/* Task Rows */}
//           {role.tasks.map((task, idx) => (
//             <Grid
//               key={idx}
//               container
//               spacing={2}
//               sx={{
//                 mb: 1,
//                 p: 1,
//                 borderBottom: "1px solid #eee",
//                 alignItems: "center",
//               }}
//             >
//               <Grid item xs={12} md={3}>
//                 <Typography variant="subtitle2">{task.name}</Typography>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <Chip label={task.status} color={getStatusColor(task.status)} variant="outlined" />
//               </Grid>
//               <Grid item xs={12} md={5}>
//                 <Typography variant="subtitle2">{task.description}</Typography>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <Typography variant="subtitle2">{task.duration}</Typography>
//               </Grid>
//             </Grid>
//           ))}
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default ProjectOverview;

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Chip, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { taskBreakdownProfilleData } from "apis/sharepointApi";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "warning";
    case "Not Started":
      return "default";
    default:
      return "primary";
  }
};

const transformSharePointData = (data) => {
  const grouped = {};

  data.forEach((item) => {
    const fields = item.fields;
    const stakeholderName = item.createdBy.user.displayName;

    if (!grouped[stakeholderName]) {
      grouped[stakeholderName] = {
        name: stakeholderName,
        tasks: [],
      };
    }

    grouped[stakeholderName].tasks.push({
      name: fields.Title || "Untitled",
      status: fields.Status || "Not Started",
      description: fields.TaskDescription || "No description",
      duration: fields.Duration_x0028_inHrs_x0029_ + " hrs",
    });
  });

  return Object.values(grouped);
};

const ProjectOverview = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await taskBreakdownProfilleData();
        const transformed = transformSharePointData(result);
        setRoles(transformed);
      } catch (err) {
        console.error("Failed to fetch SharePoint data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={2}>
      {roles.map((role, index) => (
        <Paper key={index} elevation={3} sx={{ mb: 4, p: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h6">{role.name}</Typography>
          </Box>

          <Grid
            container
            spacing={2}
            sx={{
              fontWeight: "bold",
              bgcolor: "#f5f5f5",
              py: 1,
              mb: 1,
              p: 1,
              borderBottom: "1px solid #eee",
            }}
          >
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2">Task Name</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2">Status</Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="subtitle2">Description</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2">Duration</Typography>
            </Grid>
          </Grid>

          {role.tasks.map((task, idx) => (
            <Grid
              key={idx}
              container
              spacing={2}
              sx={{ mb: 1, p: 1, borderBottom: "1px solid #eee" }}
            >
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle2">{task.name}</Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Chip label={task.status} color={getStatusColor(task.status)} variant="outlined" />
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="subtitle2">{task.description}</Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle2">{task.duration}</Typography>
              </Grid>
            </Grid>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default ProjectOverview;
