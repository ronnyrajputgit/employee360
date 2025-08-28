// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   LinearProgress,
//   Divider,
//   useTheme,
//   CircularProgress,
//   Paper,
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
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import MDButton from "components/MDButton";
// import MDBox from "components/MDBox";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const weekNames = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

// const quarterNames = ["Q1 (Jan-Mar)", "Q2 (Apr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dec)"];

// const getCurrentWeekNumber = () => {
//   const now = new Date();
//   const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
//   const pastDaysOfYear = (now - firstDayOfYear) / 86400000;
//   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
// };

// const ResourcesUtilization = () => {
//   const { filteredData, loading } = useGlobalFilters();
//   const resourcesData = filteredData.tasks || [];
//   const theme = useTheme();

//   const [filter, setFilter] = useState("Project");
//   const [groupedData, setGroupedData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalBillable: 0,
//     totalNonBillable: 0,
//     billablePercentage: 0,
//     nonBillablePercentage: 0,
//   });
//   const [timePeriodLabel, setTimePeriodLabel] = useState("");

//   useEffect(() => {
//     let filteredResources = resourcesData;
//     const now = new Date();
//     let periodLabel = "";

//     if (filter === "Weekly") {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(now.getDate() - 7);
//       filteredResources = resourcesData.filter((item) => {
//         const date = new Date(item.CreatedDateTime);
//         return date >= oneWeekAgo;
//       });
//       const weekNumber = getCurrentWeekNumber();
//       periodLabel = `Week ${weekNumber}`;
//     } else if (filter === "Monthly") {
//       filteredResources = resourcesData.filter((item) => {
//         const date = new Date(item.CreatedDateTime);
//         return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
//       });
//       periodLabel = monthNames[now.getMonth()];
//     } else if (filter === "Quarterly") {
//       const quarter = Math.floor(now.getMonth() / 3);
//       filteredResources = resourcesData.filter((item) => {
//         const date = new Date(item.CreatedDateTime);
//         return (
//           Math.floor(date.getMonth() / 3) === quarter && date.getFullYear() === now.getFullYear()
//         );
//       });
//       periodLabel = quarterNames[quarter];
//     }

//     setTimePeriodLabel(periodLabel);

//     const grouped = {};
//     let totalBillable = 0;
//     let totalNonBillable = 0;

//     filteredResources.forEach((item) => {
//       const customer = item.Customer || "";
//       const createdBy = item.createdBy || "Unknown";
//       const projectType = item.ProjectType || "";
//       const duration = parseFloat(item.Duration) || 0;
//       if (!customer) return;

//       const key = `${customer}__${createdBy}`;
//       if (!grouped[key]) {
//         grouped[key] = {
//           customer,
//           createdBy,
//           billable: 0,
//           nonBillable: 0,
//         };
//       }

//       if (projectType === "Customer") {
//         grouped[key].billable += duration;
//         totalBillable += duration;
//       } else {
//         grouped[key].nonBillable += duration;
//         totalNonBillable += duration;
//       }
//     });

//     const total = totalBillable + totalNonBillable;
//     const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
//     const nonBillablePercentage = 100 - billablePercentage;

//     setSummary({ totalBillable, totalNonBillable, billablePercentage, nonBillablePercentage });
//     setGroupedData(Object.values(grouped));
//   }, [resourcesData, filter]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   // Check if there are no records
//   if (resourcesData.length === 0 || groupedData.length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh" p={2}>
//         <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
//           <Typography variant="h6" color="textSecondary">
//             No records found
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             There are no resource utilization data available to display.
//           </Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   // Show top 12 bars for readability
//   const topBars = groupedData
//     .sort((a, b) => b.billable + b.nonBillable - (a.billable + a.nonBillable))
//     .slice(0, 12);

//   const chartData = {
//     labels: topBars.map((r) => `${r.customer} → ${r.createdBy}`),
//     datasets: [
//       {
//         label: "Billable Hours",
//         data: topBars.map((r) => r.billable),
//         backgroundColor: "rgba(34,197,94,0.85)", // vivid green
//         borderRadius: 12,
//         maxBarThickness: 40,
//         minBarLength: 2,
//         borderSkipped: false,
//       },
//       {
//         label: "Non-Billable Hours",
//         data: topBars.map((r) => r.nonBillable),
//         backgroundColor: "rgba(239,68,68,0.85)", // vivid red
//         borderRadius: 12,
//         maxBarThickness: 40,
//         minBarLength: 2,
//         borderSkipped: false,
//       },
//     ],
//   };

//   const getChartTitle = () => {
//     switch (filter) {
//       case "Weekly":
//         return `Resource Utilization - Current Week (${timePeriodLabel})`;
//       case "Monthly":
//         return `Resource Utilization - ${timePeriodLabel} ${new Date().getFullYear()}`;
//       case "Quarterly":
//         return `Resource Utilization - ${timePeriodLabel} ${new Date().getFullYear()}`;
//       default:
//         return "Resource Utilization (All Time)";
//     }
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: { font: { size: 15, weight: "bold" }, color: "#333" },
//       },
//       title: {
//         display: true,
//         text: getChartTitle(),
//         font: { size: 20, weight: "bold" },
//         color: "#222",
//         padding: { top: 10, bottom: 20 },
//       },
//       tooltip: {
//         enabled: true,
//         backgroundColor: "#222",
//         titleColor: "#fff",
//         bodyColor: "#fff",
//         borderColor: "#888",
//         borderWidth: 1,
//         callbacks: {
//           label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} hrs`,
//         },
//       },
//     },
//     interaction: { mode: "nearest", axis: "x", intersect: false },
//     scales: {
//       x: {
//         grid: { display: false },
//         title: { display: true, text: "Customer → User", font: { size: 15 } },
//         ticks: {
//           color: "#222",
//           font: { size: 13, weight: "bold" },
//           callback: function (val) {
//             const label = this.getLabelForValue(val);
//             return label.length > 18 ? label.slice(0, 15) + "..." : label;
//           },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: { color: "#eee" },
//         title: { display: true, text: "Hours", font: { size: 15 } },
//         ticks: { color: "#222", font: { size: 13 } },
//       },
//     },
//     layout: { padding: 20 },
//     animation: { duration: 800, easing: "easeOutQuart" },
//   };

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Filter Buttons */}
//         <Grid item xs={12}>
//           <Card>
//             <MDBox p={2}>
//               <Grid container spacing={2}>
//                 {["Project", "Weekly", "Monthly", "Quarterly"].map((label) => (
//                   <Grid item xs={6} sm={3} key={label}>
//                     <MDButton
//                       variant={filter === label ? "contained" : "outlined"}
//                       color={filter === label ? "info" : "secondary"}
//                       fullWidth
//                       onClick={() => setFilter(label)}
//                     >
//                       {label}
//                     </MDButton>
//                   </Grid>
//                 ))}
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>

//         {/* Summary Cards */}
//         {[
//           ["Total Billable Hours", summary.totalBillable, summary.billablePercentage, "success"],
//           [
//             "Total Non-Billable Hours",
//             summary.totalNonBillable,
//             summary.nonBillablePercentage,
//             "error",
//           ],
//         ].map(([title, value, percentage, color], idx) => (
//           <Grid item xs={12} md={6} key={idx}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{title}</Typography>
//                 <Typography variant="h4" color={color}>
//                   {value.toFixed(1)}
//                 </Typography>
//                 <LinearProgress
//                   variant="determinate"
//                   value={percentage}
//                   sx={{
//                     height: 10,
//                     borderRadius: 5,
//                     mt: 1,
//                     backgroundColor: theme.palette.grey[300],
//                     "& .MuiLinearProgress-bar": {
//                       backgroundColor: theme.palette[color].main,
//                     },
//                   }}
//                 />
//                 <Typography variant="body2" color="textSecondary" mt={0.5}>
//                   {percentage}% {color === "success" ? "Billable" : "Non-Billable"}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}

//         {/* Chart */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Box sx={{ height: 400 }}>
//                 <Bar options={chartOptions} data={chartData} />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Breakdown Section */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Breakdown by Customer and User
//               </Typography>
//               {groupedData.map((item, idx) => {
//                 const total = item.billable + item.nonBillable;
//                 const percent = total ? Math.round((item.billable / total) * 100) : 0;
//                 return (
//                   <Box key={idx} mb={3}>
//                     <Typography variant="subtitle1">
//                       {item.customer} → {item.createdBy}
//                     </Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={percent}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: theme.palette.grey[300],
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor: theme.palette.success.main,
//                         },
//                       }}
//                     />
//                     <Box display="flex" justifyContent="space-between" mt={0.5}>
//                       <Typography variant="body2">
//                         ✅ {item.billable.toFixed(1)} hrs ({percent}%)
//                       </Typography>
//                       <Typography variant="body2">
//                         ❌ {item.nonBillable.toFixed(1)} hrs ({100 - percent}%)
//                       </Typography>
//                     </Box>
//                     {idx < groupedData.length - 1 && <Divider sx={{ mt: 2 }} />}
//                   </Box>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ResourcesUtilization;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Divider,
  useTheme,
  CircularProgress,
  Paper,
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
import { useGlobalFilters } from "context/GlobalFilterContext";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const quarterNames = ["Q1 (Jan-Mar)", "Q2 (Apr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dec)"];

const getCurrentWeekNumber = () => {
  const now = new Date();
  const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = (now - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const ResourcesUtilization = ({ isFullscreen }) => {
  const { filteredData, loading } = useGlobalFilters();
  const resourcesData = filteredData.tasks || [];
  const theme = useTheme();

  const [filter, setFilter] = useState("Project");
  const [groupedData, setGroupedData] = useState([]);
  const [summary, setSummary] = useState({
    totalBillable: 0,
    totalNonBillable: 0,
    billablePercentage: 0,
    nonBillablePercentage: 0,
  });
  const [timePeriodLabel, setTimePeriodLabel] = useState("");

  useEffect(() => {
    let filteredResources = resourcesData;
    const now = new Date();
    let periodLabel = "";

    if (filter === "Weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filteredResources = resourcesData.filter((item) => {
        const date = new Date(item.CreatedDateTime);
        return date >= oneWeekAgo;
      });
      const weekNumber = getCurrentWeekNumber();
      periodLabel = `Week ${weekNumber}`;
    } else if (filter === "Monthly") {
      filteredResources = resourcesData.filter((item) => {
        const date = new Date(item.CreatedDateTime);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      });
      periodLabel = monthNames[now.getMonth()];
    } else if (filter === "Quarterly") {
      const quarter = Math.floor(now.getMonth() / 3);
      filteredResources = resourcesData.filter((item) => {
        const date = new Date(item.CreatedDateTime);
        return (
          Math.floor(date.getMonth() / 3) === quarter && date.getFullYear() === now.getFullYear()
        );
      });
      periodLabel = quarterNames[quarter];
    }

    setTimePeriodLabel(periodLabel);

    const grouped = {};
    let totalBillable = 0;
    let totalNonBillable = 0;

    filteredResources.forEach((item) => {
      const customer = item.Customer || "";
      const createdBy = item.createdBy || "Unknown";
      const projectType = item.ProjectType || "";
      const duration = parseFloat(item.Duration) || 0;
      if (!customer) return;

      const key = `${customer}__${createdBy}`;
      if (!grouped[key]) {
        grouped[key] = {
          customer,
          createdBy,
          billable: 0,
          nonBillable: 0,
        };
      }

      if (projectType === "Customer") {
        grouped[key].billable += duration;
        totalBillable += duration;
      } else {
        grouped[key].nonBillable += duration;
        totalNonBillable += duration;
      }
    });

    const total = totalBillable + totalNonBillable;
    const billablePercentage = total ? Math.round((totalBillable / total) * 100) : 0;
    const nonBillablePercentage = 100 - billablePercentage;

    setSummary({ totalBillable, totalNonBillable, billablePercentage, nonBillablePercentage });
    setGroupedData(Object.values(grouped));
  }, [resourcesData, filter]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (resourcesData.length === 0 || groupedData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh" p={2}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            No records found
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            There are no resource utilization data available to display.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const topBars = groupedData
    .sort((a, b) => b.billable + b.nonBillable - (a.billable + a.nonBillable))
    .slice(0, 12);

  const chartData = {
    labels: topBars.map((r) => `${r.customer} → ${r.createdBy}`),
    datasets: [
      {
        label: "Billable Hours",
        data: topBars.map((r) => r.billable),
        backgroundColor: "rgba(34,197,94,0.85)",
        borderRadius: 12,
        maxBarThickness: 40,
        minBarLength: 2,
        borderSkipped: false,
      },
      {
        label: "Non-Billable Hours",
        data: topBars.map((r) => r.nonBillable),
        backgroundColor: "rgba(239,68,68,0.85)",
        borderRadius: 12,
        maxBarThickness: 40,
        minBarLength: 2,
        borderSkipped: false,
      },
    ],
  };

  const getChartTitle = () => {
    switch (filter) {
      case "Weekly":
        return `Resource Utilization - Current Week (${timePeriodLabel})`;
      case "Monthly":
        return `Resource Utilization - ${timePeriodLabel} ${new Date().getFullYear()}`;
      case "Quarterly":
        return `Resource Utilization - ${timePeriodLabel} ${new Date().getFullYear()}`;
      default:
        return "Resource Utilization (All Time)";
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 15, weight: "bold" }, color: "#333" },
      },
      title: {
        display: true,
        text: getChartTitle(),
        font: { size: 20, weight: "bold" },
        color: "#222",
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#888",
        borderWidth: 1,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} hrs`,
        },
      },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: "Customer → User", font: { size: 15 } },
        ticks: {
          color: "#222",
          font: { size: 13, weight: "bold" },
          callback: function (val) {
            const label = this.getLabelForValue(val);
            return label.length > 18 ? label.slice(0, 15) + "..." : label;
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#eee" },
        title: { display: true, text: "Hours", font: { size: 15 } },
        ticks: { color: "#222", font: { size: 13 } },
      },
    },
    layout: { padding: 20 },
    animation: { duration: 800, easing: "easeOutQuart" },
  };

  const sortedBreakdownData = [...groupedData].sort(
    (a, b) => b.billable + b.nonBillable - (a.billable + a.nonBillable)
  );

  const breakdownItemsToRender = isFullscreen
    ? sortedBreakdownData
    : sortedBreakdownData.slice(0, 5);

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Filter Buttons */}
        <Grid item xs={12}>
          <Card>
            <MDBox p={2}>
              <Grid container spacing={2}>
                {["Project", "Weekly", "Monthly", "Quarterly"].map((label) => (
                  <Grid item xs={6} sm={3} key={label}>
                    <MDButton
                      variant={filter === label ? "contained" : "outlined"}
                      color={filter === label ? "info" : "secondary"}
                      fullWidth
                      onClick={() => setFilter(label)}
                    >
                      {label}
                    </MDButton>
                  </Grid>
                ))}
              </Grid>
            </MDBox>
          </Card>
        </Grid>

        {/* Summary Cards */}
        {[
          ["Total Billable Hours", summary.totalBillable, summary.billablePercentage, "success"],
          [
            "Total Non-Billable Hours",
            summary.totalNonBillable,
            summary.nonBillablePercentage,
            "error",
          ],
        ].map(([title, value, percentage, color], idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Card>
              <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h4" color={`${color}.main`}>
                  {value.toFixed(1)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  color={color}
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
                <Typography variant="body2" color="textSecondary" mt={0.5}>
                  {percentage}% {color === "success" ? "Billable" : "Non-Billable"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Chart - Show only in fullscreen */}
        {isFullscreen && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ height: 400 }}>
                  <Bar options={chartOptions} data={chartData} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Breakdown Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Breakdown by Customer and User
              </Typography>

              {breakdownItemsToRender.map((item, idx) => {
                const total = item.billable + item.nonBillable;
                const billablePercent = total > 0 ? Math.round((item.billable / total) * 100) : 0;
                const nonBillablePercent = 100 - billablePercent;

                return (
                  <Box key={idx}>
                    <Box mt={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.customer} → {item.createdBy}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={billablePercent}
                        color="success"
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: theme.palette.error.light,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: theme.palette.success.main,
                          },
                        }}
                      />
                      <Box display="flex" justifyContent="space-between" mt={0.5}>
                        <Typography variant="body2" color="success.dark">
                          ✅ {item.billable.toFixed(1)} hrs ({billablePercent}%)
                        </Typography>
                        <Typography variant="body2" color="error.dark">
                          ❌ {item.nonBillable.toFixed(1)} hrs ({nonBillablePercent}%)
                        </Typography>
                      </Box>
                    </Box>
                    {idx < breakdownItemsToRender.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                );
              })}

              {!isFullscreen && sortedBreakdownData.length > 5 && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="center"
                  sx={{ mt: 2, pt: 1 }}
                >
                  Showing 5 of {sortedBreakdownData.length} items. Click the fullscreen icon to view
                  all.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

ResourcesUtilization.propTypes = {
  isFullscreen: PropTypes.bool,
};

ResourcesUtilization.defaultProps = {
  isFullscreen: false,
};

export default ResourcesUtilization;
