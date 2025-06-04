import { getAccessToken } from "./authProvider";

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

    // Fetch photos for each user
    const usersWithPhotos = await Promise.all(
      users.map(async (user) => {
        try {
          const photoResponse = await fetch(
            `https://graph.microsoft.com/v1.0/users/${user.id}/photo/$value`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (photoResponse.ok) {
            const photoBlob = await photoResponse.blob();
            const photoUrl = URL.createObjectURL(photoBlob);
            return {
              ...user,
              photoUrl,
            };
          }
          return user; // Return user without photo if photo fetch fails
        } catch (error) {
          // console.error(`Some pictures are not avaiables:`, error);
          return user; // Return user without photo if there's an error
        }
      })
    );

    // Format the users data
    return usersWithPhotos.map((user) => ({
      id: user.id,
      name: user.displayName,
      email: user.mail || user.userPrincipalName,
      jobTitle: user.jobTitle || "",
      department: user.department || "",
      officeLocation: user.officeLocation || "",
      mobilePhone: user.mobilePhone || "",
      preferredLanguage: user.preferredLanguage || "",
      photoUrl: user.photoUrl || null, // Will be null if no photo available
    }));
  } catch (error) {
    // console.error("Error fetching employees:", error);
    return [];
  }
};
