// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   IconButton,
//   CircularProgress,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   InputAdornment,
//   Paper,
//   Divider,
// } from "@mui/material";
// import {
//   Fullscreen as FullscreenIcon,
//   FullscreenExit as FullscreenExitIcon,
//   Search as SearchIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { useGlobalFilters } from "context/GlobalFilterContext";
// import DataTable from "examples/Tables/DataTable";

// const EmployeeTasks = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [createdByFilter, setCreatedByFilter] = useState("");
//   const { filteredData, loading } = useGlobalFilters();

//   // Get user profile and role
//   // const userProfile = {
//   //   displayName: "Test Executive",
//   //   jobTitle: "COO", // Hardcoded executive role
//   // };
//   const userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
//   const currentName = (userProfile.displayName || "").trim().toLowerCase();
//   const userRole = (userProfile.jobTitle || "").trim();

//   // Define role-based access
//   const executiveRoles = ["COO", "CPTO", "Director of Cloud Innovation", "AI & Program Management"];

//   const isExecutive = executiveRoles.some((role) =>
//     userRole.toLowerCase().includes(role.toLowerCase())
//   );

//   // Get all unique creators for filter dropdown
//   const allCreators = [
//     ...new Set(filteredData.tasks?.map((task) => task.createdBy).filter(Boolean)),
//   ];

//   // Filter tasks based on role and filters
//   const filteredTasks = (filteredData.tasks || []).filter((task) => {
//     // Role-based filtering
//     if (!isExecutive && task.createdBy?.toLowerCase() !== currentName) {
//       return false;
//     }

//     // Search term filtering
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       if (
//         !(
//           task.TaskName?.toLowerCase().includes(searchLower) ||
//           task.TaskDescription?.toLowerCase().includes(searchLower) ||
//           task.ProjectType?.toLowerCase().includes(searchLower) ||
//           task.TaskType?.toLowerCase().includes(searchLower) ||
//           task.createdBy?.toLowerCase().includes(searchLower)
//         )
//       ) {
//         return false;
//       }
//     }

//     // CreatedBy filter
//     if (createdByFilter && task.createdBy !== createdByFilter) {
//       return false;
//     }

//     return true;
//   });

//   const totalTasks = filteredTasks.length;

//   const columns = [
//     { Header: "Task Name", accessor: "TaskName" },
//     { Header: "Description", accessor: "TaskDescription" },
//     { Header: "Project Type", accessor: "ProjectType" },
//     { Header: "Type", accessor: "TaskType" },
//     { Header: "Duration", accessor: "Duration" },
//     { Header: "Created By", accessor: "createdBy" },
//     { Header: "Created At", accessor: "CreatedDateTime" },
//   ];

//   const rows = filteredTasks.map((task) => ({
//     TaskName: task.TaskName,
//     TaskDescription: task.TaskDescription,
//     ProjectType: task.ProjectType || "N/A",
//     TaskType: task.TaskType,
//     Duration: task.Duration,
//     createdBy: task.createdBy,
//     CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
//   }));

//   const handleResetFilters = () => {
//     setSearchTerm("");
//     setCreatedByFilter("");
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress color="primary" />
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
//         bgcolor: isFullscreen ? "#fff" : "transparent",
//         width: "100%",
//         height: isFullscreen ? "100vh" : "auto",
//         zIndex: isFullscreen ? 9999 : "auto",
//         overflow: "auto",
//         transition: "all 0.3s ease-in-out",
//         p: isFullscreen ? 2 : 3,
//       }}
//     >
//       <Divider sx={{ my: 3 }} />
//       <Paper
//         elevation={3}
//         sx={{
//           borderRadius: 2,
//           p: 2,
//           background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
//           💼 Employees Tasks
//           {/* {isExecutive && "(Admin View)"} */}
//         </Typography>
//         <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
//           {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//         </IconButton>
//       </Paper>

//       {/* Filter Controls */}
//       {isExecutive && (
//         <Box
//           sx={{
//             mt: 3,
//             display: "flex",
//             alignItems: "flex-end",
//             gap: 2,
//             "& .MuiFormControl-root": {
//               marginTop: 0,
//               marginBottom: 0,
//             },
//             "& .MuiInputBase-root": {
//               height: "56px",
//               display: "flex",
//               alignItems: "center",
//             },
//           }}
//         >
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search tasks..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{
//               flex: 2,
//               "& .MuiInputBase-input": {
//                 padding: "16.5px 14px",
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

//           {isExecutive && (
//             <FormControl sx={{ flex: 1, minWidth: 180 }}>
//               <InputLabel>Filter by Creator</InputLabel>
//               <Select
//                 value={createdByFilter}
//                 onChange={(e) => setCreatedByFilter(e.target.value)}
//                 label="Filter by Creator"
//                 sx={{
//                   "& .MuiSelect-select": {
//                     padding: "16.5px 14px",
//                   },
//                 }}
//               >
//                 <MenuItem value="">All Creators</MenuItem>
//                 {allCreators.map((creator) => (
//                   <MenuItem key={creator} value={creator}>
//                     {creator}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {(searchTerm || createdByFilter) && (
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleResetFilters}
//               startIcon={<ClearIcon />}
//               sx={{
//                 height: "56px",
//                 whiteSpace: "nowrap",
//                 mb: 0,
//                 px: 2,
//               }}
//             >
//               Reset
//             </Button>
//           )}
//         </Box>
//       )}

//       <Grid container spacing={3} mt={1}>
//         <Grid item xs={12} sm={4}>
//           <Card sx={{ textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
//                 {totalTasks}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Total Tasks
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {filteredTasks.length > 0 ? (
//         <Card sx={{ mt: 4, boxShadow: 3 }}>
//           <CardContent>
//             <DataTable
//               canSearch={false} // We're using our own search now
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
//             {searchTerm || createdByFilter
//               ? "No tasks found matching your criteria"
//               : "No tasks found"}
//           </Typography>
//           {(searchTerm || createdByFilter) && (
//             <Button
//               variant="contained"
//               color="warning"
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

// export default EmployeeTasks;

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
  Divider,
} from "@mui/material";
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useGlobalFilters } from "context/GlobalFilterContext";
import DataTable from "examples/Tables/DataTable";

const EmployeeTasks = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [createdByFilter, setCreatedByFilter] = useState("");
  const { filteredData, loading } = useGlobalFilters();
  // const userProfile = {
  //   displayName: "Test Executive",
  //   jobTitle: "COO", // Hardcoded executive role
  // };
  // Get user profile and role
  const userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
  console.log(userProfile);
  const userRole = (userProfile.jobTitle || "").trim();

  // Define executive roles
  const executiveRoles = ["COO", "CPTO", "Director of Cloud Innovation", "AI & Program Management"];

  const isExecutive = executiveRoles.some((role) =>
    userRole.toLowerCase().includes(role.toLowerCase())
  );

  // Get all unique creators for filter dropdown
  const allCreators = [
    ...new Set(filteredData.tasks?.map((task) => task.createdBy).filter(Boolean)),
  ];

  // Filter tasks: only for executives, no currentName matching
  const filteredTasks = (filteredData.tasks || []).filter((task) => {
    if (!isExecutive) {
      // Non-executive users see no tasks
      return false;
    }

    // Search term filtering
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (
        !(
          task.TaskName?.toLowerCase().includes(searchLower) ||
          task.TaskDescription?.toLowerCase().includes(searchLower) ||
          task.ProjectType?.toLowerCase().includes(searchLower) ||
          task.TaskType?.toLowerCase().includes(searchLower) ||
          task.createdBy?.toLowerCase().includes(searchLower)
        )
      ) {
        return false;
      }
    }

    // CreatedBy filter
    if (createdByFilter && task.createdBy !== createdByFilter) {
      return false;
    }

    return true;
  });

  const totalTasks = filteredTasks.length;

  const columns = [
    { Header: "Task Name", accessor: "TaskName" },
    { Header: "Description", accessor: "TaskDescription" },
    { Header: "Project Type", accessor: "ProjectType" },
    { Header: "Type", accessor: "TaskType" },
    { Header: "Duration", accessor: "Duration" },
    { Header: "Created By", accessor: "createdBy" },
    { Header: "Created At", accessor: "CreatedDateTime" },
  ];

  const rows = filteredTasks.map((task) => ({
    TaskName: task.TaskName,
    TaskDescription: task.TaskDescription,
    ProjectType: task.ProjectType || "N/A",
    TaskType: task.TaskType,
    Duration: task.Duration,
    createdBy: task.createdBy,
    CreatedDateTime: new Date(task.CreatedDateTime).toLocaleString(),
  }));

  const handleResetFilters = () => {
    setSearchTerm("");
    setCreatedByFilter("");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
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
        bgcolor: isFullscreen ? "#fff" : "transparent",
        width: "100%",
        height: isFullscreen ? "100vh" : "auto",
        zIndex: isFullscreen ? 9999 : "auto",
        overflow: "auto",
        transition: "all 0.3s ease-in-out",
        p: isFullscreen ? 2 : 3,
      }}
    >
      <Divider sx={{ my: 3 }} />
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 2,
          background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          💼 Employees Tasks
        </Typography>
        <IconButton onClick={() => setIsFullscreen(!isFullscreen)} sx={{ color: "#333" }}>
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Paper>

      {/* Filter Controls for executives only */}
      {isExecutive && (
        <Card sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Box
            sx={{
              // mt: 3,
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
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <InputLabel>Filter by Creator</InputLabel>
              <Select
                value={createdByFilter}
                onChange={(e) => setCreatedByFilter(e.target.value)}
                label="Filter by Creator"
                sx={{
                  "& .MuiSelect-select": {
                    padding: "16.5px 14px",
                  },
                }}
              >
                <MenuItem value="">All Creators</MenuItem>
                {allCreators.map((creator) => (
                  <MenuItem key={creator} value={creator}>
                    {creator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {(searchTerm || createdByFilter) && (
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
        </Card>
      )}

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: "#1e90ff", fontWeight: "bold" }}>
                {totalTasks}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Total Tasks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {filteredTasks.length > 0 ? (
        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <CardContent>
            <DataTable
              canSearch={false} // Using custom search
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
          <Typography variant="h6" color="textSecondary" textAlign="center">
            {isExecutive
              ? searchTerm || createdByFilter
                ? "No tasks found matching your criteria"
                : "No tasks found"
              : "You are not an executive person"}
          </Typography>
          {(searchTerm || createdByFilter) && isExecutive && (
            <Button
              variant="contained"
              color="warning"
              onClick={handleResetFilters}
              startIcon={<ClearIcon />}
            >
              Go Back
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EmployeeTasks;
