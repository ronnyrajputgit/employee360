// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Paper,
//   Divider,
//   Tooltip,
//   Badge,
//   Chip,
//   Avatar,
//   Link,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";

// // Helper Component for Partitioned Summary Cards (Updated for Responsiveness)
// const BreakdownCard = ({ title, icon, data, filterType, onFilter, activeFilter }) => (
//   <Card sx={{ boxShadow: 3, height: "100%" }}>
//     <CardContent>
//       <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         {icon} {title}
//       </Typography>
//       <Divider sx={{ my: 1 }} />
//       {Object.keys(data).length > 0 ? (
//         <Grid container spacing={1} sx={{ mt: 1 }}>
//           {Object.entries(data).map(([key, value]) => {
//             const isActive = activeFilter.type === filterType && activeFilter.value === key;
//             return (
//               <Grid item xs={6} md={4} key={key}>
//                 {" "}
//                 {/* <-- Badlav yahan hai */}
//                 <Tooltip title={`Click to filter by ${key}`}>
//                   <Badge
//                     badgeContent={value}
//                     color="primary"
//                     anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                   >
//                     <Paper
//                       onClick={() => onFilter(filterType, key)}
//                       variant="outlined"
//                       sx={{
//                         p: 1,
//                         width: "100%",
//                         textAlign: "center",
//                         textTransform: "capitalize",
//                         cursor: "pointer",
//                         borderColor: isActive ? "primary.main" : "rgba(0, 0, 0, 0.23)",
//                         borderWidth: isActive ? 2 : 1,
//                         minHeight: "45px", // Ensures consistent height
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         "&:hover": {
//                           backgroundColor: "action.hover",
//                           borderColor: "primary.light",
//                         },
//                       }}
//                     >
//                       <Typography variant="body2" sx={{ fontWeight: isActive ? "bold" : "normal" }}>
//                         {key}
//                       </Typography>
//                     </Paper>
//                   </Badge>
//                 </Tooltip>
//               </Grid>
//             );
//           })}
//         </Grid>
//       ) : (
//         <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//           No data available.
//         </Typography>
//       )}
//     </CardContent>
//   </Card>
// );
// BreakdownCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.node.isRequired,
//   data: PropTypes.object.isRequired,
//   filterType: PropTypes.string.isRequired,
//   onFilter: PropTypes.func.isRequired,
//   activeFilter: PropTypes.object.isRequired,
// };

// // Helper Component for a single total count
// const TotalCountCard = ({ title, icon, count }) => (
//   <Card sx={{ boxShadow: 3, height: "100%", textAlign: "center" }}>
//     <CardContent>
//       <Typography
//         variant="h6"
//         gutterBottom
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
//       >
//         {icon} {title}
//       </Typography>
//       <Divider sx={{ my: 1.5 }} />
//       <Typography variant="h3" sx={{ mt: 2, fontWeight: "bold" }}>
//         {count}
//       </Typography>
//     </CardContent>
//   </Card>
// );
// TotalCountCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.node.isRequired,
//   count: PropTypes.number.isRequired,
// };

// // Main WorkTrackers Component
// const WorkTrackers = ({ isFullscreen }) => {
//   const { filteredData, loading } = useGlobalFilters();
//   const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

//   const allTasks = filteredData.WorkTracker || [];

//   const priorityCounts = allTasks.reduce((acc, task) => {
//     const priority = task.Priority || "None";
//     acc[priority] = (acc[priority] || 0) + 1;
//     return acc;
//   }, {});

//   const statusCounts = allTasks.reduce((acc, task) => {
//     const status = task.Status || "None";
//     acc[status] = (acc[status] || 0) + 1;
//     return acc;
//   }, {});

//   const groupedByUser = allTasks.reduce((acc, task) => {
//     const key = task.AssignedTo || "Unassigned";
//     if (!acc[key]) {
//       acc[key] = { assignedTo: key, tasks: [] };
//     }
//     acc[key].tasks.push(task);
//     return acc;
//   }, {});

//   const handleFilterChange = (type, value) => {
//     setActiveFilter((current) =>
//       current.type === type && current.value === value
//         ? { type: null, value: null }
//         : { type, value }
//     );
//   };

//   const allGroupedUsers = Object.values(groupedByUser);
//   const usersToRender = isFullscreen ? allGroupedUsers : allGroupedUsers.slice(0, 1);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const columns = [
//     { Header: "Issue", accessor: "Issue", width: "30%" },
//     { Header: "Project / Category", accessor: "ProjectOrCategory" },
//     { Header: "Status", accessor: "Status" },
//     { Header: "Priority", accessor: "Priority" },
//     { Header: "Due Date", accessor: "DueDate" },
//     { Header: "Created By", accessor: "CreatedBy" },
//   ];

//   return (
//     <Box p={3}>
//       <Grid container spacing={3} mb={2}>
//         <Grid item xs={12} md={2}>
//           <TotalCountCard title="Total Tasks" icon="📝" count={allTasks.length} />
//         </Grid>
//         <Grid item xs={12} md={5}>
//           <BreakdownCard
//             title="Priority"
//             icon="⚠️"
//             data={priorityCounts}
//             filterType="priority"
//             onFilter={handleFilterChange}
//             activeFilter={activeFilter}
//           />
//         </Grid>
//         <Grid item xs={12} md={5}>
//           <BreakdownCard
//             title="Status"
//             icon="📊"
//             data={statusCounts}
//             filterType="status"
//             onFilter={handleFilterChange}
//             activeFilter={activeFilter}
//           />
//         </Grid>
//       </Grid>

//       {activeFilter.type && (
//         <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//           <Chip
//             label={`Filter: ${activeFilter.value}`}
//             onDelete={() => setActiveFilter({ type: null, value: null })}
//             color="primary"
//           />
//         </Box>
//       )}

//       {allGroupedUsers.length > 0 ? (
//         usersToRender.map((user, index) => {
//           let tasksForThisUser = user.tasks;
//           if (activeFilter.type && activeFilter.value) {
//             tasksForThisUser = user.tasks.filter((task) => {
//               const valueToCompare = activeFilter.type === "priority" ? task.Priority : task.Status;
//               return (valueToCompare || "None") === activeFilter.value;
//             });
//           }

//           const rows = tasksForThisUser.map((task) => {
//             const tooltipContent = (
//               <Box sx={{ p: 1, textAlign: "left" }}>
//                 <Typography variant="caption">
//                   <strong>Assigned To:</strong> {task.AssignedTo || "N/A"}
//                 </Typography>
//                 <br />
//                 <Typography variant="caption">
//                   <strong>Email:</strong> {task.Email || "N/A"}
//                 </Typography>
//                 <br />
//                 <Typography variant="caption">
//                   <strong>Created At:</strong> {new Date(task.CreatedAt).toLocaleString()}
//                 </Typography>
//                 <br />
//                 <Typography variant="caption">
//                   <strong>Parent Issues:</strong> {task.ParentRelatedIssues || "None"}
//                 </Typography>
//                 {task.sharepointViewUrl && (
//                   <>
//                     <br />
//                     <Link
//                       href={task.sharepointViewUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       variant="caption"
//                       onClick={(e) => e.stopPropagation()}
//                       sx={{ color: "cyan", fontWeight: "bold" }}
//                     >
//                       Read Comments
//                     </Link>
//                   </>
//                 )}
//               </Box>
//             );
//             return {
//               Issue: (
//                 <Tooltip title={tooltipContent} arrow placement="top">
//                   <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                     {task.Issue || "N/A"}
//                   </Typography>
//                 </Tooltip>
//               ),
//               ProjectOrCategory: task.Project || task.Category || "N/A",
//               Status: task.Status || "N/A",
//               Priority: task.Priority || "N/A",
//               DueDate: task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "N/A",
//               CreatedBy: task.CreatedBy || "N/A",
//             };
//           });

//           return (
//             <Box key={index} mt={3}>
//               <Paper elevation={3} sx={{ p: 2, overflow: "hidden" }}>
//                 <Box display="flex" alignItems="center" mb={2} gap={1}>
//                   <Avatar sx={{ bgcolor: "secondary.main" }}>
//                     <PersonIcon />
//                   </Avatar>
//                   <Typography variant="h6">{user.assignedTo}</Typography>
//                 </Box>
//                 <Card sx={{ boxShadow: 3 }}>
//                   <CardContent>
//                     <DataTable
//                       canSearch
//                       table={{ columns, rows }}
//                       isSorted
//                       entriesPerPage={{ defaultValue: 5, entries: [5, 10, 20] }}
//                       showTotalEntries
//                       noEndBorder
//                     />
//                   </CardContent>
//                 </Card>
//               </Paper>
//             </Box>
//           );
//         })
//       ) : (
//         <Typography variant="h6" color="textSecondary" textAlign="center" mt={4}>
//           No tasks found.
//         </Typography>
//       )}

//       {!isFullscreen && allGroupedUsers.length > 1 && (
//         <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ mt: 2 }}>
//           Showing 1 of {allGroupedUsers.length} users. Use the fullscreen icon to view all.
//         </Typography>
//       )}
//     </Box>
//   );
// };

// WorkTrackers.propTypes = {
//   isFullscreen: PropTypes.bool,
// };
// WorkTrackers.defaultProps = {
//   isFullscreen: false,
// };

// export default WorkTrackers;

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Divider,
  Tooltip,
  Badge,
  Chip,
  Avatar,
  Link,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useGlobalFilters } from "context/GlobalFilterContext";
import DataTable from "examples/Tables/DataTable";

// Helper Component for Partitioned Summary Cards (Updated for Responsiveness)
const BreakdownCard = ({ title, icon, data, filterType, onFilter, activeFilter }) => (
  <Card sx={{ boxShadow: 3, height: "100%" }}>
    <CardContent>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon} {title}
      </Typography>
      <Divider sx={{ my: 1 }} />
      {Object.keys(data).length > 0 ? (
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {Object.entries(data).map(([key, value]) => {
            const isActive = activeFilter.type === filterType && activeFilter.value === key;
            return (
              <Grid item xs={6} md={4} key={key}>
                <Tooltip title={`Click to filter by ${key}`}>
                  <Badge
                    badgeContent={value}
                    color="primary"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Paper
                      onClick={() => onFilter(filterType, key)}
                      variant="outlined"
                      sx={{
                        p: 1,
                        width: "100%",
                        textAlign: "center",
                        textTransform: "capitalize",
                        cursor: "pointer",
                        borderColor: isActive ? "primary.main" : "rgba(0, 0, 0, 0.23)",
                        borderWidth: isActive ? 2 : 1,
                        minHeight: "45px", // Ensures consistent height
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          backgroundColor: "action.hover",
                          borderColor: "primary.light",
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: isActive ? "bold" : "normal" }}>
                        {key}
                      </Typography>
                    </Paper>
                  </Badge>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          No data available.
        </Typography>
      )}
    </CardContent>
  </Card>
);
BreakdownCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  filterType: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.object.isRequired,
};

// Helper Component for a single total count
const TotalCountCard = ({ title, icon, count }) => (
  <Card sx={{ boxShadow: 3, height: "100%", textAlign: "center" }}>
    <CardContent>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
      >
        {icon} {title}
      </Typography>
      <Divider sx={{ my: 1.5 }} />
      <Typography variant="h3" sx={{ mt: 2, fontWeight: "bold" }}>
        {count}
      </Typography>
    </CardContent>
  </Card>
);
TotalCountCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
};

// Main WorkTrackers Component
const WorkTrackers = ({ isFullscreen }) => {
  const { filteredData, loading } = useGlobalFilters();
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

  const allTasks = filteredData.WorkTracker || [];

  const priorityCounts = allTasks.reduce((acc, task) => {
    const priority = task.Priority || "None";
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = allTasks.reduce((acc, task) => {
    const status = task.Status || "None";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const groupedByUser = allTasks.reduce((acc, task) => {
    const key = task.AssignedTo || "Unassigned";
    if (!acc[key]) {
      acc[key] = { assignedTo: key, tasks: [] };
    }
    acc[key].tasks.push(task);
    return acc;
  }, {});

  const handleFilterChange = (type, value) => {
    setActiveFilter((current) =>
      current.type === type && current.value === value
        ? { type: null, value: null }
        : { type, value }
    );
  };

  const allGroupedUsers = Object.values(groupedByUser);
  const usersToRender = isFullscreen ? allGroupedUsers : allGroupedUsers.slice(0, 1);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    { Header: "Issue", accessor: "Issue", width: "30%" },
    { Header: "Project / Category", accessor: "ProjectOrCategory" },
    { Header: "Status", accessor: "Status" },
    { Header: "Priority", accessor: "Priority" },
    { Header: "Due Date", accessor: "DueDate" },
    { Header: "Created By", accessor: "CreatedBy" },
  ];

  return (
    <Box p={3}>
      {/* --- Summary & Filter Section (Updated Logic for Conditional Rendering) --- */}
      <Grid container spacing={3} mb={2}>
        {/* Total Count Card - Always visible */}
        <Grid item xs={12} md={isFullscreen ? 2 : 4}>
          {" "}
          {/* Adjusted size for better small view layout */}
          <TotalCountCard title="Total Tasks" icon="📝" count={allTasks.length} />
        </Grid>

        {/* Priority Breakdown Card - Always visible */}
        <Grid item xs={12} md={isFullscreen ? 5 : 8}>
          {" "}
          {/* Adjusted size for better small view layout */}
          <BreakdownCard
            title="Priority"
            icon="⚠️"
            data={priorityCounts}
            filterType="priority"
            onFilter={handleFilterChange}
            activeFilter={activeFilter}
          />
        </Grid>

        {/* Status Breakdown Card - Visible only in Fullscreen */}
        {isFullscreen && (
          <Grid item xs={12} md={5}>
            <BreakdownCard
              title="Status"
              icon="📊"
              data={statusCounts}
              filterType="status"
              onFilter={handleFilterChange}
              activeFilter={activeFilter}
            />
          </Grid>
        )}
      </Grid>

      {activeFilter.type && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            label={`Filter: ${activeFilter.value}`}
            onDelete={() => setActiveFilter({ type: null, value: null })}
            color="primary"
          />
        </Box>
      )}

      {allGroupedUsers.length > 0 ? (
        usersToRender.map((user, index) => {
          let tasksForThisUser = user.tasks;
          if (activeFilter.type && activeFilter.value) {
            tasksForThisUser = user.tasks.filter((task) => {
              const valueToCompare = activeFilter.type === "priority" ? task.Priority : task.Status;
              return (valueToCompare || "None") === activeFilter.value;
            });
          }

          const rows = tasksForThisUser.map((task) => {
            const tooltipContent = (
              <Box sx={{ p: 1, textAlign: "left" }}>
                <Typography variant="caption">
                  <strong>Assigned To:</strong> {task.AssignedTo || "N/A"}
                </Typography>
                <br />
                <Typography variant="caption">
                  <strong>Email:</strong> {task.Email || "N/A"}
                </Typography>
                <br />
                <Typography variant="caption">
                  <strong>Created At:</strong> {new Date(task.CreatedAt).toLocaleString()}
                </Typography>
                <br />
                <Typography variant="caption">
                  <strong>Parent Issues:</strong> {task.ParentRelatedIssues || "None"}
                </Typography>
                {task.sharepointViewUrl && (
                  <>
                    <br />
                    <Link
                      href={task.sharepointViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="caption"
                      onClick={(e) => e.stopPropagation()}
                      sx={{ color: "cyan", fontWeight: "bold" }}
                    >
                      Read Comments
                    </Link>
                  </>
                )}
              </Box>
            );
            return {
              Issue: (
                <Tooltip title={tooltipContent} arrow placement="top">
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>
                    {task.Issue || "N/A"}
                  </Typography>
                </Tooltip>
              ),
              ProjectOrCategory: task.Project || task.Category || "N/A",
              Status: task.Status || "N/A",
              Priority: task.Priority || "N/A",
              DueDate: task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "N/A",
              CreatedBy: task.CreatedBy || "N/A",
            };
          });

          return (
            <Box key={index} mt={3}>
              <Paper elevation={3} sx={{ p: 2, overflow: "hidden" }}>
                <Box display="flex" alignItems="center" mb={2} gap={1}>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="h6">{user.assignedTo}</Typography>
                </Box>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <DataTable
                      canSearch
                      table={{ columns, rows }}
                      isSorted
                      entriesPerPage={{ defaultValue: 5, entries: [5, 10, 20] }}
                      showTotalEntries
                      noEndBorder
                    />
                  </CardContent>
                </Card>
              </Paper>
            </Box>
          );
        })
      ) : (
        <Typography variant="h6" color="textSecondary" textAlign="center" mt={4}>
          No tasks found.
        </Typography>
      )}

      {!isFullscreen && allGroupedUsers.length > 1 && (
        <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ mt: 2 }}>
          Showing 1 of {allGroupedUsers.length} users. Use the fullscreen icon to view all.
        </Typography>
      )}
    </Box>
  );
};

WorkTrackers.propTypes = {
  isFullscreen: PropTypes.bool,
};
WorkTrackers.defaultProps = {
  isFullscreen: false,
};

export default WorkTrackers;
