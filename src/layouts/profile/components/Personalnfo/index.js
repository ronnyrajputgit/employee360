// import { Avatar, Card, Grid, Icon } from "@mui/material";
// import { getUserProfile } from "auth/getUserProfile";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import React, { useEffect, useState } from "react";

// const PersonalInfo = () => {
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

// export default PersonalInfo;

// import { Avatar, Card, Grid, Icon, Box } from "@mui/material";
// import { getUserProfile } from "auth/getUserProfile"; // For the currently logged-in user's profile
// import { getAllEmployees } from "auth/getAllEmployee"; // To search for other employee profiles
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom"; // Import useLocation to get query params
// import { useRoleBasedAccess } from "context/RoleBasedAccess"; // For executive access control
// import { Fullscreen, FullscreenExit } from "@mui/icons-material";

// const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

// const PersonalInfo = () => {
//   const [displayedUser, setDisplayedUser] = useState(null); // This will be the profile displayed
//   const [loading, setLoading] = useState(true);

//   const location = useLocation(); // Hook to access the URL's query parameters
//   const { isExecutive } = useRoleBasedAccess(); // Get executive role status

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       const queryParams = new URLSearchParams(location.search);
//       const employeeEmailInUrl = queryParams.get("email"); // Get email from URL query

//       let profileToDisplay = null;

//       // Scenario 1: Executive viewing another employee's profile via URL email
//       if (employeeEmailInUrl && isExecutive) {
//         try {
//           const allEmployees = await getAllEmployees(); // Fetch all employees to find the one by email
//           profileToDisplay = allEmployees.find(
//             (emp) => emp.email?.toLowerCase() === employeeEmailInUrl.toLowerCase()
//           );
//         } catch (error) {
//           console.error("Error fetching all employees:", error);
//           // Fallback to logged-in user's profile if fetching all employees fails
//           profileToDisplay = await getUserProfile();
//         }
//       } else {
//         // Scenario 2: Regular user viewing their own profile, or Executive viewing their own profile without URL email
//         // or a non-executive trying to access a URL with an email (they should only see their own)
//         profileToDisplay = await getUserProfile();
//       }

//       // If a specific employee profile wasn't found or accessed, ensure we display the logged-in user's profile
//       if (!profileToDisplay && !employeeEmailInUrl) {
//         // Only fallback if no specific email was requested
//         profileToDisplay = await getUserProfile();
//       } else if (!profileToDisplay && employeeEmailInUrl && isExecutive) {
//         console.warn(`Employee with email ${employeeEmailInUrl} not found.`);
//         // Optionally, set to null to show "Profile not found" message, or fallback to current user
//         profileToDisplay = await getUserProfile(); // Fallback to current user if requested profile not found
//       }

//       console.log("Profile to display:", profileToDisplay);
//       // Map the fetched data to the expected structure if it's from getAllEmployees
//       // (as getAllEmployees might return slightly different field names than getUserProfile)
//       if (profileToDisplay) {
//         setDisplayedUser({
//           ...profileToDisplay,
//         });
//       } else {
//         setDisplayedUser(null); // No profile to display
//       }
//       setLoading(false);
//     };

//     fetchProfile();
//   }, [location.search, isExecutive]); // Re-run effect when URL query params or executive status changes

//   if (loading) return <center>Loading profile...</center>;
//   if (!displayedUser) return <center>Profile not found or unauthorized access.</center>;

//   return (
//     <Box sx={{ p: 2 }}>
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
//                 src={displayedUser.photo} // Use the mapped photo URL
//                 alt="profile"
//                 sx={{ width: 100, height: 100, mb: 2 }}
//               />
//               <MDTypography variant="h5" fontWeight="medium">
//                 {displayedUser.name || "N/A"}
//               </MDTypography>
//               <MDTypography variant="button" color="info" fontWeight="regular">
//                 {displayedUser.jobTitle || "N/A"}
//               </MDTypography>
//               <MDTypography variant="body2" color="text" mt={1}>
//                 <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
//                 {displayedUser.email || "N/A"}
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
//               <MDBox display="flex" justifyContent="flex-end" mb={2}>
//                 <Fullscreen /> <FullscreenExit />
//               </MDBox>
//               <MDTypography variant="h6" fontWeight="medium" mb={2}>
//                 Personal Information
//               </MDTypography>
//               {/* add a full screen icon */}

//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Employee ID:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {displayedUser.employeeId || "N/A"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Department:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {displayedUser.department || "N/A"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Joining Date:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {displayedUser.joiningDate || "N/A"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Location:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {displayedUser.location || "N/A"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Phone:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium">
//                     {displayedUser.phone || "N/A"}
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MDTypography variant="caption" color="text">
//                     Blood Group:
//                   </MDTypography>
//                   <MDTypography variant="body2" fontWeight="medium" color="success">
//                     {displayedUser.bloodGroup || "N/A"}
//                   </MDTypography>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default PersonalInfo;

import {
  Avatar,
  Card,
  Grid,
  Icon,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { getUserProfile } from "auth/getUserProfile"; // For the currently logged-in user's profile
import { getAllEmployees } from "auth/getAllEmployee"; // To search for other employee profiles
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to get query params
import { useRoleBasedAccess } from "context/RoleBasedAccess"; // For executive access control
import { Fullscreen, FullscreenExit } from "@mui/icons-material";

const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

const PersonalInfo = () => {
  const [displayedUser, setDisplayedUser] = useState(null); // This will be the profile displayed
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false); // State for fullscreen toggle
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility

  const location = useLocation(); // Hook to access the URL's query parameters
  const { isExecutive } = useRoleBasedAccess(); // Get executive role status

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const employeeEmailInUrl = queryParams.get("email"); // Get email from URL query

      let profileToDisplay = null;

      // Scenario 1: Executive viewing another employee's profile via URL email
      if (employeeEmailInUrl && isExecutive) {
        try {
          const allEmployees = await getAllEmployees(); // Fetch all employees to find the one by email
          profileToDisplay = allEmployees.find(
            (emp) => emp.email?.toLowerCase() === employeeEmailInUrl.toLowerCase()
          );
        } catch (error) {
          console.error("Error fetching all employees:", error);
          // Fallback to logged-in user's profile if fetching all employees fails
          profileToDisplay = await getUserProfile();
        }
      } else {
        // Scenario 2: Regular user viewing their own profile, or Executive viewing their own profile without URL email
        // or a non-executive trying to access a URL with an email (they should only see their own)
        profileToDisplay = await getUserProfile();
      }

      // If a specific employee profile wasn't found or accessed, ensure we display the logged-in user's profile
      if (!profileToDisplay && !employeeEmailInUrl) {
        // Only fallback if no specific email was requested
        profileToDisplay = await getUserProfile();
      } else if (!profileToDisplay && employeeEmailInUrl && isExecutive) {
        console.warn(`Employee with email ${employeeEmailInUrl} not found.`);
        // Optionally, set to null to show "Profile not found" message, or fallback to current user
        profileToDisplay = await getUserProfile(); // Fallback to current user if requested profile not found
      }

      console.log("Profile to display:", profileToDisplay);
      // Map the fetched data to the expected structure if it's from getAllEmployees
      // (as getAllEmployees might return slightly different field names than getUserProfile)
      if (profileToDisplay) {
        setDisplayedUser({
          ...profileToDisplay,
        });
      } else {
        setDisplayedUser(null); // No profile to display
      }
      setLoading(false);
    };

    fetchProfile();
  }, [location.search, isExecutive]); // Re-run effect when URL query params or executive status changes

  if (loading) return <center>Loading profile...</center>;
  if (!displayedUser) return <center>Profile not found or unauthorized access.</center>;

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: 2 }}>
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
                src={displayedUser.photo} // Use the mapped photo URL
                alt="profile"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <MDTypography variant="h5" fontWeight="medium">
                {displayedUser.name || "N/A"}
              </MDTypography>
              <MDTypography variant="button" color="info" fontWeight="regular">
                {displayedUser.jobTitle || "N/A"}
              </MDTypography>
              <MDTypography variant="body2" color="text" mt={1}>
                <Icon sx={{ verticalAlign: "middle", mr: 1 }}>email</Icon>
                {displayedUser.email || "N/A"}
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
              <MDBox
                display="flex"
                justifyContent="flex-end" // Align the icon to the right side
                alignItems="center"
                mb={2}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10, // Position it at the top-right corner
                  width: "auto", // Ensure it does not stretch
                  height: "auto", // Ensure it does not stretch
                }}
              >
                <Icon
                  onClick={handleModalOpen} // Close the fullscreen modal
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#228B22", // Brighter background for visibility
                    borderRadius: "50%", // Circular button
                    padding: "16px", // Increased padding for a larger button
                    fontSize: "40px", // Icon size
                    color: "#fff", // White icon color
                    border: "3px solid #fff", // White border to make the button stand out
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Add shadow for depth
                    display: "flex", // Make the icon container a flex container
                    justifyContent: "center", // Center the icon horizontally
                    alignItems: "center", // Center the icon vertically
                    "&:hover": {
                      backgroundColor: "#00FF00", // Hover effect with a darker shade
                    },
                  }}
                >
                  <Fullscreen />
                </Icon>
              </MDBox>

              <MDTypography variant="h6" fontWeight="medium" mb={2}>
                Personal Information
              </MDTypography>
              {/* Default Fields (Visible by default) */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Employee ID:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {displayedUser.employeeId || "N/A"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Department:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {displayedUser.Department || "N/A"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Joining Date:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {displayedUser.joiningDate || "N/A"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Location:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {displayedUser.location || "N/A"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Phone:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium">
                    {"+91" + " " + displayedUser.phone || "N/A"}
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography variant="caption" color="text">
                    Blood Group:
                  </MDTypography>
                  <MDTypography variant="body2" fontWeight="medium" color="success">
                    {displayedUser.bloodGroup || "N/A"}
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      {/* Fullscreen Modal */}

      <Dialog
        open={openModal}
        onClose={handleModalClose}
        fullScreen
        aria-labelledby="responsive-dialog-title"
      >
        {/* add a  grid show two column left and right */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {" "}
            <DialogTitle id="responsive-dialog-title">Additional Personal Information</DialogTitle>
          </Grid>
          <Grid item xs={6}>
            <MDBox
              display="flex"
              justifyContent="flex-end" // Align the icon to the right side
              alignItems="center"
              mb={2}
              sx={{
                position: "absolute",
                top: 10,
                right: 10, // Position it at the top-right corner
                width: "auto", // Ensure it does not stretch
                height: "auto", // Ensure it does not stretch
              }}
            >
              <Icon
                onClick={handleModalClose} // Close the fullscreen modal
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#FA8072", // Brighter background for visibility
                  borderRadius: "50%", // Circular button
                  padding: "16px", // Increased padding for a larger button
                  fontSize: "40px", // Icon size
                  color: "#fff", // White icon color
                  border: "3px solid #fff", // White border to make the button stand out
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Add shadow for depth
                  display: "flex", // Make the icon container a flex container
                  justifyContent: "center", // Center the icon horizontally
                  alignItems: "center", // Center the icon vertically
                  "&:hover": {
                    backgroundColor: "#DC143C", // Hover effect with a darker shade
                  },
                }}
              >
                <FullscreenExit />
              </Icon>
            </MDBox>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Additional Fields (Only shown in fullscreen modal) */}
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Total Years Of Experience:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.YearsOfxperience || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Experience In DataInfa:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.YearsOfExperienceInDatainfa || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Designation:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.Designation || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                EmployeeMent Type:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.EmployeeMentType || "N/A"}
              </MDTypography>
            </Grid>

            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Department:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.Department || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Reporting Manager:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.reportingManager || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Personal Email:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.PersonalEmailId || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Official Email:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.OfficialEmail || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Marital Status:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.maritalStatus || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Gender:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.Gender || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Date of Birth:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.DateOfBirth || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Date of Joining:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.joiningDate || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Emergency Contact:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {"+91" + " " + displayedUser.EmergencyContact || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Marital Status:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.MaritalStatus || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography variant="caption" color="text">
                Created On:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.CreatedOn || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="caption" color="text">
                Current Address:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.CurrentAddress || "N/A"}
              </MDTypography>
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="caption" color="text">
                Permanent Address:
              </MDTypography>
              <MDTypography variant="body2" fontWeight="medium">
                {displayedUser.PermanentAddress || "N/A"}
              </MDTypography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PersonalInfo;
