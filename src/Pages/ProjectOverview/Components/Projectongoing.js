import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MDAvatar from "components/MDAvatar";
import { useGlobalFilters } from "context/GlobalFilterContext";

const Projectsongoing = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { filteredData, loading } = useGlobalFilters();
  const projectsData = filteredData.projects || [];

  // console.log("i am active or inacttive ", activeSource.projects);
  // console.log(projectsData);
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!loading && projectsData.length === 0) {
    return null; // Don't render anything
  }

  // if activeSource is ttrue return null

  // if (!activeSource.projects) {
  //   return null;
  // }

  return (
    <Box p={2}>
      <Grid container spacing={4}>
        {projectsData.map((project, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ borderLeft: "6px solid #2196f3", borderRadius: 3, mb: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
                      gutterBottom
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <BusinessIcon fontSize="small" />
                        <Typography variant="body2">
                          <strong>Project:</strong> {project.ProjectName}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" />
                        <Typography variant="body2">
                          <strong>Shift:</strong> {project.ShiftTimings}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <EmailIcon fontSize="small" />
                        <Typography variant="body2">
                          <strong>Owner:</strong> {project.ProjectOwnerName}
                        </Typography>
                      </Box>
                    </Typography>
                  </Grid>

                  {/* Team Section */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
                      gutterBottom
                    >
                      <PeopleAltIcon /> Team Members
                    </Typography>
                    <Grid container spacing={2}>
                      {project.TeamMembers?.length > 0 ? (
                        project.TeamMembers.map((member, idx) => (
                          <Grid item xs={12} sm={6} md={4} key={idx} sx={{ mt: 2, mb: 3 }}>
                            <Card variant="outlined" sx={{ borderRadius: 2, pt: 6, pb: 2 }}>
                              {/* Centered Avatar on Top */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  position: "absolute",
                                  top: -30,
                                  left: 0,
                                  right: 0,
                                }}
                              >
                                <MDAvatar src={member.photoUrl} name={member.name} size="xl" />
                              </Box>

                              <CardContent>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  textAlign="center"
                                  gutterBottom
                                >
                                  {member.name}
                                </Typography>

                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  mt={1}
                                >
                                  <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                  <Typography variant="caption">{member.email}</Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                      ) : (
                        <Typography variant="body2" sx={{ ml: 2 }}>
                          No team members assigned.
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projectsongoing;

// import { useGlobalFilters } from "context/GlobalFilterContext";
// import React from "react";

// const Projectongoing = () => {
//   const { filteredData, loading } = useGlobalFilters();

//   const projects = filteredData.projects || [];
//   const tasks = filteredData.tasks || [];

//   return (
//     <div>
//       <h3>Projects</h3>
//       <ul>
//         {loading ? (
//           <li>Loading...</li>
//         ) : (
//           projects.map((proj, i) => (
//             <li key={`proj-${i}`}>
//               <strong>{proj.ProjectName}</strong> - Created By: {proj.CreatedBy}
//               <img src={proj.photoUrl} alt="Project Image" />
//             </li>
//           ))
//         )}
//       </ul>

//       <h3>Tasks</h3>
//       <ul>
//         {loading ? (
//           <li>Loading...</li>
//         ) : (
//           tasks.map((task, i) => (
//             <li key={`task-${i}`}>
//               <strong>{task.TaskNames}</strong> - Type: {task.TaskType}, Project Type:{" "}
//               {task.ProjectType}, Created By: {task.createdBy}
//               <img src={task.photoUrl} alt="Task Image" />
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Projectongoing;
