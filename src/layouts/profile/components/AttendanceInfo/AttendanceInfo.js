import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Grid, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MDBox from "components/MDBox";

const AttendanceInfo = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const mockData = {
    attendanceRate: "98%",
    leaveBalance: 15,
    sickDays: 2,
    month: "April 2025",
  };

  return (
    <MDBox
      mt={5}
      mb={3}
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
        p: fullscreen ? 2 : 0,
      }}
    >
      <Box boxShadow={3} borderRadius={2} overflow="hidden">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          py={2}
          sx={{
            bgcolor: "linear-gradient(to right,rgb(142, 156, 188), #3b82f6)",
            background: "linear-gradient(to right, #1e3a8a, #3b82f6)",
            color: "#fff",
          }}
        >
          <Typography variant="h6" display="flex" alignItems="center" gap={1}>
            <EventIcon /> Attendance Information
          </Typography>
          <IconButton onClick={() => setFullscreen(!fullscreen)} sx={{ color: "#fff" }}>
            {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Box>

        <Box px={3} py={3} bgcolor="#f0f8ff">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h4" color="primary">
                    {mockData.attendanceRate}
                  </Typography>
                  <Typography color="textSecondary">Attendance Rate</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h4" color="primary">
                    {mockData.leaveBalance}
                  </Typography>
                  <Typography color="textSecondary">Leave Balance</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h4" color="primary">
                    {mockData.sickDays}
                  </Typography>
                  <Typography color="textSecondary">Sick Days</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          py={2}
          bgcolor="#f0f8ff"
        >
          <IconButton>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6">{mockData.month}</Typography>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </MDBox>
  );
};

export default AttendanceInfo;
