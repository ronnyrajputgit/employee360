// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Chip,
//   Box,
//   Paper,
//   IconButton,
//   Tooltip,
//   TextField,
//   Pagination,
//   InputAdornment,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import {
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
//   Search as SearchIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const getStatusStyle = (skillStatus) => {
//   const statusMap = {
//     "Shadow Project": {
//       label: "Shadow Project",
//       color: "warning", // Yellow
//     },
//     "Training Needed": {
//       label: "Training Needed",
//       color: "error", // Red
//     },
//     "Interview Ready": {
//       label: "Interview Ready",
//       color: "success", // Green
//     },
//   };

//   return {
//     label: statusMap[skillStatus]?.label || skillStatus,
//     color: statusMap[skillStatus]?.color || "default",
//     variant: "outlined",
//     size: "small",
//     sx: { fontWeight: "bold", mt: 1 },
//   };
// };

// const EmployeeSkills = () => {
//   const { filteredData } = useGlobalFilters();
//   const skillsInventoryData = filteredData.skillsInventry || [];
//   const [fullscreen, setFullscreen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 9;

//   // Get user profile details for testing purposes
//   // const userProfile = {
//   //   displayName: "Test Executive",
//   //   jobTitle: "COO", // Hardcoded executive role
//   // };
//   // original
//   const userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
//   const currentName = (userProfile.displayName || "").trim().toLowerCase();
//   const userRole = (userProfile.jobTitle || "").trim();

//   // Define role-based access
//   const executiveRoles = ["COO", "CPTO", "Director of Cloud Innovation", "AI & Program Management"];

//   // Check user access level
//   const isExecutive = executiveRoles.some((role) =>
//     userRole.toLowerCase().includes(role.toLowerCase())
//   );

//   // Filter skills based on user role, search term, and status filter
//   const filteredCertifications = skillsInventoryData
//     .filter((skill) => {
//       if (!isExecutive) {
//         return skill.Resource.toLowerCase() === currentName;
//       }
//       return true;
//     })
//     .filter((skill) => {
//       if (!searchTerm && !statusFilter) return true;

//       const matchesSearch = searchTerm
//         ? skill.Resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           skill.Skill.toLowerCase().includes(searchTerm.toLowerCase())
//         : true;

//       const matchesStatus = statusFilter ? skill.SkillStatus === statusFilter : true;

//       return matchesSearch && matchesStatus;
//     })
//     .map((skill) => ({
//       title: skill.Skill,
//       rating: `Rating - ${skill.SkillsPoints} / 10`,
//       issued: new Date(skill.CreatedAt).toLocaleDateString(),
//       status: skill.SkillStatus,
//       resource: skill.Resource,
//       details: {
//         monthsExperience: skill.TotalDurationinMonths,
//         trainingCompleted: skill.TrainingCompleted ? "Yes" : "No",
//         realProjectExperience: skill.RealProjectExperience ? "Yes" : "No",
//         mockProjects: skill.MockProjectsShadowing ? "Yes" : "No",
//         certified: skill.Certified ? "Yes" : "No",
//         skillStatus: skill.SkillStatus,
//       },
//     }));

//   // Pagination logic
//   const pageCount = Math.ceil(filteredCertifications.length / itemsPerPage);
//   const paginatedCertifications = filteredCertifications.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const handleResetFilters = () => {
//     setSearchTerm("");
//     setStatusFilter("");
//     setPage(1);
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(1);
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//     setPage(1);
//   };

//   const renderTooltipContent = (details) => (
//     <Box sx={{ p: 1 }}>
//       <Typography variant="subtitle2" gutterBottom>
//         Skill Details
//       </Typography>
//       {isExecutive && <div>Resource: {details.resource}</div>}
//       <div>Months Experience: {details.monthsExperience}</div>
//       <div>Training Completed: {details.trainingCompleted}</div>
//       <div>Real Project Experience: {details.realProjectExperience}</div>
//       <div>Mock Projects: {details.mockProjects}</div>
//       <div>Certified: {details.certified}</div>
//     </Box>
//   );

//   const certificationContent = (
//     <>
//       {isExecutive && (
//         <Box
//           sx={{
//             mb: 3,
//             display: "flex",
//             alignItems: "flex-end", // Aligns items at the bottom
//             gap: 2,
//             "& .MuiFormControl-root": {
//               // Targets both TextField and Select
//               marginTop: 0, // Remove any top margin
//               marginBottom: 0, // Remove any bottom margin
//             },
//             "& .MuiInputBase-root": {
//               // Targets both input elements
//               height: "56px", // Match heights
//               display: "flex",
//               alignItems: "center", // Center content vertically
//             },
//             "& .MuiOutlinedInput-root": {
//               // Specific to outlined inputs
//               borderRadius: "4px", // Match border radius
//             },
//           }}
//         >
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search by owner or skill..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             sx={{
//               flex: 2,
//               "& .MuiInputBase-input": {
//                 // Input text styling
//                 padding: "16.5px 14px", // Match Select padding
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start" sx={{ mr: 1 }}>
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//               endAdornment: searchTerm && (
//                 <InputAdornment position="end">
//                   <IconButton size="small" onClick={() => setSearchTerm("")}>
//                     <ClearIcon fontSize="small" />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <FormControl sx={{ flex: 1, minWidth: 180 }}>
//             <InputLabel
//               sx={{
//                 transform: "translate(14px, 16px) scale(1)", // Match TextField label position
//                 "&.Mui-focused": {
//                   transform: "translate(14px, -9px) scale(0.75)", // Match focused state
//                 },
//                 "&.MuiFormLabel-filled": {
//                   transform: "translate(14px, -9px) scale(0.75)", // Match filled state
//                 },
//               }}
//             >
//               Filter by Status
//             </InputLabel>
//             <Select
//               value={statusFilter}
//               onChange={handleStatusFilterChange}
//               label="Filter by Status"
//               sx={{
//                 "& .MuiSelect-select": {
//                   // Match TextField input padding
//                   padding: "16.5px 14px",
//                 },
//               }}
//             >
//               <MenuItem value="">All Statuses</MenuItem>
//               <MenuItem value="Interview Ready">Interview Ready</MenuItem>
//               <MenuItem value="Shadow Project">Shadow Project</MenuItem>
//               <MenuItem value="Training Needed">Training Needed</MenuItem>
//             </Select>
//           </FormControl>

//           {(searchTerm || statusFilter) && (
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleResetFilters}
//               startIcon={<ClearIcon />}
//               sx={{
//                 height: "56px",
//                 whiteSpace: "nowrap",
//                 mb: 0, // Remove any bottom margin
//                 px: 2, // Add horizontal padding
//               }}
//             >
//               Reset
//             </Button>
//           )}
//         </Box>
//       )}

//       <Grid container spacing={3}>
//         {paginatedCertifications.map((cert, index) => {
//           const statusProps = getStatusStyle(cert.status);
//           return (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 elevation={4}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   borderRadius: 3,
//                 }}
//               >
//                 <CardContent sx={{ display: "flex", flexDirection: "column" }}>
//                   <Typography variant="h6" fontWeight="bold" sx={{ color: "#2c3e50", mb: 1 }}>
//                     {cert.title}
//                   </Typography>
//                   <Chip {...statusProps} />
//                   <Typography variant="body2" color="text.secondary" mt={2}>
//                     {cert.rating}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
//                     Last Evaluated: {cert.issued}
//                   </Typography>
//                   {isExecutive && (
//                     <Typography variant="body2" color="text.secondary">
//                       Owner: {cert.resource}
//                     </Typography>
//                   )}
//                   <Tooltip title={renderTooltipContent(cert.details)} arrow>
//                     <Button variant="text" fullWidth sx={{ color: "secondary" }}>
//                       View Details
//                     </Button>
//                   </Tooltip>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {pageCount > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//           <Pagination
//             count={pageCount}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//             showFirstButton
//             showLastButton
//           />
//         </Box>
//       )}
//     </>
//   );

//   return (
//     <Box
//       sx={{
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: fullscreen ? "100vh" : "auto",
//         bgcolor: fullscreen ? "#fff" : "transparent",
//         zIndex: fullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: fullscreen ? 2 : 3,
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           borderRadius: 2,
//           p: 2,
//           background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
//           mb: 3,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
//           👨🏽‍💻 Employees Skills
//           {/* {isExecutive && "(Admin View)"} */}
//         </Typography>
//         <IconButton
//           onClick={() => setFullscreen(!fullscreen)}
//           color="inherit"
//           sx={{ color: "white" }}
//         >
//           {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Paper>

//       {filteredCertifications.length > 0 ? (
//         certificationContent
//       ) : (
//         <Box
//           sx={{
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
//             {isExecutive
//               ? searchTerm || statusFilter
//                 ? `No skills found matching your criteria`
//                 : "No skills found in the system"
//               : `No skills found for ${currentName || "the current resource"}`}
//           </Typography>
//           {(searchTerm || statusFilter) && (
//             <Button
//               variant="contained"
//               color="info"
//               onClick={handleResetFilters}
//               startIcon={<ClearIcon />}
//             >
//               Go Back
//             </Button>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default EmployeeSkills;

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Chip,
//   Box,
//   Paper,
//   IconButton,
//   Tooltip,
//   TextField,
//   Pagination,
//   InputAdornment,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import {
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
//   Search as SearchIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";

// const getStatusStyle = (skillStatus) => {
//   const statusMap = {
//     "Shadow Project": {
//       label: "Shadow Project",
//       color: "warning", // Yellow
//     },
//     "Training Needed": {
//       label: "Training Needed",
//       color: "error", // Red
//     },
//     "Interview Ready": {
//       label: "Interview Ready",
//       color: "success", // Green
//     },
//   };

//   return {
//     label: statusMap[skillStatus]?.label || skillStatus,
//     color: statusMap[skillStatus]?.color || "default",
//     variant: "outlined",
//     size: "small",
//     sx: { fontWeight: "bold", mt: 1 },
//   };
// };

// const EmployeeSkills = () => {
//   const { filteredData } = useGlobalFilters();
//   const skillsInventoryData = filteredData.skillsInventry || [];
//   const [fullscreen, setFullscreen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 9;

//   console.log(statusFilter);
//   const userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
//   // const userRole = (userProfile.jobTitle || "").trim();
//   const userRole = "coo";

//   // Define role-based access
//   const executiveRoles = ["COO", "CPTO", "Director of Cloud Innovation", "AI & Program Management"];

//   // Check user access level
//   const isExecutive = executiveRoles.some((role) =>
//     userRole.toLowerCase().includes(role.toLowerCase())
//   );

//   // Filter skills based on search term and status filter (only for executives)
//   const filteredCertifications = isExecutive
//     ? skillsInventoryData
//         .filter((skill) => {
//           if (!searchTerm && !statusFilter) return true;

//           const matchesSearch = searchTerm
//             ? skill.Resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               skill.Skill.toLowerCase().includes(searchTerm.toLowerCase())
//             : true;

//           const matchesStatus = statusFilter ? skill.SkillStatus === statusFilter : true;

//           return matchesSearch && matchesStatus;
//         })
//         .map((skill) => ({
//           title: skill.Skill,
//           rating: `Rating - ${skill.SkillsPoints} / 10`,
//           issued: new Date(skill.CreatedAt).toLocaleDateString(),
//           status: skill.SkillStatus,
//           resource: skill.Resource,
//           details: {
//             monthsExperience: skill.TotalDurationinMonths,
//             trainingCompleted: skill.TrainingCompleted ? "Yes" : "No",
//             realProjectExperience: skill.RealProjectExperience ? "Yes" : "No",
//             mockProjects: skill.MockProjectsShadowing ? "Yes" : "No",
//             certified: skill.Certified ? "Yes" : "No",
//             skillStatus: skill.SkillStatus,
//           },
//         }))
//     : [];

//   // Pagination logic
//   const pageCount = Math.ceil(filteredCertifications.length / itemsPerPage);
//   const paginatedCertifications = filteredCertifications.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const handleResetFilters = () => {
//     setSearchTerm("");
//     setStatusFilter("");
//     setPage(1);
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(1);
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//     setPage(1);
//   };

//   const renderTooltipContent = (details) => (
//     <Box sx={{ p: 1 }}>
//       <Typography variant="subtitle2" gutterBottom>
//         Skill Details
//       </Typography>
//       <div>Resource: {details.resource}</div>
//       <div>Months Experience: {details.monthsExperience}</div>
//       <div>Training Completed: {details.trainingCompleted}</div>
//       <div>Real Project Experience: {details.realProjectExperience}</div>
//       <div>Mock Projects: {details.mockProjects}</div>
//       <div>Certified: {details.certified}</div>
//     </Box>
//   );

//   const certificationContent = (
//     <>
//       <Box
//         sx={{
//           mb: 3,
//           display: "flex",
//           alignItems: "flex-end",
//           gap: 2,
//           "& .MuiFormControl-root": {
//             marginTop: 0,
//             marginBottom: 0,
//           },
//           "& .MuiInputBase-root": {
//             height: "56px",
//             display: "flex",
//             alignItems: "center",
//           },
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "4px",
//           },
//         }}
//       >
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search by owner or skill..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{
//             flex: 2,
//             "& .MuiInputBase-input": {
//               padding: "16.5px 14px",
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start" sx={{ mr: 1 }}>
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//             endAdornment: searchTerm && (
//               <InputAdornment position="end">
//                 <IconButton size="small" onClick={() => setSearchTerm("")}>
//                   <ClearIcon fontSize="small" />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <FormControl sx={{ flex: 1, minWidth: 180 }}>
//           <InputLabel
//             sx={{
//               transform: "translate(14px, 16px) scale(1)",
//               "&.Mui-focused": {
//                 transform: "translate(14px, -9px) scale(0.75)",
//               },
//               "&.MuiFormLabel-filled": {
//                 transform: "translate(14px, -9px) scale(0.75)",
//               },
//             }}
//           >
//             Filter by Status
//           </InputLabel>
//           <Select
//             value={statusFilter}
//             onChange={handleStatusFilterChange}
//             label="Filter by Status"
//             sx={{
//               "& .MuiSelect-select": {
//                 padding: "16.5px 14px",
//               },
//             }}
//           >
//             <MenuItem value="">All Statuses</MenuItem>
//             <MenuItem value="Interview Ready">Interview Ready</MenuItem>
//             <MenuItem value="Shadow Project">Shadow Project</MenuItem>
//             <MenuItem value="Training Needed">Training Needed</MenuItem>
//           </Select>
//         </FormControl>

//         {(searchTerm || statusFilter) && (
//           <Button
//             variant="contained"
//             color="success"
//             onClick={handleResetFilters}
//             startIcon={<ClearIcon />}
//             sx={{
//               height: "56px",
//               whiteSpace: "nowrap",
//               mb: 0,
//               px: 2,
//             }}
//           >
//             Reset
//           </Button>
//         )}
//       </Box>

//       <Grid container spacing={3}>
//         {paginatedCertifications.map((cert, index) => {
//           const statusProps = getStatusStyle(cert.status);
//           return (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 elevation={4}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   borderRadius: 3,
//                 }}
//               >
//                 <CardContent sx={{ display: "flex", flexDirection: "column" }}>
//                   <Typography variant="h6" fontWeight="bold" sx={{ color: "#2c3e50", mb: 1 }}>
//                     {cert.title}
//                   </Typography>
//                   <Chip {...statusProps} />
//                   <Typography variant="body2" color="text.secondary" mt={2}>
//                     {cert.rating}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
//                     Last Evaluated: {cert.issued}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Owner: {cert.resource}
//                   </Typography>
//                   <Tooltip title={renderTooltipContent(cert.details)} arrow>
//                     <Button variant="text" fullWidth sx={{ color: "secondary" }}>
//                       View Details
//                     </Button>
//                   </Tooltip>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {pageCount > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//           <Pagination
//             count={pageCount}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//             showFirstButton
//             showLastButton
//           />
//         </Box>
//       )}
//     </>
//   );

//   return (
//     <Box
//       sx={{
//         position: fullscreen ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: fullscreen ? "100vh" : "auto",
//         bgcolor: fullscreen ? "#fff" : "transparent",
//         zIndex: fullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: fullscreen ? 2 : 3,
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           borderRadius: 2,
//           p: 2,
//           background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
//           mb: 3,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
//           👨🏽‍💻 Employees Skills
//         </Typography>
//         <IconButton
//           onClick={() => setFullscreen(!fullscreen)}
//           color="inherit"
//           sx={{ color: "white" }}
//         >
//           {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Paper>

//       {!isExecutive ? (
//         <Box
//           sx={{
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
//             You dont have executive privileges to view this page
//           </Typography>
//         </Box>
//       ) : filteredCertifications.length > 0 ? (
//         certificationContent
//       ) : (
//         <Box
//           sx={{
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
//             {searchTerm || statusFilter
//               ? "No skills found matching your criteria"
//               : "No skills found in the system"}
//           </Typography>
//           {(searchTerm || statusFilter) && (
//             <Button
//               variant="contained"
//               color="info"
//               onClick={handleResetFilters}
//               startIcon={<ClearIcon />}
//             >
//               Reset Filters
//             </Button>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default EmployeeSkills;

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  Pagination,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useGlobalFilters } from "context/GlobalFilterContext";
import { useRoleBasedAccess } from "context/RoleBasedAccess";

const getStatusStyle = (skillStatus) => {
  const statusMap = {
    "Shadow Project": {
      label: "Shadow Project",
      color: "warning", // Yellow
    },
    "Training Needed": {
      label: "Training Needed",
      color: "error", // Red
    },
    "Interview Ready": {
      label: "Interview Ready",
      color: "success", // Green
    },
  };

  return {
    label: statusMap[skillStatus]?.label || skillStatus,
    color: statusMap[skillStatus]?.color || "default",
    variant: "outlined",
    size: "small",
    sx: { fontWeight: "bold", mt: 1 },
  };
};

const EmployeeSkills = () => {
  const { filteredData } = useGlobalFilters();
  const skillsInventoryData = filteredData.skillsInventry || [];
  const [fullscreen, setFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const { isExecutive } = useRoleBasedAccess();

  // Get all unique status values from the data
  const allStatuses = useMemo(() => {
    const statusSet = new Set();
    skillsInventoryData.forEach((skill) => {
      if (skill.SkillStatus) {
        statusSet.add(skill.SkillStatus);
      }
    });
    return Array.from(statusSet).sort();
  }, [skillsInventoryData]);

  // Filter skills based on search term and status filter (only for executives)
  const filteredCertifications = isExecutive
    ? skillsInventoryData
        .filter((skill) => {
          if (!searchTerm && !statusFilter) return true;

          const matchesSearch = searchTerm
            ? skill.Resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
              skill.Skill.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

          const matchesStatus = statusFilter ? skill.SkillStatus === statusFilter : true;

          return matchesSearch && matchesStatus;
        })
        .map((skill) => ({
          title: skill.Skill,
          rating: `Rating - ${skill.SkillsPoints} / 10`,
          issued: new Date(skill.CreatedAt).toLocaleDateString(),
          status: skill.SkillStatus,
          resource: skill.Resource,
          details: {
            monthsExperience: skill.TotalDurationinMonths,
            trainingCompleted: skill.TrainingCompleted ? "Yes" : "No",
            realProjectExperience: skill.RealProjectExperience ? "Yes" : "No",
            mockProjects: skill.MockProjectsShadowing ? "Yes" : "No",
            certified: skill.Certified ? "Yes" : "No",
            skillStatus: skill.SkillStatus,
          },
        }))
    : [];

  // Pagination logic
  const pageCount = Math.ceil(filteredCertifications.length / itemsPerPage);
  const paginatedCertifications = filteredCertifications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const renderTooltipContent = (details) => (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle2" gutterBottom>
        Skill Details
      </Typography>
      <div>Resource: {details.resource}</div>
      <div>Months Experience: {details.monthsExperience}</div>
      <div>Training Completed: {details.trainingCompleted}</div>
      <div>Real Project Experience: {details.realProjectExperience}</div>
      <div>Mock Projects: {details.mockProjects}</div>
      <div>Certified: {details.certified}</div>
    </Box>
  );

  const certificationContent = (
    <>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "flex-end",
          gap: 2,
          "& .MuiFormControl-root": {
            marginTop: 0,
            marginBottom: 0,
          },
          "& .MuiInputBase-root": {
            height: "56px",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
          },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by owner or skill..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            flex: 2,
            "& .MuiInputBase-input": {
              padding: "16.5px 14px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm("")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ flex: 1, minWidth: 180 }}>
          <InputLabel
            sx={{
              transform: "translate(14px, 16px) scale(1)",
              "&.Mui-focused": {
                transform: "translate(14px, -9px) scale(0.75)",
              },
              "&.MuiFormLabel-filled": {
                transform: "translate(14px, -9px) scale(0.75)",
              },
            }}
          >
            Filter by Status
          </InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Filter by Status"
            sx={{
              "& .MuiSelect-select": {
                padding: "16.5px 14px",
              },
            }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {allStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(searchTerm || statusFilter) && (
          <Button
            variant="contained"
            color="success"
            onClick={handleResetFilters}
            startIcon={<ClearIcon />}
            sx={{
              height: "56px",
              whiteSpace: "nowrap",
              mb: 0,
              px: 2,
            }}
          >
            Reset
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {paginatedCertifications.map((cert, index) => {
          const statusProps = getStatusStyle(cert.status);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={4}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#2c3e50", mb: 1 }}>
                    {cert.title}
                  </Typography>
                  <Chip {...statusProps} />
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {cert.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    Last Evaluated: {cert.issued}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Owner: {cert.resource}
                  </Typography>
                  <Tooltip title={renderTooltipContent(cert.details)} arrow>
                    <Button variant="text" fullWidth sx={{ color: "secondary" }}>
                      View Details
                    </Button>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </>
  );

  return (
    <Box
      sx={{
        position: fullscreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: fullscreen ? "100vh" : "auto",
        bgcolor: fullscreen ? "#fff" : "transparent",
        zIndex: fullscreen ? 9999 : "auto",
        overflow: "auto",
        transition: "all 0.3s ease-in-out",
        p: fullscreen ? 2 : 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 2,
          background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          👨🏽‍💻 Employees Skills
        </Typography>
        <IconButton
          onClick={() => setFullscreen(!fullscreen)}
          color="inherit"
          sx={{ color: "white" }}
        >
          {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Paper>

      {!isExecutive ? (
        <Box
          sx={{
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
            You dont have executive privileges to view this page
          </Typography>
        </Box>
      ) : filteredCertifications.length > 0 ? (
        certificationContent
      ) : (
        <Box
          sx={{
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
            {searchTerm || statusFilter
              ? "No skills found matching your criteria"
              : "No skills found in the system"}
          </Typography>
          {(searchTerm || statusFilter) && (
            <Button
              variant="contained"
              color="info"
              onClick={handleResetFilters}
              startIcon={<ClearIcon />}
            >
              Reset Filters
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EmployeeSkills;
