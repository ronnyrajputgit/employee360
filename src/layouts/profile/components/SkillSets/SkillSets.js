// // import React, { useState } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   Typography,
// //   LinearProgress,
// //   Box,
// //   Modal,
// //   IconButton,
// //   Button,
// //   Tabs,
// //   Tab,
// // } from "@mui/material";
// // import { Fullscreen, Close } from "@mui/icons-material";
// // import PropTypes from "prop-types";

// // const skillsData = [
// //   { label: "CDQ", value: 90, category: "Technical Skills", type: "Informatica" },
// //   { label: "CDGC", value: 85, category: "Technical Skills", type: "Informatica" },
// //   { label: "MDM SaaS", value: 80, category: "Technical Skills", type: "Informatica" },
// //   { label: "Communication", value: 85, category: "Soft Skills", type: "Soft" },
// //   { label: "Leadership", value: 75, category: "Soft Skills", type: "Soft" },
// // ];

// // const SkillCardContent = ({ skills }) => {
// //   const technicalSkills = skills.filter((skill) => skill.category === "Technical Skills");
// //   const softSkills = skills.filter((skill) => skill.category === "Soft Skills");

// //   return (
// //     <Box display="flex" gap={2} flexWrap="wrap">
// //       <Card sx={{ flex: 1, minWidth: 300 }}>
// //         <CardContent>
// //           <Typography variant="h6" gutterBottom>
// //             Technical Skills
// //           </Typography>
// //           <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100px", mb: 1 }} />
// //           {technicalSkills.map((skill) => (
// //             <Box key={skill.label} display="flex" alignItems="center" mt={2}>
// //               <Box width="30%">
// //                 <Typography>{skill.label}</Typography>
// //               </Box>
// //               <Box width="60%" mx={1}>
// //                 <LinearProgress
// //                   variant="determinate"
// //                   value={skill.value}
// //                   sx={{
// //                     height: 10,
// //                     borderRadius: 5,
// //                     backgroundColor: "#eee",
// //                     "& .MuiLinearProgress-bar": {
// //                       backgroundImage: "linear-gradient(to right, #2196F3, #9c27b0)",
// //                     },
// //                   }}
// //                 />
// //               </Box>
// //               <Box width="10%">
// //                 <Typography variant="body2" color="text.secondary">
// //                   {skill.value}%
// //                 </Typography>
// //               </Box>
// //             </Box>
// //           ))}
// //         </CardContent>
// //       </Card>

// //       <Card sx={{ flex: 1, minWidth: 300 }}>
// //         <CardContent>
// //           <Typography variant="h6" gutterBottom>
// //             Soft Skills
// //           </Typography>
// //           <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100px", mb: 1 }} />
// //           {softSkills.map((skill) => (
// //             <Box key={skill.label} display="flex" alignItems="center" mt={2}>
// //               <Box width="30%">
// //                 <Typography>{skill.label}</Typography>
// //               </Box>
// //               <Box width="60%" mx={1}>
// //                 <LinearProgress
// //                   variant="determinate"
// //                   value={skill.value}
// //                   sx={{
// //                     height: 10,
// //                     borderRadius: 5,
// //                     backgroundColor: "#eee",
// //                     "& .MuiLinearProgress-bar": {
// //                       backgroundImage: "linear-gradient(to right, #2196F3, #9c27b0)",
// //                     },
// //                   }}
// //                 />
// //               </Box>
// //               <Box width="10%">
// //                 <Typography variant="body2" color="text.secondary">
// //                   {skill.value}%
// //                 </Typography>
// //               </Box>
// //             </Box>
// //           ))}
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // };

// // SkillCardContent.propTypes = {
// //   skills: PropTypes.arrayOf(
// //     PropTypes.shape({
// //       label: PropTypes.string.isRequired,
// //       value: PropTypes.number.isRequired,
// //       category: PropTypes.string.isRequired,
// //       type: PropTypes.string.isRequired,
// //     })
// //   ).isRequired,
// // };

// // const SkillSets = () => {
// //   const [open, setOpen] = useState(false);
// //   const [filter, setFilter] = useState("All");

// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => setOpen(false);

// //   const filteredSkills =
// //     filter === "All" ? skillsData : skillsData.filter((skill) => skill.type === filter);

// //   return (
// //     <Box>
// //       <Card sx={{ p: 2 }}>
// //         <Box
// //           display="flex"
// //           justifyContent="space-between"
// //           alignItems="center"
// //           sx={{
// //             background: "linear-gradient(to right, #1d4e89, #1e88e5)",
// //             color: "#fff",
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             px: 3,
// //             py: 2,
// //           }}
// //         >
// //           <Typography variant="h5" fontWeight="bold">
// //             <span role="img" aria-label="code">
// //               💻
// //             </span>{" "}
// //             Skill Set
// //           </Typography>
// //           <Box>
// //             {["All", "Informatica", "Soft", "Microsoft"].map((type) => (
// //               <Button
// //                 key={type}
// //                 variant={filter === type ? "contained" : "outlined"}
// //                 onClick={() => setFilter(type)}
// //                 sx={{ ml: 1 }}
// //               >
// //                 {type}
// //               </Button>
// //             ))}
// //             <IconButton onClick={handleOpen} sx={{ ml: 2 }}>
// //               <Fullscreen />
// //             </IconButton>
// //           </Box>
// //         </Box>

// //         <Box mt={3}>
// //           <Card variant="outlined" sx={{ height: 200 }}>
// //             <CardContent>{/* Reserved space */}</CardContent>
// //           </Card>
// //         </Box>

// //         <Box mt={3}>
// //           <SkillCardContent skills={filteredSkills} />
// //         </Box>
// //       </Card>

// //       <Modal open={open} onClose={handleClose}>
// //         <Box
// //           sx={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             width: "100vw",
// //             height: "100vh",
// //             bgcolor: "background.paper",
// //             p: 4,
// //             overflow: "auto",
// //           }}
// //         >
// //           <Box display="flex" justifyContent="flex-end">
// //             <IconButton onClick={handleClose}>
// //               <Close />
// //             </IconButton>
// //           </Box>
// //           <SkillCardContent skills={filteredSkills} />
// //         </Box>
// //       </Modal>
// //     </Box>
// //   );
// // };

// // export default SkillSets;

// // with modified data

// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   LinearProgress,
//   Box,
//   Modal,
//   Container,
//   CssBaseline,
// } from "@mui/material";
// import { Fullscreen, Close } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const SkillSets = () => {
//   const [open, setOpen] = useState(false);
//   const technicalSkills = skillsData.filter((s) => s.category === "Technical Skills");
//   const softSkills = skillsData.filter((s) => s.category === "Soft Skills");

//   const { filteredData, loading } = useGlobalFilters();
//   const skillsInventryData = filteredData.skillsInventry || [];

//   // Skills Data
//   const skillsData = [
//     { label: "CDQ", value: 90, category: "Technical Skills" },
//     { label: "CDGC", value: 85, category: "Technical Skills" },
//     { label: "MDM SaaS", value: 80, category: "Technical Skills" },
//     { label: "Communication", value: 85, category: "Soft Skills" },
//     { label: "Leadership", value: 75, category: "Soft Skills" },
//   ];

//   // Skill Section Card
//   const SkillSection = ({ title, skills }) => (
//     <Card
//       sx={{
//         flex: 1,
//         minWidth: 300,
//         maxWidth: 480,
//         borderRadius: 3,
//         boxShadow: 2,
//         p: 1,
//         background: "#fff",
//       }}
//     >
//       <CardContent>
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           color="primary"
//           gutterBottom
//           sx={{ fontSize: "1.15rem" }}
//         >
//           {title}
//         </Typography>
//         <Box sx={{ borderBottom: 1, borderColor: "divider", width: "340px", mb: 1 }} />
//         {skills.map((skill) => (
//           <Box key={skill.label} display="flex" alignItems="center" mt={2}>
//             <Box width="45%">
//               <Typography sx={{ fontSize: "1.15rem", wordBreak: "break-word" }}>
//                 {skill.label}
//               </Typography>
//             </Box>
//             <Box width="45%" mx={1}>
//               <LinearProgress
//                 variant="determinate"
//                 value={skill.value}
//                 sx={{
//                   height: 8,
//                   borderRadius: 5,
//                   backgroundColor: "#eee",
//                   "& .MuiLinearProgress-bar": {
//                     backgroundImage: "linear-gradient(to right, #2196F3, #9c27b0)",
//                   },
//                 }}
//               />
//             </Box>
//             <Box width="10%">
//               <Typography variant="body2" color="text.secondary">
//                 {skill.value}%
//               </Typography>
//             </Box>
//           </Box>
//         ))}
//       </CardContent>
//     </Card>
//   );

//   return (
//     <>
//       <CssBaseline />
//       {/* AppBar with Fullscreen Button */}
//       <AppBar
//         position="static"
//         color="default"
//         elevation={2}
//         sx={{
//           backgroundColor: "#fff",
//           color: "#333",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           borderRadius: "12px", // Rounded corners
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h5" fontWeight="bold" color="black" sx={{ flexGrow: 1 }}>
//             Skill Set
//           </Typography>
//           <IconButton color="primary" onClick={() => setOpen(true)}>
//             <Fullscreen />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Main Content */}
//       <Container sx={{ mt: 4 }}>
//         <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
//           <SkillSection title="Technical Skills" skills={technicalSkills} />
//           <SkillSection title="Soft Skills" skills={softSkills} />
//         </Box>
//       </Container>

//       {/* Fullscreen Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             bgcolor: "background.paper",
//             p: 4,
//             overflow: "auto",
//             zIndex: 1201,
//           }}
//         >
//           <Box display="flex" justifyContent="flex-end">
//             <IconButton onClick={() => setOpen(false)}>
//               <Close />
//             </IconButton>
//           </Box>
//           <Container sx={{ mt: 2 }}>
//             <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
//               <SkillSection title="Technical Skills" skills={technicalSkills} />
//               <SkillSection title="Soft Skills" skills={softSkills} />
//             </Box>
//           </Container>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default SkillSets;

// SkillSection.propTypes = {
//   title: PropTypes.string.isRequired,
//   skills: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       value: PropTypes.number.isRequired,
//       category: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// this is good

// import React from "react";
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
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ExpandMore,
//   Star,
//   CheckCircle,
//   School,
//   Assignment,
//   Verified,
//   Work,
//   Person,
//   Schedule,
//   Info,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const StyledCard = styled(Card)(({ theme }) => ({
//   minWidth: 275,
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

// const SkillSets = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const skillsInventoryData = filteredData.skillsInventry || [];
//   const [expandedCards, setExpandedCards] = React.useState({});

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

//   return (
//     <Grid container spacing={3}>
//       {Object.entries(groupedData).map(([resource, skills]) => {
//         const interviewReadySkills = skills.filter((skill) => skill.RecentInterviewResult).length;
//         const certifiedSkills = skills.filter((skill) => skill.Certified).length;

//         return (
//           <Grid item xs={12} sm={6} md={6} key={resource}>
//             <StyledCard>
//               <HeaderBox>
//                 <Badge
//                   overlap="circular"
//                   anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                   badgeContent={
//                     <SmallAvatar>
//                       <Star fontSize="small" color="warning" />
//                     </SmallAvatar>
//                   }
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
//                       title={
//                         <Box sx={{ p: 1 }}>
//                           <Typography variant="subtitle2" gutterBottom>
//                             <Info color="info" sx={{ verticalAlign: "middle", mr: 1 }} />
//                             {skillData.Skill} Details
//                           </Typography>
//                           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                             <Schedule color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//                             <span>{skillData.TotalDurationinMonths} months experience</span>
//                           </Box>
//                           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                             <School color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//                             <span>
//                               Training: {skillData.TrainingCompleted ? "Completed" : "Pending"}
//                             </span>
//                           </Box>
//                           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                             <Assignment color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//                             <span>
//                               Mock Projects: {skillData.MockProjectsShadowing ? "Done" : "Pending"}
//                             </span>
//                           </Box>
//                         </Box>
//                       }
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
// };

// const SmallAvatar = styled(Avatar)(({ theme }) => ({
//   width: 22,
//   height: 22,
//   border: `2px solid ${theme.palette.background.paper}`,
// }));

// export default SkillSets;

// uper wala shi ha ^_^

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
  Avatar,
  Chip,
  Box,
  Skeleton,
  Divider,
  IconButton,
  Collapse,
  Badge,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ExpandMore,
  Star,
  CheckCircle,
  School,
  Assignment,
  Verified,
  Work,
  Person,
  Schedule,
  Info,
} from "@mui/icons-material";
import { useGlobalFilters } from "context/GlobalFilterContext";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  marginBottom: theme.spacing(2),
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease",
  background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
  borderRadius: "16px 16px 0 0",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const DetailItem = ({ icon, label }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    {React.cloneElement(icon, { sx: { mr: 1, fontSize: "1rem", color: "action.active" } })}
    <Typography variant="body2">{label}</Typography>
  </Box>
);

DetailItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

const SkillSets = () => {
  const { filteredData, loading } = useGlobalFilters();
  const skillsInventoryData = filteredData.skillsInventry || [];
  const [expandedCards, setExpandedCards] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Group data by Resource
  const groupedData = skillsInventoryData.reduce((acc, item) => {
    if (!acc[item.Resource]) {
      acc[item.Resource] = [];
    }
    acc[item.Resource].push(item);
    return acc;
  }, {});

  const handleExpandClick = (resource) => {
    setExpandedCards((prev) => ({
      ...prev,
      [resource]: !prev[resource],
    }));
  };

  const renderTooltipContent = (skillData) => (
    <Box sx={{ p: 1 }}>
      <Typography color="inherit" variant="subtitle2" gutterBottom>
        Skill Details
      </Typography>
      <div>Status: {skillData.SkillStatus}</div>
      <div>Months Experience: {skillData.TotalDurationinMonths}</div>
      <div>Training Completed: {skillData.TrainingCompleted ? "Yes" : "No"}</div>
      <div>Certified: {skillData.Certified ? "Yes" : "No"}</div>
      <div>Mock Projects: {skillData.MockProjectsShadowing ? "Yes" : "No"}</div>
      <div>Created By: {skillData.CreatedBy}</div>
    </Box>
  );

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "16px" }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Skills Inventory
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ mt: 0, p: isMobile ? 1 : 3 }}>
        {Object.entries(groupedData).map(([resource, skills]) => {
          const interviewReadySkills = skills.filter((skill) => skill.RecentInterviewResult).length;
          const certifiedSkills = skills.filter((skill) => skill.Certified).length;

          return (
            <Grid item xs={12} sm={6} md={6} key={resource}>
              <StyledCard>
                <HeaderBox>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <SmallAvatar>
                        <Star fontSize="small" color="warning" />
                      </SmallAvatar>
                    }
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        mr: 2,
                        width: 56,
                        height: 56,
                        fontSize: "1.5rem",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {resource
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                  </Badge>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" fontWeight="600">
                      {resource}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skills[0].EmployeeId}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => handleExpandClick(resource)}
                    aria-expanded={expandedCards[resource]}
                    aria-label="show more"
                    sx={{
                      transform: expandedCards[resource] ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </HeaderBox>

                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center">
                      <CheckCircle color="success" fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {interviewReadySkills} Interview Ready
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Verified color="primary" fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{certifiedSkills} Certified</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Work color="action" sx={{ mr: 1, fontSize: "1rem" }} />
                    Skills ({skills.length})
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                    {skills.map((skillData, index) => (
                      <Tooltip
                        key={index}
                        title={renderTooltipContent(skillData)}
                        arrow
                        placement="top"
                      >
                        <SkillChip
                          label={`${skillData.Skill} (${skillData.SkillsPoints})`}
                          color={skillData.RecentInterviewResult ? "success" : "default"}
                          variant={skillData.RecentInterviewResult ? "filled" : "outlined"}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </CardContent>

                <Collapse in={expandedCards[resource]} timeout="auto" unmountOnExit>
                  <CardContent sx={{ pt: 0 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Person color="action" sx={{ mr: 1, fontSize: "1rem" }} />
                      Additional Info
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Created by: {skills[0].CreatedBy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last updated: {new Date(skills[0].CreatedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Collapse>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SkillSets;

// import React, { useState } from "react";
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
//   Dialog,
//   DialogContent,
//   Slide,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ExpandMore,
//   Star,
//   CheckCircle,
//   School,
//   Assignment,
//   Verified,
//   Work,
//   Person,
//   Schedule,
//   Info,
//   Fullscreen,
//   FullscreenExit,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const StyledCard = styled(Card)(({ theme }) => ({
//   minWidth: 275,
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

// const SkillSets = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const skillsInventoryData = filteredData.skillsInventry || [];
//   const [expandedCards, setExpandedCards] = useState({});
//   const [fullscreenOpen, setFullscreenOpen] = useState(false);
//   const [fullscreenContent, setFullscreenContent] = useState(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

//   const handleFullscreenOpen = (content) => {
//     setFullscreenContent(content);
//     setFullscreenOpen(true);
//   };

//   const handleFullscreenClose = () => {
//     setFullscreenOpen(false);
//   };

//   const renderTooltipContent = (skillData) => (
//     <Box sx={{ p: 1, minWidth: 250 }}>
//       <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
//         <Info color="info" sx={{ mr: 1 }} />
//         {skillData.Skill} Details
//       </Typography>

//       <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
//         <DetailItem icon={<Schedule />} label={`${skillData.TotalDurationinMonths} months`} />
//         <DetailItem
//           icon={<CheckCircle />}
//           label={`Interview Ready: ${skillData.RecentInterviewResult ? "Yes" : "No"}`}
//         />
//         <DetailItem
//           icon={<School />}
//           label={`Training: ${skillData.TrainingCompleted ? "Completed" : "Pending"}`}
//         />
//         <DetailItem
//           icon={<Verified />}
//           label={`Certified: ${skillData.Certified ? "Yes" : "No"}`}
//         />
//         <DetailItem
//           icon={<Assignment />}
//           label={`Mock Projects: ${skillData.MockProjectsShadowing ? "Done" : "Pending"}`}
//         />
//         <DetailItem icon={<Work />} label={`Status: ${skillData.SkillStatus}`} />
//         <DetailItem icon={<Person />} label={`Created by: ${skillData.CreatedBy}`} />
//         <DetailItem
//           icon={<Schedule />}
//           label={`Created: ${new Date(skillData.CreatedAt).toLocaleDateString()}`}
//         />
//       </Box>
//     </Box>
//   );

//   const renderCard = (resource, skills) => {
//     const interviewReadySkills = skills.filter((skill) => skill.RecentInterviewResult).length;
//     const certifiedSkills = skills.filter((skill) => skill.Certified).length;

//     return (
//       <StyledCard key={resource}>
//         <HeaderBox>
//           <Badge
//             overlap="circular"
//             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             badgeContent={
//               <SmallAvatar>
//                 <Star fontSize="small" color="warning" />
//               </SmallAvatar>
//             }
//           >
//             <Avatar
//               sx={{
//                 bgcolor: "primary.main",
//                 mr: 2,
//                 width: 56,
//                 height: 56,
//                 fontSize: "1.5rem",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               {resource
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")}
//             </Avatar>
//           </Badge>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="h6" component="div" fontWeight="600">
//               {resource}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {skills[0].EmployeeId}
//             </Typography>
//           </Box>
//           <IconButton
//             onClick={() =>
//               handleFullscreenOpen(<Box sx={{ p: 3 }}>{renderCard(resource, skills)}</Box>)
//             }
//             aria-label="fullscreen"
//           >
//             <Fullscreen fontSize="small" />
//           </IconButton>
//           <IconButton
//             onClick={() => handleExpandClick(resource)}
//             aria-expanded={expandedCards[resource]}
//             aria-label="show more"
//             sx={{
//               transform: expandedCards[resource] ? "rotate(180deg)" : "rotate(0deg)",
//               transition: "transform 0.3s",
//               ml: 1,
//             }}
//           >
//             <ExpandMore />
//           </IconButton>
//         </HeaderBox>

//         <CardContent>
//           <Box display="flex" justifyContent="space-between" mb={2}>
//             <Box display="flex" alignItems="center">
//               <CheckCircle color="success" fontSize="small" sx={{ mr: 1 }} />
//               <Typography variant="body2">{interviewReadySkills} Interview Ready</Typography>
//             </Box>
//             <Box display="flex" alignItems="center">
//               <Verified color="primary" fontSize="small" sx={{ mr: 1 }} />
//               <Typography variant="body2">{certifiedSkills} Certified</Typography>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           <Typography
//             variant="subtitle2"
//             gutterBottom
//             sx={{ display: "flex", alignItems: "center" }}
//           >
//             <Work color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//             Skills ({skills.length})
//           </Typography>

//           <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
//             {skills.map((skillData, index) => (
//               <Tooltip key={index} title={renderTooltipContent(skillData)} arrow placement="top">
//                 <SkillChip
//                   icon={skillData.Certified ? <Verified fontSize="small" /> : null}
//                   label={`${skillData.Skill} (${skillData.SkillsPoints})`}
//                   color={skillData.RecentInterviewResult ? "success" : "default"}
//                   variant={skillData.RecentInterviewResult ? "filled" : "outlined"}
//                   sx={{
//                     ...(skillData.Certified && {
//                       borderColor: "primary.main",
//                       backgroundColor: "rgba(25, 118, 210, 0.08)",
//                     }),
//                   }}
//                 />
//               </Tooltip>
//             ))}
//           </Box>
//         </CardContent>

//         <Collapse in={expandedCards[resource]} timeout="auto" unmountOnExit>
//           <CardContent sx={{ pt: 0 }}>
//             <Divider sx={{ mb: 2 }} />
//             <Typography
//               variant="subtitle2"
//               gutterBottom
//               sx={{ display: "flex", alignItems: "center" }}
//             >
//               <Person color="action" sx={{ mr: 1, fontSize: "1rem" }} />
//               Additional Info
//             </Typography>
//             <Typography variant="body2" color="text.secondary" paragraph>
//               Created by: {skills[0].CreatedBy}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Last updated: {new Date(skills[0].CreatedAt).toLocaleDateString()}
//             </Typography>
//           </CardContent>
//         </Collapse>
//       </StyledCard>
//     );
//   };

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

//   return (
//     <>
//       <AppBar position="static" color="default" elevation={1}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Skills Inventory
//           </Typography>
//           <IconButton
//             color="inherit"
//             onClick={() =>
//               handleFullscreenOpen(
//                 <Grid container spacing={3} sx={{ p: 3 }}>
//                   {Object.entries(groupedData).map(([resource, skills]) => (
//                     <Grid item xs={12} sm={6} md={6} key={resource}>
//                       {renderCard(resource, skills)}
//                     </Grid>
//                   ))}
//                 </Grid>
//               )
//             }
//           >
//             <Fullscreen />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3} sx={{ mt: 0, p: isMobile ? 1 : 3 }}>
//         {Object.entries(groupedData).map(([resource, skills]) => (
//           <Grid item xs={12} sm={6} md={6} key={resource}>
//             {renderCard(resource, skills)}
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog
//         fullScreen
//         open={fullscreenOpen}
//         onClose={handleFullscreenClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar position="relative" color="default" elevation={1}>
//           <Toolbar>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               Skills Inventory
//             </Typography>
//             <IconButton
//               edge="end"
//               color="inherit"
//               onClick={handleFullscreenClose}
//               aria-label="close"
//             >
//               <FullscreenExit />
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <DialogContent>{fullscreenContent}</DialogContent>
//       </Dialog>
//     </>
//   );
// };

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
// export default SkillSets;

// import React, { useState } from "react";
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
//   School,
//   Assignment,
//   Verified,
//   Work,
//   Person,
//   Schedule,
//   Info,
//   Fullscreen,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const StyledCard = styled(Card)(({ theme }) => ({
//   minWidth: 275,
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
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
//     <Box sx={{ p: 1, minWidth: 250 }}>
//       <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
//         <Info color="info" sx={{ mr: 1 }} />
//         {skillData.Skill} Details
//       </Typography>

//       <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
//         <DetailItem icon={<Schedule />} label={`${skillData.TotalDurationinMonths} months`} />
//         <DetailItem
//           icon={<CheckCircle />}
//           label={`Interview Ready: ${skillData.RecentInterviewResult ? "Yes" : "No"}`}
//         />
//         <DetailItem
//           icon={<School />}
//           label={`Training: ${skillData.TrainingCompleted ? "Completed" : "Pending"}`}
//         />
//         <DetailItem
//           icon={<Verified />}
//           label={`Certified: ${skillData.Certified ? "Yes" : "No"}`}
//         />
//         <DetailItem
//           icon={<Assignment />}
//           label={`Mock Projects: ${skillData.MockProjectsShadowing ? "Done" : "Pending"}`}
//         />
//         <DetailItem icon={<Work />} label={`Status: ${skillData.SkillStatus}`} />
//         <DetailItem icon={<Person />} label={`Created by: ${skillData.CreatedBy}`} />
//         <DetailItem
//           icon={<Schedule />}
//           label={`Created: ${new Date(skillData.CreatedAt).toLocaleDateString()}`}
//         />
//       </Box>
//     </Box>
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

//   return (
//     <>
//       <AppBar position="static" color="default" elevation={1}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Skills Inventory
//           </Typography>
//           <IconButton color="inherit">
//             <Fullscreen />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3} sx={{ mt: 0, p: isMobile ? 1 : 3 }}>
//         {Object.entries(groupedData).map(([resource, skills]) => {
//           const interviewReadySkills = skills.filter((skill) => skill.RecentInterviewResult).length;
//           const certifiedSkills = skills.filter((skill) => skill.Certified).length;

//           return (
//             <Grid item xs={12} sm={6} md={6} key={resource}>
//               <StyledCard>
//                 <HeaderBox>
//                   <Badge
//                     overlap="circular"
//                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                     badgeContent={
//                       <SmallAvatar>
//                         <Star fontSize="small" color="warning" />
//                       </SmallAvatar>
//                     }
//                   >
//                     <Avatar
//                       sx={{
//                         bgcolor: "primary.main",
//                         mr: 2,
//                         width: 56,
//                         height: 56,
//                         fontSize: "1.5rem",
//                         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//                       }}
//                     >
//                       {resource
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </Avatar>
//                   </Badge>
//                   <Box sx={{ flexGrow: 1 }}>
//                     <Typography variant="h6" component="div" fontWeight="600">
//                       {resource}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {skills[0].EmployeeId}
//                     </Typography>
//                   </Box>
//                   <IconButton
//                     onClick={() => handleExpandClick(resource)}
//                     aria-expanded={expandedCards[resource]}
//                     aria-label="show more"
//                     sx={{
//                       transform: expandedCards[resource] ? "rotate(180deg)" : "rotate(0deg)",
//                       transition: "transform 0.3s",
//                     }}
//                   >
//                     <ExpandMore />
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
//                           label={`${skillData.Skill} (${skillData.SkillsPoints})`}
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
//                       Created by: {skills[0].CreatedBy}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Last updated: {new Date(skills[0].CreatedAt).toLocaleDateString()}
//                     </Typography>
//                   </CardContent>
//                 </Collapse>
//               </StyledCard>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </>
//   );
// };

// export default SkillSets;
