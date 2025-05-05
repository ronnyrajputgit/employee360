import React from "react";
import { Grid, Card, Box, Typography, useTheme } from "@mui/material";

// Mock Data
const milestones = [
  {
    date: "Jan 15, 2025",
    title: "Project Kickoff",
    description: "Initial project planning and team formation completed",
    status: "Completed",
    statusColor: "#4caf50",
    bgColor: "#e6f4ea",
  },
  {
    date: "Feb 10, 2025",
    title: "Design Phase",
    description: "UI/UX wireframes and prototypes are being created",
    status: "In Progress",
    statusColor: "#fb8c00",
    bgColor: "#fff3e0",
  },
  {
    date: "Mar 01, 2025",
    title: "Development Blocked",
    description: "Dev progress halted due to API access issue",
    status: "Delayed",
    statusColor: "#e53935",
    bgColor: "#ffebee",
  },
  {
    date: "Apr 05, 2025",
    title: "Testing",
    description: "QA team is testing core functionality",
    status: "In Progress",
    statusColor: "#fb8c00",
    bgColor: "#fff3e0",
  },
  {
    date: "May 01, 2025",
    title: "Launch",
    description: "Product released to customers",
    status: "Upcoming",
    statusColor: "#1976d2",
    bgColor: "#e3f2fd",
  },
];

const Majormilestone = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {milestones.map((item, index) => (
          <Grid item xs={12} sm={12} md={12} lg={12} key={index} sx={{ display: "flex" }}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                borderLeft: `5px solid ${item.statusColor}`,
                width: "100%",
                boxShadow: 3,
                flexDirection: "row",
              }}
            >
              {/* Date */}
              <Box
                sx={{
                  backgroundColor: "#f0f7ff",
                  borderRadius: 1,
                  //   padding: "4px 8px",
                  marginRight: 2,
                  minWidth: 90,
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {item.date}
                </Typography>
              </Box>

              {/* Content */}
              <Box flexGrow={1}>
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                  {item.description}
                </Typography>
              </Box>

              {/* Status */}
              <Box
                sx={{
                  backgroundColor: item.bgColor,
                  color: item.statusColor,
                  borderRadius: 1,
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  marginLeft: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {item.status}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Majormilestone;
