// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   LinearProgress,
//   ToggleButtonGroup,
//   ToggleButton,
// } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const mockData = [
//   { name: "Yogesh", billable: 120, nonBillable: 40 },
//   { name: "Ayush Balachandran", billable: 136, nonBillable: 24 },
//   { name: "Neha Gupta", billable: 128, nonBillable: 32 },
//   { name: "Balam Ashok", billable: 144, nonBillable: 16 },
//   { name: "Swati Kumari", billable: 96, nonBillable: 48 },
// ];

// const totalBillable = mockData.reduce((sum, person) => sum + person.billable, 0);
// const totalNonBillable = mockData.reduce((sum, person) => sum + person.nonBillable, 0);
// const billablePercentage = Math.round((totalBillable / (totalBillable + totalNonBillable)) * 100);

// const barChartData = {
//   labels: mockData.map((p) => p.name),
//   datasets: [
//     {
//       label: "Billable Hours",
//       data: mockData.map((p) => p.billable),
//       backgroundColor: "#2196f3",
//     },
//     {
//       label: "Non-Billable Hours",
//       data: mockData.map((p) => p.nonBillable),
//       backgroundColor: "#90a4ae",
//     },
//   ],
// };

// const ResourcesUtilization = () => {
//   return (
//     <Box p={2}>
//       <Typography variant="h5" gutterBottom>
//         Resource Utilization
//       </Typography>

//       <Box display="flex" justifyContent="flex-end" mb={2}>
//         <ToggleButtonGroup exclusive size="small" value={"Month"}>
//           <ToggleButton value="Month">Month</ToggleButton>
//           <ToggleButton value="Quarter">Quarter</ToggleButton>
//           <ToggleButton value="Project">Project</ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <Grid container spacing={2} mb={2}>
//         <Grid item xs={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Billable Hours</Typography>
//               <Typography variant="h4">{totalBillable}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Non-Billable Hours</Typography>
//               <Typography variant="h4">{totalNonBillable}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Billable Percentage</Typography>
//               <Typography variant="h4">{billablePercentage}%</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card>
//         <CardContent>
//           <Bar
//             data={barChartData}
//             options={{ responsive: true, plugins: { legend: { position: "top" } } }}
//           />
//         </CardContent>
//       </Card>

//       <Box mt={4}>
//         <Typography variant="h6" gutterBottom>
//           Resource Utilization Breakdown
//         </Typography>
//         {mockData.map((person, index) => {
//           const total = person.billable + person.nonBillable;
//           const percent = Math.round((person.billable / total) * 100);
//           return (
//             <Box key={index} mb={2}>
//               <Typography gutterBottom>{person.name}</Typography>
//               <Box display="flex" alignItems="center">
//                 <Box flex={1}>
//                   <LinearProgress
//                     variant="determinate"
//                     value={percent}
//                     sx={{
//                       height: 10,
//                       borderRadius: 5,
//                       backgroundColor: "#cfd8dc",
//                       "& .MuiLinearProgress-bar": { backgroundColor: "#2196f3" },
//                     }}
//                   />
//                 </Box>
//                 <Box ml={2} minWidth={80}>
//                   <Typography variant="body2">
//                     {person.billable} hrs ({percent}%)
//                   </Typography>
//                 </Box>
//                 <Box ml={2} minWidth={80}>
//                   <Typography variant="body2">
//                     {person.nonBillable} hrs ({100 - percent}%)
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// };

// export default ResourcesUtilization;

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  useTheme,
  Divider,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mockData = {
  summary: {
    totalBillable: 720,
    totalNonBillable: 180,
    billablePercentage: 80,
  },
  resources: [
    { name: "Yogesh", billable: 120, nonBillable: 40 },
    { name: "Ayush Balachandran", billable: 136, nonBillable: 24 },
    { name: "Neha Gupta", billable: 128, nonBillable: 32 },
    { name: "Balam Ashok", billable: 144, nonBillable: 16 },
    { name: "Swati Kumari", billable: 96, nonBillable: 48 },
  ],
};

const chartData = {
  labels: mockData.resources.map((r) => r.name),
  datasets: [
    {
      label: "Billable Hours",
      data: mockData.resources.map((r) => r.billable),
      backgroundColor: "#2196f3",
    },
    {
      label: "Non-Billable Hours",
      data: mockData.resources.map((r) => r.nonBillable),
      backgroundColor: "#90a4ae",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const ResourcesUtilization = () => {
  const theme = useTheme();

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Total Billable Hours</Typography>
              <Typography variant="h4" color="primary">
                {mockData.summary.totalBillable}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Total Non-Billable Hours</Typography>
              <Typography variant="h4" color="error">
                {mockData.summary.totalNonBillable}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Billable Percentage</Typography>
              <Typography variant="h4" color="success.main">
                {mockData.summary.billablePercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Resource Utilization – Monthly
        </Typography>
        <Card>
          <CardContent>
            <Bar options={chartOptions} data={chartData} height={120} />
          </CardContent>
        </Card>
      </Box>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Resource Utilization Breakdown
        </Typography>
        <Card>
          <CardContent>
            {mockData.resources.map((person, idx) => {
              const total = person.billable + person.nonBillable;
              const percent = Math.round((person.billable / total) * 100);
              return (
                <Box key={idx} mb={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    {person.name}
                  </Typography>
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      overflow: "hidden",
                      height: 20,
                      backgroundColor: theme.palette.grey[200],
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={percent}
                      sx={{
                        height: "100%",
                        backgroundColor: theme.palette.grey[300],
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="textSecondary">
                      ● {person.billable} hrs ({percent}%)
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ● {person.nonBillable} hrs ({100 - percent}%)
                    </Typography>
                  </Box>
                  {idx !== mockData.resources.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              );
            })}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ResourcesUtilization;
