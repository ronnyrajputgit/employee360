// import React from "react";
// import { Box, Card, CardContent, Grid, Typography, Paper, Divider } from "@mui/material";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// // Mock summary data
// const summaryData = [
//   { label: "Utilization Rate", value: "87%", color: "#2196f3" },
//   { label: "Efficiency Rate", value: "93%", color: "#4caf50" },
//   { label: "Tasks per Week", value: "21.6", color: "#ff9800" },
//   { label: "On-time Delivery", value: "96%", color: "#00bcd4" },
// ];

// // Mock chart data
// const departments = ["Informatica", "Microsoft", "HR", "Accounts", "Marketing & Sales"];

// const outputData = {
//   labels: departments,
//   datasets: [
//     {
//       label: "Tasks per Week",
//       data: [24, 18, 22, 16, 27],
//       backgroundColor: "#42a5f5",
//       borderRadius: 6,
//       barPercentage: 0.6,
//     },
//   ],
// };

// const efficiencyData = {
//   labels: departments,
//   datasets: [
//     {
//       label: "Efficiency Rate (%)",
//       data: [92, 88, 94, 81, 89],
//       backgroundColor: "rgba(76, 175, 80, 0.2)",
//       borderColor: "#4caf50",
//       borderWidth: 2,
//       borderRadius: 6,
//       barPercentage: 0.6,
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

// const ProductivityMetrics = () => (
//   <Box sx={{ p: 2 }}>
//     <Card variant="outlined" sx={{ mb: 3 }}>
//       <CardContent>
//         <Box display="flex" alignItems="center" mb={2}>
//           <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
//           <Typography variant="h6" fontWeight={500}>
//             Productivity Metrics
//           </Typography>
//         </Box>
//         {/* Top summary cards */}
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           {summaryData.map((item, idx) => (
//             <Grid item xs={12} sm={6} md={3} key={item.label}>
//               <Card
//                 sx={{
//                   boxShadow: "none",
//                   border: "1px solid #f0f0f0",
//                   textAlign: "center",
//                   minHeight: 90,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" fontWeight={600} sx={{ color: item.color }}>
//                     {item.value}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {item.label}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         {/* Charts */}
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <Paper elevation={0} sx={{ p: 2, height: 260 }}>
//               <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
//                 Output by Department
//               </Typography>
//               <Box sx={{ height: 180 }}>
//                 <Bar data={outputData} options={chartOptions} />
//               </Box>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Paper elevation={0} sx={{ p: 2, height: 260 }}>
//               <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
//                 Efficiency by Department
//               </Typography>
//               <Box sx={{ height: 180 }}>
//                 <Bar data={efficiencyData} options={chartOptions} />
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//         {/* Productivity Trend Placeholder */}
//         <Box sx={{ mt: 3 }}>
//           <Paper elevation={0} sx={{ p: 2, minHeight: 120 }}>
//             <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
//               Productivity Trend (12 Months)
//             </Typography>
//             <Divider />
//             <Box
//               sx={{
//                 height: 80,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#aaa",
//               }}
//             >
//               {/* Placeholder for future chart */}
//               (Chart coming soon)
//             </Box>
//           </Paper>
//         </Box>
//       </CardContent>
//     </Card>
//   </Box>
// );

// export default ProductivityMetrics;

import React from "react";
import { Box, Card, CardContent, Grid, Typography, Paper, Divider } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const summaryData = [
  { label: "Utilization Rate", value: "87%", color: "#2196f3" },
  { label: "Efficiency Rate", value: "93%", color: "#4caf50" },
  { label: "Tasks per Week", value: "21.6", color: "#ff9800" },
  { label: "On-time Delivery", value: "96%", color: "#00bcd4" },
];

const departments = ["Informatica", "Microsoft", "HR", "Accounts", "Marketing & Sales"];

const outputData = {
  labels: departments,
  datasets: [
    {
      label: "Tasks per Week",
      data: [24, 18, 22, 16, 27],
      backgroundColor: "#42a5f5",
      borderRadius: 6,
      barPercentage: 0.6,
    },
  ],
};

const efficiencyData = {
  labels: departments,
  datasets: [
    {
      label: "Efficiency Rate (%)",
      data: [92, 88, 94, 81, 89],
      backgroundColor: "rgba(76, 175, 80, 0.15)",
      borderColor: "#4caf50",
      borderWidth: 2,
      borderRadius: 6,
      barPercentage: 0.6,
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

const ProductivityMetrics = () => (
  <Box sx={{ p: { xs: 1, md: 3 } }}>
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(60,72,100,0.12)",
        background: "rgba(255,255,255,0.85)",
        border: "1px solid #e3e7ef",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Box display="flex" alignItems="center" mb={3}>
          <InfoOutlinedIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" fontWeight={700} letterSpacing={0.2}>
            Productivity Metrics
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
                  minHeight: 110,
                  transition: "transform 0.18s, box-shadow 0.18s",
                  "&:hover": {
                    transform: "translateY(-4px) scale(1.03)",
                    boxShadow: "0 6px 24px 0 rgba(60,72,100,0.16)",
                  },
                  background: "linear-gradient(135deg, #fafdff 60%, #f5faff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
                Output by Department
              </Typography>
              <Box sx={{ height: 180 }}>
                <Bar data={outputData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
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
                Efficiency by Department
              </Typography>
              <Box sx={{ height: 180 }}>
                <Bar data={efficiencyData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {/* Productivity Trend Placeholder */}
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
              Productivity Trend (12 Months)
            </Typography>
            <Divider />
            <Box
              sx={{
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#b0b0b0",
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: 0.5,
              }}
            >
              (Chart coming soon)
            </Box>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default ProductivityMetrics;
