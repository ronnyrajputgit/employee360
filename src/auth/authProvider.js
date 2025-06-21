import { msalInstance } from "./msalInstance";
import { loginRequest } from "./authConfig";
export const getAccessToken = async () => {
  try {
    // Wait for MSAL to initialize
    await msalInstance.initialize();
    const accounts = msalInstance.getAllAccounts();
    let account = accounts[0];

    if (!account) {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      account = loginResponse.account;
    }

    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });

    return response.accessToken;
  } catch (err) {
    console.error("Token fetch failed", err);
    throw err;
  }
};
