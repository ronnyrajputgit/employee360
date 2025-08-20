// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   IconButton,
//   CircularProgress,
//   Paper,
//   Divider,
//   Tooltip,
//   Badge,
//   Chip,
// } from "@mui/material";
// import {
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";
// import { useRoleBasedAccess } from "context/RoleBasedAccess";
// import { useSearchParams } from "react-router-dom";

// // Component for Partitioned Summary Cards (with filtering logic)
// const BreakdownCard = ({ title, icon, data, filterType, onFilter, activeFilter }) => (
//   <Card sx={{ boxShadow: 3, height: "100%" }}>
//     <CardContent>
//       <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         {icon} {title}
//       </Typography>
//       <Divider sx={{ my: 1 }} />
//       {Object.keys(data).length > 0 ? (
//         <Grid container spacing={2} sx={{ mt: 1 }}>
//           {Object.entries(data).map(([key, value]) => {
//             const isActive = activeFilter.type === filterType && activeFilter.value === key;
//             return (
//               <Grid item xs={6} sm={4} key={key}>
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

// // Component for a single total count
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

// const WorkTrackers = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const { filteredData, loading } = useGlobalFilters();
//   const { currentName, isExecutive } = useRoleBasedAccess();
//   const [searchParams] = useSearchParams();
//   const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);
//   const [displayedTasks, setDisplayedTasks] = useState([]);
//   const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

//   useEffect(() => {
//     const emailParam = searchParams.get("email");
//     setViewingEmployeeEmail(emailParam && isExecutive ? emailParam : null);
//   }, [searchParams, isExecutive]);

//   useEffect(() => {
//     if (!filteredData.WorkTracker) {
//       setDisplayedTasks([]);
//       return;
//     }

//     let userFilteredTasks = (filteredData.WorkTracker || []).filter((task) => {
//       if (viewingEmployeeEmail) {
//         return task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
//       }
//       if (currentName) {
//         return task.AssignedTo?.toLowerCase() === currentName.toLowerCase();
//       }
//       return false;
//     });

//     if (activeFilter.type && activeFilter.value) {
//       const filteredResult = userFilteredTasks.filter((task) => {
//         const valueToCompare = activeFilter.type === "priority" ? task.Priority : task.Status;
//         return (valueToCompare || "None") === activeFilter.value;
//       });
//       setDisplayedTasks(filteredResult);
//     } else {
//       setDisplayedTasks(userFilteredTasks);
//     }
//   }, [filteredData, currentName, viewingEmployeeEmail, activeFilter]);

//   const handleFilterChange = (type, value) => {
//     setActiveFilter((currentFilter) => {
//       if (currentFilter.type === type && currentFilter.value === value) {
//         return { type: null, value: null };
//       }
//       return { type, value };
//     });
//   };

//   const baseTasks = (filteredData.WorkTracker || []).filter((task) => {
//     if (viewingEmployeeEmail)
//       return task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
//     if (currentName) return task.AssignedTo?.toLowerCase() === currentName.toLowerCase();
//     return false;
//   });

//   const totalIssues = displayedTasks.length;

//   const priorityCounts = baseTasks.reduce((acc, task) => {
//     const priority = task.Priority || "None";
//     acc[priority] = (acc[priority] || 0) + 1;
//     return acc;
//   }, {});

//   const statusCounts = baseTasks.reduce((acc, task) => {
//     const status = task.Status || "None";
//     acc[status] = (acc[status] || 0) + 1;
//     return acc;
//   }, {});

//   const columns = [
//     { Header: "Issue", accessor: "Issue", width: "30%" },
//     { Header: "Project / Category", accessor: "ProjectOrCategory" },
//     { Header: "Status", accessor: "Status" },
//     { Header: "Priority", accessor: "Priority" },
//     { Header: "Due Date", accessor: "DueDate" },
//     { Header: "Created By", accessor: "CreatedBy" },
//   ];

//   const rows = displayedTasks.map((task) => {
//     const tooltipContent = (
//       <Box sx={{ p: 1, textAlign: "left" }}>
//         <Typography variant="caption">
//           <strong>Assigned To:</strong> {task.AssignedTo || "N/A"}
//         </Typography>
//         <br />
//         <Typography variant="caption">
//           <strong>Email:</strong> {task.Email || "N/A"}
//         </Typography>
//         <br />
//         <Typography variant="caption">
//           <strong>Created At:</strong> {new Date(task.CreatedAt).toLocaleString()}
//         </Typography>
//         <br />
//         <Typography variant="caption">
//           <strong>Parent Issues:</strong> {task.ParentRelatedIssues || "None"}
//         </Typography>
//       </Box>
//     );

//     return {
//       Issue: (
//         <Tooltip title={tooltipContent} arrow placement="top">
//           <Typography variant="body2" sx={{ cursor: "pointer" }}>
//             {task.Issue || "N/A"}
//           </Typography>
//         </Tooltip>
//       ),
//       ProjectOrCategory: task.Project || task.Category || "N/A",
//       Status: task.Status || "N/A",
//       Priority: task.Priority || "N/A",
//       DueDate: task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "N/A",
//       CreatedBy: task.CreatedBy || "N/A",
//     };
//   });

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         position: isFullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         backgroundColor: "#fff",
//         width: "100%",
//         height: isFullscreen ? "100vh" : "auto",
//         zIndex: isFullscreen ? 9999 : "auto",
//         overflow: "auto",
//         p: isFullscreen ? 2 : 3,
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           borderRadius: 2,
//           p: 2,
//           background: "linear-gradient(to right, rgb(8, 13, 17), #3498db)",
//           mb: 3,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
//           💼 {viewingEmployeeEmail ? `Tasks for ${viewingEmployeeEmail}` : "My Assigned Tasks"}
//         </Typography>
//         <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "white" }}>
//           {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Paper>
//       <Divider sx={{ my: 3 }} />

//       <Grid container spacing={3} mb={2}>
//         <Grid item xs={12} md={2}>
//           <TotalCountCard title="Total Count" icon="🛑" count={totalIssues} />
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

//       {displayedTasks.length > 0 ? (
//         <Card sx={{ boxShadow: 3 }}>
//           <CardContent>
//             <DataTable
//               canSearch={true}
//               table={{ columns, rows }}
//               isSorted={false}
//               entriesPerPage={false}
//               showTotalEntries={true}
//               noEndBorder
//             />
//           </CardContent>
//         </Card>
//       ) : (
//         <Box
//           sx={{
//             mt: 4,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "200px",
//             backgroundColor: "#f5f5f5",
//             borderRadius: "16px",
//             gap: 2,
//           }}
//         >
//           <Typography variant="h6" color="textSecondary">
//             No tasks match the current filter.
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default WorkTrackers;

// // import React, { useState, useEffect } from "react";
// // import PropTypes from "prop-types";
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Grid,
// //   IconButton,
// //   CircularProgress,
// //   Paper,
// //   Divider,
// //   Tooltip,
// //   Badge,
// //   Chip,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   List,
// //   ListItem,
// //   ListItemAvatar,
// //   Avatar,
// //   ListItemText,
// // } from "@mui/material";
// // import {
// //   Fullscreen as FullscreenIcon,
// //   FullscreenExit as FullscreenExitIcon,
// //   Close as CloseIcon,
// // } from "@mui/icons-material";
// // import { useGlobalFilters } from "context/GlobalFilterContext";
// // import DataTable from "examples/Tables/DataTable";
// // import { useRoleBasedAccess } from "context/RoleBasedAccess";
// // import { useSearchParams } from "react-router-dom";
// // import { fetchCommentsForItem } from "apis/sharepointApi";

// // // Helper Component for Partitioned Summary Cards
// // const BreakdownCard = ({ title, icon, data, filterType, onFilter, activeFilter }) => (
// //   <Card sx={{ boxShadow: 3, height: "100%" }}>
// //     <CardContent>
// //       <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //         {icon} {title}
// //       </Typography>
// //       <Divider sx={{ my: 1 }} />
// //       {Object.keys(data).length > 0 ? (
// //         <Grid container spacing={2} sx={{ mt: 1 }}>
// //           {Object.entries(data).map(([key, value]) => {
// //             const isActive = activeFilter.type === filterType && activeFilter.value === key;
// //             return (
// //               <Grid item xs={6} sm={4} key={key}>
// //                 <Tooltip title={`Click to filter by ${key}`}>
// //                   <Badge
// //                     badgeContent={value}
// //                     color="primary"
// //                     anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //                   >
// //                     <Paper
// //                       onClick={() => onFilter(filterType, key)}
// //                       variant="outlined"
// //                       sx={{
// //                         p: 1,
// //                         width: "100%",
// //                         textAlign: "center",
// //                         textTransform: "capitalize",
// //                         cursor: "pointer",
// //                         borderColor: isActive ? "primary.main" : "rgba(0, 0, 0, 0.23)",
// //                         borderWidth: isActive ? 2 : 1,
// //                         "&:hover": {
// //                           backgroundColor: "action.hover",
// //                           borderColor: "primary.light",
// //                         },
// //                       }}
// //                     >
// //                       <Typography variant="body2" sx={{ fontWeight: isActive ? "bold" : "normal" }}>
// //                         {key}
// //                       </Typography>
// //                     </Paper>
// //                   </Badge>
// //                 </Tooltip>
// //               </Grid>
// //             );
// //           })}
// //         </Grid>
// //       ) : (
// //         <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
// //           No data available.
// //         </Typography>
// //       )}
// //     </CardContent>
// //   </Card>
// // );

// // BreakdownCard.propTypes = {
// //   title: PropTypes.string.isRequired,
// //   icon: PropTypes.node.isRequired,
// //   data: PropTypes.object.isRequired,
// //   filterType: PropTypes.string.isRequired,
// //   onFilter: PropTypes.func.isRequired,
// //   activeFilter: PropTypes.object.isRequired,
// // };

// // // Helper Component for a single total count
// // const TotalCountCard = ({ title, icon, count }) => (
// //   <Card sx={{ boxShadow: 3, height: "100%", textAlign: "center" }}>
// //     <CardContent>
// //       <Typography
// //         variant="h6"
// //         gutterBottom
// //         sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
// //       >
// //         {icon} {title}
// //       </Typography>
// //       <Divider sx={{ my: 1.5 }} />
// //       <Typography variant="h3" sx={{ mt: 2, fontWeight: "bold" }}>
// //         {count}
// //       </Typography>
// //     </CardContent>
// //   </Card>
// // );

// // TotalCountCard.propTypes = {
// //   title: PropTypes.string.isRequired,
// //   icon: PropTypes.node.isRequired,
// //   count: PropTypes.number.isRequired,
// // };

// // // Main Component
// // const WorkTrackers = () => {
// //   const [isFullscreen, setIsFullscreen] = useState(false);
// //   const { filteredData, loading } = useGlobalFilters();
// //   const { currentName, isExecutive } = useRoleBasedAccess();
// //   const [searchParams] = useSearchParams();
// //   const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);
// //   const [displayedTasks, setDisplayedTasks] = useState([]);
// //   const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

// //   // State for Modal and Comments
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedIssue, setSelectedIssue] = useState(null);
// //   const [comments, setComments] = useState([]);
// //   const [commentsLoading, setCommentsLoading] = useState(false);

// //   useEffect(() => {
// //     const emailParam = searchParams.get("email");
// //     setViewingEmployeeEmail(emailParam && isExecutive ? emailParam : null);
// //   }, [searchParams, isExecutive]);

// //   useEffect(() => {
// //     if (!filteredData.WorkTracker) {
// //       setDisplayedTasks([]);
// //       return;
// //     }

// //     let userFilteredTasks = (filteredData.WorkTracker || []).filter((task) => {
// //       if (viewingEmployeeEmail) {
// //         return task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
// //       }
// //       if (currentName) {
// //         return task.AssignedTo?.toLowerCase() === currentName.toLowerCase();
// //       }
// //       return false;
// //     });

// //     if (activeFilter.type && activeFilter.value) {
// //       const filteredResult = userFilteredTasks.filter((task) => {
// //         const valueToCompare = activeFilter.type === "priority" ? task.Priority : task.Status;
// //         return (valueToCompare || "None") === activeFilter.value;
// //       });
// //       setDisplayedTasks(filteredResult);
// //     } else {
// //       setDisplayedTasks(userFilteredTasks);
// //     }
// //   }, [filteredData, currentName, viewingEmployeeEmail, activeFilter]);

// //   const handleFilterChange = (type, value) => {
// //     setActiveFilter((currentFilter) => {
// //       if (currentFilter.type === type && currentFilter.value === value) {
// //         return { type: null, value: null };
// //       }
// //       return { type, value };
// //     });
// //   };

// //   const handleIssueClick = async (task) => {
// //     if (!task.id) {
// //       console.error(
// //         "Task ID is missing! Make sure it is added in the GlobalFilterContext transformer."
// //       );
// //       return;
// //     }
// //     setSelectedIssue(task);
// //     setIsModalOpen(true);
// //     setCommentsLoading(true);
// //     try {
// //       const fetchedComments = await fetchCommentsForItem(task.id);
// //       console.log(fetchedComments);
// //       setComments(fetchedComments.reverse()); // Reverse for chat view (oldest first)
// //     } catch (error) {
// //       console.error("Failed to fetch comments:", error);
// //       setComments([]);
// //     } finally {
// //       setCommentsLoading(false);
// //     }
// //   };

// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //     setSelectedIssue(null);
// //     setComments([]);
// //   };

// //   const baseTasks = (filteredData.WorkTracker || []).filter((task) => {
// //     if (viewingEmployeeEmail)
// //       return task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
// //     if (currentName) return task.AssignedTo?.toLowerCase() === currentName.toLowerCase();
// //     return false;
// //   });

// //   const totalIssues = displayedTasks.length;

// //   const priorityCounts = baseTasks.reduce((acc, task) => {
// //     const priority = task.Priority || "None";
// //     acc[priority] = (acc[priority] || 0) + 1;
// //     return acc;
// //   }, {});

// //   const statusCounts = baseTasks.reduce((acc, task) => {
// //     const status = task.Status || "None";
// //     acc[status] = (acc[status] || 0) + 1;
// //     return acc;
// //   }, {});

// //   const columns = [
// //     { Header: "Issue", accessor: "Issue", width: "30%" },
// //     { Header: "Project / Category", accessor: "ProjectOrCategory" },
// //     { Header: "Status", accessor: "Status" },
// //     { Header: "Priority", accessor: "Priority" },
// //     { Header: "Due Date", accessor: "DueDate" },
// //     { Header: "Created By", accessor: "CreatedBy" },
// //   ];

// //   const rows = displayedTasks.map((task) => {
// //     const tooltipContent = (
// //       <Box sx={{ p: 1, textAlign: "left" }}>
// //         <Typography variant="caption">
// //           <strong>Assigned To:</strong> {task.AssignedTo || "N/A"}
// //         </Typography>
// //         <br />
// //         <Typography variant="caption">
// //           <strong>Email:</strong> {task.Email || "N/A"}
// //         </Typography>
// //         <br />
// //         <Typography variant="caption">
// //           <strong>Created At:</strong> {new Date(task.CreatedAt).toLocaleString()}
// //         </Typography>
// //         <br />
// //         <Typography variant="caption">
// //           <strong>Parent Issues:</strong> {task.ParentRelatedIssues || "None"}
// //         </Typography>
// //       </Box>
// //     );

// //     return {
// //       Issue: (
// //         <Tooltip title={tooltipContent} arrow placement="top">
// //           <Typography
// //             variant="body2"
// //             onClick={() => handleIssueClick(task)}
// //             sx={{
// //               cursor: "pointer",
// //               color: "primary.main",
// //               "&:hover": { textDecoration: "underline" },
// //             }}
// //           >
// //             {task.Issue || "N/A"}
// //           </Typography>
// //         </Tooltip>
// //       ),
// //       ProjectOrCategory: task.Project || task.Category || "N/A",
// //       Status: task.Status || "N/A",
// //       Priority: task.Priority || "N/A",
// //       DueDate: task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "N/A",
// //       CreatedBy: task.CreatedBy || "N/A",
// //     };
// //   });

// //   if (loading) {
// //     return (
// //       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box
// //       sx={{
// //         position: isFullscreen ? "fixed" : "relative",
// //         top: 0,
// //         left: 0,
// //         backgroundColor: "#fff",
// //         width: "100%",
// //         height: isFullscreen ? "100vh" : "auto",
// //         zIndex: isFullscreen ? 9999 : "auto",
// //         overflow: "auto",
// //         p: isFullscreen ? 2 : 3,
// //       }}
// //     >
// //       <Paper
// //         elevation={3}
// //         sx={{
// //           borderRadius: 2,
// //           p: 2,
// //           background: "linear-gradient(to right, rgb(8, 13, 17), #3498db)",
// //           mb: 3,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //         }}
// //       >
// //         <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
// //           💼 {viewingEmployeeEmail ? `Tasks for ${viewingEmployeeEmail}` : "My Assigned Tasks"}
// //         </Typography>
// //         <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "white" }}>
// //           {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
// //         </IconButton>
// //       </Paper>
// //       <Divider sx={{ my: 3 }} />

// //       <Grid container spacing={3} mb={2}>
// //         <Grid item xs={12} md={2}>
// //           <TotalCountCard title="Showing Issues" icon="📝" count={totalIssues} />
// //         </Grid>
// //         <Grid item xs={12} md={5}>
// //           <BreakdownCard
// //             title="Priority Breakdown"
// //             icon="⚠️"
// //             data={priorityCounts}
// //             filterType="priority"
// //             onFilter={handleFilterChange}
// //             activeFilter={activeFilter}
// //           />
// //         </Grid>
// //         <Grid item xs={12} md={5}>
// //           <BreakdownCard
// //             title="Status Breakdown"
// //             icon="📊"
// //             data={statusCounts}
// //             filterType="status"
// //             onFilter={handleFilterChange}
// //             activeFilter={activeFilter}
// //           />
// //         </Grid>
// //       </Grid>

// //       {activeFilter.type && (
// //         <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
// //           <Chip
// //             label={`Filter: ${activeFilter.value}`}
// //             onDelete={() => setActiveFilter({ type: null, value: null })}
// //             color="primary"
// //           />
// //         </Box>
// //       )}

// //       {displayedTasks.length > 0 ? (
// //         <Card sx={{ boxShadow: 3 }}>
// //           <CardContent>
// //             <DataTable
// //               canSearch={true}
// //               table={{ columns, rows }}
// //               isSorted={false}
// //               entriesPerPage={false}
// //               showTotalEntries={true}
// //               noEndBorder
// //             />
// //           </CardContent>
// //         </Card>
// //       ) : (
// //         <Box
// //           sx={{
// //             mt: 4,
// //             display: "flex",
// //             flexDirection: "column",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             height: "200px",
// //             backgroundColor: "#f5f5f5",
// //             borderRadius: "16px",
// //             gap: 2,
// //           }}
// //         >
// //           <Typography variant="h6" color="textSecondary">
// //             No tasks match the current filter.
// //           </Typography>
// //         </Box>
// //       )}

// //       <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
// //         <DialogTitle>
// //           Comments for: {selectedIssue?.Issue}
// //           <IconButton
// //             aria-label="close"
// //             onClick={handleCloseModal}
// //             sx={{ position: "absolute", right: 8, top: 8 }}
// //           >
// //             <CloseIcon />
// //           </IconButton>
// //         </DialogTitle>
// //         <DialogContent dividers>
// //           {commentsLoading ? (
// //             <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
// //               <CircularProgress />
// //             </Box>
// //           ) : (
// //             <List sx={{ width: "100%" }}>
// //               {comments.length > 0 ? (
// //                 comments.map((comment) => (
// //                   <ListItem key={comment.id} alignItems="flex-start">
// //                     <ListItemAvatar>
// //                       <Avatar alt={comment.author.user.displayName} />
// //                     </ListItemAvatar>
// //                     <ListItemText
// //                       primary={
// //                         <Typography variant="subtitle2" component="span">
// //                           {comment.author.user.displayName}
// //                         </Typography>
// //                       }
// //                       secondary={
// //                         <>
// //                           <Typography
// //                             sx={{ display: "block" }}
// //                             component="span"
// //                             variant="body2"
// //                             color="text.primary"
// //                             dangerouslySetInnerHTML={{ __html: comment.body.content }}
// //                           />
// //                           <Typography variant="caption" color="text.secondary">
// //                             {new Date(comment.createdDateTime).toLocaleString()}
// //                           </Typography>
// //                         </>
// //                       }
// //                     />
// //                   </ListItem>
// //                 ))
// //               ) : (
// //                 <Typography sx={{ textAlign: "center", my: 4 }}>
// //                   No comments found for this issue.
// //                 </Typography>
// //               )}
// //             </List>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default WorkTrackers;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Paper,
  Divider,
  Tooltip,
  Badge,
  Chip,
  Link, // 1. Imported the Link component
} from "@mui/material";
import { getAccessToken } from "auth/authProvider";
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@mui/icons-material";
import { useGlobalFilters } from "context/GlobalFilterContext";
import DataTable from "examples/Tables/DataTable";
import { useRoleBasedAccess } from "context/RoleBasedAccess";
import { useSearchParams } from "react-router-dom";

// Component for Partitioned Summary Cards (with filtering logic)
const BreakdownCard = ({ title, icon, data, filterType, onFilter, activeFilter }) => (
  <Card sx={{ boxShadow: 3, height: "100%" }}>
    <CardContent>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon} {title}
      </Typography>
      <Divider sx={{ my: 1 }} />
      {Object.keys(data).length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Object.entries(data).map(([key, value]) => {
            const isActive = activeFilter.type === filterType && activeFilter.value === key;
            return (
              <Grid item xs={6} sm={4} key={key}>
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

// Component for a single total count
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

const WorkTrackers = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { filteredData, loading } = useGlobalFilters();
  const { currentName, isExecutive } = useRoleBasedAccess();
  const [searchParams] = useSearchParams();
  const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

  useEffect(() => {
    const emailParam = searchParams.get("email");
    setViewingEmployeeEmail(emailParam && isExecutive ? emailParam : null);
  }, [searchParams, isExecutive]);

  useEffect(() => {
    if (!filteredData.WorkTracker) {
      setDisplayedTasks([]);
      return;
    }

    let userFilteredTasks = (filteredData.WorkTracker || []).filter((task) => {
      if (viewingEmployeeEmail) {
        return task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
      }
      if (currentName) {
        return task.AssignedTo?.toLowerCase() === currentName.toLowerCase();
      }
      return false;
    });

    if (activeFilter.type && activeFilter.value) {
      const filteredResult = userFilteredTasks.filter((task) => {
        const valueToCompare = activeFilter.type === "priority" ? task.Priority : task.Status;
        return (valueToCompare || "None") === activeFilter.value;
      });
      setDisplayedTasks(filteredResult);
    } else {
      setDisplayedTasks(userFilteredTasks);
    }
  }, [filteredData, currentName, viewingEmployeeEmail, activeFilter]);

  const handleFilterChange = (type, value) => {
    setActiveFilter((currentFilter) => {
      if (currentFilter.type === type && currentFilter.value === value) {
        return { type: null, value: null };
      }
      return { type, value };
    });
  };

  const baseTasks = (filteredData.WorkTracker || []).filter((task) => {
    if (viewingEmployeeEmail)
      return task.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
    if (currentName) return task.AssignedTo?.toLowerCase() === currentName.toLowerCase();
    return false;
  });

  const totalIssues = displayedTasks.length;

  const priorityCounts = baseTasks.reduce((acc, task) => {
    const priority = task.Priority || "None";
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = baseTasks.reduce((acc, task) => {
    const status = task.Status || "None";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const columns = [
    { Header: "Issue", accessor: "Issue", width: "30%" },
    { Header: "Project / Category", accessor: "ProjectOrCategory" },
    { Header: "Status", accessor: "Status" },
    { Header: "Priority", accessor: "Priority" },
    { Header: "Due Date", accessor: "DueDate" },
    { Header: "Created By", accessor: "CreatedBy" },
  ];

  // Function to get comments using Graph API
  async function getSharePointComments() {
    // 1. Apna Access Token yahan daalein (yeh aapko MSAL ya authentication library se milega)
    const accessToken = getAccessToken();
    console.log("FFF", accessToken);
    // 2. Aapka Graph API URL
    const graphApiUrl =
      "https://graph.microsoft.com/v1.0/sites/datainfasolpvtltd.sharepoint.com:/sites/DataINFA360:/lists/b371cb00-26a8-4696-84b0-0d8c802740a4/items/25/comments";

    try {
      const response = await fetch(graphApiUrl, {
        method: "GET",
        headers: {
          // Sabse important header
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        // Agar koi error aata hai to use handle karein
        const errorData = await response.json();
        console.error("Error fetching comments:", errorData);
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Successfully fetched comments:", data.value);
      return data.value; // Yeh comments ka array return karega
    } catch (error) {
      console.error("Network or other error:", error);
    }
  }

  // Function ko call karein
  getSharePointComments();

  const rows = displayedTasks.map((task) => {
    // 2. The tooltip content is updated here
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
              onClick={(e) => e.stopPropagation()} // Prevents other click events from firing
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: isFullscreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
        width: "100%",
        height: isFullscreen ? "100vh" : "auto",
        zIndex: isFullscreen ? 9999 : "auto",
        overflow: "auto",
        p: isFullscreen ? 2 : 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 2,
          background: "linear-gradient(to right, rgb(8, 13, 17), #3498db)",
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          💼 {viewingEmployeeEmail ? `Tasks for ${viewingEmployeeEmail}` : "My Assigned Tasks"}
        </Typography>
        <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "white" }}>
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Paper>
      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} md={2}>
          <TotalCountCard title="Total Count" icon="🛑" count={totalIssues} />
        </Grid>
        <Grid item xs={12} md={5}>
          <BreakdownCard
            title="Priority"
            icon="⚠️"
            data={priorityCounts}
            filterType="priority"
            onFilter={handleFilterChange}
            activeFilter={activeFilter}
          />
        </Grid>
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

      {displayedTasks.length > 0 ? (
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <DataTable
              canSearch={true}
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={true}
              noEndBorder
            />
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            backgroundColor: "#f5f5f5",
            borderRadius: "16px",
            gap: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary">
            No tasks match the current filter.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WorkTrackers;
