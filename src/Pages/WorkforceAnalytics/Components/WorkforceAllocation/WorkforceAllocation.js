// import React from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Paper,
//   Divider,
//   LinearProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
// } from "@mui/material";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { Doughnut, Bar } from "react-chartjs-2";
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

// // Mock Data
// const resourceUtilizationData = {
//   labels: ["Billable Work", "Internal Projects", "Training", "Bench"],
//   datasets: [
//     {
//       data: [78, 15, 5, 2],
//       backgroundColor: ["#42a5f5", "#ab47bc", "#ffa726", "#90a4ae"],
//       borderWidth: 2,
//     },
//   ],
// };

// const resourceBars = [
//   { label: "Billable Work", percent: 78, color: "#42a5f5" },
//   { label: "Internal Projects", percent: 15, color: "#ab47bc" },
//   { label: "Training", percent: 5, color: "#ffa726" },
//   { label: "Bench", percent: 2, color: "#90a4ae" },
// ];

// const projectAssignmentData = {
//   labels: ["1 Project", "2 Projects", "3 Projects", "4+ Projects", "Unassigned"],
//   datasets: [
//     {
//       label: "Number of Employees",
//       data: [220, 260, 140, 40, 60],
//       backgroundColor: "#42a5f5",
//       borderRadius: 6,
//       barPercentage: 0.6,
//     },
//   ],
// };

// const benchStrengthStats = [
//   { label: "On Bench", value: 24 },
//   { label: "Bench Percentage", value: "1.9%" },
//   { label: "Avg Days on Bench", value: 8.5 },
// ];

// const benchSkills = [
//   { skill: "Java Developer", count: 6, experience: "4.2 years", status: "Available" },
//   { skill: "DevOps Engineer", count: 4, experience: "3.5 years", status: "Available" },
//   { skill: "UI/UX Designer", count: 3, experience: "2.8 years", status: "Available" },
//   { skill: "Data Scientist", count: 3, experience: "5.1 years", status: "Available" },
//   { skill: "QA Engineer", count: 2, experience: "2.7 years", status: "Available" },
// ];

// const chartOptions = {
//   plugins: {
//     legend: { display: true, position: "right" },
//     tooltip: { enabled: true },
//   },
//   cutout: "70%",
//   responsive: true,
//   maintainAspectRatio: false,
// };

// const barOptions = {
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

// const WorkforceAllocation = () => (
//   <Box sx={{ p: { xs: 1, md: 3 }, background: "#f7fafd", minHeight: "100vh" }}>
//     <Card
//       variant="outlined"
//       sx={{
//         mb: 3,
//         borderRadius: 4,
//         boxShadow: "0 8px 32px 0 rgba(60,72,100,0.10)",
//         background: "rgba(255,255,255,0.95)",
//         border: "1px solid #e3e7ef",
//         overflow: "visible",
//       }}
//     >
//       <CardContent sx={{ p: { xs: 2, md: 4 } }}>
//         {/* Title */}
//         <Box display="flex" alignItems="center" mb={3}>
//           <InfoOutlinedIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
//           <Typography variant="h5" fontWeight={700} letterSpacing={0.2}>
//             Workforce Allocation
//           </Typography>
//         </Box>
//         {/* Resource Utilization */}
//         <Grid container spacing={3} alignItems="center">
//           <Grid item xs={12} md={3}>
//             <Box
//               sx={{
//                 height: 160,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mb: { xs: 2, md: 0 },
//               }}
//             >
//               <Doughnut data={resourceUtilizationData} options={chartOptions} />
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={9}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 3,
//                 border: "1px solid #e3e7ef",
//                 background: "#fafdff",
//                 boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
//               }}
//             >
//               <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
//                 Resource Utilization
//               </Typography>
//               {resourceBars.map((bar) => (
//                 <Box key={bar.label} sx={{ mb: 2 }}>
//                   <Box display="flex" justifyContent="space-between" mb={0.5}>
//                     <Typography variant="body2" color="text.secondary">
//                       {bar.label}
//                     </Typography>
//                     <Typography variant="body2" fontWeight={600} sx={{ color: bar.color }}>
//                       {bar.percent}%
//                     </Typography>
//                   </Box>
//                   <LinearProgress
//                     variant="determinate"
//                     value={bar.percent}
//                     sx={{
//                       height: 8,
//                       borderRadius: 5,
//                       background: "#e3e7ef",
//                       "& .MuiLinearProgress-bar": {
//                         background: bar.color,
//                       },
//                     }}
//                   />
//                 </Box>
//               ))}
//             </Paper>
//           </Grid>
//         </Grid>
//         {/* Project Assignments */}
//         <Box sx={{ mt: 4 }}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               borderRadius: 3,
//               border: "1px solid #e3e7ef",
//               background: "#fafdff",
//               boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
//             }}
//           >
//             <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
//               Project Assignments
//             </Typography>
//             <Bar data={projectAssignmentData} options={barOptions} height={120} />
//             <Grid container spacing={2} sx={{ mt: 2 }}>
//               <Grid item xs={12} sm={4}>
//                 <Typography
//                   variant="h6"
//                   fontWeight={700}
//                   sx={{ color: "#1976d2", textAlign: "center" }}
//                 >
//                   42
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
//                   Active Projects
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Typography
//                   variant="h6"
//                   fontWeight={700}
//                   sx={{ color: "#1976d2", textAlign: "center" }}
//                 >
//                   3.2
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
//                   Avg Projects per Employee
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Typography
//                   variant="h6"
//                   fontWeight={700}
//                   sx={{ color: "#1976d2", textAlign: "center" }}
//                 >
//                   86%
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
//                   Resource Allocation
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//         {/* Bench Strength */}
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
//             Bench Strength
//           </Typography>
//           <Grid container spacing={3} sx={{ mb: 2 }}>
//             {benchStrengthStats.map((stat) => (
//               <Grid item xs={12} sm={4} key={stat.label}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 2,
//                     borderRadius: 3,
//                     background: "#fafdff",
//                     border: "1px solid #e3e7ef",
//                     textAlign: "center",
//                   }}
//                 >
//                   <Typography variant="h6" fontWeight={700} sx={{ color: "#1976d2" }}>
//                     {stat.value}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {stat.label}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//           <TableContainer
//             component={Paper}
//             sx={{
//               borderRadius: 3,
//               border: "1px solid #e3e7ef",
//               background: "#fafdff",
//               boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
//             }}
//           >
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>Skill</strong>
//                   </TableCell>
//                   <TableCell align="right">
//                     <strong>Count</strong>
//                   </TableCell>
//                   <TableCell align="right">
//                     <strong>Avg. Experience</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Status</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {benchSkills.map((row) => (
//                   <TableRow key={row.skill}>
//                     <TableCell>{row.skill}</TableCell>
//                     <TableCell align="right">{row.count}</TableCell>
//                     <TableCell align="right">{row.experience}</TableCell>
//                     <TableCell align="center">
//                       <Chip
//                         label={row.status}
//                         color="success"
//                         size="small"
//                         sx={{ fontWeight: 600, fontSize: 13 }}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </CardContent>
//     </Card>
//   </Box>
// );

// export default WorkforceAllocation;

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Doughnut, Bar } from "react-chartjs-2";
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

// Mock Data
const resourceUtilizationData = {
  labels: ["Billable Work", "Internal Projects", "Training", "Bench"],
  datasets: [
    {
      data: [78, 15, 5, 2],
      backgroundColor: ["#42a5f5", "#ab47bc", "#ffa726", "#90a4ae"],
      borderWidth: 2,
    },
  ],
};

const resourceBars = [
  { label: "Billable Work", percent: 78, color: "#42a5f5" },
  { label: "Internal Projects", percent: 15, color: "#ab47bc" },
  { label: "Training", percent: 5, color: "#ffa726" },
  { label: "Bench", percent: 2, color: "#90a4ae" },
];

const projectAssignmentData = {
  labels: ["1 Project", "2 Projects", "3 Projects", "4+ Projects", "Unassigned"],
  datasets: [
    {
      label: "Number of Employees",
      data: [220, 260, 140, 40, 60],
      backgroundColor: "#42a5f5",
      borderRadius: 6,
      barPercentage: 0.6,
    },
  ],
};

const benchStrengthStats = [
  { label: "On Bench", value: 24 },
  { label: "Bench Percentage", value: "1.9%" },
  { label: "Avg Days on Bench", value: 8.5 },
];

const benchSkills = [
  { skill: "Java Developer", count: 6, experience: "4.2 years", status: "Available" },
  { skill: "DevOps Engineer", count: 4, experience: "3.5 years", status: "Available" },
  { skill: "UI/UX Designer", count: 3, experience: "2.8 years", status: "Available" },
  { skill: "Data Scientist", count: 3, experience: "5.1 years", status: "Available" },
  { skill: "QA Engineer", count: 2, experience: "2.7 years", status: "Available" },
];

const chartOptions = {
  plugins: {
    legend: { display: true, position: "right" },
    tooltip: { enabled: true },
  },
  cutout: "70%",
  responsive: true,
  maintainAspectRatio: false,
};

const barOptions = {
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

const WorkforceAllocation = () => (
  <Box>
    <Card
      variant="outlined"
      sx={{
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(60,72,100,0.10)",
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #e3e7ef",
        overflow: "visible",
      }}
    >
      <CardContent>
        {/* Title */}
        <Box display="flex" alignItems="center">
          <InfoOutlinedIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" fontWeight={700} letterSpacing={0.2}>
            Workforce Allocation
          </Typography>
        </Box>
        {/* Donut Chart */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px 0 rgba(60,72,100,0.08)",
                border: "1px solid #f0f0f0",
                textAlign: "center",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Resource Utilization Overview
              </Typography>
              <Box sx={{ height: 200, width: 280, mx: "auto" }}>
                <Doughnut data={resourceUtilizationData} options={chartOptions} />
              </Box>
            </Card>
          </Grid>

          {/* Resource Utilization Progress Bars */}
          <Grid item xs={12}>
            <Card
              sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: "0 2px 12px 0 rgba(60,72,100,0.08)",
                border: "1px solid #f0f0f0",
                p: 3,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Resource Utilization Details
              </Typography>
              {resourceBars.map((bar) => (
                <Box key={bar.label} sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      {bar.label}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: bar.color }}>
                      {bar.percent}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={bar.percent}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      background: "#e3e7ef",
                      "& .MuiLinearProgress-bar": {
                        background: bar.color,
                      },
                    }}
                  />
                </Box>
              ))}
            </Card>
          </Grid>

          {/* Project Assignments */}
          <Grid item xs={12} md={6} lg={12}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px 0 rgba(60,72,100,0.08)",
                border: "1px solid #f0f0f0",
                p: 3,
                // minHeight: 350,
                // maxWidth: 420,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Project Assignments
              </Typography>
              <Box sx={{ width: "100%", height: 170 }}>
                <Bar data={projectAssignmentData} options={barOptions} />
              </Box>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={4}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#1976d2", textAlign: "center" }}
                  >
                    42
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    Active Projects
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#1976d2", textAlign: "center" }}
                  >
                    3.2
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    Avg Projects/Employee
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#1976d2", textAlign: "center" }}
                  >
                    86%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    Resource Allocation
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        {/* Bench Strength */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Bench Strength
          </Typography>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            {benchStrengthStats.map((stat) => (
              <Grid item xs={12} sm={4} key={stat.label}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: "#fafdff",
                    border: "1px solid #e3e7ef",
                    textAlign: "center",
                    p: 2,
                    boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
                  }}
                >
                  <Typography variant="h6" fontWeight={700} sx={{ color: "#1976d2" }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #e3e7ef",
              background: "#fafdff",
              boxShadow: "0 1px 6px 0 rgba(60,72,100,0.07)",
              mt: 3, // margin top for spacing
              p: 2,
              overflowX: "auto",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      fontWeight: 700,
                      padding: "10px 8px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    Skill
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      fontWeight: 700,
                      padding: "10px 8px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    Count
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      fontWeight: 700,
                      padding: "10px 8px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    Avg. Experience
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      fontWeight: 700,
                      padding: "10px 8px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {benchSkills.map((row) => (
                  <tr key={row.skill}>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "12px 8px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {row.skill}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "12px 8px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {row.count}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "12px 8px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {row.experience}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "12px 8px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {/* You can keep the Chip for status badge */}
                      <Chip
                        label={row.status}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 13 }}
                      />
                      {/* Or use a styled span for pure HTML/CSS:
            <span style={{
              background: "#e8f5e9",
              color: "#388e3c",
              padding: "2px 10px",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: 13,
              display: "inline-block"
            }}>
              {row.status}
            </span>
            */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default WorkforceAllocation;
