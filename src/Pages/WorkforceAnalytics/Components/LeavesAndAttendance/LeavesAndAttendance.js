import React from "react";
import { Box, Card, CardContent, Typography, Grid, Paper, Divider } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

// Mock summary data
const summaryData = [
  { label: "Attendance Rate", value: "96.5%", color: "#2196f3" },
  { label: "Avg. Leave Days", value: "8.4", color: "#ff9800" },
  { label: "WFH Percentage", value: "42%", color: "#00bcd4" },
  { label: "Unplanned Absence", value: "1.2%", color: "#f44336" },
];

// Leave Distribution Bar Chart
const leaveLabels = ["Vacation", "Sick Leave", "Personal Leave", "Parental Leave", "Other"];
const leaveData = {
  labels: leaveLabels,
  datasets: [
    {
      label: "Avg. Days per Employee",
      data: [12, 4, 1.5, 0.8, 0.3],
      backgroundColor: "#42a5f5",
      borderRadius: 6,
      barPercentage: 0.6,
    },
  ],
};

// WFH Statistics Donut Chart
const wfhStatsData = {
  labels: ["Office", "WFH", "Hybrid"],
  datasets: [
    {
      data: [38, 44, 18],
      backgroundColor: ["#42a5f5", "#66bb6a", "#ab47bc"],
      borderWidth: 2,
    },
  ],
};

// Attendance Trends (Line Chart Placeholder)
const attendanceTrendsData = {
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Attendance Rate (%)",
      data: [97, 96.8, 96, 95.5, 96.2, 97, 96.7, 95.2, 96.5, 97.1, 96.6, 96.9],
      fill: false,
      borderColor: "#2196f3",
      backgroundColor: "#2196f3",
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
  ],
};

const chartOptions = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: "#eee" } },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const donutOptions = {
  plugins: {
    legend: { display: true, position: "right" },
    tooltip: { enabled: true },
  },
  cutout: "70%",
  responsive: true,
  maintainAspectRatio: false,
};

const lineOptions = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      min: 94,
      max: 98,
      grid: { color: "#eee" },
      ticks: { stepSize: 1 },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const infoCards = [
  {
    title: "Seasonal Patterns",
    description:
      "Leave usage increases by 28% during summer months (June-August) and year-end holidays (December).",
  },
  {
    title: "WFH Impact",
    description:
      "Teams with higher WFH percentages (>50%) show 15% higher productivity and 22% lower unplanned absences.",
  },
  {
    title: "Leave Balance",
    description:
      "32% of employees have more than 10 unused leave days, suggesting potential burnout risks.",
  },
];

const LeavesAndAttendance = () => (
  <Box
    sx={{
      borderRadius: 4,
      boxShadow: "0 8px 32px 0 rgba(60,72,100,0.10)",
      background: "rgba(255,255,255,0.95)",
      border: "1px solid #e3e7ef",
      overflow: "visible",
      padding: 3,
    }}
  >
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(60,72,100,0.10)",
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #e3e7ef",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        {/* Title */}
        <Box display="flex" alignItems="center" mb={3}>
          <InfoOutlinedIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" fontWeight={700} letterSpacing={0.2}>
            Leave & Attendance Metrics
          </Typography>
        </Box>
        {/* Top summary cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {summaryData.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 12px 0 rgba(60,72,100,0.08)",
                  border: "1px solid #f0f0f0",
                  textAlign: "center",
                  minHeight: 90,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #fafdff 60%, #f5faff 100%)",
                }}
              >
                <CardContent>
                  <Typography variant="h4" fontWeight={700} sx={{ color: item.color, mb: 0.5 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Leave Distribution and WFH Statistics */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: 270,
                borderRadius: 3,
                border: "1px solid #e3e7ef",
                background: "#fafdff",
                boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Leave Distribution
              </Typography>
              <Box sx={{ height: 180 }}>
                <Bar data={leaveData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: 270,
                borderRadius: 3,
                border: "1px solid #e3e7ef",
                background: "#fafdff",
                boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                WFH Statistics
              </Typography>
              <Box sx={{ height: 180, width: 190 }}>
                <Doughnut data={wfhStatsData} options={donutOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {/* Attendance Trends */}
        <Box sx={{ mt: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              minHeight: 120,
              borderRadius: 3,
              border: "1px solid #e3e7ef",
              background: "#fafdff",
              boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Attendance Trends (12 Months)
            </Typography>
            <Divider />
            <Box sx={{ height: 120 }}>
              <Line data={attendanceTrendsData} options={lineOptions} />
            </Box>
          </Paper>
        </Box>
        {/* Info Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {infoCards.map((card, idx) => (
            <Grid item xs={12} md={4} key={card.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #e3e7ef",
                  background: "#fafdff",
                  boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <InfoOutlinedIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    sx={{ mb: 0.5, color: "#1976d2" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  </Box>
);

export default LeavesAndAttendance;
