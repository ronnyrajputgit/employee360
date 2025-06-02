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
    const users = data.value;

    // Optional: You can format users or add filters here
    return users.map((user) => ({
      id: user.id,
      name: user.displayName,
      email: user.mail || user.userPrincipalName,
      jobTitle: user.jobTitle || "",
      department: user.department || "",
    }));
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};
