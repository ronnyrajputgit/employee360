// import React, { createContext, useContext, useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { fetchTaskListsData, taskBreakdownProfilleData } from "apis/sharepointApi";

// const GlobalFilterContext = createContext();

// export const GlobalFilterProvider = ({ children }) => {
//   const [filters, setFilters] = useState({
//     selectedProjectType: "",
//     projectTypeList: [],
//     tasksData: [],
//     filteredTasks: [], // Add this new state
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const taskData = await taskBreakdownProfilleData();
//         const flattenedTasks = taskData.flatMap((group) => group.tasks);

//         const projectTypeList = [
//           ...new Set(flattenedTasks.map((task) => task.ProjectType).filter(Boolean)),
//         ];

//         setFilters((prev) => ({
//           ...prev,
//           projectTypeList,
//           tasksData: flattenedTasks,
//           filteredTasks: flattenedTasks, // Initialize filtered tasks
//         }));
//       } catch (error) {
//         console.error("Error fetching task data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleFilterChange = (field, value) => {
//     console.log("Updating filter:", field, value); // Debug log
//     setFilters((prev) => {
//       const newFilters = {
//         ...prev,
//         [field]: value,
//       };

//       // Apply filters to the data
//       let filteredData = [...prev.tasksData];

//       if (newFilters.selectedProjectType) {
//         filteredData = filteredData.filter((task) => {
//           const taskType = (task.ProjectType || "").trim();
//           const selectedType = newFilters.selectedProjectType.trim();
//           return taskType === selectedType;
//         });
//       }

//       return {
//         ...newFilters,
//         filteredTasks: filteredData,
//       };
//     });
//   };

//   return (
//     <GlobalFilterContext.Provider
//       value={{
//         filters,
//         setFilters: handleFilterChange,
//         updateFilter: handleFilterChange,
//         handleFilterChange,
//       }}
//     >
//       {children}
//     </GlobalFilterContext.Provider>
//   );
// };

// export const useGlobalFilters = () => {
//   const context = useContext(GlobalFilterContext);
//   if (!context) {
//     throw new Error("useGlobalFilters must be used within a GlobalFilterProvider");
//   }
//   return context;
// };

// GlobalFilterProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// import React, { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";

// const GlobalFilterContext = createContext();

// export const GlobalFilterProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [filters, setFilters] = useState({
//     projectType: "",
//     customer: "",
//     internal: "",
//     taskType: "",
//     stakeholders: "",
//     createdBy: "",
//     modifiedBy: "",
//     status: "",
//     search: "",
//   });

//   const [filterOptions, setFilterOptions] = useState({
//     projectTypes: [],
//     customers: [],
//     internals: [],
//     taskTypes: [],
//     stakeholders: [],
//     createdByList: [],
//     modifiedByList: [],
//     statuses: [],
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const rawData = await taskBreakdownProfilleData();
//         // console.log("Filds  ka kitna values aa rha h", rawData);
//         const transformedTasks = rawData.map((item) => ({
//           // ...item.fields,
//           ProjectType: item.fields.ProjectType || "",
//           TaskNames: item.fields.Title || "",
//           TaskDescription: item.fields.TaskDescription || "",
//           TaskType: item.fields.TaskType || "",
//           TaskTime: item.fields.TaskTime || "",
//           createdBy: item.createdBy?.user?.displayName || "",
//           Customer: item.fields.Customer?.Title || "",
//           Duration: item.fields.Duration_x0028_inHrs_x0029_ || "",
//           createdByEmail: item.createdBy?.user?.email || "",
//           modifiedBy: item.lastModifiedBy?.user?.displayName || "",
//           modifiedByEmail: item.lastModifiedBy?.user?.email || "",
//         }));
//         setTasks(transformedTasks);
//         setFilteredTasks(transformedTasks);

//         const getUnique = (key) => [
//           ...new Set(transformedTasks.map((t) => t[key]).filter(Boolean)),
//         ];

//         setFilterOptions({
//           projectTypes: getUnique("ProjectType"),
//           customers: getUnique("Customer"),
//           internals: getUnique("Internal"),
//           taskTypes: getUnique("TaskType"),
//           stakeholders: getUnique("Stakeholders"),
//           createdByList: getUnique("createdBy"),
//           modifiedByList: getUnique("modifiedBy"),
//           statuses: getUnique("Status"),
//         });
//       } catch (err) {
//         console.error("Error loading task data:", err);
//       }
//     };

//     loadData();
//   }, []);

//   useEffect(() => {
//     let result = [...tasks];

//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         if (key === "search") {
//           const keyword = value.toLowerCase();
//           result = result.filter(
//             (task) =>
//               task["Title"]?.toLowerCase().includes(keyword) ||
//               task["TaskDescription"]?.toLowerCase().includes(keyword)
//           );
//         } else {
//           result = result.filter(
//             (task) => String(task[key] || "").toLowerCase() === value.toLowerCase()
//           );
//         }
//       }
//     });

//     setFilteredTasks(result);
//   }, [filters, tasks]);

//   const updateFilter = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <GlobalFilterContext.Provider
//       value={{
//         filters,
//         updateFilter,
//         filteredTasks,
//         filterOptions,
//       }}
//     >
//       {children}
//     </GlobalFilterContext.Provider>
//   );
// };

// export const useGlobalFilters = () => {
//   const context = useContext(GlobalFilterContext);
//   if (!context) {
//     throw new Error("useGlobalFilters must be used within a GlobalFilterProvider");
//   }
//   return context;
// };

// GlobalFilterProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// latest version 3

// import React, { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";

// const GlobalFilterContext = createContext();

// export const GlobalFilterProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [filters, setFilters] = useState({
//     projectType: "",
//     taskType: "",
//     createdBy: "",
//     search: "",
//   });

//   const [filterOptions, setFilterOptions] = useState({
//     projectTypes: [],

//     taskTypes: [],
//     createdByList: [],
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const rawData = await taskBreakdownProfilleData();
//         const transformedTasks = rawData.map((item) => ({
//           ProjectType: item.fields.ProjectType || "",
//           TaskNames: item.fields.Title || "",
//           TaskDescription: item.fields.TaskDescription || "",
//           TaskType: item.fields.TaskType || "",
//           TaskTime: item.fields.TaskTime || "",
//           createdBy: item.createdBy?.user?.displayName || "",
//           Duration: item.fields.Duration_x0028_inHrs_x0029_ || "",
//           createdByEmail: item.createdBy?.user?.email || "",
//           modifiedBy: item.lastModifiedBy?.user?.displayName || "",
//           modifiedByEmail: item.lastModifiedBy?.user?.email || "",
//         }));
//         setTasks(transformedTasks);
//         setFilteredTasks(transformedTasks);

//         const getUnique = (key) => [
//           ...new Set(transformedTasks.map((t) => t[key]).filter(Boolean)),
//         ];

//         setFilterOptions({
//           projectTypes: getUnique("ProjectType"),
//           taskTypes: getUnique("TaskType"),
//           createdByList: getUnique("createdBy"),
//         });
//       } catch (err) {
//         console.error("Error loading task data:", err);
//       }
//     };

//     loadData();
//   }, []);

//   useEffect(() => {
//     let result = [...tasks];

//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         if (key === "search") {
//           const keyword = value.toLowerCase();
//           result = result.filter(
//             (task) =>
//               task.TaskNames?.toLowerCase().includes(keyword) ||
//               task.TaskDescription?.toLowerCase().includes(keyword)
//           );
//         } else {
//           // Match filter keys to your transformed task keys
//           // 'projectType' -> 'ProjectType', etc.
//           let filterKeyMap = {
//             projectType: "ProjectType",
//             taskType: "TaskType",
//             createdBy: "createdBy",
//           };
//           const mappedKey = filterKeyMap[key] || key;
//           result = result.filter(
//             (task) => String(task[mappedKey] || "").toLowerCase() === value.toLowerCase()
//           );
//         }
//       }
//     });

//     setFilteredTasks(result);
//   }, [filters, tasks]);

//   const updateFilter = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <GlobalFilterContext.Provider
//       value={{
//         filters,
//         updateFilter,
//         filteredTasks,
//         filterOptions,
//       }}
//     >
//       {children}
//     </GlobalFilterContext.Provider>
//   );
// };

// export const useGlobalFilters = () => {
//   const context = useContext(GlobalFilterContext);
//   if (!context) {
//     throw new Error("useGlobalFilters must be used within a GlobalFilterProvider");
//   }
//   return context;
// };

// GlobalFilterProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// this below version is wotking

// import React, { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { taskBreakdownProfilleData } from "apis/sharepointApi";

// const GlobalFilterContext = createContext();

// const mapFilterKey = {
//   projectType: "ProjectType",
//   taskType: "TaskType",
//   createdBy: "createdBy",
// };

// export const GlobalFilterProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [filters, setFilters] = useState({
//     projectType: "",
//     taskType: "",
//     createdBy: "",
//     search: "",
//   });
//   const [filterOptions, setFilterOptions] = useState({
//     projectTypes: [],
//     taskTypes: [],
//     createdByList: [],
//   });

//   useEffect(() => {
//     (async () => {
//       try {
//         const rawData = await taskBreakdownProfilleData();
//         const transformedTasks = rawData.map(({ fields, createdBy, lastModifiedBy }) => ({
//           ProjectType: fields.ProjectType || "",
//           TaskNames: fields.Title || "",
//           TaskDescription: fields.TaskDescription || "",
//           TaskType: fields.TaskType || "",
//           TaskTime: fields.TaskTime || "",
//           createdBy: createdBy?.user?.displayName || "",
//           Duration: fields.Duration_x0028_inHrs_x0029_ || "",
//           createdByEmail: createdBy?.user?.email || "",
//           modifiedBy: lastModifiedBy?.user?.displayName || "",
//           modifiedByEmail: lastModifiedBy?.user?.email || "",
//         }));
//         setTasks(transformedTasks);
//         setFilteredTasks(transformedTasks);

//         const getUnique = (key) => [
//           ...new Set(transformedTasks.map((t) => t[key]).filter(Boolean)),
//         ];
//         setFilterOptions({
//           projectTypes: getUnique("ProjectType"),
//           taskTypes: getUnique("TaskType"),
//           createdByList: getUnique("createdBy"),
//         });
//       } catch (error) {
//         console.error("Error loading task data:", error);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const filtered = tasks.filter((task) => {
//       return Object.entries(filters).every(([key, value]) => {
//         if (!value) return true;
//         if (key === "search") {
//           const keyword = value.toLowerCase();
//           return (
//             task.TaskNames.toLowerCase().includes(keyword) ||
//             task.TaskDescription.toLowerCase().includes(keyword)
//           );
//         }
//         const mappedKey = mapFilterKey[key] || key;
//         return (task[mappedKey] || "").toLowerCase() === value.toLowerCase();
//       });
//     });
//     setFilteredTasks(filtered);
//   }, [filters, tasks]);

//   const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

//   return (
//     <GlobalFilterContext.Provider value={{ filters, updateFilter, filteredTasks, filterOptions }}>
//       {children}
//     </GlobalFilterContext.Provider>
//   );
// };

// export const useGlobalFilters = () => {
//   const context = useContext(GlobalFilterContext);
//   if (!context) throw new Error("useGlobalFilters must be used within GlobalFilterProvider");
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
      TaskName: item.fields?.Title || "",
      TaskDescription: item.fields?.TaskDescription || "",
      TaskType: item.fields?.TaskType || "",
      createdBy: item.createdBy?.user?.displayName || "",
      Duration: item.fields?.Duration_x0028_inHrs_x0029_ || "",
      photoUrl: item.createdBy?.user?.email
        ? `https://datainfasolpvtltd.sharepoint.com/sites/DataINFA360/_layouts/15/userphoto.aspx?size=S&username=${item.createdBy.user.email}`
        : "",
    })),
  projects: (raw) =>
    raw.map((item) => ({
      ProjectName: item.fields?.Title || "",
      ProjectOwnerName: item.fields.ProjectManager || "",
      CreatedBy: item.createdBy?.user?.displayName || "",
      ShiftTimings: item.fields.ShiftTimings || "",
      TeamMembers: (item.fields.TeamMembers || []).map((member) => ({
        id: member.LookupId,
        name: member.LookupValue,
        email: member.Email,
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

// MAIN PROVIDER COMPONENT
export const GlobalFilterProvider = ({ children }) => {
  const [rawData, setRawData] = useState({});
  const [filters, setFilters] = useState({
    projectType: "",
    taskType: "",
    createdBy: "",
    search: "",
    projectName: "",
  });
  const [filteredData, setFilteredData] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);

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

  // Apply filters on change
  useEffect(() => {
    const updated = {};
    for (const key in rawData) {
      updated[key] = applyFilters(rawData[key], filters, filterKeyMap[key] || {});
    }
    setFilteredData(updated);
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
