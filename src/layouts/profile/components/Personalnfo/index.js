import { Avatar, Card, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";

const PersonalInfo = () => {
  return (
    <div>
      <Grid container spacing={2}>
        {/* Profile Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={3}
              height="100%"
            >
              <Avatar
                src="your-image-url.jpg"
                alt="profile"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <MDTypography variant="h5" fontWeight="medium">
                Aravvindhan V S
              </MDTypography>
              <MDTypography variant="button" color="info" fontWeight="regular">
                Technical Lead
              </MDTypography>
              <MDTypography variant="body2" color="text" mt={1}>
                <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
                aravvindhan.vs@datainfa.com
              </MDTypography>
              <MDTypography variant="body2" color="text" mt={1}>
                <Icon sx={{ verticalAlign: "middle", mr: 1 }}>linkedin</Icon>
                aravvindhan.vs@datainfa.com
              </MDTypography>
            </MDBox>
          </Card>
        </Grid>

        {/* Personal Info Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <MDBox
              display="flex"
              flexDirection="column"
              justifyContent="center"
              p={3}
              height="100%"
            >
              <MDTypography variant="h6" fontWeight="medium" mb={2}>
                Personal Information
              </MDTypography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Employee ID:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    00064
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Department:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    Consulting Services
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Joining Date:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    22 Jan 2024
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Location:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    Bengaluru
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Phone:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    +91 9791975891
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Status:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium" color="success">
                    ● Active
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalInfo;
