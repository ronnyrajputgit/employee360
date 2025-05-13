// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Images
import {
  Avatar,
  Box,
  Card,
  Chip,
  Icon,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Projectsongoing from "./Components/Projectongoing";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import {
  CalendarMonth,
  Checklist,
  Close,
  EmojiFlags,
  Fullscreen,
  PieChart,
} from "@mui/icons-material";
import { useState } from "react";
import Majormilestone from "./Components/Majormilestone/Majormilestone";
import ProjectTimeline from "./Components/ProjectTimeline/ProjectTimeline";
import Taskbreakdown from "./Components/Taskbreakdown/Taskbreakdown";
import ResourcesUtilizations from "./Components/ResourcesUtilization/ResourcesUtilizations";

function ProjectOverview() {
  const [openModal, setOpenModal] = useState({
    milestones: false,
    timeline: false,
    taskBreakdown: false,
  });

  const handleOpen = (section) => {
    setOpenModal({ ...openModal, [section]: true });
  };

  const handleClose = (section) => {
    setOpenModal({ ...openModal, [section]: false });
  };

  const modalStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    overflow: "auto",
    p: 6,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox mt={5} mb={3}>
        <Projectsongoing />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="white">
                      <EmojiFlags />
                    </IconButton>
                    <MDTypography variant="h6" color="white">
                      Major Milestones
                    </MDTypography>
                  </div>
                  <IconButton color="white" onClick={() => handleOpen("milestones")}>
                    <Fullscreen />
                  </IconButton>
                </MDBox>
                <MDBox py={3} px={2}>
                  <Majormilestone />
                </MDBox>
              </Card>
              <Modal
                fullScreen
                open={openModal.milestones}
                onClose={() => handleClose("milestones")}
                aria-labelledby="milestone-modal"
              >
                <Box sx={modalStyle}>
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton color="white">
                        <EmojiFlags />
                      </IconButton>
                      <MDTypography variant="h6" color="white">
                        Major Milestones
                      </MDTypography>
                    </div>
                    <IconButton color="white" onClick={() => handleClose("milestones")}>
                      <Close />
                    </IconButton>
                  </MDBox>
                  <MDBox py={3} px={2}>
                    <Majormilestone />
                  </MDBox>
                </Box>
              </Modal>
            </Grid>

            {/* Timeline Card */}
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="white">
                      <CalendarMonth />
                    </IconButton>
                    <MDTypography variant="h6" color="white">
                      Project Timeline
                    </MDTypography>
                    {/* add here chip  */}
                    <Stack direction="row" spacing={1}>
                      <Chip label="Month" variant="outlined" />
                      <Chip label="Week" variant="outlined" />
                      <Chip label="Day" variant="outlined" />
                    </Stack>
                  </div>
                  <IconButton color="white" onClick={() => handleOpen("timeline")}>
                    <Fullscreen />
                  </IconButton>
                </MDBox>
                <MDBox py={3} px={2}>
                  <ProjectTimeline />
                </MDBox>
              </Card>
              <Modal
                fullScreen
                open={openModal.timeline}
                onClose={() => handleClose("timeline")}
                aria-labelledby="timeline-modal"
              >
                <Box sx={modalStyle}>
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton color="white">
                        <CalendarMonth />
                      </IconButton>
                      <MDTypography variant="h6" color="white">
                        Project Timeline
                      </MDTypography>
                    </div>
                    <IconButton color="white" onClick={() => handleClose("timeline")}>
                      <Close />
                    </IconButton>
                  </MDBox>
                  <MDBox py={3} px={2}>
                    <ProjectTimeline />
                  </MDBox>
                </Box>
              </Modal>
            </Grid>

            {/* Task Breakdown Card */}
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="white">
                      <Checklist />
                    </IconButton>
                    <MDTypography variant="h6" color="white">
                      Task Breakdown by Resources
                    </MDTypography>
                  </div>
                  <IconButton color="white" onClick={() => handleOpen("taskBreakdown")}>
                    <Fullscreen />
                  </IconButton>
                </MDBox>
                <MDBox py={3} px={2}>
                  <Taskbreakdown />
                </MDBox>
              </Card>
              <Modal
                fullScreen
                open={openModal.taskBreakdown}
                onClose={() => handleClose("taskBreakdown")}
                aria-labelledby="task-breakdown-modal"
              >
                <Box sx={modalStyle}>
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton color="white">
                        <Checklist />
                      </IconButton>
                      <MDTypography variant="h6" color="white">
                        Task Breakdown by Resources
                      </MDTypography>
                    </div>
                    <IconButton color="white" onClick={() => handleClose("taskBreakdown")}>
                      <Close />
                    </IconButton>
                  </MDBox>
                  <MDBox py={3} px={2}>
                    <Taskbreakdown />
                  </MDBox>
                </Box>
              </Modal>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="white">
                      <PieChart />
                    </IconButton>
                    <MDTypography variant="h6" color="white">
                      Resource Utilization
                    </MDTypography>
                  </div>
                  <IconButton color="white" onClick={() => handleOpen("timeline")}>
                    <Fullscreen />
                  </IconButton>
                </MDBox>
                <MDBox py={3} px={2}>
                  <ResourcesUtilizations />
                </MDBox>
              </Card>
              <Modal
                fullScreen
                open={openModal.timeline}
                onClose={() => handleClose("timeline")}
                aria-labelledby="timeline-modal"
              >
                <Box sx={modalStyle}>
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton color="white">
                        <CalendarMonth />
                      </IconButton>
                      <MDTypography variant="h6" color="white">
                        Resource Utilization
                      </MDTypography>
                    </div>
                    <IconButton color="white" onClick={() => handleClose("timeline")}>
                      <Close />
                    </IconButton>
                  </MDBox>
                  <MDBox py={3} px={2}>
                    {/* <TimelineContent /> */}
                    <ResourcesUtilizations />
                  </MDBox>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProjectOverview;
