// // ProjectTimeline.js
// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { Gantt, Task, ViewMode } from "gantt-task-react";
// import "gantt-task-react/dist/index.css";

// const ProjectTimeline = () => {
//   const tasks = [
//     {
//       start: new Date("2025-01-01"),
//       end: new Date("2025-01-15"),
//       name: "Project Kickoff",
//       id: "Task1",
//       type: "task",
//       progress: 100,
//       isDisabled: true,
//     },
//     {
//       start: new Date("2025-01-10"),
//       end: new Date("2025-02-10"),
//       name: "Requirements Gathering",
//       id: "Task2",
//       type: "task",
//       progress: 80,
//       dependencies: ["Task1"],
//     },
//     {
//       start: new Date("2025-02-05"),
//       end: new Date("2025-03-05"),
//       name: "Data Architecture Design",
//       id: "Task3",
//       type: "task",
//       progress: 70,
//       dependencies: ["Task2"],
//     },
//     {
//       start: new Date("2025-03-05"),
//       end: new Date("2025-04-20"),
//       name: "ETL Development",
//       id: "Task4",
//       type: "task",
//       progress: 50,
//       dependencies: ["Task3"],
//     },
//     {
//       start: new Date("2025-04-20"),
//       end: new Date("2025-05-20"),
//       name: "QA and Testing",
//       id: "Task5",
//       type: "task",
//       progress: 30,
//       dependencies: ["Task4"],
//     },
//     {
//       start: new Date("2025-06-01"),
//       end: new Date("2025-06-30"),
//       name: "Production Deployment",
//       id: "Task6",
//       type: "task",
//       progress: 0,
//       dependencies: ["Task5"],
//     },
//   ];

//   return (
//     <Box p={2} sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Project Timeline
//       </Typography>
//       <Gantt tasks={tasks} viewMode={ViewMode.Month} />
//     </Box>
//   );
// };

// export default ProjectTimeline;

// ProjectTimeline.js
// import React from "react";
// import { Gantt, Task, ViewMode } from "gantt-task-react";
// import "gantt-task-react/dist/index.css";

// const ProjectTimeline = () => {
//   const tasks = [
//     {
//       id: "1",
//       name: "Project Kickoff",
//       start: new Date("2025-01-01"),
//       end: new Date("2025-01-15"),
//       type: "task",
//       progress: 100,
//     },
//     {
//       id: "2",
//       name: "Requirements Gathering",
//       start: new Date("2025-01-10"),
//       end: new Date("2025-02-10"),
//       type: "task",
//       progress: 80,
//       dependencies: ["1"],
//     },
//     {
//       id: "3",
//       name: "Data Architecture Design",
//       start: new Date("2025-02-05"),
//       end: new Date("2025-03-05"),
//       type: "task",
//       progress: 60,
//       dependencies: ["2"],
//     },
//     {
//       id: "4",
//       name: "ETL Development",
//       start: new Date("2025-03-05"),
//       end: new Date("2025-04-20"),
//       type: "task",
//       progress: 50,
//       dependencies: ["3"],
//     },
//     {
//       id: "5",
//       name: "QA and Testing",
//       start: new Date("2025-04-20"),
//       end: new Date("2025-05-20"),
//       type: "task",
//       progress: 30,
//       dependencies: ["4"],
//     },
//     {
//       id: "6",
//       name: "Production Deployment",
//       start: new Date("2025-06-01"),
//       end: new Date("2025-06-30"),
//       type: "task",
//       progress: 0,
//       dependencies: ["5"],
//     },
//   ];

//   return (
//     <div style={{ padding: "16px" }}>
//       <h2 style={{ marginBottom: "20px" }}>Project Timeline</h2>
//       <Gantt tasks={tasks} viewMode={ViewMode.Month} />
//     </div>
//   );
// };

// export default ProjectTimeline;

import React, { useEffect, useState } from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

const ProjectTimeline = () => {
  const [containerWidth, setContainerWidth] = useState(window.innerWidth * 0.95);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth * 0.95); // Adjust to 95% of screen
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tasks = [
    {
      id: "1",
      name: "Project Kickoff",
      start: new Date("2025-01-01"),
      end: new Date("2025-01-15"),
      type: "task",
      progress: 100,
    },
    {
      id: "2",
      name: "Requirements Gathering",
      start: new Date("2025-01-10"),
      end: new Date("2025-02-10"),
      type: "task",
      progress: 80,
      dependencies: ["1"],
    },
    {
      id: "3",
      name: "Data Architecture Design",
      start: new Date("2025-02-05"),
      end: new Date("2025-03-05"),
      type: "task",
      progress: 60,
      dependencies: ["2"],
    },
    {
      id: "4",
      name: "ETL Development",
      start: new Date("2025-03-05"),
      end: new Date("2025-04-20"),
      type: "task",
      progress: 50,
      dependencies: ["3"],
    },
    {
      id: "5",
      name: "QA and Testing",
      start: new Date("2025-04-20"),
      end: new Date("2025-05-20"),
      type: "task",
      progress: 30,
      dependencies: ["4"],
    },
    {
      id: "6",
      name: "Production Deployment",
      start: new Date("2025-06-01"),
      end: new Date("2025-06-30"),
      type: "task",
      progress: 0,
      dependencies: ["5"],
    },
  ];

  return (
    <div style={{ width: "100%", overflowX: "auto", padding: "20px" }}>
      <h2>Project Timeline</h2>
      <div style={{ minWidth: "300px", width: containerWidth }}>
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Month}

          // listCellWidth="0px"
        />
      </div>
    </div>
  );
};

export default ProjectTimeline;
