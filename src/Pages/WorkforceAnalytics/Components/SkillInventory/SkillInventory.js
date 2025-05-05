import React from "react";
import { Box, Typography, Card, CardContent, LinearProgress, Grid } from "@mui/material";
import { Radar } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const SkillInventory = () => {
  // Mock Data
  const radarData = {
    labels: ["JavaScript", "Python", "Java", "Cloud", "DevOps", "Data Science", "UI/UX", "Mobile"],
    datasets: [
      {
        label: "Current Skills",
        data: [80, 70, 60, 65, 75, 70, 60, 68],
        backgroundColor: "rgba(63, 81, 181, 0.4)",
        borderColor: "rgba(63, 81, 181, 1)",
        pointBackgroundColor: "rgba(63, 81, 181, 1)",
      },
    ],
  };

  const barData = {
    labels: ["AI/ML", "Blockchain", "AR/VR", "Cybersecurity", "IoT", "Quantum Computing"],
    datasets: [
      {
        label: "Current Capacity",
        data: [45, 25, 30, 50, 40, 15],
        backgroundColor: "rgba(63, 81, 181, 0.7)",
      },
      {
        label: "Required Capacity",
        data: [75, 50, 45, 80, 60, 30],
        backgroundColor: "rgba(244, 67, 54, 0.7)",
      },
    ],
  };

  const certifications = [
    { name: "IDMC Foundation Series", employees: 27 },
    { name: "Data Engineering Foundation Certification", employees: 24 },
    { name: "IDMC - MDM SaaS Foundation", employees: 20 },
    { name: "CDQ Implementation Practitioner", employees: 18 },
    { name: "IPaaS Foundation Certification", employees: 15 },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Skill Inventory
      </Typography>
      <Grid container spacing={3}>
        {/* Skill Distribution */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skill Distribution
              </Typography>
              <Radar data={radarData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Skill Gap Analysis */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skill Gap Analysis
              </Typography>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: false },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Top Certifications */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Certifications
              </Typography>
              {certifications.map((cert, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="body2">
                    {cert.name} - {cert.employees} employees
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(cert.employees / 27) * 100}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkillInventory;
