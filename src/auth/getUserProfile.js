// import { getAccessToken } from "./authProvider";

// export const getUserProfile = async () => {
//   try {
//     const token = await getAccessToken();

//     const response = await fetch("https://graph.microsoft.com/v1.0/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch user profile");
//     }

//     const profile = await response.json();
//     console.log("👤 User Profile:", profile); // <-- yahan milega name, email, etc.
//     return profile;
//   } catch (error) {
//     console.error("❌ Error fetching user profile", error);
//     return null;
//   }
// };

// import { getAccessToken } from "./authProvider";

// export const getUserProfile = async () => {
//   try {
//     const token = await getAccessToken();

//     // Fetch user basic info
//     const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!profileResponse.ok) throw new Error("Failed to fetch user profile");

//     const profile = await profileResponse.json();

//     // Fetch profile photo as blob
//     const photoResponse = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     let photoUrl = null;

//     if (photoResponse.ok) {
//       const photoBlob = await photoResponse.blob();
//       photoUrl = URL.createObjectURL(photoBlob);
//     } else {
//       console.warn("No profile photo found, using default.");
//     }

//     return {
//       name: profile.displayName,
//       email: profile.mail || profile.userPrincipalName,
//       photo: photoUrl,
//     };
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return null;
//   }
// };

// import { getAccessToken } from "./authProvider";

// // Default profile image if none is found
// const DEFAULT_PROFILE_IMAGE = "/default-profile.png"; // Place this in your public folder

// export const getUserProfile = async () => {
//   try {
//     const token = await getAccessToken();

//     // 1. Fetch user basic profile
//     const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!profileResponse.ok) {
//       throw new Error(`Failed to fetch user profile: ${profileResponse.status}`);
//     }

//     const profile = await profileResponse.json();
//     console.log("Values in profile", profile);
//     // 2. Try to fetch the profile photo
//     let photoUrl = DEFAULT_PROFILE_IMAGE;

//     try {
//       const photoResponse = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (photoResponse.ok) {
//         const photoBlob = await photoResponse.blob();
//         photoUrl = URL.createObjectURL(photoBlob);
//       } else {
//         console.warn("Profile photo not found. Using default.");
//       }
//     } catch (photoError) {
//       console.warn("Error fetching profile photo:", photoError);
//     }

//     return {
//       name: profile.displayName,
//       email: profile.mail || profile.userPrincipalName,
//       photo: photoUrl,
//       jobTitle: profile.jobTitle,
//       givenName: profile.givenName,
//     };
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return null;
//   }
// };

import { getAccessToken } from "./authProvider";

// Default profile image
const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

// Sample employee data
const employeeData = [
  {
    givenName: "Krishna",
    name: "Krishna Kumar",
    employeeId: "00064",
    department: "Consulting Services",
    joiningDate: "22 Jan 2024",
    location: "Bengaluru",
    phone: "+91 9791975891",
    status: "Active",
  },
  {
    givenName: "Ankit",
    name: "Ankit Sharma",
    employeeId: "00012",
    department: "IT Support",
    joiningDate: "10 Mar 2022",
    location: "Delhi",
    phone: "+91 9876543210",
    status: "Active",
  },
  {
    givenName: "Riya",
    name: "Riya Patel",
    employeeId: "00027",
    department: "HR",
    joiningDate: "05 Sep 2023",
    location: "Mumbai",
    phone: "+91 9123456789",
    status: "Inactive",
  },
  {
    givenName: "Rahul",
    name: "Rahul Verma",
    employeeId: "00033",
    department: "Finance",
    joiningDate: "01 Jan 2021",
    location: "Chennai",
    phone: "+91 9988776655",
    status: "Active",
  },
  {
    givenName: "Sneha",
    name: "Sneha Iyer",
    employeeId: "00045",
    department: "Marketing",
    joiningDate: "14 Feb 2022",
    location: "Pune",
    phone: "+91 9090909090",
    status: "Active",
  },
];

export const getUserProfile = async () => {
  try {
    const token = await getAccessToken();

    // 1. Fetch user basic profile
    const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch user profile: ${profileResponse.status}`);
    }

    const profile = await profileResponse.json();
    console.log("User profile:", profile);

    // 2. Fetch photo
    let photoUrl = DEFAULT_PROFILE_IMAGE;

    try {
      const photoResponse = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (photoResponse.ok) {
        const photoBlob = await photoResponse.blob();
        photoUrl = URL.createObjectURL(photoBlob);
      }
    } catch (photoError) {
      console.warn("Error fetching photo, using default.");
    }

    // 3. Match employee record
    const match = employeeData.find(
      (emp) =>
        emp.name.toLowerCase() === profile.displayName.toLowerCase() ||
        emp.givenName.toLowerCase() === profile.givenName.toLowerCase()
    );

    // 4. Return merged profile
    return {
      name: profile.displayName,
      email: profile.mail || profile.userPrincipalName,
      jobTitle: profile.jobTitle || "N/A",
      photo: photoUrl,
      phone: profile.mobilePhone || "N/A",
      employeeId: match?.employeeId || "N/A",
      department: match?.department || "N/A",
      joiningDate: match?.joiningDate || "N/A",
      location: match?.location || "N/A",
      status: match?.status || "N/A",
    };
  } catch (error) {
    console.error("Error fetching full user profile:", error);
    return null;
  }
};
