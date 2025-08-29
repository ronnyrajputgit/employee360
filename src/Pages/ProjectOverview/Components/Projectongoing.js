// import React from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   useMediaQuery,
//   CircularProgress,
// } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EmailIcon from "@mui/icons-material/Email";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import MDAvatar from "components/MDAvatar";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const Projectsongoing = () => {
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const { filteredData, loading } = useGlobalFilters();
//   const projectsData = filteredData.projects || [];

//   // console.log("i am active or inacttive ", activeSource.projects);
//   // console.log(projectsData);
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (!loading && projectsData.length === 0) {
//     return null; // Don't render anything
//   }

//   // if activeSource is ttrue return null

//   // if (!activeSource.projects) {
//   //   return null;
//   // }

//   return (
//     <Box p={2}>
//       <Grid container spacing={4}>
//         {projectsData.map((project, index) => (
//           <Grid item xs={12} key={index}>
//             <Card sx={{ borderLeft: "6px solid #2196f3", borderRadius: 3, mb: 3 }}>
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Typography
//                       variant="h5"
//                       sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
//                       gutterBottom
//                     >
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <BusinessIcon fontSize="small" />
//                         <Typography variant="body2">
//                           <strong>Project:</strong> {project.ProjectName}
//                         </Typography>
//                       </Box>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <AccessTimeIcon fontSize="small" />
//                         <Typography variant="body2">
//                           <strong>Shift:</strong> {project.ShiftTimings}
//                         </Typography>
//                       </Box>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <EmailIcon fontSize="small" />
//                         <Typography variant="body2">
//                           <strong>Owner:</strong> {project.ProjectOwnerName}
//                         </Typography>
//                       </Box>
//                     </Typography>
//                   </Grid>

//                   {/* Team Section */}
//                   <Grid item xs={12}>
//                     <Typography
//                       variant="h6"
//                       sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
//                       gutterBottom
//                     >
//                       <PeopleAltIcon /> Team Members
//                     </Typography>
//                     <Grid container spacing={2}>
//                       {project.TeamMembers?.length > 0 ? (
//                         project.TeamMembers.map((member, idx) => (
//                           <Grid item xs={12} sm={6} md={4} key={idx} sx={{ mt: 2, mb: 3 }}>
//                             <Card variant="outlined" sx={{ borderRadius: 2, pt: 6, pb: 2 }}>
//                               {/* Centered Avatar on Top */}
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   position: "absolute",
//                                   top: -30,
//                                   left: 0,
//                                   right: 0,
//                                 }}
//                               >
//                                 <MDAvatar src={member.photoUrl} name={member.name} size="xl" />
//                               </Box>

//                               <CardContent>
//                                 <Typography
//                                   variant="subtitle1"
//                                   fontWeight="bold"
//                                   textAlign="center"
//                                   gutterBottom
//                                 >
//                                   {member.name}
//                                 </Typography>

//                                 <Box
//                                   display="flex"
//                                   alignItems="center"
//                                   justifyContent="center"
//                                   mt={1}
//                                 >
//                                   <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                                   <Typography variant="caption">{member.email}</Typography>
//                                 </Box>
//                               </CardContent>
//                             </Card>
//                           </Grid>
//                         ))
//                       ) : (
//                         <Typography variant="body2" sx={{ ml: 2 }}>
//                           No team members assigned.
//                         </Typography>
//                       )}
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Projectsongoing;

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MDAvatar from "components/MDAvatar";
import { useGlobalFilters } from "context/GlobalFilterContext";

const ProjectsOngoing = ({ isFullscreen }) => {
  const { filteredData, loading } = useGlobalFilters();
  const projectsData = filteredData.projects || [];

  // Apply fullscreen logic
  const recordsToShow = isFullscreen ? projectsData : projectsData.slice(0, 1);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (projectsData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
        <Typography variant="h6" color="textSecondary">
          No ongoing projects found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={3}>
        {recordsToShow.map((project, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                borderLeft: "6px solid #1976d2",
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                backgroundColor: "#fff",
                "&:hover": { boxShadow: 6, transform: "scale(1.01)" },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <CardContent>
                {/* Project Details */}
                <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BusinessIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight="bold">
                        {project.ProjectName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon color="action" />
                      <Typography variant="body2">
                        <strong>Shift:</strong> {project.ShiftTimings || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <EmailIcon color="action" />
                      <Typography variant="body2">
                        <strong>Owner:</strong> {project.ProjectOwnerName || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Team Section */}
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <PeopleAltIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Team Members
                  </Typography>
                  <Chip
                    label={project.TeamMembers?.length || 0}
                    color="primary"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>

                <Grid container spacing={2}>
                  {project.TeamMembers?.length > 0 ? (
                    project.TeamMembers.map((member, idx) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: 2,
                            textAlign: "center",
                            p: 2,
                            position: "relative",
                            backgroundColor: "#f9f9f9",
                            "&:hover": {
                              boxShadow: 5,
                              transform: "translateY(-3px)",
                            },
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          {/* Avatar */}
                          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                            <MDAvatar src={member.photoUrl} name={member.name} size="lg" />
                          </Box>

                          {/* Name */}
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            {member.name || "Unnamed"}
                          </Typography>

                          {/* Email */}
                          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                            <EmailIcon sx={{ fontSize: 16, color: "#666" }} />
                            <Typography
                              variant="caption"
                              sx={{ color: "#666", wordBreak: "break-all" }}
                            >
                              {member.email || "N/A"}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ ml: 2, color: "text.secondary" }}>
                      No team members assigned.
                    </Typography>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Hint text for non-fullscreen mode */}
      {!isFullscreen && projectsData.length > 1 && (
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="center"
          sx={{ mt: 2, fontStyle: "italic" }}
        >
          Showing 1 of {projectsData.length} projects. Click the fullscreen icon on the header to
          view all.
        </Typography>
      )}
    </Box>
  );
};

ProjectsOngoing.propTypes = {
  isFullscreen: PropTypes.bool,
};

ProjectsOngoing.defaultProps = {
  isFullscreen: false,
};

export default ProjectsOngoing;
