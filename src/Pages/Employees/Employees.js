import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import EmployeeSkills from "./Components/SkillsInventory/EmployeeSkills";
import EmployeeTasks from "./Components/Tasks/EmployeeTasks";
import EmployeeProfiles from "./Components/EmployeeProfiles/EmployeeProfiles";
import UtilizationMetrics from "./Components/UtilizationMetrics/UtilizationMetrics";

const Employees = () => {
  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={4} mb={3}>
          <EmployeeProfiles />
        </MDBox>
        <MDBox mt={4} mb={3}>
          <EmployeeSkills />
        </MDBox>
        <MDBox mt={4} mb={3}>
          <EmployeeTasks />
        </MDBox>
        <MDBox mt={4} mb={3}>
          <UtilizationMetrics />
        </MDBox>
        {/* <MDBox py={3}>
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
        </MDBox> */}
        <Footer />
      </DashboardLayout>
    </div>
  );
};

export default Employees;
