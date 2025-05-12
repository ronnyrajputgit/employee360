export const msalConfig = {
  auth: {
    clientId: "fa989f96-0f25-4c14-bf9c-1d5c4558a22f",
    authority: "https://login.microsoftonline.com/48f4df94-a7ee-42c5-a469-7c905d0e28ef",
    redirectUri: window.location.origin.includes("localhost")
      ? "http://localhost:3000"
      : "https://employee360.vercel.app",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Sites.Read.All"],
};
