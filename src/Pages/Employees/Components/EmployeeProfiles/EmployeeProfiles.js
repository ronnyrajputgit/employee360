// import { Avatar, Card, Grid, Icon } from "@mui/material";
// import { getUserProfile } from "auth/getUserProfile";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import React, { useEffect, useState } from "react";

// const EmployeeProfiles = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const profile = await getUserProfile();
//       // console.log("profile", profile);
//       setUser(profile);
//     };

//     fetchProfile();
//   }, []);

//   if (!user) return <center>Loading profile...</center>;
//   return (
//     <div>
//       <Grid container spacing={2}>
//         {/* Profile Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ height: "100%" }}>
//             <MDBox
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               p={3}
//               height="100%"
//             >
//               <Avatar
//                 src={user ? user.photo : "n/a"}
//                 alt="profile"
//                 sx={{ width: 100, height: 100, mb: 2 }}
//               />
//               <MDTypography variant="h5" fontWeight="medium">
//                 {user ? user.name : "n/a"}
//               </MDTypography>
//               <MDTypography variant="button" color="info" fontWeight="regular">
//                 {user ? user.jobTitle : "n/a"}
//               </MDTypography>
//               <MDTypography variant="body2" color="text" mt={1}>
//                 <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
//                 {user.email}
//               </MDTypography>
//               {/* <MDTypography variant="body2" color="text" mt={1}>
//                 <Icon sx={{ verticalAlign: "middle", mr: 1 }}>linkedin</Icon>
//                 n/a
//               </MDTypography> */}
//             </MDBox>
//           </Card>
//         </Grid>

//         {/* Personal Info Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ height: "100%" }}>
//             <MDBox
//               display="flex"
//               flexDirection="column"
//               justifyContent="center"
//               p={3}
//               height="100%"
//             >
//               <MDTypography variant="h6" fontWeight="medium" mb={2}>
//                 Personal Information
//               </MDTypography>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Employee ID:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {user ? user.employeeId : "n/a"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Department:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {user ? user.department : "n/a"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Joining Date:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {user ? user.joiningDate : "n/a"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Location:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {user ? user.location : "n/a"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Phone:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {user ? user.phone : "n/a"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Status:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium" color="success">
//                     {user ? user.status : "n/a"}
//                   </MDTypography>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default EmployeeProfiles;

// with left right icon

// import { Avatar, Card, Grid, Icon, IconButton, Box, useMediaQuery } from "@mui/material";
// import { getUserProfile } from "auth/getUserProfile";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import React, { useEffect, useState } from "react";
// import ChevronLeft from "@mui/icons-material/ChevronLeft";
// import ChevronRight from "@mui/icons-material/ChevronRight";

// const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

// const EmployeeProfiles = () => {
//   const [user, setUser] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const isMobile = useMediaQuery("(max-width:600px)");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       // First fetch the current user's profile
//       const profile = await getUserProfile();
//       setUser(profile);

//       // Then fetch all employees (you'll need to implement this)
//       const allEmployees = await getAllEmployees();
//       setEmployees(allEmployees);

//       // Find the current user's index in the employees array
//       const userIndex = allEmployees.findIndex((emp) => emp.id === profile.id);
//       setCurrentIndex(userIndex >= 0 ? userIndex : 0);
//     };

//     fetchProfile();
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : employees.length - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev < employees.length - 1 ? prev + 1 : 0));
//   };

//   if (!user || employees.length === 0) return <center>Loading profile...</center>;

//   const currentEmployee = employees[currentIndex];

//   return (
//     <Box sx={{ position: "relative" }}>
//       {/* Navigation Arrows */}
//       {employees.length > 1 && (
//         <>
//           <IconButton
//             onClick={handlePrev}
//             sx={{
//               position: "absolute",
//               left: isMobile ? -10 : -10,
//               top: "50%",
//               transform: "translateY(-50%)",
//               zIndex: 1,
//               bgcolor: "background.paper",
//               boxShadow: 1,
//               "&:hover": {
//                 bgcolor: "success.dark", // Darker green on hover
//               },
//               "&:active": {
//                 bgcolor: "success.light", // Lighter green when pressed
//               },
//             }}
//           >
//             <ChevronLeft fontSize="large" />
//           </IconButton>

//           <IconButton
//             onClick={handleNext}
//             sx={{
//               position: "absolute",
//               right: isMobile ? -10 : -10,
//               top: "50%",
//               transform: "translateY(-50%)",
//               zIndex: 1,
//               bgcolor: "background.paper",
//               boxShadow: 1,
//               "&:hover": {
//                 bgcolor: "success.dark", // Darker green on hover
//               },
//               "&:active": {
//                 bgcolor: "success.light", // Lighter green when pressed
//               },
//             }}
//           >
//             <ChevronRight fontSize="large" />
//           </IconButton>
//         </>
//       )}

//       {/* Employee Profile */}
//       <Grid container spacing={2}>
//         {/* Profile Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ height: "100%" }}>
//             <MDBox
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               p={3}
//               height="100%"
//             >
//               <Avatar
//                 src={currentEmployee.photo || DEFAULT_PROFILE_IMAGE}
//                 alt="profile"
//                 sx={{ width: 100, height: 100, mb: 2 }}
//               />
//               <MDTypography variant="h5" fontWeight="medium">
//                 {currentEmployee.name}
//               </MDTypography>
//               <MDTypography variant="button" color="info" fontWeight="regular">
//                 {currentEmployee.jobTitle}
//               </MDTypography>
//               <MDTypography variant="body2" color="text" mt={1}>
//                 <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
//                 {currentEmployee.email}
//               </MDTypography>
//             </MDBox>
//           </Card>
//         </Grid>

//         {/* Personal Info Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ height: "100%" }}>
//             <MDBox
//               display="flex"
//               flexDirection="column"
//               justifyContent="center"
//               p={3}
//               height="100%"
//             >
//               <MDTypography variant="h6" fontWeight="medium" mb={2}>
//                 Personal Information
//               </MDTypography>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Employee ID:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {currentEmployee.employeeId}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Department:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {currentEmployee.department}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Joining Date:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {currentEmployee.joiningDate}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Location:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {currentEmployee.location}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Phone:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {currentEmployee.phone}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Status:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium" color="success">
//                     {currentEmployee.status}
//                   </MDTypography>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Page Indicator */}
//       {employees.length > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <MDTypography variant="body2">
//             {currentIndex + 1} of {employees.length}
//           </MDTypography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// // Mock function - replace with your actual API call
// async function getAllEmployees() {
//   // Replace this with your actual API call to fetch all employees
//   return [
//     {
//       id: 1,
//       name: "John Doe",
//       employeeId: "00064",
//       department: "Consulting Services",
//       joiningDate: "22 Jan 2024",
//       location: "Bengaluru",
//       status: "Active",
//       email: "john@company.com",
//       phone: "9876543210",
//       jobTitle: "Senior Consultant",
//       photo: "/default-profile.png",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       employeeId: "00065",
//       department: "Development",
//       joiningDate: "15 Mar 2023",
//       location: "New York",
//       status: "Active",
//       email: "jane@company.com",
//       phone: "9876543211",
//       jobTitle: "Software Engineer",
//       photo: "/default-profile.png",
//     },
//     // Add more employees as needed
//   ];
// }

// export default EmployeeProfiles;

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
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import React, { useEffect, useState } from "react";
// import ChevronLeft from "@mui/icons-material/ChevronLeft";
// import ChevronRight from "@mui/icons-material/ChevronRight";
// import SearchIcon from "@mui/icons-material/Search";
// import ClearIcon from "@mui/icons-material/Clear";

// const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

// const EmployeeProfiles = () => {
//   const [user, setUser] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isExecutive] = useState(true); // Set based on user role
//   const isMobile = useMediaQuery("(max-width:600px)");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const profile = await getUserProfile();
//       setUser(profile);
//       const allEmployees = await getAllEmployees();
//       setEmployees(allEmployees);
//       setFilteredEmployees(allEmployees);
//       const userIndex = allEmployees.findIndex((emp) => emp.id === profile.id);
//       setCurrentIndex(userIndex >= 0 ? userIndex : 0);
//     };
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredEmployees(employees);
//       setCurrentIndex(0);
//       return;
//     }

//     const filtered = employees.filter(
//       (emp) =>
//         emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         emp.email.toLowerCase().includes(searchTerm.toLowerCase())
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

//   if (!user || employees.length === 0) return <center>Loading profile...</center>;

//   const currentEmployee = filteredEmployees[currentIndex] || filteredEmployees[0];

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Search Box - Only visible for executives */}
//       {isExecutive && (
//         <Card sx={{ mb: 3, display: "flex", gap: 2 }}>
//           <Box>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Search employees..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//                 endAdornment: searchTerm && (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setSearchTerm("")} size="small">
//                       <ClearIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>
//         </Card>
//       )}

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
//                   bgcolor: "success.dark", // Darker green on hover
//                 },
//                 "&:active": {
//                   bgcolor: "success.light", // Lighter green when pressed
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
//                     src={currentEmployee.photo || DEFAULT_PROFILE_IMAGE}
//                     alt="profile"
//                     sx={{ width: 100, height: 100, mb: 2 }}
//                   />
//                   <MDTypography variant="h5" fontWeight="medium">
//                     {currentEmployee.name}
//                   </MDTypography>
//                   <MDTypography variant="button" color="info" fontWeight="regular">
//                     {currentEmployee.jobTitle}
//                   </MDTypography>
//                   <MDTypography variant="body2" color="text" mt={1}>
//                     <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
//                     {currentEmployee.email}
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
//                         {currentEmployee.employeeId}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Department:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.department}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Joining Date:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.joiningDate}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Location:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.location}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Phone:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium">
//                         {currentEmployee.phone}
//                       </MDTypography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <MDTypography variant="caption" color="text">
//                         Status:
//                       </MDTypography>
//                       <MDTypography variant="body2" fontWeight="medium" color="success">
//                         {currentEmployee.status}
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

// // Mock function - replace with your actual API call
// async function getAllEmployees() {
//   // Replace this with your actual API call to fetch all employees
//   return [
//     {
//       id: 1,
//       name: "John Doe",
//       employeeId: "00064",
//       department: "Consulting Services",
//       joiningDate: "22 Jan 2024",
//       location: "Bengaluru",
//       status: "Active",
//       email: "john@company.com",
//       phone: "9876543210",
//       jobTitle: "Senior Consultant",
//       photo:
//         "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       employeeId: "00065",
//       department: "Development",
//       joiningDate: "15 Mar 2023",
//       location: "New York",
//       status: "Active",
//       email: "jane@company.com",
//       phone: "9876543211",
//       jobTitle: "Software Engineer",
//       photo:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s",
//     },
//   ];
// }

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
import React, { useEffect, useState } from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

const EmployeeProfiles = () => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExecutive] = useState(true); // Set based on user role
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUser(profile);
      const allEmployees = await getAllEmployees();
      setEmployees(allEmployees);
      setFilteredEmployees(allEmployees);
      const userIndex = allEmployees.findIndex((emp) => emp.id === profile.id);
      setCurrentIndex(userIndex >= 0 ? userIndex : 0);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
      setCurrentIndex(0);
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
    setCurrentIndex(0);
  }, [searchTerm, employees]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredEmployees.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredEmployees.length - 1 ? prev + 1 : 0));
  };

  if (!user || employees.length === 0) return <center>Loading profile...</center>;

  const currentEmployee = filteredEmployees[currentIndex] || filteredEmployees[0];

  return (
    <Box sx={{ p: 2 }}>
      {/* Search Box - Only visible for executives */}
      {isExecutive && (
        <Card sx={{ mb: 3, display: "flex", gap: 2 }}>
          <Box>
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
          </Box>
        </Card>
      )}

      <Box sx={{ position: "relative" }}>
        {/* Navigation Arrows */}
        {filteredEmployees.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: isMobile ? -10 : -10,
                top: "50%",
                transform: "translateY(-80%)",
                zIndex: 1,
                bgcolor: "background.paper",
                color: "white",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "success.dark",
                },
                "&:active": {
                  bgcolor: "success.light",
                },
              }}
            >
              <ChevronLeft fontSize="large" />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: isMobile ? -10 : -10,
                top: "50%",
                transform: "translateY(-78%)",
                zIndex: 1,
                bgcolor: "background.paper",
                color: "white",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "success.dark",
                },
                "&:active": {
                  bgcolor: "success.light",
                },
              }}
            >
              <ChevronRight fontSize="large" />
            </IconButton>
          </>
        )}

        {/* Employee Profile */}
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
                </MDBox>
              </Card>
            </Grid>

            {/* Personal Info Card */}
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
