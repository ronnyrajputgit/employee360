// import React from "react";
// import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
// import StorageIcon from "@mui/icons-material/Storage";
// import MemoryIcon from "@mui/icons-material/Memory";
// import SdStorageIcon from "@mui/icons-material/SdStorage";
// import DataUsageIcon from "@mui/icons-material/DataUsage";

// const metrics = [
//   {
//     icon: <StorageIcon fontSize="large" color="primary" />,
//     label: "Disk Usage",
//     value: "75%",
//   },
//   {
//     icon: <MemoryIcon fontSize="large" color="secondary" />,
//     label: "Memory Usage",
//     value: "65%",
//   },
//   {
//     icon: <SdStorageIcon fontSize="large" color="success" />,
//     label: "Storage",
//     value: "80%",
//   },
//   {
//     icon: <DataUsageIcon fontSize="large" color="error" />,
//     label: "Bandwidth",
//     value: "40%",
//   },
// ];

// const UtilizationMetrics = () => {
//   return (
//     <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//       <CardContent>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           Utilization Metrics
//         </Typography>
//         <Grid container spacing={2}>
//           {metrics.map((metric, index) => (
//             <Grid item xs={6} sm={3} key={index}>
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 textAlign="center"
//                 p={2}
//               >
//                 {metric.icon}
//                 <Typography variant="body2" mt={1}>
//                   {metric.label}
//                 </Typography>
//                 <Typography variant="h6" fontWeight="bold" color="text.primary">
//                   {metric.value}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default UtilizationMetrics;

import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Button, Grid, Stack, IconButton } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 🔹 Single mock data array
const mockData = {
  chart: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Billable Hours",
        data: [35, 34, 33, 32],
        backgroundColor: "#2196f3",
        stack: "stack1",
      },
      {
        label: "Non-Billable Hours",
        data: [5, 6, 7, 8],
        backgroundColor: "#9e9e9e",
        stack: "stack1",
      },
    ],
  },
  stats: [
    { label: "Billable Hours", value: "78%" },
    { label: "Non-Billable Hours", value: "22%" },
    { label: "Target", value: "75%" },
    { label: "Department Average", value: "72%" },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Hours",
      },
    },
  },
};

const UtilizationMetrics = () => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        position: fullscreen ? "fixed" : "relative",
        top: fullscreen ? 0 : "auto",
        left: fullscreen ? 0 : "auto",
        width: fullscreen ? "100vw" : "auto",
        height: fullscreen ? "100vh" : "auto",
        zIndex: fullscreen ? 1300 : "auto",
        bgcolor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1d4e89, #1e88e5)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <PieChartIcon />
          <Typography variant="h6" fontWeight="bold">
            Utilization Metrics
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="contained" color="primary" size="small">
            Year
          </Button>
          <Button variant="contained" color="primary" size="small">
            Quarter
          </Button>
          <Button variant="contained" color="primary" size="small">
            Month
          </Button>
          <IconButton sx={{ color: "#fff" }} onClick={() => setFullscreen((prev) => !prev)}>
            {fullscreen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
          </IconButton>
        </Stack>
      </Box>

      {/* Chart */}
      <CardContent
        sx={{
          height: fullscreen ? "calc(100vh - 180px)" : "auto",
          overflow: fullscreen ? "auto" : "visible",
        }}
      >
        <Box sx={{ height: 300 }}>
          <Bar data={mockData.chart} options={chartOptions} />
        </Box>

        {/* Stats */}
        <Grid container spacing={2} mt={2}>
          {mockData.stats.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  bgcolor: "#f9fcff",
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="subtitle1" color="textSecondary">
                  {item.label}:
                </Typography>
                <Typography variant="h5" color="#1e88e5" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UtilizationMetrics;
