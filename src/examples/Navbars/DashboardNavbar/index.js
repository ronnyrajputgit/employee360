// import { useState, useEffect } from "react";
// import { useLocation, Link } from "react-router-dom";
// import PropTypes from "prop-types";

// // @mui/material components
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";

// // Material Dashboard 2 React example components
// import Breadcrumbs from "examples/Breadcrumbs";
// import NotificationItem from "examples/Items/NotificationItem";

// // Custom styles for DashboardNavbar
// import {
//   navbar,
//   navbarContainer,
//   navbarRow,
//   navbarIconButton,
//   navbarMobileMenu,
// } from "examples/Navbars/DashboardNavbar/styles";

// // Material Dashboard 2 React context
// import {
//   useMaterialUIController,
//   setTransparentNavbar,
//   setMiniSidenav,
//   setOpenConfigurator,
// } from "context";

// // Global Filters context
// import { useGlobalFilters } from "context/GlobalFilterContext";

// function DashboardNavbar({ absolute, light, isMini }) {
//   const [navbarType, setNavbarType] = useState();
//   const [controller, dispatch] = useMaterialUIController();
//   const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
//   const [openMenu, setOpenMenu] = useState(false);
//   const route = useLocation().pathname.split("/").slice(1);

//   const { filters = {}, setFilters } = useGlobalFilters();
//   const {
//     searchByName = "",
//     selectedProjectType = "",
//     selectedShift = "",
//     selectedCreatedBy = "",
//     selectedTeamMember = "",
//     projectTypeList = [],
//     shiftList = [],
//     createdByList = [],
//     teamMembersList = [],
//   } = filters;

//   console.log("filters hoke kya values aa rha hai", filters);
//   const handleFilterChange = (field, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   useEffect(() => {
//     if (fixedNavbar) setNavbarType("sticky");
//     else setNavbarType("static");

//     const handleTransparentNavbar = () => {
//       setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
//     };

//     window.addEventListener("scroll", handleTransparentNavbar);
//     handleTransparentNavbar();

//     return () => window.removeEventListener("scroll", handleTransparentNavbar);
//   }, [dispatch, fixedNavbar]);

//   const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
//   const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
//   const handleCloseMenu = () => setOpenMenu(false);

//   const renderMenu = () => (
//     <Menu
//       anchorEl={openMenu}
//       anchorReference={null}
//       anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       open={Boolean(openMenu)}
//       onClose={handleCloseMenu}
//       sx={{ mt: 2 }}
//     >
//       <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
//       <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
//       <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
//     </Menu>
//   );

//   const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
//     color: () => {
//       let colorValue = light || darkMode ? white.main : dark.main;
//       if (transparentNavbar && !light) {
//         colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
//       }
//       return colorValue;
//     },
//   });

//   return (
//     <AppBar
//       position={absolute ? "absolute" : navbarType}
//       color="inherit"
//       sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
//     >
//       <Toolbar sx={(theme) => navbarContainer(theme)}>
//         <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
//           <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
//         </MDBox>

//         {!isMini && (
//           <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
//             <MDBox pr={1}>
//               <MDInput
//                 label="Search By Name"
//                 value={searchByName}
//                 onChange={(e) => handleFilterChange("searchByName", e.target.value)}
//                 fullWidth
//               />
//             </MDBox>

//             <MDBox pr={1}>
//               <MDInput
//                 select
//                 size="small"
//                 label="Project Type"
//                 value={selectedProjectType}
//                 onChange={(e) => handleFilterChange("selectedProjectType", e.target.value)}
//               >
//                 <MenuItem value="">All Types</MenuItem>
//                 {projectTypeList.map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </MDInput>
//             </MDBox>

//             <MDBox pr={1}>
//               <MDInput
//                 select
//                 size="small"
//                 label="Shift"
//                 value={selectedShift}
//                 onChange={(e) => handleFilterChange("selectedShift", e.target.value)}
//               >
//                 <MenuItem value="">All Shifts</MenuItem>
//                 {shiftList.map((shift) => (
//                   <MenuItem key={shift} value={shift}>
//                     {shift}
//                   </MenuItem>
//                 ))}
//               </MDInput>
//             </MDBox>

//             <MDBox pr={1}>
//               <MDInput
//                 select
//                 size="small"
//                 label="Created By"
//                 value={selectedCreatedBy}
//                 onChange={(e) => handleFilterChange("selectedCreatedBy", e.target.value)}
//               >
//                 <MenuItem value="">All Users</MenuItem>
//                 {createdByList.map((user) => (
//                   <MenuItem key={user} value={user}>
//                     {user}
//                   </MenuItem>
//                 ))}
//               </MDInput>
//             </MDBox>

//             <MDBox pr={1}>
//               <MDInput
//                 select
//                 size="small"
//                 label="Team Member"
//                 value={selectedTeamMember}
//                 onChange={(e) => handleFilterChange("selectedTeamMember", e.target.value)}
//               >
//                 <MenuItem value="">All Members</MenuItem>
//                 {teamMembersList.map((member) => (
//                   <MenuItem key={member} value={member}>
//                     {member}
//                   </MenuItem>
//                 ))}
//               </MDInput>
//             </MDBox>

//             <MDBox color={light ? "white" : "inherit"}>
//               <Link to="/authentication/sign-in/basic">
//                 <IconButton sx={navbarIconButton} size="small" disableRipple>
//                   <Icon sx={iconsStyle}>account_circle</Icon>
//                 </IconButton>
//               </Link>

//               <IconButton
//                 size="small"
//                 disableRipple
//                 color="inherit"
//                 sx={navbarMobileMenu}
//                 onClick={handleMiniSidenav}
//               >
//                 <Icon sx={iconsStyle} fontSize="medium">
//                   {miniSidenav ? "menu_open" : "menu"}
//                 </Icon>
//               </IconButton>

//               <IconButton
//                 size="small"
//                 disableRipple
//                 color="inherit"
//                 sx={navbarIconButton}
//                 onClick={handleConfiguratorOpen}
//               >
//                 <Icon sx={iconsStyle}>settings</Icon>
//               </IconButton>

//               <IconButton
//                 size="small"
//                 disableRipple
//                 color="inherit"
//                 sx={navbarIconButton}
//                 aria-controls="notification-menu"
//                 aria-haspopup="true"
//                 onClick={handleOpenMenu}
//               >
//                 <Icon sx={iconsStyle}>notifications</Icon>
//               </IconButton>

//               {renderMenu()}
//             </MDBox>
//           </MDBox>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }

// DashboardNavbar.defaultProps = {
//   absolute: false,
//   light: false,
//   isMini: false,
// };

// DashboardNavbar.propTypes = {
//   absolute: PropTypes.bool,
//   light: PropTypes.bool,
//   isMini: PropTypes.bool,
// };

// export default DashboardNavbar;

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";

// @mui/material components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Global Filters context
import { useGlobalFilters } from "context/GlobalFilterContext";
import { Box, FormControl, InputLabel, Select } from "@mui/material";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    if (fixedNavbar) setNavbarType("sticky");
    else setNavbarType("static");

    const handleTransparentNavbar = () => {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    };

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // filter things

  const { updateFilter, filterOptions, filters } = useGlobalFilters();
  // console.log("Filter", filters);
  // console.log("filter options", filterOptions);
  // console.log("updateFilter", updateFilter);
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;
      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }
      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>

        {!isMini && (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <MDBox pr={1}>
              <MDInput
                label="Search By Name"
                value={filters.projectName}
                onChange={(e) => updateFilter("projectName", e.target.value)}
                fullWidth
              />
            </MDBox> */}
            {/* customer fiter values like GE,Noc From task  sttart */}

            <MDBox pr={1}>
              <MDInput
                sx={{
                  m: 1,
                  minWidth: 135,
                  "& .MuiInputBase-root": {
                    height: 40, // You can increase this value for more height
                    borderRadius: 2,
                  },
                  "& .MuiSelect-select": {
                    paddingTop: 1.5,
                    paddingBottom: 1.5,
                  },
                }}
                select
                // size="small"
                label="Select Created By"
                // value={filters.customer}
                // onChange={(e) => updateFilter("customer", e.target.value)}
                value={filters.createdBy}
                onChange={(e) => updateFilter("createdBy", e.target.value)}
                fullWidth
              >
                <MenuItem value="">All Types</MenuItem>
                {filterOptions.createdBy?.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </MDInput>
            </MDBox>
            {/* customer fiter values like GE,Noc From task end */}

            <MDBox pr={1}>
              <MDInput
                sx={{
                  m: 1,
                  minWidth: 135,
                  "& .MuiInputBase-root": {
                    height: 40, // You can increase this value for more height
                    borderRadius: 2,
                  },
                  "& .MuiSelect-select": {
                    paddingTop: 1.5,
                    paddingBottom: 1.5,
                  },
                }}
                select
                // size="small"
                label="Select Company"
                value={filters.projectName}
                onChange={(e) => updateFilter("projectName", e.target.value)}
                fullWidth
              >
                <MenuItem value="">All Types</MenuItem>
                {filterOptions.projectName?.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </MDInput>
            </MDBox>
            {/* <MDBox pr={1}>
              <MDInput
                sx={{
                  m: 1,
                  minWidth: 135,
                  "& .MuiInputBase-root": {
                    height: 40, // You can increase this value for more height
                    borderRadius: 2,
                  },
                  "& .MuiSelect-select": {
                    paddingTop: 1.5,
                    paddingBottom: 1.5,
                  },
                }}
                select
                // size="small"
                label="Select Project Type"
                // value={filters.projectType}
                value={filters.projectType}
                onChange={(e) => updateFilter("projectType", e.target.value)}
                fullWidth
              >
                <MenuItem value="">All Types</MenuItem>
                {filterOptions.tasks?.projectType?.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </MDInput>
            </MDBox> */}

            <MDBox color={light ? "white" : "inherit"}>
              <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>

              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
