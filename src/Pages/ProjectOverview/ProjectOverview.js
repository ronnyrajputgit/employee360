// import React, { useState } from "react";
// import { Grid, Box, Card, IconButton, Stack, Chip } from "@mui/material";
// import {
//   CalendarMonth,
//   Checklist,
//   Close,
//   EmojiFlags,
//   Fullscreen,
//   FullscreenExit,
//   PieChart,
// } from "@mui/icons-material";

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

// function ProjectOverview() {
//   const [fullscreenSection, setFullscreenSection] = useState(null);

//   // add here you compinent in this way
//   const sectionMap = {
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

//     // milestones: {
//     //   title: "Major Milestones",
//     //   icon: <EmojiFlags />,
//     //   component: <Majormilestone />,
//     // },
//     // timeline: {
//     //   title: "Project Timeline",
//     //   icon: <CalendarMonth />,
//     //   component: <ProjectTimeline />,
//     //   showChips: true, // for Month/Week/Day chips
//     // },
//   };

//   const handleToggleFullscreen = (section) => {
//     if (fullscreenSection === section) {
//       setFullscreenSection(null);
//     } else {
//       setFullscreenSection(section);
//     }
//   };

//   // Render fullscreen mode
//   if (fullscreenSection) {
//     const { title, icon, component, showChips } = sectionMap[fullscreenSection];
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <MDBox
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             bgcolor: "background.paper",
//             zIndex: 1300,
//             overflow: "auto",
//             p: 2,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <MDBox
//             variant="gradient"
//             bgColor="info"
//             borderRadius="lg"
//             coloredShadow="info"
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             px={2}
//             py={1}
//             mb={2}
//           >
//             <Box display="flex" alignItems="center">
//               <IconButton color="inherit">{icon}</IconButton>
//               <MDTypography variant="h6" color="white" ml={1}>
//                 {title}
//               </MDTypography>
//             </Box>
//             <IconButton color="inherit" onClick={() => setFullscreenSection(null)}>
//               <FullscreenExit />
//             </IconButton>
//           </MDBox>
//           <Box sx={{ flexGrow: 1, overflow: "auto" }}>{component}</Box>
//         </MDBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

//   // Render default grid layout with fullscreen toggle buttons
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mt={4} mb={3}>
//         <Projectsongoing />
//       </MDBox>
//       <MDBox py={3}>
//         <Grid container spacing={3}>
//           {Object.entries(sectionMap).map(([key, { title, icon, component, showChips }]) => (
//             <Grid item xs={12} md={6} key={key}>
//               <Card>
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   px={2}
//                   py={1}
//                 >
//                   <Box display="flex" alignItems="center">
//                     <IconButton color="white">{icon}</IconButton>
//                     <MDTypography variant="h6" color="white">
//                       {title}
//                     </MDTypography>
//                   </Box>
//                   <IconButton color="white" onClick={() => handleToggleFullscreen(key)}>
//                     <Fullscreen />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox p={2}>{component}</MDBox>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default ProjectOverview;

// src/layouts/project-overview/index.js

import React, { useState } from "react";
import { Grid, Box, Card, IconButton } from "@mui/material";
import {
  Checklist,
  Fullscreen,
  FullscreenExit,
  Person3,
  PieChart,
  Task,
} from "@mui/icons-material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Projectsongoing from "./Components/Projectongoing";
import Taskbreakdown from "./Components/Taskbreakdown/Taskbreakdown";
import ResourcesUtilizations from "./Components/ResourcesUtilization/ResourcesUtilizations";
import AssignedTasks from "./Components/AssignedTasks/AssignedTasks";

function ProjectOverview() {
  const [fullscreenSection, setFullscreenSection] = useState(null);

  // <-- Badlav yahan hai: Component को स्टोर करें, JSX एलिमेंट को नहीं -->
  const sectionMap = {
    assignedTask: {
      title: "Assigned Tasks",
      icon: <Task />,
      Component: AssignedTasks, // <-- <Taskbreakdown /> की जगह सिर्फ Taskbreakdown
    },
    projectMember: {
      title: "Project Members",
      icon: <Person3 />,
      Component: Projectsongoing, // <-- <Taskbreakdown /> की जगह सिर्फ Taskbreakdown
    },
    taskBreakdown: {
      title: "Task Breakdown by Resources",
      icon: <Checklist />,
      Component: Taskbreakdown, // <-- <Taskbreakdown /> की जगह सिर्फ Taskbreakdown
    },
    utilization: {
      title: "Resource Utilization",
      icon: <PieChart />,
      Component: ResourcesUtilizations, // <-- Component का नाम रखें
    },
  };

  const handleToggleFullscreen = (section) => {
    setFullscreenSection(fullscreenSection === section ? null : section);
  };

  // Render fullscreen mode
  if (fullscreenSection) {
    const { title, icon, Component } = sectionMap[fullscreenSection]; // <-- Component को डीस्ट्रक्चर करें
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
          {/* <-- Badlav yahan hai: isFullscreen prop को true पास करें --> */}
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            <Component isFullscreen={true} />
          </Box>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Render default grid layout
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {Object.entries(sectionMap).map(([key, { title, icon, Component }]) => (
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
                {/* <-- Badlav yahan hai: isFullscreen prop को false पास करें --> */}
                <MDBox p={2}>
                  <Component isFullscreen={false} />
                </MDBox>
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
