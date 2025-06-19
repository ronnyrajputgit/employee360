import { fetchEmployeeListData } from "apis/sharepointApi";
import { getAccessToken } from "./authProvider";

// Default fallback profile image
const DEFAULT_PROFILE_IMAGE = "/default-profile.png";

// Fetch employee data from API
const employeeData1 = await fetchEmployeeListData();

// Map over the fetched data to extract fields
const employeeFieldsOnly = employeeData1.map((item) => item.fields);

export const getUserProfile = async () => {
  try {
    const token = await getAccessToken();

    // Fetch Microsoft user profile
    const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch user profile: ${profileResponse.status}`);
    }

    const profile = await profileResponse.json();
    localStorage.setItem("userProfileDetails", JSON.stringify(profile));

    // Fetch profile photo
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
    } catch {
      console.warn("Profile photo not found. Using default.");
    }

    // Find matching employee from the API data
    const match = employeeFieldsOnly.find(
      (emp) => emp.field_9?.toLowerCase() === profile.mail.toLowerCase()
    );

    // Return merged object with dynamic fields and profile data directly
    return {
      name: profile.displayName,
      givenName: profile.givenName || "",
      email: profile.mail || profile.userPrincipalName,
      jobTitle: profile.jobTitle || "N/A",
      photo: photoUrl,
      employeeId: match?.field_1 || "N/A", // Employee ID
      Department: match?.field_11 || "N/A", // Department
      joiningDate: match?.field_6
        ? new Date(match.field_6).toLocaleDateString("en-GB").replaceAll("/", "-")
        : "N/A", // Date of Joining
      DateOfBirth: match?.field_5
        ? new Date(match.field_5).toLocaleDateString("en-GB").replaceAll("/", "-")
        : "N/A",
      DateOfExit: match?.field_2
        ? new Date(match.field_2).toLocaleDateString("en-GB").replaceAll("/", "-")
        : "N/A",
      CreatedOn: match?.Created
        ? new Date(match.Created).toLocaleDateString("en-GB").replaceAll("/", "-")
        : "N/A",
      YearsOfExperienceInDatainfa: match?.field_4 || "N/A",
      location: match?.field_13 || "N/A", // Location
      CurrentAddress: match.CurrentAddress.replace(/<[^>]+>/g, "").trim(),
      PermanentAddress: match?.PermanentAddress.replace(/<[^>]+>/g, "").trim() || "N/A", // Permanent Address
      personalEmail: match?.field_8 || "N/A", // Personal Email
      OfficialEmail: match?.field_9 || "N/A", // Official Email
      phone: match?.field_10 || "N/A", // Phone Number
      reportingManager: match?.field_14 || "N/A", // Reporting Manager
      bloodGroup: match?.field_27 || "N/A", // Blood Group
      YearsOfxperience: match?.field_3 || "N/A",
      Designation: match?.field_12 || "N/A",
      PersonalEmailId: match?.field_8 || "N/A",
      Gender: match?.field_24 || "N/A",
      EmployeeMentType: match?.field_15 || "N/A",
      EmergencyContact: match?.field_16 || "N/A",
      MaritalStatus: match?.field_25 || "N/A",
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
