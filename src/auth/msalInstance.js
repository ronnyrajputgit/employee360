import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL
msalInstance.initialize().catch((error) => {
  console.error("MSAL Initialization Error:", error);
});
