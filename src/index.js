import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { GlobalFilterProvider } from "context/GlobalFilterContext";
import { UserRoleBasedProvider } from "context/RoleBasedAccess";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <UserRoleBasedProvider>
    <GlobalFilterProvider>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </GlobalFilterProvider>
  </UserRoleBasedProvider>
);
