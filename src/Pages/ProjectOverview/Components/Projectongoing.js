// import React from "react";
// import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
// import { Email, AccessTime, Public, CalendarMonth, Group } from "@mui/icons-material";

// const projectData = {
//   company: "North Oil Corporation",
//   geography: "EMEA",
//   shift: "9:00 AM - 7:00 PM IST",
//   startDate: "November 15, 2024",
//   team: [
//     { name: "Yogesh", role: "Project Manager", email: "Yogesh@datainfa.com" },
//     { name: "Ayush Balachandran", role: "IDMC Lead Developer", email: "ayush.b@datainfa.com" },
//     { name: "Neha Gupta", role: "MDM Architect", email: "neha@datainfa.com" },
//     { name: "Balam Ashok", role: "MDM Developer", email: "ashok@datainfa.com" },
//     { name: "Swati Kumari", role: "IDMC Developer", email: "swati@datainfa.com" },
//   ],
// };

// const Projectsongoing = () => {
//   return (
//     <Box p={2}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card sx={{ borderLeft: "5px solid #1976d2", borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold" gutterBottom>
//                 {projectData.company}
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Box display="flex" alignItems="center">
//                     <Public fontSize="small" sx={{ mr: 1 }} />
//                     <Typography>
//                       <strong>Geography:</strong> {projectData.geography}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Box display="flex" alignItems="center">
//                     <AccessTime fontSize="small" sx={{ mr: 1 }} />
//                     <Typography>
//                       <strong>Shift Timings:</strong> {projectData.shift}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Box display="flex" alignItems="center">
//                     <CalendarMonth fontSize="small" sx={{ mr: 1 }} />
//                     <Typography>
//                       <strong>Start Date:</strong> {projectData.startDate}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card sx={{ borderRight: "5px solid #1976d2", borderRadius: 2 }}>
//             <CardContent>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Group fontSize="medium" sx={{ mr: 1 }} />
//                 <Typography variant="h6" fontWeight="bold">
//                   Team Members
//                 </Typography>
//               </Box>
//               <Grid container spacing={2}>
//                 {projectData.team.map((member, index) => (
//                   <Grid item xs={12} sm={6} key={index}>
//                     <Card
//                       variant="outlined"
//                       sx={{ borderRadius: 2, borderTop: "4px solid #7b1fa2" }}
//                     >
//                       <CardContent>
//                         <Typography variant="subtitle1" fontWeight="bold">
//                           {member.name}
//                         </Typography>
//                         <Typography variant="body2" color="primary">
//                           {member.role}
//                         </Typography>
//                         <Box display="flex" alignItems="center" mt={1}>
//                           <Email fontSize="small" sx={{ mr: 1 }} />
//                           <Typography variant="body2">{member.email}</Typography>
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Projectsongoing;

// import React from "react";
// import { Box, Card, CardContent, Grid, Typography, Divider, Avatar } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import PublicIcon from "@mui/icons-material/Public";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import EmailIcon from "@mui/icons-material/Email";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// const companies = [
//   {
//     name: "North Oil Corporation",
//     geography: "EMEA",
//     shift: "9:00 AM - 7:00 PM IST",
//     startDate: "November 15, 2024",
//     team: [
//       {
//         name: "Yogesh",
//         role: "Project Manager",
//         email: "yogesh@datainfa.com",
//       },
//       {
//         name: "Ayush Balachandran",
//         role: "IDMC Lead Developer",
//         email: "ayush.b@datainfa.com",
//       },
//       {
//         name: "Neha Gupta",
//         role: "MDM Architect",
//         email: "neha@datainfa.com",
//       },
//       {
//         name: "Balam Ashok",
//         role: "MDM Developer",
//         email: "ashok@datainfa.com",
//       },
//       {
//         name: "Swati Kumari",
//         role: "IDMC Developer",
//         email: "swati@datainfa.com",
//       },
//     ],
//   },
//   {
//     name: "TechNova Solutions",
//     geography: "APAC",
//     shift: "10:00 AM - 6:00 PM IST",
//     startDate: "March 1, 2025",
//     team: [
//       {
//         name: "Arjun Mehta",
//         role: "Delivery Head",
//         email: "arjun@technova.com",
//       },
//       {
//         name: "Riya Sen",
//         role: "Senior Developer",
//         email: "riya@technova.com",
//       },
//       {
//         name: "Dev Patel",
//         role: "QA Engineer",
//         email: "dev@technova.com",
//       },
//     ],
//   },
// ];

// const Projectsongoing = () => {
//   return (
//     <Box p={2}>
//       <Grid container spacing={4}>
//         {companies.map((company, index) => (
//           <Grid item xs={12} key={index}>
//             <Card sx={{ borderLeft: "6px solid #2196f3", borderRadius: 3 }}>
//               <CardContent>
//                 <Grid container spacing={2}>
//                   {/* Company Info - 4 Columns */}
//                   <Grid item xs={12} md={4}>
//                     <Typography
//                       variant="h5"
//                       sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       gutterBottom
//                     >
//                       <BusinessIcon /> {company.name}
//                     </Typography>
//                     <Box mb={1} display="flex" alignItems="center" gap={1}>
//                       <PublicIcon fontSize="small" />
//                       <Typography variant="body1">
//                         <strong>Geography:</strong> {company.geography}
//                       </Typography>
//                     </Box>
//                     <Box mb={1} display="flex" alignItems="center" gap={1}>
//                       <AccessTimeIcon fontSize="small" />
//                       <Typography variant="body1">
//                         <strong>Shift Timings:</strong> {company.shift}
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <CalendarMonthIcon fontSize="small" />
//                       <Typography variant="body1">
//                         <strong>Start Date:</strong> {company.startDate}
//                       </Typography>
//                     </Box>
//                   </Grid>

//                   {/* Team Members - 8 Columns */}
//                   <Grid item xs={12} md={8}>
//                     <Typography
//                       variant="h6"
//                       sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       gutterBottom
//                     >
//                       <PeopleAltIcon /> Team Members
//                     </Typography>
//                     <Grid container spacing={2}>
//                       {company.team.map((member, idx) => (
//                         <Grid item xs={12} sm={6} md={4} key={idx}>
//                           <Card variant="outlined" sx={{ borderRadius: 2 }}>
//                             <CardContent>
//                               <Typography variant="subtitle1" fontWeight="bold">
//                                 {member.name}
//                               </Typography>
//                               <Typography variant="body2" color="primary">
//                                 {member.role}
//                               </Typography>
//                               <Box display="flex" alignItems="center" mt={1}>
//                                 <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                                 <Typography variant="caption">{member.email}</Typography>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </Grid>
//                       ))}
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

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   Divider,
//   Avatar,
//   useMediaQuery,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import PublicIcon from "@mui/icons-material/Public";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import EmailIcon from "@mui/icons-material/Email";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import { fetchTaskListsData } from "apis/sharepointApi";
// import MDAvatar from "components/MDAvatar";
// import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
// import MDInput from "components/MDInput";

// const Projectsongoing = () => {
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const [projectsData, setProjectsData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchTaskListsData();
//         setProjectsData(data);
//         // console.log("Projects and Task Types:", data);
//       } catch (error) {
//         console.error("Error fetching projects:", error); // Fixed typo in error message
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("Projects Data:", projectsData);
//   return (
//     <Box p={2}>
//       <Grid container spacing={4}>
//         {/* for filter */}
//         <Grid item xs={12} lg={12}>
//           <Card>
//             <MDBox p={2}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} lg={6}>
//                   <MDInput select size="small" label="Select By Project">
//                     <MenuItem key={type} value={type}></MenuItem>
//                   </MDInput>
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={6}>
//                   <MDInput select size="small" label="Select By Task owners">
//                     <MenuItem key={type} value={type}></MenuItem>
//                   </MDInput>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>
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
//                           <strong>Project:</strong> {project.projectName}
//                         </Typography>
//                       </Box>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <AccessTimeIcon fontSize="small" />
//                         <Typography variant="body2">
//                           <strong>Shift:</strong> {project.shiftTimings}
//                         </Typography>
//                       </Box>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <EmailIcon fontSize="small" />
//                         <Typography variant="body2">
//                           <strong>Owner:</strong> {project.projectManagerName}
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
//                       {project.teamMembers?.length > 0 ? (
//                         project.teamMembers.map((member, idx) => (
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
