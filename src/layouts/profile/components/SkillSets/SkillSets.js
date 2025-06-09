// import React, { useState, useMemo, useEffect } from "react";
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
// import { useRoleBasedAccess } from "context/RoleBasedAccess";

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
//     // Default style for any unexpected status
//     default: {
//       label: skillStatus,
//       color: "default",
//     },
//   };

//   return {
//     ...(statusMap[skillStatus] || statusMap.default),
//     variant: "outlined",
//     size: "small",
//     sx: { fontWeight: "bold", mt: 1 },
//   };
// };

// const SkillSets = () => {
//   const { filteredData } = useGlobalFilters();
//   const skillsInventoryData = filteredData.skillsInventry || [];
//   const [fullscreen, setFullscreen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 9;
//   const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);
//   const { currentName, isExecutive } = useRoleBasedAccess();

//   useEffect(() => {
//     // Check if there's an email query parameter (from executive viewing a profile)
//     const emailParam = searchParams.get("email");
//     if (emailParam && isExecutive) {
//       setViewingEmployeeEmail(emailParam);
//     } else {
//       setViewingEmployeeEmail(null);
//     }
//   }, [searchParams, isExecutive]);

//   // Get all unique statuses from the data
//   const availableStatuses = useMemo(() => {
//     const statuses = new Set();
//     skillsInventoryData.forEach((skill) => {
//       if (skill.SkillStatus) {
//         statuses.add(skill.SkillStatus);
//       }
//     });
//     return Array.from(statuses).sort();
//   }, [skillsInventoryData]);

//   // Filter skills to only show those matching current user's name
//   const filteredCertifications = useMemo(() => {
//     return skillsInventoryData
//       .filter((skill) => skill.Resource?.toLowerCase() === currentName)
//       .filter((skill) => {
//         if (!searchTerm && !statusFilter) return true;

//         const matchesSearch = searchTerm
//           ? skill.Skill?.toLowerCase().includes(searchTerm.toLowerCase())
//           : true;

//         const matchesStatus = statusFilter ? skill.SkillStatus === statusFilter : true;

//         return matchesSearch && matchesStatus;
//       })
//       .map((skill) => ({
//         title: skill.Skill,
//         rating: `Rating - ${skill.SkillsPoints} / 10`,
//         issued: new Date(skill.CreatedAt).toLocaleDateString(),
//         status: skill.SkillStatus,
//         resource: skill.Resource,
//         details: {
//           monthsExperience: skill.TotalDurationinMonths,
//           trainingCompleted: skill.TrainingCompleted ? "Yes" : "No",
//           realProjectExperience: skill.RealProjectExperience ? "Yes" : "No",
//           mockProjects: skill.MockProjectsShadowing ? "Yes" : "No",
//           certified: skill.Certified ? "Yes" : "No",
//           skillStatus: skill.SkillStatus,
//         },
//       }));
//   }, [skillsInventoryData, currentName, searchTerm, statusFilter]);

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
//       <div>Months Experience: {details.monthsExperience}</div>
//       <div>Training Completed: {details.trainingCompleted}</div>
//       <div>Real Project Experience: {details.realProjectExperience}</div>
//       <div>Mock Projects: {details.mockProjects}</div>
//       <div>Certified: {details.certified}</div>
//       {details.skillStatus && <div>Status: {details.skillStatus}</div>}
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
//         }}
//       >
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search skills..."
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
//             {availableStatuses.map((status) => (
//               <MenuItem key={status} value={status}>
//                 {status}
//               </MenuItem>
//             ))}
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
//                   {cert.status && <Chip {...statusProps} />}
//                   <Typography variant="body2" color="text.secondary" mt={2}>
//                     {cert.rating}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
//                     Last Evaluated: {cert.issued}
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
//           👨🏽‍💻 Skills Inventory
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
//             {searchTerm || statusFilter
//               ? `No skills found matching your criteria`
//               : `No skills found for ${currentName || "you"}`}
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

// export default SkillSets;

import React, { useState, useMemo, useEffect } from "react";
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
import { useSearchParams } from "react-router-dom";

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
    // Default style for any unexpected status
    default: {
      label: skillStatus,
      color: "default",
    },
  };

  return {
    ...(statusMap[skillStatus] || statusMap.default),
    variant: "outlined",
    size: "small",
    sx: { fontWeight: "bold", mt: 1 },
  };
};

const SkillSets = () => {
  const { filteredData } = useGlobalFilters();
  const skillsInventoryData = filteredData.skillsInventry || [];
  const [fullscreen, setFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const [viewingEmployeeEmail, setViewingEmployeeEmail] = useState(null);
  const { currentName, isExecutive } = useRoleBasedAccess();
  const [searchParams] = useSearchParams();
  console.log(skillsInventoryData);
  useEffect(() => {
    // Check if there's an email query parameter (from executive viewing a profile)
    const emailParam = searchParams.get("email");
    if (emailParam && isExecutive) {
      setViewingEmployeeEmail(emailParam);
    } else {
      setViewingEmployeeEmail(null);
    }
  }, [searchParams, isExecutive]);

  // Get all unique statuses from the data
  const availableStatuses = useMemo(() => {
    const statuses = new Set();
    skillsInventoryData.forEach((skill) => {
      if (skill.SkillStatus) {
        statuses.add(skill.SkillStatus);
      }
    });
    return Array.from(statuses).sort();
  }, [skillsInventoryData]);

  // Filter skills to only show those matching current user's name or executive view of another employee's email
  const filteredCertifications = useMemo(() => {
    return skillsInventoryData
      .filter((skill) => {
        if (viewingEmployeeEmail) {
          // If an executive is viewing a profile, filter by employee's email
          return skill.Email?.toLowerCase() === viewingEmployeeEmail.toLowerCase();
        } else {
          // Default behavior for the current user (non-executive)
          return skill.Resource?.toLowerCase() === currentName.toLowerCase();
        }
      })
      .filter((skill) => {
        if (!searchTerm && !statusFilter) return true;

        const matchesSearch = searchTerm
          ? skill.Skill?.toLowerCase().includes(searchTerm.toLowerCase())
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
      }));
  }, [skillsInventoryData, currentName, searchTerm, statusFilter, viewingEmployeeEmail]);

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
      <div>Months Experience: {details.monthsExperience}</div>
      <div>Training Completed: {details.trainingCompleted}</div>
      <div>Real Project Experience: {details.realProjectExperience}</div>
      <div>Mock Projects: {details.mockProjects}</div>
      <div>Certified: {details.certified}</div>
      {details.skillStatus && <div>Status: {details.skillStatus}</div>}
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
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search skills..."
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
            {availableStatuses.map((status) => (
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
                  {cert.status && <Chip {...statusProps} />}
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {cert.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    Last Evaluated: {cert.issued}
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
          👨🏽‍💻 Skills Inventory
        </Typography>
        <IconButton
          onClick={() => setFullscreen(!fullscreen)}
          color="inherit"
          sx={{ color: "white" }}
        >
          {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Paper>

      {filteredCertifications.length > 0 ? (
        certificationContent
      ) : (
        <Typography>No skills found</Typography>
      )}
    </Box>
  );
};

export default SkillSets;
