// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Tooltip,
//   Avatar,
//   Chip,
//   Box,
//   Skeleton,
//   Divider,
//   IconButton,
//   Collapse,
//   Badge,
//   AppBar,
//   Toolbar,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ExpandMore,
//   Star,
//   CheckCircle,
//   Verified,
//   Work,
//   Person,
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// // Styled Components
// const StyledCard = styled(Card)(({ theme }) => ({
//   minWidth: 375,
//   marginBottom: theme.spacing(2),
//   borderRadius: "16px",
//   boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
//   transition: "all 0.3s ease",
//   background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
//   },
// }));

// const SkillChip = styled(Chip)(({ theme }) => ({
//   margin: theme.spacing(0.5),
//   padding: theme.spacing(0.5),
//   fontWeight: 500,
//   borderRadius: "8px",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: theme.shadows[2],
//   },
// }));

// const HeaderBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(2),
//   background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
//   borderRadius: "16px 16px 0 0",
//   borderBottom: `1px solid ${theme.palette.divider}`,
// }));

// const SmallAvatar = styled(Avatar)(({ theme }) => ({
//   width: 22,
//   height: 22,
//   border: `2px solid ${theme.palette.background.paper}`,
// }));

// const DetailItem = ({ icon, label }) => (
//   <Box sx={{ display: "flex", alignItems: "center" }}>
//     {React.cloneElement(icon, { sx: { mr: 1, fontSize: "1rem", color: "action.active" } })}
//     <Typography variant="body2">{label}</Typography>
//   </Box>
// );

// DetailItem.propTypes = {
//   icon: PropTypes.element.isRequired,
//   label: PropTypes.string.isRequired,
// };

// const SkillSets = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const skillsInventoryData = filteredData.skillsInventry || [];
//   const [expandedCards, setExpandedCards] = useState({});
//   const [fullscreen, setFullscreen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [currentName, setCurrentName] = useState(() => {
//     return (localStorage.getItem("currentName") || "").trim().toLowerCase();
//   });

//   useEffect(() => {
//     const handleStorage = (event) => {
//       if (event.key === "currentName") {
//         setCurrentName((localStorage.getItem("currentName") || "").trim().toLowerCase());
//       }
//     };
//     window.addEventListener("storage", handleStorage);

//     // Poll for changes in the same tab (e.g., DevTools, programmatic)
//     const interval = setInterval(() => {
//       setCurrentName((localStorage.getItem("currentName") || "").trim().toLowerCase());
//     }, 1000);

//     return () => {
//       window.removeEventListener("storage", handleStorage);
//       clearInterval(interval);
//     };
//   }, []);

//   // Group data by Resource
//   const groupedData = skillsInventoryData.reduce((acc, item) => {
//     if (!acc[item.Resource]) {
//       acc[item.Resource] = [];
//     }
//     acc[item.Resource].push(item);
//     return acc;
//   }, {});

//   const handleExpandClick = (resource) => {
//     setExpandedCards((prev) => ({
//       ...prev,
//       [resource]: !prev[resource],
//     }));
//   };

//   const renderTooltipContent = (skillData) => (
//     <Box sx={{ p: 1 }}>
//       <Typography color="inherit" variant="subtitle2" gutterBottom>
//         Skill Details
//       </Typography>
//       <div>Status: {skillData.SkillStatus}</div>
//       <div>Months Experience: {skillData.TotalDurationinMonths}</div>
//       <div>Training Completed: {skillData.TrainingCompleted ? "Yes" : "No"}</div>
//       <div>Certified: {skillData.Certified ? "Yes" : "No"}</div>
//       <div>Mock Projects: {skillData.MockProjectsShadowing ? "Yes" : "No"}</div>
//       <div>Created By: {skillData.CreatedBy}</div>
//     </Box>
//   );

//   // Main content grid
//   const Content = (
//     <Grid container spacing={3} sx={{ mt: 0, p: isMobile ? 1 : 3 }}>
//       {Object.entries(groupedData).map(([resource, skills]) => {
//         const interviewReadySkills = skills.filter((skill) => skill.RecentInterviewResult).length;
//         const certifiedSkills = skills.filter((skill) => skill.Certified).length;

//         return (
//           <Grid item xs={12} sm={12} md={12} key={resource}>
//             <StyledCard>
//               <HeaderBox>
//                 <Badge
//                   overlap="circular"
//                   anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                   // badgeContent={
//                   //   <SmallAvatar>
//                   //     <Star fontSize="small" color="warning" />
//                   //   </SmallAvatar>
//                   // }
//                 >
//                   <Avatar
//                     sx={{
//                       bgcolor: "primary.main",
//                       mr: 2,
//                       width: 56,
//                       height: 56,
//                       fontSize: "1.5rem",
//                       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//                     }}
//                   >
//                     {resource
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </Avatar>
//                 </Badge>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography variant="h6" component="div" fontWeight="600">
//                     {resource}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {skills[0].EmployeeId}
//                   </Typography>
//                 </Box>
//                 <IconButton
//                   onClick={() => handleExpandClick(resource)}
//                   aria-expanded={expandedCards[resource]}
//                   aria-label="show more"
//                   sx={{
//                     transform: expandedCards[resource] ? "rotate(180deg)" : "rotate(0deg)",
//                     transition: "transform 0.3s",
//                   }}
//                 >
//                   <ExpandMore />
//                 </IconButton>
//               </HeaderBox>

//               <CardContent>
//                 <Box display="flex" justifyContent="space-between" mb={2}>
//                   <Box display="flex" alignItems="center">
//                     <CheckCircle color="success" fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{interviewReadySkills} Interview Ready</Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center">
//                     <Verified color="primary" fontSize="small" sx={{ mr: 1 }} />
//                     <Typography variant="body2">{certifiedSkills} Certified</Typography>
//                   </Box>
//                 </Box>

//                 <Divider sx={{ my: 2 }} />

//                 <Typography
//                   variant="subtitle2"
//                   gutterBottom
//                   sx={{ display: "flex", alignItems: "center" }}
//                 >
//                   <Work color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//                   Skills ({skills.length})
//                 </Typography>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
//                   {skills.map((skillData, index) => (
//                     <Tooltip
//                       key={index}
//                       title={renderTooltipContent(skillData)}
//                       arrow
//                       placement="top"
//                     >
//                       <SkillChip
//                         icon={skillData.Certified ? <Verified fontSize="small" /> : null}
//                         label={`${skillData.Skill} (${skillData.SkillsPoints})`}
//                         color={skillData.RecentInterviewResult ? "success" : "default"}
//                         variant={skillData.RecentInterviewResult ? "filled" : "outlined"}
//                         sx={{
//                           ...(skillData.Certified && {
//                             borderColor: "primary.main",
//                             backgroundColor: "rgba(25, 118, 210, 0.08)",
//                           }),
//                         }}
//                       />
//                     </Tooltip>
//                   ))}
//                 </Box>
//               </CardContent>

//               <Collapse in={expandedCards[resource]} timeout="auto" unmountOnExit>
//                 <CardContent sx={{ pt: 0 }}>
//                   <Divider sx={{ mb: 2 }} />
//                   <Typography
//                     variant="subtitle2"
//                     gutterBottom
//                     sx={{ display: "flex", alignItems: "center" }}
//                   >
//                     <Person color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//                     Additional Info
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" paragraph>
//                     Created by: {skills[0].CreatedBy}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Last updated: {new Date(skills[0].CreatedAt).toLocaleDateString()}
//                   </Typography>
//                 </CardContent>
//               </Collapse>
//             </StyledCard>
//           </Grid>
//         );
//       })}
//     </Grid>
//   );

//   if (loading) {
//     return (
//       <Grid container spacing={3}>
//         {[1, 2, 3].map((item) => (
//           <Grid item xs={12} sm={6} md={4} key={item}>
//             <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "16px" }} />
//           </Grid>
//         ))}
//       </Grid>
//     );
//   }

//   // Fullscreen logic as in TasksCompleted
//   return (
//     <Box
//       sx={{
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: fullscreen ? "100vh" : "auto",
//         bgcolor: fullscreen ? "#fff" : "#fff",
//         zIndex: fullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: fullscreen ? 2 : 3,
//       }}
//     >
//       <AppBar
//         position="static"
//         color="default"
//         elevation={1}
//         sx={{
//           backgroundColor: "#fff",
//           color: "#333",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           borderRadius: "12px",
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Skills Inventory
//           </Typography>
//           <IconButton onClick={() => setFullscreen((prev) => !prev)} color="inherit">
//             {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Box sx={{ mt: 2 }}>{Content}</Box>
//     </Box>
//   );
// };

// export default SkillSets;

// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Tooltip,
//   Avatar,
//   Chip,
//   Box,
//   Skeleton,
//   Divider,
//   IconButton,
//   Collapse,
//   Badge,
//   useTheme,
//   useMediaQuery,
//   Paper,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ExpandMore,
//   Star,
//   CheckCircle,
//   Verified,
//   Work,
//   Person,
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// // Styled Components
// const StyledCard = styled(Card)(({ theme }) => ({
//   minWidth: 375,
//   marginBottom: theme.spacing(2),
//   borderRadius: "16px",
//   boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
//   transition: "all 0.3s ease",
//   background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
//   },
// }));

// const SkillChip = styled(Chip)(({ theme }) => ({
//   margin: theme.spacing(0.5),
//   padding: theme.spacing(0.5),
//   fontWeight: 500,
//   borderRadius: "8px",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: theme.shadows[2],
//   },
// }));

// const HeaderBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(2),
//   background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
//   borderRadius: "16px 16px 0 0",
//   borderBottom: `1px solid ${theme.palette.divider}`,
// }));

// const SmallAvatar = styled(Avatar)(({ theme }) => ({
//   width: 22,
//   height: 22,
//   border: `2px solid ${theme.palette.background.paper}`,
// }));

// const DetailItem = ({ icon, label }) => (
//   <Box sx={{ display: "flex", alignItems: "center" }}>
//     {React.cloneElement(icon, { sx: { mr: 1, fontSize: "1rem", color: "action.active" } })}
//     <Typography variant="body2">{label}</Typography>
//   </Box>
// );

// DetailItem.propTypes = {
//   icon: PropTypes.element.isRequired,
//   label: PropTypes.string.isRequired,
// };

// const SkillSets = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const skillsInventoryData = filteredData.skillsInventry || [];
//   const [expandedCards, setExpandedCards] = useState({});
//   const [fullscreen, setFullscreen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [currentName, setCurrentName] = useState(() => {
//     return (localStorage.getItem("currentName") || "").trim().toLowerCase();
//   });

//   useEffect(() => {
//     const handleStorage = (event) => {
//       if (event.key === "currentName") {
//         setCurrentName((localStorage.getItem("currentName") || "").trim().toLowerCase());
//       }
//     };
//     window.addEventListener("storage", handleStorage);

//     // Poll for changes in the same tab (e.g., DevTools, programmatic)
//     const interval = setInterval(() => {
//       setCurrentName((localStorage.getItem("currentName") || "").trim().toLowerCase());
//     }, 1000);

//     return () => {
//       window.removeEventListener("storage", handleStorage);
//       clearInterval(interval);
//     };
//   }, []);

//   // Group data by Resource
//   const groupedData = skillsInventoryData.reduce((acc, item) => {
//     if (!acc[item.Resource]) {
//       acc[item.Resource] = [];
//     }
//     acc[item.Resource].push(item);
//     return acc;
//   }, {});

//   const handleExpandClick = (resource) => {
//     setExpandedCards((prev) => ({
//       ...prev,
//       [resource]: !prev[resource],
//     }));
//   };

//   const renderTooltipContent = (skillData) => (
//     <Box sx={{ p: 1 }}>
//       <Typography color="inherit" variant="subtitle2" gutterBottom>
//         Skill Details
//       </Typography>
//       {/* <div>Status: {skillData.SkillStatus}</div> */}
//       <div>Months Experience: {skillData.TotalDurationinMonths}</div>
//       <div>Skill Points: {skillData.SkillsPoints}</div>
//       <div>Training Completed: {skillData.TrainingCompleted ? "Yes" : "No"}</div>
//       <div>Recent Interview: {skillData.RecentInterviewResult ? "Yes" : "No"}</div>
//       <div>Real Project Experience: {skillData.RealProjectExperience ? "Yes" : "No"}</div>
//       {/* <div>Certified: {skillData.Certified ? "Yes" : "No"}</div> */}
//       <div>Mock Projects: {skillData.MockProjectsShadowing ? "Yes" : "No"}</div>
//       {/* <div>Created By: {skillData.CreatedBy}</div> */}

//       <div>Created At: {new Date(skillData.CreatedAt).toLocaleDateString()}</div>
//     </Box>
//   );

//   // Filter resources that match currentName
//   const filteredResources = Object.entries(groupedData).filter(
//     ([resource]) => resource.toLowerCase() === currentName.toLowerCase()
//   );

//   // Main content grid
//   const Content = (
//     <Grid container sx={{ mt: 0, p: isMobile ? 1 : 3 }}>
//       {filteredResources.length > 0 ? (
//         filteredResources.map(([resource, skills]) => {
//           const interviewReadySkills = skills.filter((skill) => skill.RecentInterviewResult).length;
//           const certifiedSkills = skills.filter((skill) => skill.Certified).length;

//           return (
//             <Grid item xs={12} sm={12} md={12} key={resource}>
//               <StyledCard>
//                 <HeaderBox>
//                   <Badge
//                     overlap="circular"
//                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                   ></Badge>
//                   {/* <Box sx={{ flexGrow: 1 }}>
//                     <Typography variant="h6" component="div" fontWeight="600">
//                       {resource}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {skills[0].EmployeeId}
//                     </Typography>
//                   </Box> */}
//                   <IconButton
//                     onClick={() => handleExpandClick(resource)}
//                     aria-expanded={expandedCards[resource]}
//                     aria-label="show more"
//                     sx={{
//                       transform: expandedCards[resource] ? "rotate(180deg)" : "rotate(0deg)",
//                       transition: "transform 0.3s",
//                     }}
//                   >
//                     <ExpandMore /> 😇
//                   </IconButton>
//                 </HeaderBox>

//                 <CardContent>
//                   <Box display="flex" justifyContent="space-between" mb={2}>
//                     <Box display="flex" alignItems="center">
//                       <CheckCircle color="success" fontSize="small" sx={{ mr: 1 }} />
//                       <Typography variant="body2">
//                         {interviewReadySkills} Interview Ready
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center">
//                       <Verified color="primary" fontSize="small" sx={{ mr: 1 }} />
//                       <Typography variant="body2">{certifiedSkills} Certified</Typography>
//                     </Box>
//                   </Box>

//                   <Divider sx={{ my: 2 }} />

//                   <Typography
//                     variant="subtitle2"
//                     gutterBottom
//                     sx={{ display: "flex", alignItems: "center" }}
//                   >
//                     <Work color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//                     Skills ({skills.length})
//                   </Typography>
//                   <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
//                     {skills.map((skillData, index) => (
//                       <Tooltip
//                         key={index}
//                         title={renderTooltipContent(skillData)}
//                         arrow
//                         placement="top"
//                       >
//                         <SkillChip
//                           icon={skillData.Certified ? <Verified fontSize="small" /> : null}
//                           // label={`${skillData.Skill} (${skillData.SkillsPoints})`}
//                           label={`${skillData.Skill}`}
//                           color={skillData.RecentInterviewResult ? "success" : "default"}
//                           variant={skillData.RecentInterviewResult ? "filled" : "outlined"}
//                           sx={{
//                             ...(skillData.Certified && {
//                               borderColor: "primary.main",
//                               backgroundColor: "rgba(25, 118, 210, 0.08)",
//                             }),
//                           }}
//                         />
//                       </Tooltip>
//                     ))}
//                   </Box>
//                 </CardContent>

//                 <Collapse in={expandedCards[resource]} timeout="auto" unmountOnExit>
//                   <CardContent sx={{ pt: 0 }}>
//                     <Divider sx={{ mb: 2 }} />
//                     <Typography
//                       variant="subtitle2"
//                       gutterBottom
//                       sx={{ display: "flex", alignItems: "center" }}
//                     >
//                       <Person color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//                       Additional Info
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" paragraph>
//                       Project Experience: {skills[0].ProjectExperience}
//                     </Typography>
//                     {/* <Typography variant="body2" color="text.secondary" paragraph>
//                       Created by: {skills[0].CreatedBy}
//                     </Typography> */}
//                     {/* <Typography variant="body2" color="text.secondary">
//                       Last updated: {new Date(skills[0].CreatedAt).toLocaleDateString()}
//                     </Typography> */}
//                   </CardContent>
//                 </Collapse>
//               </StyledCard>
//             </Grid>
//           );
//         })
//       ) : (
//         <Grid item xs={12}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "200px",
//               backgroundColor: "#f5f5f5",
//               borderRadius: "16px",
//               // p: 4,
//             }}
//           >
//             <Typography variant="h6" color="textSecondary">
//               No record found for {currentName || "the current resource"}
//             </Typography>
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );

//   if (loading) {
//     return (
//       <Grid container spacing={3}>
//         {[1, 2, 3].map((item) => (
//           <Grid item xs={12} sm={6} md={4} key={item}>
//             <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "16px" }} />
//           </Grid>
//         ))}
//       </Grid>
//     );
//   }

//   // Fullscreen logic as in TasksCompleted
//   return (
//     <Box
//       sx={{
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: fullscreen ? "100vh" : "auto",
//         bgcolor: fullscreen ? "#fff" : "#fff",
//         zIndex: fullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: fullscreen ? 2 : 3,
//       }}
//     >
//       {/* header like certificatio */}
//       <Box>
//         <Paper
//           elevation={3}
//           sx={{
//             borderRadius: 2,
//             p: 1,
//             background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
//             mb: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
//             👨🏻‍💻 Skills Inventory
//           </Typography>

//           <Box sx={{ color: "white", fontSize: 20, cursor: "pointer" }}>
//             <IconButton onClick={() => setFullscreen((prev) => !prev)} color="inherit">
//               {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//             </IconButton>
//           </Box>
//         </Paper>

//         {/* {certificationContent} */}
//       </Box>
//       <Box>{Content}</Box>
//     </Box>
//   );
// };

// export default SkillSets;

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Chip,
//   Box,
//   Paper,
//   Modal,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import { from } from "stylis";

// const getStatusStyle = (skillStatus) => {
//   const statusMap = {
//     "Shadow Project": {
//       label: "Shadow Project",
//       color: "warning", // Yellow
//     },
//     "Training Needed": {
//       label: "Training Needed",
//       color: "error", // Red
//     },
//     "Interview Ready": {
//       label: "Interview Ready",
//       color: "success", // Green
//     },
//   };

//   return {
//     label: statusMap[skillStatus]?.label || skillStatus,
//     color: statusMap[skillStatus]?.color || "default",
//     variant: "outlined",
//     size: "small",
//     sx: { fontWeight: "bold", mt: 1 },
//   };
// };

// const CertificationCards = () => {
//   const { filteredData } = useGlobalFilters();
//   const skillsInventoryData = filteredData.skillsInventry || [];

//   const [fullscreen, setFullscreen] = useState(false);
//   const [currentName, setCurrentName] = useState(() => {
//     // return (localStorage.getItem("currentName") || "").trim().toLowerCase();
//     return "Aravvindhan Shanmugaraj";
//   });

//   // Filter skills for current user and map to certification-like format
//   const certifications = skillsInventoryData
//     .filter((skill) => skill.Resource.toLowerCase() === currentName.toLowerCase())
//     .map((skill) => ({
//       title: skill.Skill,
//       rating: `Skill Points - ${skill.SkillsPoints} / 10`,
//       issued: new Date(skill.CreatedAt).toLocaleDateString(),
//       status: skill.SkillStatus, // Using SkillStatus instead of RecentInterviewResult
//       details: {
//         monthsExperience: skill.TotalDurationinMonths,
//         trainingCompleted: skill.TrainingCompleted ? "Yes" : "No",
//         realProjectExperience: skill.RealProjectExperience ? "Yes" : "No",
//         mockProjects: skill.MockProjectsShadowing ? "Yes" : "No",
//         certified: skill.Certified ? "Yes" : "No",
//         skillStatus: skill.SkillStatus, // Adding skillStatus to details
//       },
//     }));

//   const renderTooltipContent = (details) => (
//     <Box sx={{ p: 1 }}>
//       <Typography variant="subtitle2" gutterBottom>
//         Skill Details
//       </Typography>
//       <div>Status: {details.skillStatus}</div>
//       <div>Months Experience: {details.monthsExperience}</div>
//       <div>Training Completed: {details.trainingCompleted}</div>
//       <div>Real Project Experience: {details.realProjectExperience}</div>
//       <div>Mock Projects: {details.mockProjects}</div>
//       <div>Certified: {details.certified}</div>
//     </Box>
//   );

//   const certificationContent = (
//     <>
//       <Grid container spacing={3}>
//         {certifications.map((cert, index) => {
//           const statusProps = getStatusStyle(cert.status);
//           return (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 elevation={4}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   borderRadius: 3,
//                 }}
//               >
//                 <CardContent sx={{ display: "flex", flexDirection: "column" }}>
//                   <Typography variant="h6" fontWeight="bold" sx={{ color: "#2c3e50", mb: 1 }}>
//                     {cert.title}
//                   </Typography>
//                   <Chip {...statusProps} />

//                   <Typography variant="body2" color="text.secondary" mt={2}>
//                     {cert.rating}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
//                     Last Evaluated: {cert.issued}
//                   </Typography>
//                   <Tooltip title={renderTooltipContent(cert.details)} arrow>
//                     <Button variant="text" fullWidth sx={{ color: "secondary" }}>
//                       View Details
//                     </Button>
//                   </Tooltip>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </>
//   );

//   return (
//     <>
//       <Box sx={{ px: 2, py: 4 }}>
//         <Paper
//           elevation={3}
//           sx={{
//             borderRadius: 2,
//             p: 2,
//             background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
//             mb: 3,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
//             🌟 Skills Inventory
//           </Typography>
//           <Box sx={{ color: "white", fontSize: 20, cursor: "pointer" }}>
//             <IconButton onClick={() => setFullscreen((prev) => !prev)} color="inherit">
//               {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}{" "}
//             </IconButton>
//           </Box>
//         </Paper>

//         {certifications.length > 0 ? (
//           certificationContent
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "200px",
//               backgroundColor: "#f5f5f5",
//               borderRadius: "16px",
//             }}
//           >
//             <Typography variant="h6" color="textSecondary">
//               No skills found for {currentName || "the current resource"}
//             </Typography>
//           </Box>
//         )}
//       </Box>

//       {/* Fullscreen Modal */}
//       <Modal open={open}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             bgcolor: "background.default",
//             p: 4,
//             overflowY: "auto",
//           }}
//         >
//           {certificationContent}
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default CertificationCards;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@mui/icons-material";
import { useGlobalFilters } from "context/GlobalFilterContext";

const getStatusStyle = (skillStatus) => {
  const statusMap = {
    "Shadow Project": {
      label: "Shadow Project",
      color: "warning", // Yellow
    },
    "Training Needed": {
      label: "Training Needed",
      color: "error", // Red
    },
    "Interview Ready": {
      label: "Interview Ready",
      color: "success", // Green
    },
  };

  return {
    label: statusMap[skillStatus]?.label || skillStatus,
    color: statusMap[skillStatus]?.color || "default",
    variant: "outlined",
    size: "small",
    sx: { fontWeight: "bold", mt: 1 },
  };
};

const SkillSets = () => {
  const { filteredData } = useGlobalFilters();
  const skillsInventoryData = filteredData.skillsInventry || [];
  const [fullscreen, setFullscreen] = useState(false);
  const [currentName, setCurrentName] = useState(() => {
    // For testing - hardcode the name
    // return "Aravvindhan Shanmugaraj";
    // Production code:
    return (localStorage.getItem("currentName") || "").trim().toLowerCase();
  });

  // Filter skills for current user and map to certification-like format
  const certifications = skillsInventoryData
    .filter((skill) => skill.Resource.toLowerCase() === currentName.toLowerCase())
    .map((skill) => ({
      title: skill.Skill,
      rating: `Rating - ${skill.SkillsPoints} / 10`,
      issued: new Date(skill.CreatedAt).toLocaleDateString(),
      status: skill.SkillStatus,
      details: {
        monthsExperience: skill.TotalDurationinMonths,
        trainingCompleted: skill.TrainingCompleted ? "Yes" : "No",
        realProjectExperience: skill.RealProjectExperience ? "Yes" : "No",
        mockProjects: skill.MockProjectsShadowing ? "Yes" : "No",
        certified: skill.Certified ? "Yes" : "No",
        skillStatus: skill.SkillStatus,
      },
    }));

  const renderTooltipContent = (details) => (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle2" gutterBottom>
        Skill Details
      </Typography>
      {/* <div>Status: {details.skillStatus}</div> */}
      <div>Months Experience: {details.monthsExperience}</div>
      <div>Training Completed: {details.trainingCompleted}</div>
      <div>Real Project Experience: {details.realProjectExperience}</div>
      <div>Mock Projects: {details.mockProjects}</div>
      <div>Certified: {details.certified}</div>
    </Box>
  );

  const certificationContent = (
    <Grid container spacing={3}>
      {certifications.map((cert, index) => {
        const statusProps = getStatusStyle(cert.status);
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: "#2c3e50", mb: 1 }}>
                  {cert.title}
                </Typography>
                <Chip {...statusProps} />

                <Typography variant="body2" color="text.secondary" mt={2}>
                  {cert.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  Last Evaluated: {cert.issued}
                </Typography>
                <Tooltip title={renderTooltipContent(cert.details)} arrow>
                  <Button variant="text" fullWidth sx={{ color: "secondary" }}>
                    View Details
                  </Button>
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Box
      sx={{
        position: fullscreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: fullscreen ? "100vh" : "auto",
        bgcolor: fullscreen ? "#fff" : "transparent",
        zIndex: fullscreen ? 9999 : "auto",
        overflow: "auto",
        transition: "all 0.3s ease-in-out",
        p: fullscreen ? 2 : 3,
      }}
    >
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
          👨🏽‍💻 Skills Inventory
        </Typography>
        <IconButton
          onClick={() => setFullscreen(!fullscreen)}
          color="inherit"
          sx={{ color: "white" }}
        >
          {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Paper>

      {certifications.length > 0 ? (
        certificationContent
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            backgroundColor: "#f5f5f5",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            No skills found for {currentName || "the current resource"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SkillSets;
