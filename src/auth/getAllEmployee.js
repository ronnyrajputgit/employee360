import { getAccessToken } from "./authProvider";

export const getAllEmployees = async () => {
  try {
    const token = await getAccessToken();

    const response = await fetch("https://graph.microsoft.com/v1.0/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = await response.json();
    console.log("all data", data);
    const users = data.value;

    // Optional: You can format users or add filters here
    return users.map((user) => ({
      id: user.id,
      name: user.displayName,
      email: user.mail || user.mail,
      jobTitle: user.jobTitle || "",
      department: user.department || "",
      officeLocation: user.officeLocation || "",
      mobilePhone: user.mobilePhone || "",
      preferredLanguage: user.preferredLanguage || "",
    }));
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};
