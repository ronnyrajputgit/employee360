import axios from "./axiosInstance";

// Common SharePoint sites
const SHAREPOINT_SITES = {
  DATAINFA360: "datainfasolpvtltd.sharepoint.com:/sites/DataINFA360:",
  SOLUTION_PRIVATE: "datainfasolpvtltd.sharepoint.com:/sites/DataInfaSolutionPrivateLimited:",
};

// Helper function to fetch all pages
const fetchAllSharePointListItems = async (siteUrl, listName, lookupFields = []) => {
  const baseExpand = ["fields", ...lookupFields.map((field) => `fields/${field}`)].join(",");
  let endpoint = `/sites/${siteUrl}/lists/${encodeURIComponent(
    listName
  )}/items?expand=${baseExpand}&$top=5000`;
  let allItems = [];
  let nextLink = null;

  do {
    const response = await axios.get(endpoint);
    const data = response.data;
    allItems = allItems.concat(data.value);

    // SharePoint Graph API pagination: @odata.nextLink
    nextLink = data["@odata.nextLink"];
    if (nextLink) {
      // If nextLink is absolute, remove domain part for axios instance
      const url = new URL(nextLink);
      endpoint = url.pathname + url.search;
    }
  } while (nextLink);

  return allItems;
};

// Specific list fetching functions
export const fetchCertificationTracker = async () => {
  return await fetchAllSharePointListItems(
    SHAREPOINT_SITES.SOLUTION_PRIVATE,
    "Certification Tracker"
  );
};

export const taskBreakdownProfilleData = async () => {
  return await fetchAllSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "Tasks", [
    "Customer",
    "Internal",
  ]);
};

export const fetchTaskListsData = async () => {
  return await fetchAllSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "ProjectsList", [
    "ProjectOwner",
  ]);
};
// export const fetchSkillInventoryData = async () => {
//   return await fetchAllSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "SkillsInventory");
// };
export const fetchSkillInventoryData = async () => {
  return await fetchAllSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "SkillsInventory", [
    "Resource",
    "Skill",
    "ProjectExperience",
  ]);
};

// fetch Employee List Data
export const fetchEmployeeListData = async () => {
  return await fetchAllSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "EmployeeInformation");
};

export const fetchWorkTrackerData = async () => {
  return await fetchAllSharePointListItems(SHAREPOINT_SITES.DATAINFA360, "WorkTracker", [
    "Project",
    "Category",
    "RelatedIssue",
    "Assignedto0",
  ]);
};
