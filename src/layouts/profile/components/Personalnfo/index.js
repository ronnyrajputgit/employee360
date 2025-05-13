import { Avatar, Card, Grid, Icon } from "@mui/material";
import { getUserProfile } from "auth/getUserProfile";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";

const PersonalInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      // console.log("profile", profile);
      setUser(profile);
    };

    fetchProfile();
  }, []);

  if (!user) return <center>Loading profile...</center>;
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
                src={user ? user.photo : "n/a"}
                alt="profile"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <MDTypography variant="h5" fontWeight="medium">
                {user ? user.name : "n/a"}
              </MDTypography>
              <MDTypography variant="button" color="info" fontWeight="regular">
                {user ? user.jobTitle : "n/a"}
              </MDTypography>
              <MDTypography variant="body2" color="text" mt={1}>
                <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
                {user.email}
              </MDTypography>
              {/* <MDTypography variant="body2" color="text" mt={1}>
                <Icon sx={{ verticalAlign: "middle", mr: 1 }}>linkedin</Icon>
                n/a
              </MDTypography> */}
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
                    {user ? user.employeeId : "n/a"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Department:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {user ? user.department : "n/a"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Joining Date:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {user ? user.joiningDate : "n/a"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Location:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {user ? user.location : "n/a"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Phone:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {user ? user.phone : "n/a"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Status:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium" color="success">
                    {user ? user.status : "n/a"}
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
