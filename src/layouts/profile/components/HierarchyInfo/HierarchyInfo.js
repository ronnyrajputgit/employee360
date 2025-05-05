// import React, { useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Dialog,
//   DialogContent,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import { Fullscreen, Close } from "@mui/icons-material";

// const mockData = {
//   manager: {
//     name: "Yogesh",
//     title: "Director of Data & AI",
//   },
//   lead: {
//     name: "Aravvindhan V S",
//     title: "Technical Lead",
//     avatar: "https://randomuser.me/api/portraits/men/75.jpg",
//   },
//   team: [
//     {
//       name: "Ishita Jaiswal",
//       title: "Associate Consultant",
//       avatar: "https://randomuser.me/api/portraits/women/65.jpg",
//     },
//     {
//       name: "Balam Ashok",
//       title: "Consultant",
//       avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//     },
//   ],
// };

// const HierarchyInfo = () => {
//   const [open, setOpen] = useState(false);

//   const renderCard = (person, highlight = false) => (
//     <Card
//       sx={{
//         minWidth: 200,
//         mx: 2,
//         mb: 2,
//         border: highlight ? "2px solid #2196f3" : "1px solid #ccc",
//         boxShadow: 3,
//         textAlign: "center",
//       }}
//     >
//       <CardContent>
//         <Avatar
//           src={person.avatar}
//           alt={person.name}
//           sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
//         />
//         <Typography variant="subtitle1">{person.name}</Typography>
//         <Typography variant="body2" color="text.secondary">
//           {person.title}
//         </Typography>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Box>
//       <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//         <Typography variant="h6">Hierarchy Information</Typography>
//         <IconButton onClick={() => setOpen(true)}>
//           <Fullscreen />
//         </IconButton>
//       </Box>

//       <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
//         <DialogContent sx={{ p: 4 }}>
//           <IconButton
//             onClick={() => setOpen(false)}
//             sx={{ position: "absolute", top: 10, right: 10 }}
//           >
//             <Close />
//           </IconButton>

//           <Box display="flex" justifyContent="center" mb={3}>
//             {renderCard(mockData.manager)}
//           </Box>

//           <Box position="relative" display="flex" justifyContent="center" mb={3}>
//             <Box
//               position="absolute"
//               top="50%"
//               width="2px"
//               height="40px"
//               bgcolor="grey.500"
//               zIndex={0}
//             />
//             {renderCard(mockData.lead, true)}
//           </Box>

//           <Box position="relative" display="flex" justifyContent="center" gap={4}>
//             <Box
//               position="absolute"
//               top="-20px"
//               width="60%"
//               height="2px"
//               bgcolor="grey.500"
//               zIndex={0}
//             />
//             {mockData.team.map((member, i) => (
//               <Box key={i} zIndex={1}>
//                 {renderCard(member)}
//               </Box>
//             ))}
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default HierarchyInfo;

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Fullscreen, Close, AccountTree } from "@mui/icons-material";

const mockData = {
  manager: {
    name: "Yogesh",
    title: "Director of Data & AI",
  },
  lead: {
    name: "Aravvindhan V S",
    title: "Technical Lead",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  team: [
    {
      name: "Ishita Jaiswal",
      title: "Associate Consultant",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Balam Ashok",
      title: "Consultant",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ],
};

const HierarchyInfo = () => {
  const [open, setOpen] = useState(false);

  const renderCard = (person, role = "") => (
    <Card
      sx={{
        minWidth: 180,
        maxWidth: 220,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        textAlign: "center",
        backgroundColor: "#fff",
        mb: 1,
        position: "relative",
        zIndex: 1,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Avatar
          src={person.avatar}
          alt={person.name}
          sx={{
            width: 70,
            height: 70,
            mx: "auto",
            mb: 1,
            border: "2px solid #2196f3",
            bgcolor: !person.avatar ? "#2196f3" : undefined,
          }}
        >
          {!person.avatar && role === "manager" && "Manage"}
        </Avatar>
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 500 }}>
          {person.name}
        </Typography>
        <Typography variant="body2" color="primary" sx={{ fontSize: "0.85rem" }}>
          {person.title}
        </Typography>
      </CardContent>
    </Card>
  );

  const renderHierarchy = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        py: 3,
        bgcolor: "#f9f9f9",
        height: "calc(100vh - 64px)",
      }}
    >
      {/* Manager Level */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          position: "relative",
          width: "100%",
        }}
      >
        {renderCard(mockData.manager, "manager")}
      </Box>

      {/* Vertical line from Manager to Lead */}
      <Box
        sx={{
          position: "absolute",
          top: "140px",
          width: "2px",
          height: "100px",
          bgcolor: "#1976d2",
          zIndex: 0,
        }}
      />

      {/* Lead Level */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          position: "relative",
          width: "100%",
        }}
      >
        {renderCard(mockData.lead)}
      </Box>

      {/* Vertical line from Lead to Team */}
      <Box
        sx={{
          position: "absolute",
          top: "320px",
          width: "2px",
          height: "70px",
          bgcolor: "#1976d2",
          zIndex: 0,
        }}
      />

      {/* Horizontal line connecting team members */}
      <Box
        sx={{
          position: "absolute",
          top: "390px",
          width: "200px",
          height: "2px",
          bgcolor: "#1976d2",
          zIndex: 0,
        }}
      />

      {/* Vertical lines to each team member */}
      <Box
        sx={{
          position: "absolute",
          top: "390px",
          left: "calc(50% - 200px + 100px)", // Adjust based on card width
          width: "2px",
          height: "50px",
          bgcolor: "#1976d2",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "390px",
          right: "calc(50% - 200px + 100px)", // Adjust based on card width
          width: "2px",
          height: "50px",
          bgcolor: "#1976d2",
          zIndex: 0,
        }}
      />

      {/* Team Level */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          position: "relative",
          width: "100%",
        }}
      >
        {mockData.team.map((member, i) => (
          <Box key={i}>{renderCard(member)}</Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountTree sx={{ mr: 1 }} />
            <Typography variant="h6">Hierarchy Information</Typography>
          </Box>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <Fullscreen />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 0 }}>{renderHierarchy()}</Box>

      {/* Fullscreen Dialog */}
      <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
        <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountTree sx={{ mr: 1 }} />
              <Typography variant="h6">Hierarchy Information</Typography>
            </Box>
            <IconButton color="inherit" onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0 }}>{renderHierarchy()}</DialogContent>
      </Dialog>
    </Box>
  );
};

export default HierarchyInfo;
