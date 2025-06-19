// import { getAccessToken } from "./authProvider";

// export const getAllEmployees = async () => {
//   try {
//     const token = await getAccessToken();

//     // First fetch all users
//     const usersResponse = await fetch("https://graph.microsoft.com/v1.0/users", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!usersResponse.ok) {
//       throw new Error(`Failed to fetch users: ${usersResponse.status}`);
//     }

//     const usersData = await usersResponse.json();
//     const users = usersData.value;

//     // Fetch photos for each user
//     const usersWithPhotos = await Promise.all(
//       users.map(async (user) => {
//         try {
//           const photoResponse = await fetch(
//             `https://graph.microsoft.com/v1.0/users/${user.id}/photo/$value`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           if (photoResponse.ok) {
//             const photoBlob = await photoResponse.blob();
//             const photoUrl = URL.createObjectURL(photoBlob);
//             return {
//               ...user,
//               photoUrl,
//             };
//           }
//           return user; // Return user without photo if photo fetch fails
//         } catch (error) {
//           // console.error(`Some pictures are not avaiables:`, error);
//           return user; // Return user without photo if there's an error
//         }
//       })
//     );

//     // Format the users data
//     return usersWithPhotos.map((user) => ({
//       id: user.id,
//       name: user.displayName,
//       email: user.mail || user.userPrincipalName,
//       jobTitle: user.jobTitle || "",
//       department: user.department || "",
//       officeLocation: user.officeLocation || "",
//       mobilePhone: user.mobilePhone || "",
//       preferredLanguage: user.preferredLanguage || "",
//       photoUrl: user.photoUrl || null, // Will be null if no photo available
//     }));
//   } catch (error) {
//     // console.error("Error fetching employees:", error);
//     return [];
//   }
// };

import { getAccessToken } from "./authProvider";
import { fetchEmployeeListData } from "apis/sharepointApi"; // Ensure this path is correct

export const getAllEmployees = async () => {
  try {
    const token = await getAccessToken();

    // First fetch all users
    const usersResponse = await fetch("https://graph.microsoft.com/v1.0/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!usersResponse.ok) {
      throw new Error(`Failed to fetch users: ${usersResponse.status}`);
    }

    const usersData = await usersResponse.json();
    const users = usersData.value;
    console.log("xxx", users);
    // Fetch employee data from SharePoint API (similar to how we used employeeData1 in getUserProfile)
    const employeeData1 = await fetchEmployeeListData();
    const employeeFieldsOnly = employeeData1.map((item) => item.fields);
    // Merge employee data with the user profile data
    const usersWithAdditionalData = users.map((user) => {
      // Find matching employee from the API data
      const match = employeeFieldsOnly.find(
        (emp) => emp.field_9?.toLowerCase() === user.mail?.toLowerCase()
      );

      // Merge the data
      return {
        id: user.id,
        name: user.displayName,
        email: user.mail || user.userPrincipalName,
        jobTitle: user.jobTitle || "",
        // department: user.department || "",
        officeLocation: user.officeLocation || "",
        mobilePhone: user.mobilePhone || "",
        preferredLanguage: user.preferredLanguage || "",
        photoUrl: user.photoUrl || null,
        employeeId: match?.field_1 || "N/A", // Employee ID
        Department: match?.field_11 || "N/A", // Department
        joiningDate: match?.field_6
          ? new Date(match.field_6).toLocaleDateString("en-GB").replaceAll("/", "-")
          : "N/A", // Date of Joining
        DateOfBirth: match?.field_5
          ? new Date(match.field_5).toLocaleDateString("en-GB").replaceAll("/", "-")
          : "N/A", // Date of Birth
        CreatedOn: match?.Created
          ? new Date(match.Created).toLocaleDateString("en-GB").replaceAll("/", "-")
          : "N/A",
        YearsOfExperienceInDatainfa: match?.field_4 || "N/A", // Years of Experience in Datainfa
        location: match?.field_13 || "N/A", // Location
        CurrentAddress: match?.CurrentAddress.replace(/<[^>]+>/g, "").trim() || "N/A", // Current Address
        PermanentAddress: match?.PermanentAddress.replace(/<[^>]+>/g, "").trim() || "N/A", // Permanent Address
        personalEmail: match?.field_8 || "N/A", // Personal Email
        OfficialEmail: match?.field_9 || "N/A", // Official Email
        phone: match?.field_10 || "N/A", // Phone Number
        reportingManager: match?.field_14 || "N/A", // Reporting Manager
        MaritalStatus: match?.field_25 || "N/A", // Marital Status
        bloodGroup: match?.field_27 || "N/A", // Blood Group
        YearsOfxperience: match?.field_3 || "N/A", // Years of Experience
        PersonalEmailId: match?.field_12 || "N/A", // Designation
        personalEmailId: match?.field_8 || "N/A", // Personal Email ID
        Gender: match?.field_24 || "N/A", // Gender
        EmployeeMentType: match?.field_15 || "N/A", // Employee Ment Type
        EmergencyContact: match?.field_16 || "N/A", // Emergency Contact
        DateOfExit: match?.field_2
          ? new Date(match.field_2).toLocaleDateString("en-GB").replaceAll("/", "-")
          : "N/A",
      };
    });

    return usersWithAdditionalData;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};
