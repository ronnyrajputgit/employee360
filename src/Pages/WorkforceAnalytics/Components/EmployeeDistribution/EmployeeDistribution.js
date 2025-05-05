// EmployeeDistribution.js
import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const EmployeeDistribution = () => {
  // Mock Data
  const pieData = {
    labels: ["Junior (0-2 yrs)", "Mid-level (3-5 yrs)", "Senior (6-9 yrs)", "Lead (10+ yrs)"],
    datasets: [
      {
        data: [150, 200, 100, 50],
        backgroundColor: ["#36A2EB", "#4BC0C0", "#9966FF", "#FFCE56"],
      },
    ],
  };

  const barData = {
    labels: ["<1 year", "1-2 years", "3-5 years", "6-8 years", "9+ years"],
    datasets: [
      {
        label: "Number of Employees",
        data: [180, 300, 400, 220, 140],
        backgroundColor: "#42A5F5",
      },
    ],
  };

  const tableData = [
    { department: "Engineering", junior: 112, mid: 186, senior: 124, lead: 58 },
    { department: "Product", junior: 24, mid: 42, senior: 36, lead: 12 },
    { department: "Design", junior: 18, mid: 32, senior: 16, lead: 8 },
    { department: "Marketing", junior: 22, mid: 36, senior: 18, lead: 10 },
    { department: "Sales", junior: 28, mid: 46, senior: 32, lead: 16 },
  ];

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        <span role="img" aria-label="user">
          👤
        </span>{" "}
        Employee Distribution by Experience
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Experience Level Distribution</Typography>
              <Box sx={{ width: 280, height: 320, margin: "0 auto" }}>
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Tenure Distribution</Typography>
              <Box sx={{ height: 320 }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Seniority Matrix by Department
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#fafafa" }}>
                    <th style={{ padding: "2px", textAlign: "left" }}>Department</th>
                    <th style={{ padding: "2px", textAlign: "center" }}>Junior (0-2 yrs)</th>
                    <th style={{ padding: "2px", textAlign: "center" }}>Mid-level (3-5 yrs)</th>
                    <th style={{ padding: "2px", textAlign: "center" }}>Senior (6-9 yrs)</th>
                    <th style={{ padding: "2px", textAlign: "center" }}>Lead (10+ yrs)</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: idx === tableData.length - 1 ? "none" : "1px solid #eee",
                      }}
                    >
                      <td style={{ padding: "2px" }}>{row.department}</td>
                      <td style={{ padding: "2px", textAlign: "center" }}>{row.junior}</td>
                      <td style={{ padding: "2px", textAlign: "center" }}>{row.mid}</td>
                      <td style={{ padding: "2px", textAlign: "center" }}>{row.senior}</td>
                      <td style={{ padding: "2px", textAlign: "center" }}>{row.lead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box mt={2}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Experience vs. Performance</Typography>
            {/* Placeholder content for now */}
            <Box height={100}></Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EmployeeDistribution;
