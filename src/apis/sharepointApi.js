import axios from "./axiosInstance";

// Example: fetch from one list
export const fetchCertificationTracker = async () => {
  const siteUrl = "datainfasolpvtltd.sharepoint.com:/sites/DataInfaSolutionPrivateLimited:";
  const listName = "Certification Tracker";

  const endpoint = `/sites/${siteUrl}/lists/${encodeURIComponent(listName)}/items?expand=fields`;

  const response = await axios.get(endpoint);
  return response.data.value;
};

// Add more functions for other lists here
export const taskBreakdownProfilleData = async () => {
  const siteUrl = "datainfasolpvtltd.sharepoint.com:/sites/DataINFA360:"; // Note the trailing colon
  const listName = "Tasks";

  const endpoint = `/sites/${siteUrl}/lists/${encodeURIComponent(listName)}/items?expand=fields`;

  const response = await axios.get(endpoint);
  return response.data.value;
};
// make sure axios instance is imported
