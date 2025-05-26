// // @mui material components
// import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// // Images
// import {
//   Avatar,
//   Box,
//   Card,
//   Chip,
//   Icon,
//   IconButton,
//   Modal,
//   Paper,
//   Stack,
//   Typography,
// } from "@mui/material";
// import Projectsongoing from "./Components/Projectongoing";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import {
//   CalendarMonth,
//   Checklist,
//   Close,
//   EmojiFlags,
//   Fullscreen,
//   PieChart,
// } from "@mui/icons-material";
// import { useState } from "react";
// import Majormilestone from "./Components/Majormilestone/Majormilestone";
// import ProjectTimeline from "./Components/ProjectTimeline/ProjectTimeline";
// import Taskbreakdown from "./Components/Taskbreakdown/Taskbreakdown";
// import ResourcesUtilizations from "./Components/ResourcesUtilization/ResourcesUtilizations";

// function ProjectOverview() {
//   const [openModal, setOpenModal] = useState({
//     milestones: false,
//     timeline: false,
//     taskBreakdown: false,
//   });

//   const handleOpen = (section) => {
//     setOpenModal({ ...openModal, [section]: true });
//   };

//   const handleClose = (section) => {
//     setOpenModal({ ...openModal, [section]: false });
//   };

//   const modalStyle = {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     width: "100%",
//     height: "100%",
//     bgcolor: "background.paper",
//     overflow: "auto",
//     p: 6,
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mb={2} />
//       <MDBox mt={5} mb={3}>
//         <Projectsongoing />
//         <MDBox py={3}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={6}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <IconButton color="white">
//                       <EmojiFlags />
//                     </IconButton>
//                     <MDTypography variant="h6" color="white">
//                       Major Milestones
//                     </MDTypography>
//                   </div>
//                   <IconButton color="white" onClick={() => handleOpen("milestones")}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox py={3} px={2}>
//                   <Majormilestone />
//                 </MDBox>
//               </Card>
//               <Modal
//                 fullScreen
//                 open={openModal.milestones}
//                 onClose={() => handleClose("milestones")}
//                 aria-labelledby="milestone-modal"
//               >
//                 <Box sx={modalStyle}>
//                   <MDBox
//                     variant="gradient"
//                     bgColor="info"
//                     borderRadius="lg"
//                     coloredShadow="info"
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <IconButton color="white">
//                         <EmojiFlags />
//                       </IconButton>
//                       <MDTypography variant="h6" color="white">
//                         Major Milestones
//                       </MDTypography>
//                     </div>
//                     <IconButton color="white" onClick={() => handleClose("milestones")}>
//                       <Close />
//                     </IconButton>
//                   </MDBox>
//                   <MDBox py={3} px={2}>
//                     <Majormilestone />
//                   </MDBox>
//                 </Box>
//               </Modal>
//             </Grid>

//             {/* Timeline Card */}
//             <Grid item xs={12} md={6} lg={6}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <IconButton color="white">
//                       <CalendarMonth />
//                     </IconButton>
//                     <MDTypography variant="h6" color="white">
//                       Project Timeline
//                     </MDTypography>
//                     {/* add here chip  */}
//                     <Stack direction="row" spacing={1}>
//                       <Chip label="Month" variant="outlined" />
//                       <Chip label="Week" variant="outlined" />
//                       <Chip label="Day" variant="outlined" />
//                     </Stack>
//                   </div>
//                   <IconButton color="white" onClick={() => handleOpen("timeline")}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox py={3} px={2}>
//                   <ProjectTimeline />
//                 </MDBox>
//               </Card>
//               <Modal
//                 fullScreen
//                 open={openModal.timeline}
//                 onClose={() => handleClose("timeline")}
//                 aria-labelledby="timeline-modal"
//               >
//                 <Box sx={modalStyle}>
//                   <MDBox
//                     variant="gradient"
//                     bgColor="info"
//                     borderRadius="lg"
//                     coloredShadow="info"
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <IconButton color="white">
//                         <CalendarMonth />
//                       </IconButton>
//                       <MDTypography variant="h6" color="white">
//                         Project Timeline
//                       </MDTypography>
//                     </div>
//                     <IconButton color="white" onClick={() => handleClose("timeline")}>
//                       <Close />
//                     </IconButton>
//                   </MDBox>
//                   <MDBox py={3} px={2}>
//                     <ProjectTimeline />
//                   </MDBox>
//                 </Box>
//               </Modal>
//             </Grid>

//             {/* Task Breakdown Card */}
//             <Grid item xs={12} md={6} lg={6}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <IconButton color="white">
//                       <Checklist />
//                     </IconButton>
//                     <MDTypography variant="h6" color="white">
//                       Task Breakdown by Resources
//                     </MDTypography>
//                   </div>
//                   <IconButton color="white" onClick={() => handleOpen("taskBreakdown")}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox py={3} px={2}>
//                   <Taskbreakdown />
//                 </MDBox>
//               </Card>
//               <Modal
//                 fullScreen
//                 open={openModal.taskBreakdown}
//                 onClose={() => handleClose("taskBreakdown")}
//                 aria-labelledby="task-breakdown-modal"
//               >
//                 <Box sx={modalStyle}>
//                   <MDBox
//                     variant="gradient"
//                     bgColor="info"
//                     borderRadius="lg"
//                     coloredShadow="info"
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <IconButton color="white">
//                         <Checklist />
//                       </IconButton>
//                       <MDTypography variant="h6" color="white">
//                         Task Breakdown by Resources
//                       </MDTypography>
//                     </div>
//                     <IconButton color="white" onClick={() => handleClose("taskBreakdown")}>
//                       <Close />
//                     </IconButton>
//                   </MDBox>
//                   <MDBox py={3} px={2}>
//                     <Taskbreakdown />
//                   </MDBox>
//                 </Box>
//               </Modal>
//             </Grid>
//             <Grid item xs={12} md={6} lg={6}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <IconButton color="white">
//                       <PieChart />
//                     </IconButton>
//                     <MDTypography variant="h6" color="white">
//                       Resource Utilization
//                     </MDTypography>
//                   </div>
//                   <IconButton color="white" onClick={() => handleOpen("timeline")}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox py={3} px={2}>
//                   <ResourcesUtilizations />
//                 </MDBox>
//               </Card>
//               <Modal
//                 fullScreen
//                 open={openModal.timeline}
//                 onClose={() => handleClose("timeline")}
//                 aria-labelledby="timeline-modal"
//               >
//                 <Box sx={modalStyle}>
//                   <MDBox
//                     variant="gradient"
//                     bgColor="info"
//                     borderRadius="lg"
//                     coloredShadow="info"
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <IconButton color="white">
//                         <CalendarMonth />
//                       </IconButton>
//                       <MDTypography variant="h6" color="white">
//                         Resource Utilization
//                       </MDTypography>
//                     </div>
//                     <IconButton color="white" onClick={() => handleClose("timeline")}>
//                       <Close />
//                     </IconButton>
//                   </MDBox>
//                   <MDBox py={3} px={2}>
//                     {/* <TimelineContent /> */}
//                     <ResourcesUtilizations />
//                   </MDBox>
//                 </Box>
//               </Modal>
//             </Grid>
//           </Grid>
//         </MDBox>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default ProjectOverview;

// Imports
// import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// import {
//   Avatar,
//   Box,
//   Card,
//   Chip,
//   Icon,
//   IconButton,
//   Modal,
//   Paper,
//   Stack,
//   Typography,
// } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import Projectsongoing from "./Components/Projectongoing";
// import Majormilestone from "./Components/Majormilestone/Majormilestone";
// import ProjectTimeline from "./Components/ProjectTimeline/ProjectTimeline";
// import Taskbreakdown from "./Components/Taskbreakdown/Taskbreakdown";
// import ResourcesUtilizations from "./Components/ResourcesUtilization/ResourcesUtilizations";

// import {
//   CalendarMonth,
//   Checklist,
//   Close,
//   EmojiFlags,
//   Fullscreen,
//   PieChart,
// } from "@mui/icons-material";
// import { useState } from "react";

// function ProjectOverview() {
//   const [openModal, setOpenModal] = useState({
//     milestones: false,
//     timeline: false,
//     taskBreakdown: false,
//     utilization: false,
//   });

//   const handleOpen = (section) => {
//     setOpenModal((prev) => ({ ...prev, [section]: true }));
//   };

//   const handleClose = (section) => {
//     setOpenModal((prev) => ({ ...prev, [section]: false }));
//   };

//   const modalStyle = {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     width: "100%",
//     height: "100%",
//     bgcolor: "background.paper",
//     overflow: "auto",
//     p: 6,
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mb={2} />
//       <MDBox mt={5} mb={3}>
//         <Projectsongoing />
//         <MDBox py={3}>
//           <Grid container spacing={3}>
//             {/* Major Milestones */}
//             <Grid item xs={12} md={6} lg={6}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Box display="flex" alignItems="center">
//                     <IconButton color="white">
//                       <EmojiFlags />
//                     </IconButton>
//                     <MDTypography variant="h6" color="white">
//                       Major Milestones
//                     </MDTypography>
//                   </Box>
//                   <IconButton color="white" onClick={() => handleOpen("milestones")}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox py={3} px={2}>
//                   <Majormilestone />
//                 </MDBox>
//               </Card>
//               <Modal
//                 open={openModal.milestones}
//                 onClose={() => handleClose("milestones")}
//                 aria-labelledby="milestone-modal"
//               >
//                 <Box sx={modalStyle}>
//                   <MDBox
//                     variant="gradient"
//                     bgColor="info"
//                     borderRadius="lg"
//                     coloredShadow="info"
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <Box display="flex" alignItems="center">
//                       <IconButton color="white">
//                         <EmojiFlags />
//                       </IconButton>
//                       <MDTypography variant="h6" color="white">
//                         Major Milestones
//                       </MDTypography>
//                     </Box>
//                     <IconButton color="white" onClick={() => handleClose("milestones")}>
//                       <Close />
//                     </IconButton>
//                   </MDBox>
//                   <MDBox py={3} px={2}>
//                     <Majormilestone />
//                   </MDBox>
//                 </Box>
//               </Modal>
//             </Grid>

//             {/* Timeline */}
//             <Grid item xs={12} md={6} lg={6}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Box display="flex" alignItems="center">
//                     <IconButton color="white">
//                       <CalendarMonth />
//                     </IconButton>
//                     <MDTypography variant="h6" color="white">
//                       Project Timeline
//                     </MDTypography>
//                     <Stack direction="row" spacing={1} ml={2}>
//                       <Chip label="Month" variant="outlined" />
//                       <Chip label="Week" variant="outlined" />
//                       <Chip label="Day" variant="outlined" />
//                     </Stack>
//                   </Box>
//                   <IconButton color="white" onClick={() => handleOpen("timeline")}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox py={3} px={2}>
//                   <ProjectTimeline />
//                 </MDBox>
//               </Card>
//               <Modal
//                 open={openModal.timeline}
//                 onClose={() => handleClose("timeline")}
//                 aria-labelledby="timeline-modal"
//               >
//                 <Box sx={modalStyle}>
//                   <MDBox
//                     variant="gradient"
//                     bgColor="info"
//                     borderRadius="lg"
//                     coloredShadow="info"
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <Box display="flex" alignItems="center">
//                       <IconButton color="white">
//                         <CalendarMonth />
//                       </IconButton>
//                       <MDTypography variant="h6" color="white">
//                         Project Timeline
//                       </MDTypography>
//                     </Box>
//                     <IconButton color="white" onClick={() => handleClose("timeline")}>
//                       <Close />
//                     </IconButton>
//                   </MDBox>
//                   <MDBox py={3} px={2}>
//                     <ProjectTimeline />
//                   </MDBox>
//                 </Box>
//               </Modal>
//             </Grid>

//             {/* Task Breakdown */}
//             <Grid item xs={12} md={6} lg={6}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Box display="flex" alignItems="center">
//                     <IconButton color="white">
//                       <Checklist />
//                     </IconButton>
//                     <MDTypography variant="h6" color="white">
//                       Task Breakdown by Resources
//                     </MDTypography>
//                   </Box>
//                   <IconButton color="white" onClick={() => handleOpen("taskBreakdown")}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox py={3} px={2}>
//                   <Taskbreakdown />
//                 </MDBox>
//               </Card>
//               <Modal
//                 open={openModal.taskBreakdown}
//                 onClose={() => handleClose("taskBreakdown")}
//                 aria-labelledby="task-breakdown-modal"
//               >
//                 <Box sx={modalStyle}>
//                   <MDBox
//                     variant="gradient"
//                     bgColor="info"
//                     borderRadius="lg"
//                     coloredShadow="info"
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <Box display="flex" alignItems="center">
//                       <IconButton color="white">
//                         <Checklist />
//                       </IconButton>
//                       <MDTypography variant="h6" color="white">
//                         Task Breakdown by Resources
//                       </MDTypography>
//                     </Box>
//                     <IconButton color="white" onClick={() => handleClose("taskBreakdown")}>
//                       <Close />
//                     </IconButton>
//                   </MDBox>
//                   <MDBox py={3} px={2}>
//                     <Taskbreakdown />
//                   </MDBox>
//                 </Box>
//               </Modal>
//             </Grid>

//             {/* Resource Utilization */}
//             <Grid item xs={12} md={6} lg={6}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Box display="flex" alignItems="center">
//                     <IconButton color="white">
//                       <PieChart />
//                     </IconButton>
//                     <MDTypography variant="h6" color="white">
//                       Resource Utilization
//                     </MDTypography>
//                   </Box>
//                   <IconButton color="white" onClick={() => handleOpen("utilization")}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox py={3} px={2}>
//                   <ResourcesUtilizations />
//                 </MDBox>
//               </Card>
//               <Modal
//                 open={openModal.utilization}
//                 onClose={() => handleClose("utilization")}
//                 aria-labelledby="utilization-modal"
//               >
//                 <Box sx={modalStyle}>
//                   <MDBox
//                     variant="gradient"
//                     bgColor="info"
//                     borderRadius="lg"
//                     coloredShadow="info"
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <Box display="flex" alignItems="center">
//                       <IconButton color="white">
//                         <PieChart />
//                       </IconButton>
//                       <MDTypography variant="h6" color="white">
//                         Resource Utilization
//                       </MDTypography>
//                     </Box>
//                     <IconButton color="white" onClick={() => handleClose("utilization")}>
//                       <Close />
//                     </IconButton>
//                   </MDBox>
//                   <MDBox py={3} px={2}>
//                     <ResourcesUtilizations />
//                   </MDBox>
//                 </Box>
//               </Modal>
//             </Grid>
//           </Grid>
//         </MDBox>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default ProjectOverview;

// imports remain same
// import React, { useState } from "react";
// import { Grid, Box, Card, IconButton, Modal, Stack, Typography, Chip } from "@mui/material";
// import {
//   CalendarMonth,
//   Checklist,
//   Close,
//   EmojiFlags,
//   Fullscreen,
//   PieChart,
// } from "@mui/icons-material";

// // Custom MD components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import PropTypes from "prop-types";
// // Layout
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// // Custom Components
// import Projectsongoing from "./Components/Projectongoing";
// import Majormilestone from "./Components/Majormilestone/Majormilestone";
// import ProjectTimeline from "./Components/ProjectTimeline/ProjectTimeline";
// import Taskbreakdown from "./Components/Taskbreakdown/Taskbreakdown";
// import ResourcesUtilizations from "./Components/ResourcesUtilization/ResourcesUtilizations";

// // Reusable Fullscreen Modal
// function GlobalModal({ open, onClose, title, icon, children }) {
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           bgcolor: "background.paper",
//           overflow: "auto",
//           p: 4,
//         }}
//       >
//         <MDBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="info"
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           px={2}
//           py={1}
//           mb={2}
//         >
//           <Box display="flex" alignItems="center">
//             <IconButton color="inherit">{icon}</IconButton>
//             <MDTypography variant="h6" color="white" ml={1}>
//               {title}
//             </MDTypography>
//           </Box>
//           <IconButton color="inherit" onClick={onClose}>
//             <Close />
//           </IconButton>
//         </MDBox>
//         <MDBox>{children}</MDBox>
//       </Box>
//     </Modal>
//   );
// }

// function ProjectOverview() {
//   const [openSection, setOpenSection] = useState(null);

//   const handleOpen = (section) => setOpenSection(section);
//   const handleClose = () => setOpenSection(null);

//   const sectionMap = {
//     milestones: {
//       title: "Major Milestones",
//       icon: <EmojiFlags />,
//       component: <Majormilestone />,
//     },
//     timeline: {
//       title: "Project Timeline",
//       icon: <CalendarMonth />,
//       component: <ProjectTimeline />,
//     },
//     taskBreakdown: {
//       title: "Task Breakdown by Resources",
//       icon: <Checklist />,
//       component: <Taskbreakdown />,
//     },
//     utilization: {
//       title: "Resource Utilization",
//       icon: <PieChart />,
//       component: <ResourcesUtilizations />,
//     },
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mt={4} mb={3}>
//         <Projectsongoing />
//       </MDBox>
//       <MDBox py={3}>
//         <Grid container spacing={3}>
//           {/* Major Milestones */}
//           <Grid item xs={12} md={6}>
//             <Card>
//               <MDBox
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 px={2}
//                 py={1}
//               >
//                 <Box display="flex" alignItems="center">
//                   <IconButton color="white">
//                     <EmojiFlags />
//                   </IconButton>
//                   <MDTypography variant="h6" color="white">
//                     Major Milestones
//                   </MDTypography>
//                 </Box>
//                 <IconButton color="white" onClick={() => handleOpen("milestones")}>
//                   <Fullscreen />
//                 </IconButton>
//               </MDBox>
//               <MDBox p={2}>
//                 <Majormilestone />
//               </MDBox>
//             </Card>
//           </Grid>

//           {/* Project Timeline */}
//           <Grid item xs={12} md={6}>
//             <Card>
//               <MDBox
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 px={2}
//                 py={1}
//               >
//                 <Box display="flex" alignItems="center">
//                   <IconButton color="white">
//                     <CalendarMonth />
//                   </IconButton>
//                   <MDTypography variant="h6" color="white">
//                     Project Timeline
//                   </MDTypography>
//                   <Stack direction="row" spacing={1} ml={2}>
//                     <Chip label="Month" variant="outlined" />
//                     <Chip label="Week" variant="outlined" />
//                     <Chip label="Day" variant="outlined" />
//                   </Stack>
//                 </Box>
//                 <IconButton color="white" onClick={() => handleOpen("timeline")}>
//                   <Fullscreen />
//                 </IconButton>
//               </MDBox>
//               <MDBox p={2}>
//                 <ProjectTimeline />
//               </MDBox>
//             </Card>
//           </Grid>

//           {/* Task Breakdown */}
//           <Grid item xs={12} md={6}>
//             <Card>
//               <MDBox
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 px={2}
//                 py={1}
//               >
//                 <Box display="flex" alignItems="center">
//                   <IconButton color="white">
//                     <Checklist />
//                   </IconButton>
//                   <MDTypography variant="h6" color="white">
//                     Task Breakdown by Resources
//                   </MDTypography>
//                 </Box>
//                 <IconButton color="white" onClick={() => handleOpen("taskBreakdown")}>
//                   <Fullscreen />
//                 </IconButton>
//               </MDBox>
//               <MDBox p={2}>
//                 <Taskbreakdown />
//               </MDBox>
//             </Card>
//           </Grid>

//           {/* Resource Utilization */}
//           <Grid item xs={12} md={6}>
//             <Card>
//               <MDBox
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 px={2}
//                 py={1}
//               >
//                 <Box display="flex" alignItems="center">
//                   <IconButton color="white">
//                     <PieChart />
//                   </IconButton>
//                   <MDTypography variant="h6" color="white">
//                     Resource Utilization
//                   </MDTypography>
//                 </Box>
//                 <IconButton color="white" onClick={() => handleOpen("utilization")}>
//                   <Fullscreen />
//                 </IconButton>
//               </MDBox>
//               <MDBox p={2}>
//                 <ResourcesUtilizations />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>

//       {/* Fullscreen Modal */}
//       {openSection && (
//         <GlobalModal
//           open={Boolean(openSection)}
//           onClose={handleClose}
//           title={sectionMap[openSection].title}
//           icon={sectionMap[openSection].icon}
//         >
//           {sectionMap[openSection].component}
//         </GlobalModal>
//       )}

//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default ProjectOverview;
// GlobalModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.element,
//   children: PropTypes.node,
// };

// import React from "react";
// import { Grid, Box, Card, IconButton, Stack, Typography, Chip } from "@mui/material";
// import { CalendarMonth, Checklist, EmojiFlags, PieChart } from "@mui/icons-material";

// // Custom MD components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// // Layout
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// // Custom Components
// import Projectsongoing from "./Components/Projectongoing";
// import Majormilestone from "./Components/Majormilestone/Majormilestone";
// import ProjectTimeline from "./Components/ProjectTimeline/ProjectTimeline";
// import Taskbreakdown from "./Components/Taskbreakdown/Taskbreakdown";
// import ResourcesUtilizations from "./Components/ResourcesUtilization/ResourcesUtilizations";

// function ProjectOverview() {
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mt={4} mb={3}>
//         <Projectsongoing />
//       </MDBox>
//       <MDBox py={3}>
//         <Grid container spacing={3}>
//           {/* Major Milestones */}
//           <Grid item xs={12} md={6}>
//             <Card>
//               <MDBox
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 px={2}
//                 py={1}
//               >
//                 <Box display="flex" alignItems="center">
//                   <IconButton color="white" disabled>
//                     <EmojiFlags />
//                   </IconButton>
//                   <MDTypography variant="h6" color="white">
//                     Major Milestones
//                   </MDTypography>
//                 </Box>
//               </MDBox>
//               <MDBox p={2}>
//                 <Majormilestone />
//               </MDBox>
//             </Card>
//           </Grid>

//           {/* Project Timeline */}
//           <Grid item xs={12} md={6}>
//             <Card>
//               <MDBox
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 px={2}
//                 py={1}
//               >
//                 <Box display="flex" alignItems="center">
//                   <IconButton color="white" disabled>
//                     <CalendarMonth />
//                   </IconButton>
//                   <MDTypography variant="h6" color="white">
//                     Project Timeline
//                   </MDTypography>
//                   <Stack direction="row" spacing={1} ml={2}>
//                     <Chip label="Month" variant="outlined" />
//                     <Chip label="Week" variant="outlined" />
//                     <Chip label="Day" variant="outlined" />
//                   </Stack>
//                 </Box>
//               </MDBox>
//               <MDBox p={2}>
//                 <ProjectTimeline />
//               </MDBox>
//             </Card>
//           </Grid>

//           {/* Task Breakdown */}
//           <Grid item xs={12} md={6}>
//             <Card>
//               <MDBox
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 px={2}
//                 py={1}
//               >
//                 <Box display="flex" alignItems="center">
//                   <IconButton color="white" disabled>
//                     <Checklist />
//                   </IconButton>
//                   <MDTypography variant="h6" color="white">
//                     Task Breakdown by Resources
//                   </MDTypography>
//                 </Box>
//               </MDBox>
//               <MDBox p={2}>
//                 <Taskbreakdown />
//               </MDBox>
//             </Card>
//           </Grid>

//           {/* Resource Utilization */}
//           <Grid item xs={12} md={6}>
//             <Card>
//               <MDBox
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 px={2}
//                 py={1}
//               >
//                 <Box display="flex" alignItems="center">
//                   <IconButton color="white" disabled>
//                     <PieChart />
//                   </IconButton>
//                   <MDTypography variant="h6" color="white">
//                     Resource Utilization
//                   </MDTypography>
//                 </Box>
//               </MDBox>
//               <MDBox p={2}>
//                 <ResourcesUtilizations />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default ProjectOverview;

import React, { useState } from "react";
import { Grid, Box, Card, IconButton, Stack, Chip } from "@mui/material";
import {
  CalendarMonth,
  Checklist,
  Close,
  EmojiFlags,
  Fullscreen,
  FullscreenExit,
  PieChart,
} from "@mui/icons-material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Projectsongoing from "./Components/Projectongoing";
import Majormilestone from "./Components/Majormilestone/Majormilestone";
import ProjectTimeline from "./Components/ProjectTimeline/ProjectTimeline";
import Taskbreakdown from "./Components/Taskbreakdown/Taskbreakdown";
import ResourcesUtilizations from "./Components/ResourcesUtilization/ResourcesUtilizations";

function ProjectOverview() {
  const [fullscreenSection, setFullscreenSection] = useState(null);

  // add here you compinent in this way
  const sectionMap = {
    taskBreakdown: {
      title: "Task Breakdown by Resources",
      icon: <Checklist />,
      component: <Taskbreakdown />,
    },
    utilization: {
      title: "Resource Utilization",
      icon: <PieChart />,
      component: <ResourcesUtilizations />,
    },
    milestones: {
      title: "Major Milestones",
      icon: <EmojiFlags />,
      component: <Majormilestone />,
    },
    timeline: {
      title: "Project Timeline",
      icon: <CalendarMonth />,
      component: <ProjectTimeline />,
      showChips: true, // for Month/Week/Day chips
    },
  };

  const handleToggleFullscreen = (section) => {
    if (fullscreenSection === section) {
      setFullscreenSection(null);
    } else {
      setFullscreenSection(section);
    }
  };

  // Render fullscreen mode
  if (fullscreenSection) {
    const { title, icon, component, showChips } = sectionMap[fullscreenSection];
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "background.paper",
            zIndex: 1300,
            overflow: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <IconButton color="inherit">{icon}</IconButton>
              <MDTypography variant="h6" color="white" ml={1}>
                {title}
              </MDTypography>
            </Box>
            <IconButton color="inherit" onClick={() => setFullscreenSection(null)}>
              <FullscreenExit />
            </IconButton>
          </MDBox>
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>{component}</Box>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Render default grid layout with fullscreen toggle buttons
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={3}>
        <Projectsongoing />
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {Object.entries(sectionMap).map(([key, { title, icon, component, showChips }]) => (
            <Grid item xs={12} md={6} key={key}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px={2}
                  py={1}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton color="white">{icon}</IconButton>
                    <MDTypography variant="h6" color="white">
                      {title}
                    </MDTypography>
                  </Box>
                  <IconButton color="white" onClick={() => handleToggleFullscreen(key)}>
                    <Fullscreen />
                  </IconButton>
                </MDBox>
                <MDBox p={2}>{component}</MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProjectOverview;
