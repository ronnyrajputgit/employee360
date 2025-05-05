// import React from "react";
// import { Grid, Card, CardContent, Typography, Box, Divider } from "@mui/material";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import GroupIcon from "@mui/icons-material/Group";

// const roleData = [
//   { name: "MDM", value: 20 },
//   { name: "Data Quality", value: 15 },
//   { name: "Data Integration", value: 10 },
//   { name: "Modernization", value: 8 },
//   { name: "Data Governance", value: 7 },
//   { name: "Microsoft", value: 5 },
// ];

// const COLORS = ["#42a5f5", "#66bb6a", "#ab47bc", "#ffca28", "#ef5350", "#90a4ae"];

// const departmentData = [
//   { name: "Informatica", employees: 55 },
//   { name: "Microsoft", employees: 7 },
//   { name: "HR", employees: 3 },
//   { name: "Accounts", employees: 3 },
//   { name: "Marketing & Sales", employees: 3 },
// ];

// const TechnicalWorkforce = () => {
//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom display="flex" alignItems="center">
//         <GroupIcon sx={{ mr: 1 }} /> Technical Workforce Headcount
//       </Typography>

//       <Grid container spacing={2}>
//         {/* Summary Cards */}
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h4" color="primary">
//                 75
//               </Typography>
//               <Typography>Total Employees</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h4" color="primary">
//                 60
//               </Typography>
//               <Typography>Technical Staff</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h4" color="primary">
//                 15
//               </Typography>
//               <Typography>Non-Technical Staff</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h4" color="primary">
//                 +28
//               </Typography>
//               <Typography>Net Change (YTD)</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Headcount by Role */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Headcount by Role</Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={roleData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                   >
//                     {roleData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//               <Box display="flex" flexWrap="wrap" mt={2}>
//                 {roleData.map((entry, index) => (
//                   <Box key={index} mr={2} display="flex" alignItems="center">
//                     <Box width={12} height={12} bgcolor={COLORS[index % COLORS.length]} mr={1} />
//                     <Typography variant="body2">{entry.name}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Headcount by Department */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Headcount by Department</Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={departmentData}>
//                   <XAxis dataKey="name" />
//                   <YAxis
//                     label={{ value: "Number of Employees", angle: -90, position: "insideLeft" }}
//                   />
//                   <Tooltip />
//                   <Bar dataKey="employees" fill="#42a5f5" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Placeholder for Headcount Trend */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Headcount Trend (12 Months)</Typography>
//               <Box height={200} display="flex" alignItems="center" justifyContent="center">
//                 <Typography variant="body2" color="textSecondary">
//                   (Chart Placeholder)
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default TechnicalWorkforce;

import React from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const TechnicalWorkforce = () => {
  // Summary stats
  const totalEmployees = 75;
  const technicalStaff = 60;
  const nonTechnicalStaff = 15;
  const netChangeYTD = 28;

  // Pie Chart - Headcount by Role
  const pieData = {
    labels: [
      "MDM",
      "Data Quality",
      "Data Integration",
      "Modernization",
      "Data Governance",
      "Microsoft",
    ],
    datasets: [
      {
        label: "Headcount by Role",
        data: [25, 18, 12, 8, 6, 6],
        backgroundColor: ["#42A5F5", "#66BB6A", "#BA68C8", "#FFCA28", "#EF5350", "#78909C"],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart - Headcount by Department
  const barData = {
    labels: ["Informatica", "Microsoft", "HR", "Accounts", "Marketing & Sales"],
    datasets: [
      {
        label: "Number of Employees",
        data: [55, 8, 3, 4, 5],
        backgroundColor: "#42A5F5",
      },
    ],
  };

  // Line Chart - Headcount Trend (12 Months)
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Headcount",
        data: [47, 50, 52, 55, 57, 60, 62, 65, 68, 70, 72, 75],
        fill: false,
        backgroundColor: "#42A5F5",
        borderColor: "#42A5F5",
        tension: 0.3,
      },
    ],
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        👥 Technical Workforce Headcount
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">
                {totalEmployees}
              </Typography>
              <Typography>Total Employees</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">
                {technicalStaff}
              </Typography>
              <Typography>Technical Staff</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">
                {nonTechnicalStaff}
              </Typography>
              <Typography>Non-Technical Staff</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">
                +{netChangeYTD}
              </Typography>
              <Typography>Net Change (YTD)</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie & Bar Charts */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box flex={1} p={2}>
                <Typography variant="subtitle1">Headcount by Role</Typography>
                <Box sx={{ width: 280, height: 330, margin: "0 auto" }}>
                  <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Headcount by Department</Typography>
              <Bar
                data={barData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 10 },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Line Chart */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Headcount Trend (12 Months)
          </Typography>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: "bottom" },
              },
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TechnicalWorkforce;
