import axios from "./axiosInstance";

// Common SharePoint sites
const SHAREPOINT_SITES = {
  DATAINFA360: "datainfasolpvtltd.sharepoint.com:/sites/DataINFA360:",
  SOLUTION_PRIVATE: "datainfasolpvtltd.sharepoint.com:/sites/DataInfaSolutionPrivateLimited:",
};

// Generic function to fetch SharePoint list items
const fetchSharePointListItems = async (siteUrl, listName) => {
  const endpoint = `/sites/${siteUrl}/lists/${encodeURIComponent(listName)}/items?expand=fields`;
  const response = await axios.get(endpoint);
  return response.data.value;
};

// Specific list fetching functions
export const fetchCertificationTracker = async () => {
  return await fetchSharePointListItems(SHAREPOINT_SITES.SOLUTION_PRIVATE, "Certification Tracker");
};

export const taskBreakdownProfilleData = async () => {
  return await fetchSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "Tasks");
};

// export const taskBreakdownProfilleData = async () => {
//   const rawData = await fetchSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "Tasks");

//   const grouped = {};

//   rawData.forEach((item) => {
//     const fields = item.fields;
//     const stakeholderName = item.createdBy.user.displayName;
//     const userEmail = item.createdBy.user.email; // Get email from user data

//     if (!grouped[stakeholderName]) {
//       grouped[stakeholderName] = {
//         name: stakeholderName,
//         tasks: [],
//         photoUrl: `https://datainfasolpvtltd.sharepoint.com/sites/DataINFA360/_layouts/15/userphoto.aspx?size=S&username=${userEmail}`, // Use userEmail here
//       };
//     }

//     grouped[stakeholderName].tasks.push({
//       name: fields.Title || "Untitled",
//       status: fields.Status || "Not Started",
//       description: fields.TaskDescription || "No description",
//       duration: fields.Duration_x0028_inHrs_x0029_ + " hrs",
//       tasktype: fields.TaskType || "General",
//       ProjectType: fields.ProjectType || "No Project",
//     });
//   });

//   return Object.values(grouped);
// };

export const fetchTaskListsData = async () => {
  return await fetchSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "ProjectsList");
};

// export const fetchTaskListsData = async () => {
//   const response = await fetchSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "ProjectsList");
//   // console.log("api side se", response);
//   return response.map((item) => ({
//     id: item.id,
//     projectName: item.fields.Title || "",
//     projectManagerName: item.fields.ProjectManager || "",
//     projectOwner: {
//       name: item.createdBy?.user?.displayName || "",
//       email: item.createdBy?.user?.email || "",
//     },
//     shiftTimings: item.fields.ShiftTimings || "",
//     teamMembers: (item.fields.TeamMembers || []).map((member) => ({
//       id: member.LookupId,
//       name: member.LookupValue,
//       email: member.Email,
//       photoUrl: `https://datainfasolpvtltd.sharepoint.com/sites/DataINFA360/_layouts/15/userphoto.aspx?size=S&username=${member.Email}`,
//     })),
//     projectApprover: {
//       email: item.fields.ProjectApproverEmail || "",
//     },
//   }));
// };
