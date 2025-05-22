// import React, { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { taskBreakdownProfilleData, fetchTaskListsData } from "apis/sharepointApi";

// const GlobalFilterContext = createContext();

// // Step 1: API map
// const apiMap = {
//   tasks: taskBreakdownProfilleData,
//   projects: fetchTaskListsData,
//   // Add more here...
// };

// const currentName = localStorage.getItem("currentName");

// // Step 2: Transformers to format each API response
// const transformers = {
//   tasks: (raw) =>
//     raw.map((item) => ({
//       ProjectType: item.fields?.ProjectType || "",
//       TaskName: item.fields?.Title || "",
//       TaskDescription: item.fields?.TaskDescription || "",

//       TaskType: item.fields?.TaskType || "",
//       createdBy: item.createdBy?.user?.displayName || "",
//       CreatedDateTime: item.createdDateTime || "",
//       Duration: item.fields?.Duration_x0028_inHrs_x0029_ || "",
//       photoUrl: item.createdBy?.user?.email
//         ? `https://datainfasolpvtltd.sharepoint.com/sites/DataINFA360/_layouts/15/userphoto.aspx?size=S&username=${item.createdBy.user.email}`
//         : "",
//     })),
//   projects: (raw) =>
//     raw.map((item) => ({
//       ProjectName: item.fields?.Title || "",
//       ProjectOwnerName: item.fields.ProjectManager || "",
//       CreatedBy: item.createdBy?.user?.displayName || "",
//       CreatedDateTime: item.createdDateTime || "",
//       ShiftTimings: item.fields.ShiftTimings || "",
//       TeamMembers: (item.fields.TeamMembers || []).map((member) => ({
//         id: member.LookupId,
//         name: member.LookupValue,
//         email: member.Email,
//         photoUrl: `https://datainfasolpvtltd.sharepoint.com/sites/DataINFA360/_layouts/15/userphoto.aspx?size=S&username=${member.Email}`,
//       })),
//     })),
// };

// // Step 3: Filter key mapping
// const filterKeyMap = {
//   tasks: {
//     projectType: "ProjectType",
//     taskType: "TaskType",
//     createdBy: "createdBy",
//     search: ["TaskName", "TaskDescription"],
//   },
//   projects: {
//     projectName: "ProjectName",
//     createdBy: "CreatedBy",
//     search: ["ProjectName"],
//   },
// };

// // Step 4: Helper to get unique values
// const getUnique = (arr, key) => [...new Set(arr.map((i) => i[key]).filter(Boolean))];

// // Step 5: Generic filter application logic
// const applyFilters = (data, filters, keyMap) => {
//   return data.filter((item) =>
//     Object.entries(filters).every(([fKey, fVal]) => {
//       if (!fVal) return true;

//       const mapKey = keyMap[fKey];
//       if (!mapKey) return true;

//       if (Array.isArray(mapKey)) {
//         const val = fVal.toLowerCase();
//         return mapKey.some((k) => (item[k] || "").toLowerCase().includes(val));
//       }
//       return (item[mapKey] || "").toLowerCase() === fVal.toLowerCase();
//     })
//   );
// };

// // MAIN PROVIDER COMPONENT
// export const GlobalFilterProvider = ({ children }) => {
//   const [rawData, setRawData] = useState({});
//   const [filters, setFilters] = useState({
//     projectType: "",
//     taskType: "",
//     createdBy: "",
//     search: "",
//     projectName: "",
//   });
//   const [filteredData, setFilteredData] = useState({});
//   const [filterOptions, setFilterOptions] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Fetch and transform all APIs
//   useEffect(() => {
//     const fetchAll = async () => {
//       setLoading(true);
//       try {
//         const entries = Object.entries(apiMap);
//         const results = await Promise.all(entries.map(([_, fn]) => fn()));

//         const transformed = {};
//         entries.forEach(([key], i) => {
//           transformed[key] = transformers[key] ? transformers[key](results[i]) : results[i];
//         });

//         setRawData(transformed);

//         // Prepare filter dropdowns
//         const options = {};
//         for (const key in transformed) {
//           options[key] = {};
//           const keyMap = filterKeyMap[key] || {};
//           for (const fKey in keyMap) {
//             if (fKey === "search") continue;
//             const mappedField = keyMap[fKey];
//             options[key][fKey] = getUnique(transformed[key], mappedField);
//           }
//         }
//         setFilterOptions(options);
//         setFilteredData(transformed);
//       } catch (e) {
//         console.error("Data fetch error:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   // Apply filters on change
//   useEffect(() => {
//     const updated = {};
//     for (const key in rawData) {
//       updated[key] = applyFilters(rawData[key], filters, filterKeyMap[key] || {});
//     }
//     setFilteredData(updated);
//   }, [filters, rawData]);

//   const updateFilter = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <GlobalFilterContext.Provider
//       value={{
//         filters,
//         updateFilter,
//         filteredData,
//         filterOptions,
//         loading,
//       }}
//     >
//       {children}
//     </GlobalFilterContext.Provider>
//   );
// };

// // Hook
// export const useGlobalFilters = () => {
//   const context = useContext(GlobalFilterContext);
//   if (!context) {
//     throw new Error("useGlobalFilters must be used within GlobalFilterProvider");
//   }
//   return context;
// };

// GlobalFilterProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { taskBreakdownProfilleData, fetchTaskListsData } from "apis/sharepointApi";

const GlobalFilterContext = createContext();

// Step 1: API map
const apiMap = {
  tasks: taskBreakdownProfilleData,
  projects: fetchTaskListsData,
  // Add more here...
};

// Step 2: Transformers to format each API response
const transformers = {
  tasks: (raw) =>
    raw.map((item) => ({
      ProjectType: item.fields?.ProjectType || "",
      Customer: item.fields?.Customer || "",
      TaskName: item.fields?.Title || "",
      Internal: item.fields?.Internal || "",
      TaskDescription: item.fields?.TaskDescription || "",
      TaskType: item.fields?.TaskType || "",
      createdBy: item.createdBy?.user?.displayName || "",
      CreatedDateTime: item.createdDateTime || "",
      Duration: item.fields?.Duration_x0028_inHrs_x0029_ || "",
      photoUrl: `https://datainfasolpvtltd.sharepoint.com/sites/DataINFA360/_layouts/15/userphoto.aspx?size=S&username=${item.createdBy.user.email}`,
    })),
  projects: (raw) =>
    raw.map((item) => ({
      // ...item,
      ProjectName: item.fields?.Title || "",
      ProjectOwner: item.fields?.ProjectOwner || "",
      ProjectOwnerName: item.fields.ProjectManager || "",
      CreatedBy: item.createdBy?.user?.displayName || "",
      CreatedDateTime: item.createdDateTime || "",
      ShiftTimings: item.fields.ShiftTimings || "",
      TeamMembers: (item.fields.TeamMembers || []).map((member) => ({
        id: member.LookupId,
        name: member.LookupValue,
        email: member.Email,
        // photoUrl: `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${member.Email}&size=HR64x64`,
        photoUrl: `https://datainfasolpvtltd.sharepoint.com/sites/DataINFA360/_layouts/15/userphoto.aspx?size=S&username=${member.Email}`,
      })),
    })),
};

// Step 3: Filter key mapping
const filterKeyMap = {
  tasks: {
    projectType: "ProjectType",
    taskType: "TaskType",
    createdBy: "createdBy",
    search: ["TaskName", "TaskDescription"],
    customer: "Customer",
  },
  projects: {
    projectName: "ProjectName",
    createdBy: "CreatedBy",
    search: ["ProjectName"],
  },
};

// Step 4: Helper to get unique values
const getUnique = (arr, key) => [...new Set(arr.map((i) => i[key]).filter(Boolean))];

// Step 5: Generic filter application logic
const applyFilters = (data, filters, keyMap) => {
  return data.filter((item) =>
    Object.entries(filters).every(([fKey, fVal]) => {
      if (!fVal) return true;

      const mapKey = keyMap[fKey];
      if (!mapKey) return true;

      if (Array.isArray(mapKey)) {
        const val = fVal.toLowerCase();
        return mapKey.some((k) => (item[k] || "").toLowerCase().includes(val));
      }
      return (item[mapKey] || "").toLowerCase() === fVal.toLowerCase();
    })
  );
};

// Step 6: Sort by CreatedDateTime (descending)
const sortByCreatedDateTime = (data) =>
  [...data].sort((a, b) => new Date(b.CreatedDateTime) - new Date(a.CreatedDateTime));

// MAIN PROVIDER COMPONENT
export const GlobalFilterProvider = ({ children }) => {
  const [rawData, setRawData] = useState({});
  const [filters, setFilters] = useState({
    projectType: "",
    taskType: "",
    createdBy: "",
    search: "",
    projectName: "",
    customer: "",
  });
  const [filteredData, setFilteredData] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState({}); // New state for tracking active filters

  // Fetch and transform all APIs
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const entries = Object.entries(apiMap);
        const results = await Promise.all(entries.map(([_, fn]) => fn()));

        const transformed = {};
        entries.forEach(([key], i) => {
          transformed[key] = transformers[key] ? transformers[key](results[i]) : results[i];
        });

        setRawData(transformed);

        // Prepare filter dropdowns
        const options = {};
        for (const key in transformed) {
          options[key] = {};
          const keyMap = filterKeyMap[key] || {};
          for (const fKey in keyMap) {
            if (fKey === "search") continue;
            const mappedField = keyMap[fKey];
            options[key][fKey] = getUnique(transformed[key], mappedField);
          }
        }
        setFilterOptions(options);
        setFilteredData(transformed);
      } catch (e) {
        console.error("Data fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Apply filters and sort
  useEffect(() => {
    const updated = {};
    const newActiveSource = {};

    for (const key in rawData) {
      const filtered = applyFilters(rawData[key], filters, filterKeyMap[key] || {});
      updated[key] = sortByCreatedDateTime(filtered);

      // Check if any filter is active for this source
      const sourceFilters = filterKeyMap[key] || {};
      newActiveSource[key] = Object.entries(filters).some(([fKey, fVal]) => {
        return sourceFilters[fKey] && fVal !== "";
      });
    }

    setFilteredData(updated);
    setActiveSource(newActiveSource);
  }, [filters, rawData]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <GlobalFilterContext.Provider
      value={{
        filters,
        updateFilter,
        filteredData,
        filterOptions,
        loading,
        activeSource, // Expose activeSource to consumers
      }}
    >
      {children}
    </GlobalFilterContext.Provider>
  );
};

// Hook
export const useGlobalFilters = () => {
  const context = useContext(GlobalFilterContext);
  if (!context) {
    throw new Error("useGlobalFilters must be used within GlobalFilterProvider");
  }
  return context;
};

GlobalFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
