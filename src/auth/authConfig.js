// export const msalConfig = {
//   auth: {
//     clientId: "fa989f96-0f25-4c14-bf9c-1d5c4558a22f",
//     authority: "https://login.microsoftonline.com/48f4df94-a7ee-42c5-a469-7c905d0e28ef",
//     redirectUri: window.location.origin.includes("localhost")
//       ? "http://localhost:3000"
//       : "https://employee360.vercel.app",
//   },
//   cache: {
//     cacheLocation: "sessionStorage",
//     storeAuthStateInCookie: false,
//   },
// };

// export const loginRequest = {
//   scopes: ["User.Read", "Sites.Read.All"],
// };

const isLocalhost = window.location.origin.includes("localhost");

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MSAL_CLIENT_ID,
    authority: process.env.REACT_APP_MSAL_AUTHORITY,
    redirectUri: isLocalhost
      ? process.env.REACT_APP_MSAL_REDIRECT_URI_LOCAL
      : process.env.REACT_APP_MSAL_REDIRECT_URI_PROD,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  // scopes: ["User.Read", "Sites.Read.All"],
  // to get the user's profile required admin permissions
  scopes: ["User.Read", "User.Read.All", "Sites.Read.All"],
};
