import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Modal,
  IconButton,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Fullscreen, Close } from "@mui/icons-material";
import PropTypes from "prop-types";

const skillsData = [
  { label: "CDQ", value: 90, category: "Technical Skills", type: "Informatica" },
  { label: "CDGC", value: 85, category: "Technical Skills", type: "Informatica" },
  { label: "MDM SaaS", value: 80, category: "Technical Skills", type: "Informatica" },
  { label: "Communication", value: 85, category: "Soft Skills", type: "Soft" },
  { label: "Leadership", value: 75, category: "Soft Skills", type: "Soft" },
];

const SkillCardContent = ({ skills }) => {
  const technicalSkills = skills.filter((skill) => skill.category === "Technical Skills");
  const softSkills = skills.filter((skill) => skill.category === "Soft Skills");

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Card sx={{ flex: 1, minWidth: 300 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Technical Skills
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100px", mb: 1 }} />
          {technicalSkills.map((skill) => (
            <Box key={skill.label} display="flex" alignItems="center" mt={2}>
              <Box width="30%">
                <Typography>{skill.label}</Typography>
              </Box>
              <Box width="60%" mx={1}>
                <LinearProgress
                  variant="determinate"
                  value={skill.value}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#eee",
                    "& .MuiLinearProgress-bar": {
                      backgroundImage: "linear-gradient(to right, #2196F3, #9c27b0)",
                    },
                  }}
                />
              </Box>
              <Box width="10%">
                <Typography variant="body2" color="text.secondary">
                  {skill.value}%
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ flex: 1, minWidth: 300 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Soft Skills
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100px", mb: 1 }} />
          {softSkills.map((skill) => (
            <Box key={skill.label} display="flex" alignItems="center" mt={2}>
              <Box width="30%">
                <Typography>{skill.label}</Typography>
              </Box>
              <Box width="60%" mx={1}>
                <LinearProgress
                  variant="determinate"
                  value={skill.value}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#eee",
                    "& .MuiLinearProgress-bar": {
                      backgroundImage: "linear-gradient(to right, #2196F3, #9c27b0)",
                    },
                  }}
                />
              </Box>
              <Box width="10%">
                <Typography variant="body2" color="text.secondary">
                  {skill.value}%
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

SkillCardContent.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const SkillSets = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredSkills =
    filter === "All" ? skillsData : skillsData.filter((skill) => skill.type === filter);

  return (
    <Box>
      <Card sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            background: "linear-gradient(to right, #1d4e89, #1e88e5)",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            <span role="img" aria-label="code">
              💻
            </span>{" "}
            Skill Set
          </Typography>
          <Box>
            {["All", "Informatica", "Soft", "Microsoft"].map((type) => (
              <Button
                key={type}
                variant={filter === type ? "contained" : "outlined"}
                onClick={() => setFilter(type)}
                sx={{ ml: 1 }}
              >
                {type}
              </Button>
            ))}
            <IconButton onClick={handleOpen} sx={{ ml: 2 }}>
              <Fullscreen />
            </IconButton>
          </Box>
        </Box>

        <Box mt={3}>
          <Card variant="outlined" sx={{ height: 200 }}>
            <CardContent>{/* Reserved space */}</CardContent>
          </Card>
        </Box>

        <Box mt={3}>
          <SkillCardContent skills={filteredSkills} />
        </Box>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "background.paper",
            p: 4,
            overflow: "auto",
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <SkillCardContent skills={filteredSkills} />
        </Box>
      </Modal>
    </Box>
  );
};

export default SkillSets;
