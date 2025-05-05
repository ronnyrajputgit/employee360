// import React from "react";
// import { Box, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// // Summary cards mock data
// const summaryData = [
//   { label: "Avg. Salary", value: "$112K", color: "#2196f3" },
//   { label: "Avg. Bonus", value: "$18K", color: "#4caf50" },
//   { label: "Avg. Total Comp", value: "$148K", color: "#ff9800" },
//   { label: "4.2% YoY Increase", value: "4.2%", color: "#00bcd4" },
// ];

// // Salary Distribution Bar Chart
// const salaryBarData = {
//   labels: ["<$80k", "$80k-$100k", "$100k-$120k", "$120k-$140k", "$140k-$160k", ">$160k"],
//   datasets: [
//     {
//       label: "Number of Employees",
//       data: [180, 300, 400, 220, 140, 60],
//       backgroundColor: "#42a5f5",
//       borderRadius: 6,
//       barPercentage: 0.6,
//     },
//   ],
// };

// // Bonus Allocation Pie Chart
// const bonusPieData = {
//   labels: ["Performance Bonus", "Retention Bonus", "Project Completion", "Referral Bonus", "Other"],
//   datasets: [
//     {
//       data: [320, 120, 90, 60, 30],
//       backgroundColor: ["#ef5350", "#42a5f5", "#66bb6a", "#ffa726", "#ab47bc"],
//       borderWidth: 2,
//     },
//   ],
// };

// const chartOptions = {
//   plugins: {
//     legend: { display: false },
//     tooltip: { enabled: true },
//   },
//   scales: {
//     x: { grid: { display: false } },
//     y: { beginAtZero: true, grid: { color: "#eee" } },
//   },
//   responsive: true,
//   maintainAspectRatio: false,
// };

// const pieOptions = {
//   plugins: {
//     legend: { display: true, position: "right" },
//     tooltip: { enabled: true },
//   },
//   responsive: true,
//   maintainAspectRatio: false,
// };

// const revenueMetrics = [
//   { label: "Revenue per Employee", value: "$248,000" },
//   { label: "Profit per Employee", value: "$88,000" },
//   { label: "Revenue/Cost Ratio", value: "1.55x" },
// ];

// const CompensationData = () => (
//   <Box sx={{ p: { xs: 1, md: 3 }, background: "#f7fafd", minHeight: "100vh" }}>
//     <Box sx={{ mb: 3 }}>
//       <Box display="flex" alignItems="center" mb={2}>
//         <AttachMoneyIcon sx={{ color: "#2196f3", mr: 1, fontSize: 28 }} />
//         <Typography variant="h6" fontWeight={600}>
//           Compensation Data
//         </Typography>
//       </Box>
//       {/* Summary Cards */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         {summaryData.map((item, idx) => (
//           <Grid item xs={12} sm={6} md={3} key={item.label}>
//             <Paper
//               elevation={0}
//               sx={{
//                 borderRadius: 2,
//                 p: 2,
//                 textAlign: "center",
//                 background: "#fff",
//                 boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
//                 border: "1px solid #f0f0f0",
//               }}
//             >
//               <Typography variant="h5" fontWeight={700} sx={{ color: item.color, mb: 0.5 }}>
//                 {item.value}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {item.label.replace(/^\$\d+K /, "")}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//       {/* Charts */}
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               p: 2,
//               background: "#fff",
//               boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
//               border: "1px solid #f0f0f0",
//               minHeight: 270,
//               mb: 2,
//             }}
//           >
//             <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
//               Salary Distribution
//             </Typography>
//             <Box sx={{ height: 180 }}>
//               <Bar data={salaryBarData} options={chartOptions} />
//             </Box>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               p: 2,
//               background: "#fff",
//               boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
//               border: "1px solid #f0f0f0",
//               minHeight: 270,
//               mb: 2,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
//               Bonus Allocation
//             </Typography>
//             <Box sx={{ height: 180, width: 180 }}>
//               <Pie data={bonusPieData} options={pieOptions} />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//       {/* Revenue Metrics */}
//       <Box sx={{ mt: 2 }}>
//         <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
//           Revenue Metrics
//         </Typography>
//         {revenueMetrics.map((metric, idx) => (
//           <Paper
//             key={metric.label}
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               p: 2,
//               mb: 1.5,
//               background: "#f7fafd",
//               boxShadow: "none",
//               border: "none",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="h6"
//               fontWeight={700}
//               sx={{ color: "#2196f3", minWidth: 130, mr: 2 }}
//             >
//               {metric.value}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {metric.label}
//             </Typography>
//           </Paper>
//         ))}
//       </Box>
//     </Box>
//   </Box>
// );

// export default CompensationData;

import React from "react";
import { Box, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Summary cards mock data
const summaryData = [
  { label: "Avg. Salary", value: "$112K", color: "#2196f3" },
  { label: "Avg. Bonus", value: "$18K", color: "#4caf50" },
  { label: "Avg. Total Comp", value: "$148K", color: "#ff9800" },
  { label: "YoY Increase", value: "4.2%", color: "#00bcd4" },
];

// Salary Distribution Bar Chart
const salaryBarData = {
  labels: ["<$80k", "$80k-$100k", "$100k-$120k", "$120k-$140k", "$140k-$160k", ">$160k"],
  datasets: [
    {
      label: "Number of Employees",
      data: [180, 300, 400, 220, 140, 60],
      backgroundColor: "#42a5f5",
      borderRadius: 6,
      barPercentage: 0.6,
    },
  ],
};

// Bonus Allocation Pie Chart
const bonusPieData = {
  labels: ["Performance Bonus", "Retention Bonus", "Project Completion", "Referral Bonus", "Other"],
  datasets: [
    {
      data: [320, 120, 90, 60, 30],
      backgroundColor: ["#ef5350", "#42a5f5", "#66bb6a", "#ffa726", "#ab47bc"],
      borderWidth: 2,
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

const pieOptions = {
  plugins: {
    legend: { display: true, position: "right" },
    tooltip: { enabled: true },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const revenueMetrics = [
  { label: "Revenue per Employee", value: "$248,000" },
  { label: "Profit per Employee", value: "$88,000" },
  { label: "Revenue/Cost Ratio", value: "1.55x" },
];

const CompensationData = () => (
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
    <Box sx={{ mb: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <AttachMoneyIcon sx={{ color: "#2196f3", mr: 1, fontSize: 28 }} />
        <Typography variant="h6" fontWeight={600}>
          Compensation Data
        </Typography>
      </Box>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {summaryData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                background: "#fff",
                boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
                border: "1px solid #f0f0f0",
              }}
            >
              <Typography variant="h5" fontWeight={700} sx={{ color: item.color, mb: 0.5 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              p: 2,
              background: "#fff",
              boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
              border: "1px solid #f0f0f0",
              minHeight: 270,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Salary Distribution
            </Typography>
            <Box sx={{ height: 325 }}>
              <Bar data={salaryBarData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              p: 2,
              background: "#fff",
              boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
              border: "1px solid #f0f0f0",
              minHeight: 270,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box p={1}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Bonus Allocation
              </Typography>
              <Box sx={{ width: 330, height: 310, margin: "0 auto" }}>
                <Pie data={bonusPieData} options={pieOptions} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Revenue Metrics in Card View */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {revenueMetrics.map((metric) => (
          <Grid item xs={12} md={4} key={metric.label}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                p: 2,
                background: "#f7fafd",
                boxShadow: "0 1px 6px 0 rgba(60,72,100,0.04)",
                border: "1px solid #e3e7ef",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ color: "#2196f3", mb: 0.5 }}>
                {metric.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {metric.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export default CompensationData;
