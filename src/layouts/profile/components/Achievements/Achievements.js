import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";

const achievements = [
  {
    title: "Employee of the Month",
    description: "Recognized for outstanding performance and dedication to project delivery.",
    date: "Mar 2025",
  },
  {
    title: "Innovation Award",
    description: "Developed a new automated testing framework that reduced QA time by 40%.",
    date: "Dec 2024",
  },
  {
    title: "Project Excellence",
    description: "Successfully led the migration of legacy systems to cloud infrastructure.",
    date: "Sep 2024",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TimelineContent() {
  return (
    <Grid container direction="column" sx={{ position: "relative", pl: 3 }}>
      <Box
        sx={{
          position: "absolute",
          left: 16,
          top: 8,
          bottom: 0,
          width: "2px",
          backgroundColor: "#3498db",
          zIndex: 0,
        }}
      />
      {achievements.map((item, index) => (
        <Grid item key={index} sx={{ display: "flex", mb: 4, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: -4,
              top: 6,
              width: 16,
              height: 16,
              backgroundColor: "#fff",
              border: "4px solid #3498db",
              borderRadius: "50%",
              zIndex: 1,
            }}
          />
          <Box sx={{ ml: 4, flex: 1 }}>
            <Chip
              label={item.date}
              sx={{ mb: 1, backgroundColor: "#ecf0f1", fontWeight: "bold" }}
            />
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default function AchievementsTimeline() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ px: 2, py: 4 }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 2,
          mb: 3,
          background: "linear-gradient(to right, #2c3e50, #3498db)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          🏆 Achievements
        </Typography>

        <Box display="flex" alignItems="center">
          <Button variant="contained" size="small" sx={{ mr: 1 }}>
            All
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1, color: "white", borderColor: "white" }}
          >
            Year
          </Button>
          <Button variant="outlined" size="small" sx={{ color: "white", borderColor: "white" }}>
            Quarter
          </Button>
          {/* Fullscreen Button */}
          <IconButton sx={{ ml: 1, color: "white" }} onClick={() => setOpen(true)}>
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Timeline */}
      <TimelineContent />

      {/* Fullscreen Modal */}
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#2c3e50" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flex: 1 }}>
              🏆 Achievements - Fullscreen View
            </Typography>
            <IconButton edge="end" color="inherit" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4 }}>
          <TimelineContent />
        </Box>
      </Dialog>
    </Box>
  );
}
