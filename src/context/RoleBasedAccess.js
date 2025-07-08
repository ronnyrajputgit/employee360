// import React, { createContext, useContext, useMemo } from "react";
// import PropTypes from "prop-types";

// // 1. Create the context
// const UserRoleContext = createContext();

// // 2. Create the provider
// export const UserRoleBasedProvider = ({ children }) => {
//   // SSR/localStorage fallback handling
//   let userProfile = {};
//   if (typeof window !== "undefined") {
//     userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
//   }

//   const userRole = (userProfile.jobTitle || "").trim();
//   // const userRole = "coo";
//   // Executive logic (can be replaced with dynamic logic if needed)
//   const executiveRoles = ["COO", "CPTO", "Director of Cloud Innovation", "AI & Program Management"];

//   const isExecutive = executiveRoles.some((role) =>
//     userRole.toLowerCase().includes(role.toLowerCase())
//   );

//   // Memoized context value
//   const contextValue = useMemo(
//     () => ({ userRole, isExecutive, userProfile }),
//     [userRole, isExecutive]
//   );

//   return <UserRoleContext.Provider value={contextValue}>{children}</UserRoleContext.Provider>;
// };

// // ✅ ESLint fix: define PropTypes
// UserRoleBasedProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// // 3. Hook for easy access
// export const useRoleBasedAccess = () => useContext(UserRoleContext);

import React, { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";

// 1. Create the context
const UserRoleContext = createContext();

// 2. Create the provider
export const UserRoleBasedProvider = ({ children }) => {
  // SSR/localStorage fallback handling
  let userProfile = {};
  if (typeof window !== "undefined") {
    userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
  }

  // const userRole = "COO";
  const userRole = (userProfile.jobTitle || "").trim();
  const currentName = (userProfile.displayName || "").trim().toLowerCase();

  const executiveRoles = ["COO", "CPTO", "Director of Cloud Innovation", "AI & Program Management"];

  const isExecutive = executiveRoles.some((role) =>
    userRole.toLowerCase().includes(role.toLowerCase())
  );

  // Memoized context value
  const contextValue = useMemo(
    () => ({ userRole, currentName, isExecutive, userProfile }),
    [userRole, currentName, isExecutive]
  );

  return <UserRoleContext.Provider value={contextValue}>{children}</UserRoleContext.Provider>;
};

// ✅ ESLint fix: define PropTypes
UserRoleBasedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 3. Hook for easy access
export const useRoleBasedAccess = () => useContext(UserRoleContext);
