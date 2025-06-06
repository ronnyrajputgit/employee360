// import {
//   Avatar,
//   Card,
//   Grid,
//   Icon,
//   IconButton,
//   Box,
//   useMediaQuery,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import { getUserProfile } from "auth/getUserProfile";
// import { getAllEmployees } from "auth/getAllEmployee";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import React, { useEffect, useState } from "react";
// import ChevronLeft from "@mui/icons-material/ChevronLeft";
// import ChevronRight from "@mui/icons-material/ChevronRight";
// import SearchIcon from "@mui/icons-material/Search";
// import ClearIcon from "@mui/icons-material/Clear";
// import { useRoleBasedAccess } from "context/RoleBasedAccess";

// const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

// const EmployeeProfiles = () => {
//   const [user, setUser] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const { isExecutive } = useRoleBasedAccess();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const profile = await getUserProfile();
//       setUser(profile);

//       // Only fetch employees if user is executive
//       if (isExecutive) {
//         const allEmployees = await getAllEmployees();
//         setEmployees(allEmployees);
//         setFilteredEmployees(allEmployees);
//         const userIndex = allEmployees.findIndex((emp) => emp.id === profile.id);
//         setCurrentIndex(userIndex >= 0 ? userIndex : 0);
//       }
//     };
//     fetchProfile();
//   }, [isExecutive]);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredEmployees(employees);
//       setCurrentIndex(0);
//       return;
//     }

//     const filtered = employees.filter(
//       (emp) =>
//         (emp.name && emp.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (emp.id && emp.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     setFilteredEmployees(filtered);
//     setCurrentIndex(0);
//   }, [searchTerm, employees]);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredEmployees.length - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev < filteredEmployees.length - 1 ? prev + 1 : 0));
//   };

//   if (!user) return <center>Loading profile...</center>;

//   // Check if user is not executive
//   if (!isExecutive) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Card sx={{ p: 3, textAlign: "center" }}>
//           <MDTypography variant="h6" color="error">
//             You are not authorized to view employee profiles.
//           </MDTypography>
//           <MDTypography variant="body2" mt={2}>
//             Only executive users can access this feature.
//           </MDTypography>
//         </Card>
//       </Box>
//     );
//   }

//   if (employees.length === 0) return <center>Loading employee data...</center>;

//   const currentEmployee = filteredEmployees[currentIndex] || filteredEmployees[0];

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Search Box - Only visible for executives */}
//       <Card sx={{ mb: 3, display: "flex", gap: 2 }}>
//         <Box>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search employees..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//               endAdornment: searchTerm && (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setSearchTerm("")} size="small">
//                     <ClearIcon />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       </Card>

//       <Box sx={{ position: "relative" }}>
//         {/* Navigation Arrows */}
//         {filteredEmployees.length > 1 && (
//           <>
//             <IconButton
//               onClick={handlePrev}
//               sx={{
//                 position: "absolute",
//                 left: isMobile ? -10 : -10,
//                 top: "50%",
//                 transform: "translateY(-80%)",
//                 zIndex: 1,
//                 bgcolor: "background.paper",
//                 color: "white",
//                 boxShadow: 1,
//                 "&:hover": {
//                   bgcolor: "success.dark",
//                 },
//                 "&:active": {
//                   bgcolor: "success.light",
//                 },
//               }}
//             >
//               <ChevronLeft fontSize="large" />
//             </IconButton>

//             <IconButton
//               onClick={handleNext}
//               sx={{
//                 position: "absolute",
//                 right: isMobile ? -10 : -10,
//                 top: "50%",
//                 transform: "translateY(-78%)",
//                 zIndex: 1,
//                 bgcolor: "background.paper",
//                 color: "white",
//                 boxShadow: 1,
//                 "&:hover": {
//                   bgcolor: "success.dark",
//                 },
//                 "&:active": {
//                   bgcolor: "success.light",
//                 },
//               }}
//             >
//               <ChevronRight fontSize="large" />
//             </IconButton>
//           </>
//         )}

//         {/* Employee Profile */}
//         {filteredEmployees.length > 0 ? (
//           <Grid container spacing={2}>
//             {/* Profile Card */}
//             <Grid item xs={12} md={6}>
//               <Card sx={{ height: "100%" }}>
//                 <MDBox
//                   display="flex"
//                   flexDirection="column"
//                   alignItems="center"
//                   justifyContent="center"
//                   p={3}
//                   height="100%"
//                 >
//                   <Avatar
//                     src={currentEmployee.photoUrl || DEFAULT_PROFILE_IMAGE}
//                     alt="profile"
//                     sx={{ width: 100, height: 100, mb: 2 }}
//                   />
//                   <MDTypography variant="h5" fontWeight="medium">
//                     {currentEmployee.name || "N/A"}
//                   </MDTypography>
//                   <MDTypography variant="button" color="info" fontWeight="regular">
//                     {currentEmployee.jobTitle || "N/A"}
//                   </MDTypography>
//                   <MDTypography variant="body2" color="text" mt={1}>
//                     <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
//                     {currentEmployee.email || "N/A"}
//                   </MDTypography>
//                 </MDBox>
//               </Card>
//             </Grid>

//             {/* Personal Info Card */}
//             <Grid item xs={12} md={6}>
//               <Card sx={{ height: "100%" }}>
//                 <MDBox
//                   display="flex"
//                   flexDirection="column"
//                   justifyContent="center"
//                   p={3}
//                   height="100%"
//                 >
//                   <MDTypography variant="h6" fontWeight="medium" mb={2}>
//                     Personal Information
//                   </MDTypography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Employee ID:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.id || "N/A"}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Department:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.department || "N/A"}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Office Location:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.officeLocation || "N/A"}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Phone:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.mobilePhone || "N/A"}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Preferred Language:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.preferredLanguage || "N/A"}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Status:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium" color="success">
//                         Active
//                       </MDTypography>
//                     </Grid>
//                   </Grid>
//                 </MDBox>
//               </Card>
//             </Grid>
//           </Grid>
//         ) : (
//           <MDTypography variant="body1" textAlign="center" py={4}>
//             No employees found matching your search criteria.
//           </MDTypography>
//         )}

//         {/* Page Indicator */}
//         {filteredEmployees.length > 1 && (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//             <MDTypography variant="body2">
//               {currentIndex + 1} of {filteredEmployees.length}
//             </MDTypography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default EmployeeProfiles;

import {
  Avatar,
  Card,
  Grid,
  Icon,
  IconButton,
  Box,
  useMediaQuery,
  TextField,
  InputAdornment,
} from "@mui/material";
import { getUserProfile } from "auth/getUserProfile";
import { getAllEmployees } from "auth/getAllEmployee";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton"; // Assuming you have MDButton
import React, { useEffect, useState } from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useRoleBasedAccess } from "context/RoleBasedAccess";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

const EmployeeProfiles = () => {
  const [user, setUser] = useState(null); // Currently logged-in user
  const [employees, setEmployees] = useState([]); // All employees fetched
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Employees after search filter
  const [currentIndex, setCurrentIndex] = useState(0); // Index for carousel
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const { isExecutive } = useRoleBasedAccess();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProfileAndEmployees = async () => {
      const profile = await getUserProfile();
      setUser(profile);

      if (isExecutive) {
        const allEmployees = await getAllEmployees();
        setEmployees(allEmployees);
        setFilteredEmployees(allEmployees);
        // Set current index to the logged-in user if they are also in the employee list
        const userIndex = allEmployees.findIndex((emp) => emp.id === profile.id);
        setCurrentIndex(userIndex >= 0 ? userIndex : 0);
      }
    };
    fetchProfileAndEmployees();
  }, [isExecutive]); // Dependency on isExecutive to re-fetch if role changes dynamically

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
      setCurrentIndex(0); // Reset index when search is cleared
      return;
    }

    const filtered = employees.filter(
      (emp) =>
        (emp.name && emp.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (emp.id && emp.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredEmployees(filtered);
    setCurrentIndex(0); // Reset index for new filtered list
  }, [searchTerm, employees]); // Dependencies on searchTerm and employees list

  // Handle carousel navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredEmployees.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredEmployees.length - 1 ? prev + 1 : 0));
  };

  // Handle redirection to common profile page with employee's email
  const handleViewProfile = (employeeEmail) => {
    // Redirect to the /profile route, passing the email as a query parameter
    navigate(`/profile?email=${employeeEmail}`);
  };

  if (!user) return <center>Loading profile...</center>;

  // Access control: Only executives can view this component
  if (!isExecutive) {
    return (
      <Box sx={{ p: 2 }}>
        <Card sx={{ p: 3, textAlign: "center" }}>
          <MDTypography variant="h6" color="error">
            You are not authorized to view employee profiles.
          </MDTypography>
          <MDTypography variant="body2" mt={2}>
            Only executive users can access this feature.
          </MDTypography>
        </Card>
      </Box>
    );
  }

  if (employees.length === 0) return <center>Loading employee data...</center>;

  // Get the current employee to display
  const currentEmployee = filteredEmployees[currentIndex] || filteredEmployees[0];

  return (
    <Box sx={{ p: 2 }}>
      {/* Search Box */}
      <Card sx={{ mb: 3, p: 2 }}>
        {" "}
        {/* Added padding to the card */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm("")} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Card>

      <Box sx={{ position: "relative" }}>
        {/* Navigation Arrows */}
        {filteredEmployees.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: isMobile ? -10 : -30, // Adjusted left/right for desktop view
                top: "50%",
                transform: "translateY(-50%)", // Centered vertically
                zIndex: 1,
                bgcolor: (theme) => theme.palette.background.paper, // Use theme for background color
                color: (theme) => theme.palette.info.main, // Use theme for color
                boxShadow: 3, // Increased shadow for visibility
                "&:hover": {
                  bgcolor: (theme) => theme.palette.info.dark,
                  color: "white",
                },
                "&:active": {
                  bgcolor: (theme) => theme.palette.info.light,
                },
              }}
            >
              <ChevronLeft fontSize="large" />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: isMobile ? -10 : -30, // Adjusted left/right for desktop view
                top: "50%",
                transform: "translateY(-50%)", // Centered vertically
                zIndex: 1,
                bgcolor: (theme) => theme.palette.background.paper, // Use theme for background color
                color: (theme) => theme.palette.info.main, // Use theme for color
                boxShadow: 3, // Increased shadow for visibility
                "&:hover": {
                  bgcolor: (theme) => theme.palette.info.dark,
                  color: "white",
                },
                "&:active": {
                  bgcolor: (theme) => theme.palette.info.light,
                },
              }}
            >
              <ChevronRight fontSize="large" />
            </IconButton>
          </>
        )}

        {/* Employee Profile and Personal Info Cards */}
        {filteredEmployees.length > 0 ? (
          <Grid container spacing={2}>
            {/* Profile Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  p={3}
                  height="100%"
                >
                  <Avatar
                    src={currentEmployee.photoUrl || DEFAULT_PROFILE_IMAGE}
                    alt="profile"
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <MDTypography variant="h5" fontWeight="medium">
                    {currentEmployee.name || "N/A"}
                  </MDTypography>
                  <MDTypography variant="button" color="info" fontWeight="regular">
                    {currentEmployee.jobTitle || "N/A"}
                  </MDTypography>
                  <MDTypography variant="body2" color="text" mt={1}>
                    <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
                    {currentEmployee.email || "N/A"}
                  </MDTypography>

                  {/* View Profile Button */}
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    sx={{ mt: 3 }}
                    onClick={() => handleViewProfile(currentEmployee.email)}
                  >
                    View Profile
                  </MDButton>
                </MDBox>
              </Card>
            </Grid>

            {/* Personal Info Card (for current employee in carousel) */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  p={3}
                  height="100%"
                >
                  <MDTypography variant="h6" fontWeight="medium" mb={2}>
                    Personal Information
                  </MDTypography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <MDTypography variant="caption" color="text">
                        Employee ID:
                      </MDTypography>
                      <MDTypography variant="body2" fontWeight="medium">
                        {currentEmployee.id || "N/A"}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={6}>
                      <MDTypography variant="caption" color="text">
                        Department:
                      </MDTypography>
                      <MDTypography variant="body2" fontWeight="medium">
                        {currentEmployee.department || "N/A"}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={6}>
                      <MDTypography variant="caption" color="text">
                        Office Location:
                      </MDTypography>
                      <MDTypography variant="body2" fontWeight="medium">
                        {currentEmployee.officeLocation || "N/A"}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={6}>
                      <MDTypography variant="caption" color="text">
                        Phone:
                      </MDTypography>
                      <MDTypography variant="body2" fontWeight="medium">
                        {currentEmployee.mobilePhone || "N/A"}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={6}>
                      <MDTypography variant="caption" color="text">
                        Preferred Language:
                      </MDTypography>
                      <MDTypography variant="body2" fontWeight="medium">
                        {currentEmployee.preferredLanguage || "N/A"}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={6}>
                      <MDTypography variant="caption" color="text">
                        Status:
                      </MDTypography>
                      <MDTypography variant="body2" fontWeight="medium" color="success">
                        Active
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <MDTypography variant="body1" textAlign="center" py={4}>
            No employees found matching your search criteria.
          </MDTypography>
        )}

        {/* Page Indicator */}
        {filteredEmployees.length > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <MDTypography variant="body2">
              {currentIndex + 1} of {filteredEmployees.length}
            </MDTypography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmployeeProfiles;
