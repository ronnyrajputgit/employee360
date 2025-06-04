// // Material Dashboard 2 React layouts
// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// // import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// // import SignIn from "layouts/authentication/sign-in";
// // import SignUp from "layouts/authentication/sign-up";

// // @mui icons
// import Icon from "@mui/material/Icon";
// import ProjectOverview from "Pages/ProjectOverview/ProjectOverview";
// import WorkforceAnalytics from "Pages/WorkforceAnalytics/WorkforceAnalytics";
// import Employees from "Pages/Employees/Employees";

// const routes = [
//   {
//     type: "collapse",
//     name: "Profile",
//     key: "profile",
//     icon: <Icon fontSize="small">person</Icon>,
//     route: "/profile",
//     component: <Profile />,
//   },
//   {
//     type: "collapse",
//     name: "Employees",
//     key: "employee",
//     icon: <Icon fontSize="small">groups</Icon>,
//     route: "/employee",
//     component: <Employees />,
//   },
//   {
//     type: "collapse",
//     name: "Dashboard",
//     key: "dashboard",
//     icon: <Icon fontSize="small">dashboard</Icon>,
//     route: "/dashboard",
//     component: <Dashboard />,
//   },
//   {
//     type: "collapse",
//     name: "Tables",
//     key: "tables",
//     icon: <Icon fontSize="small">table_view</Icon>,
//     route: "/tables",
//     component: <Tables />,
//   },
//   {
//     type: "collapse",
//     name: "Project Overview",
//     key: "project overview",
//     icon: <Icon fontSize="small">subtitles</Icon>,
//     route: "/projectoverview",
//     component: <ProjectOverview />,
//   },
//   {
//     type: "collapse",
//     name: "Workforce Analytics",
//     key: "workforce analytics",
//     icon: <Icon fontSize="small">work</Icon>,
//     route: "/workforceanalytics",
//     component: <WorkforceAnalytics />,
//   },

//   {
//     type: "collapse",
//     name: "Billing",
//     key: "billing",
//     icon: <Icon fontSize="small">receipt_long</Icon>,
//     route: "/billing",
//     component: <Billing />,
//   },
//   // {
//   //   type: "collapse",
//   //   name: "RTL",
//   //   key: "rtl",
//   //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
//   //   route: "/rtl",
//   //   component: <RTL />,
//   // },
//   {
//     type: "collapse",
//     name: "Notifications",
//     key: "notifications",
//     icon: <Icon fontSize="small">notifications</Icon>,
//     route: "/notifications",
//     component: <Notifications />,
//   },
//   // {
//   //   type: "collapse",
//   //   name: "Sign In",
//   //   key: "sign-in",
//   //   icon: <Icon fontSize="small">login</Icon>,
//   //   route: "/authentication/sign-in",
//   //   component: <SignIn />,
//   // },
//   // {
//   //   type: "collapse",
//   //   name: "Sign Up",
//   //   key: "sign-up",
//   //   icon: <Icon fontSize="small">assignment</Icon>,
//   //   route: "/authentication/sign-up",
//   //   component: <SignUp />,
//   // },
// ];

// export default routes;

import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import ProjectOverview from "Pages/ProjectOverview/ProjectOverview";
import WorkforceAnalytics from "Pages/WorkforceAnalytics/WorkforceAnalytics";
import Employees from "Pages/Employees/Employees";
import Icon from "@mui/material/Icon";

// Get user role
const userProfile = JSON.parse(localStorage.getItem("userProfileDetails") || "{}");
// const userRole = (userProfile.jobTitle || "").trim();
const userRole = "coo";

// Define executive roles
const executiveRoles = ["COO", "CPTO", "Director of Cloud Innovation", "AI & Program Management"];
const isExecutive = executiveRoles.some((role) =>
  userRole.toLowerCase().includes(role.toLowerCase())
);

// Define base routes
const routes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Project Overview",
    key: "project overview",
    icon: <Icon fontSize="small">subtitles</Icon>,
    route: "/projectoverview",
    component: <ProjectOverview />,
  },
  {
    type: "collapse",
    name: "Workforce Analytics",
    key: "workforce analytics",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/workforceanalytics",
    component: <WorkforceAnalytics />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
];

// ✅ Conditionally add "Employees" tab if user is executive
if (isExecutive) {
  routes.splice(1, 0, {
    type: "collapse",
    name: "Employees",
    key: "employee",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/employee",
    component: <Employees />,
  });
}

export default routes;
