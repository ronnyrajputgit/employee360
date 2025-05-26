// combined

import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { taskBreakdownProfilleData, fetchTaskListsData } from "apis/sharepointApi";
import { getAccessToken } from "auth/authProvider";
import { fetchSkillInventoryData } from "apis/sharepointApi";

const GlobalFilterContext = createContext();

// API map
const apiMap = {
  tasks: taskBreakdownProfilleData,
  projects: fetchTaskListsData,
  // add new apis here
  skillsInventry: fetchSkillInventoryData,
};

// Transformers
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
        photoUrl: `https://datainfasolpvtltd.sharepoint.com/sites/DataINFA360/_layouts/15/userphoto.aspx?size=S&username=${member.Email}`,
      })),
    })),

  // add new transformers here
  skillsInventry: (raw) =>
    raw.map((item) => ({
      // ...item.fields,
      EmployeeId: item.fields?.Title || "",
      Resource: item.fields?.Resource || "",
      TotalDurationinMonths: item.fields?.TotalDurationinMonths || "",
      SkillStatus: item.fields?.SkillStatus || "",
      SkillsPoints: item.fields?.Skill_x0020_Points || "",
      Skill: item.fields?.Skill || "",
      RecentInterviewResult: item.fields?.RecentInterviewResult || "",
      RealProjectExperience: item.fields?.RealProjectExperience || "",
      ProjectExperience: item.fields?.ProjectExperience || "",
      TrainingCompleted: item.fields?.TrainingCompleted || "",
      Certified: item.fields?.Certified || "",
      MockProjectsShadowing: item.fields?.MockProjects_x002f_Shadowing || "",
      CreatedAt: item.fields?.Created || "",
      CreatedBy: item.createdBy?.user?.displayName || "",
    })),
};

// Unified filter key mapping for both datasets
// Map filter keys to relevant fields in each dataset
const filterKeyMap = {
  tasks: {
    createdBy: "createdBy",
    search: ["TaskName", "TaskDescription", "Customer", "ProjectType", "TaskType"],
    customer: "Customer",
    projectName: "Customer", // Placeholder  project type to project name
  },
  projects: {
    createdBy: "CreatedBy",
    search: ["ProjectName", "ProjectOwner", "ProjectOwnerName"],
    customer: "", // No customer field in projects, so ignore
    projectName: "ProjectName", //common name as key but their values original add kro
  },
  // add new filter keys here
  skillsInventry: {
    createdBy: "CreatedBy",
  },
};

// Helper to get unique values from combined data for filter dropdowns
const getUnique = (arr, key) => [...new Set(arr.map((i) => i[key]).filter(Boolean))];

// Apply filters generically on data with given keyMap
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

// Sort by CreatedDateTime descending
const sortByCreatedDateTime = (data) =>
  [...data].sort((a, b) => new Date(b.CreatedDateTime) - new Date(a.CreatedDateTime));

// MAIN PROVIDER COMPONENT
export const GlobalFilterProvider = ({ children }) => {
  const [rawData, setRawData] = useState({});
  const [filters, setFilters] = useState({
    createdBy: "",
    search: "",
    customer: "",
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
        // First check for valid token
        const token = await getAccessToken();
        if (!token) {
          console.error("No valid token available");
          return;
        }

        const entries = Object.entries(apiMap);
        const results = await Promise.all(entries.map(([_, fn]) => fn()));

        const transformed = {};
        entries.forEach(([key], i) => {
          transformed[key] = transformers[key] ? transformers[key](results[i]) : results[i];
        });

        setRawData(transformed);

        // Prepare filter dropdowns
        const options = {};
        const globalOptions = {
          createdBy: new Set(),
          customer: new Set(),
          projectName: new Set(),
        };

        // Collect options from each dataset
        for (const key in transformed) {
          const keyMap = filterKeyMap[key] || {};
          for (const fKey in globalOptions) {
            const mappedField = keyMap[fKey];
            if (mappedField) {
              const values = getUnique(transformed[key], mappedField);
              values.forEach((v) => globalOptions[fKey].add(v));
            }
          }
        }

        // Convert Sets to arrays and assign to options
        for (const fKey in globalOptions) {
          options[fKey] = Array.from(globalOptions[fKey]).sort();
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

  // Apply filters and sort on both datasets
  useEffect(() => {
    const updated = {};
    for (const key in rawData) {
      const filtered = applyFilters(rawData[key], filters, filterKeyMap[key] || {});
      updated[key] = sortByCreatedDateTime(filtered);
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
