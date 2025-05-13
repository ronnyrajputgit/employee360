import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Card,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { taskBreakdownProfilleData } from "apis/sharepointApi";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

const transformSharePointData = (data) => {
  const grouped = {};

  data.forEach((item) => {
    const fields = item.fields;
    const stakeholderName = item.createdBy.user.displayName;

    if (!grouped[stakeholderName]) {
      grouped[stakeholderName] = {
        name: stakeholderName,
        tasks: [],
      };
    }

    grouped[stakeholderName].tasks.push({
      name: fields.Title || "Untitled",
      status: fields.Status || "Not Started",
      description: fields.TaskDescription || "No description",
      duration: fields.Duration_x0028_inHrs_x0029_ + " hrs",
      tasktype: fields.TaskType || "General",
    });
  });

  return Object.values(grouped);
};

const TaskbreakDown = () => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [taskTypes, setTaskTypes] = useState([]);
  const [durationRanges] = useState([
    { label: "All", value: "all" },
    { label: "0-4 hours", value: "0-4" },
    { label: "4-8 hours", value: "4-8" },
    { label: "8+ hours", value: "8+" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await taskBreakdownProfilleData();
        const transformed = transformSharePointData(result);
        setRoles(transformed);

        // Extract unique task types
        const types = new Set();
        transformed.forEach((role) => {
          role.tasks.forEach((task) => {
            types.add(task.tasktype);
          });
        });
        setTaskTypes(["all", ...Array.from(types)]);
      } catch (err) {
        console.error("Failed to fetch SharePoint data", err);
      }
    };

    fetchData();
  }, []);

  const filterTasks = (role) => {
    return {
      ...role,
      tasks: role.tasks.filter((task) => {
        const matchesSearch =
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === "all" || task.tasktype === selectedType;
        const duration = parseInt(task.duration);
        let matchesDuration = true;

        if (selectedDuration !== "all") {
          const [min, max] = selectedDuration.split("-").map(Number);
          if (max) {
            matchesDuration = duration >= min && duration < max;
          } else {
            matchesDuration = duration >= min;
          }
        }

        return matchesSearch && matchesType && matchesDuration;
      }),
    };
  };

  const filteredRoles = roles.map(filterTasks).filter((role) => role.tasks.length > 0);

  return (
    <>
      <Grid item xs={12} lg={12}>
        <Card>
          <MDBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={4}>
                <TextField
                  size="small"
                  label="Search tasks"
                  variant="standard"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                />
                {/* <MDButton variant="gradient" color="success" fullWidth>
                  Weekly
                </MDButton> */}
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <TextField
                  select
                  size="small"
                  label="Task Type"
                  value={selectedType}
                  fullWidth
                  variant="standard"
                  onChange={(e) => setSelectedType(e.target.value)}
                  sx={{
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  {taskTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
                {/* <MDButton variant="gradient" color="info" fullWidth>
                  Monthly
                </MDButton> */}
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <TextField
                  select
                  fullWidth
                  variant="standard"
                  size="small"
                  label="Duration"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  sx={{
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  {durationRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Box p={{ xs: 1, sm: 2 }}>
        {filteredRoles.map((role, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              mb: { xs: 2, sm: 4 },
              p: { xs: 1, sm: 2 },
              overflow: "hidden",
            }}
          >
            <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <PersonIcon />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  wordBreak: "break-word",
                }}
              >
                {role.name}
              </Typography>
            </Box>

            <Grid
              container
              spacing={{ xs: 1, sm: 2 }}
              sx={{
                fontWeight: "bold",
                bgcolor: "#f5f5f5",
                py: 1,
                mb: 1,
                p: { xs: 1, sm: 2 },
                borderBottom: "1px solid #eee",
              }}
            >
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" noWrap>
                  Task Name
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" noWrap>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" noWrap>
                  Task Type
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" noWrap>
                  Duration
                </Typography>
              </Grid>
            </Grid>

            {role.tasks.map((task, idx) => (
              <Grid
                key={idx}
                container
                spacing={{ xs: 1, sm: 2 }}
                sx={{
                  mb: 1,
                  p: { xs: 1, sm: 2 },
                  borderBottom: "1px solid #eee",
                  "&:last-child": {
                    borderBottom: "none",
                  },
                }}
              >
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      wordBreak: "break-word",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    {task.name}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      wordBreak: "break-word",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    {task.description}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      wordBreak: "break-word",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    {task.tasktype}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      wordBreak: "break-word",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    {task.duration}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default TaskbreakDown;
