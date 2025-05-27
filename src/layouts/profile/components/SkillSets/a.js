import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
  Avatar,
  Chip,
  Box,
  Skeleton,
  Divider,
  IconButton,
  Collapse,
  Badge,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ExpandMore,
  Star,
  CheckCircle,
  School,
  Assignment,
  Verified,
  Work,
  Person,
  Schedule,
  Info,
} from "@mui/icons-material";
import { useGlobalFilters } from "context/GlobalFilterContext";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  marginBottom: theme.spacing(2),
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease",
  background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
  borderRadius: "16px 16px 0 0",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const DetailItem = ({ icon, label }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    {React.cloneElement(icon, { sx: { mr: 1, fontSize: "1rem", color: "action.active" } })}
    <Typography variant="body2">{label}</Typography>
  </Box>
);

DetailItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

const SkillSets = () => {
  const { filteredData, loading } = useGlobalFilters();
  const skillsInventoryData = filteredData.skillsInventry || [];
  const [expandedCards, setExpandedCards] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Group data by Resource
  const groupedData = skillsInventoryData.reduce((acc, item) => {
    if (!acc[item.Resource]) {
      acc[item.Resource] = [];
    }
    acc[item.Resource].push(item);
    return acc;
  }, {});

  const handleExpandClick = (resource) => {
    setExpandedCards((prev) => ({
      ...prev,
      [resource]: !prev[resource],
    }));
  };

  const renderTooltipContent = (skillData) => (
    <Box sx={{ p: 1 }}>
      <Typography color="inherit" variant="subtitle2" gutterBottom>
        Skill Details
      </Typography>
      <div>Status: {skillData.SkillStatus}</div>
      <div>Months Experience: {skillData.TotalDurationinMonths}</div>
      <div>Training Completed: {skillData.TrainingCompleted ? "Yes" : "No"}</div>
      <div>Certified: {skillData.Certified ? "Yes" : "No"}</div>
      <div>Mock Projects: {skillData.MockProjectsShadowing ? "Yes" : "No"}</div>
      <div>Created By: {skillData.CreatedBy}</div>
    </Box>
  );
  

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "16px" }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Skills Inventory
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ mt: 0, p: isMobile ? 1 : 3 }}>
        {Object.entries(groupedData).map(([resource, skills]) => {
          const interviewReadySkills = skills.filter((skill) => skill.RecentInterviewResult).length;
          const certifiedSkills = skills.filter((skill) => skill.Certified).length;

          return (
            <Grid item xs={12} sm={12} md={12} key={resource}>
              <StyledCard>
                <HeaderBox>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <SmallAvatar>
                        <Star fontSize="small" color="warning" />
                      </SmallAvatar>
                    }
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        mr: 2,
                        width: 56,
                        height: 56,
                        fontSize: "1.5rem",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {resource
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                  </Badge>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" fontWeight="600">
                      {resource}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skills[0].EmployeeId}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => handleExpandClick(resource)}
                    aria-expanded={expandedCards[resource]}
                    aria-label="show more"
                    sx={{
                      transform: expandedCards[resource] ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </HeaderBox>

                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center">
                      <CheckCircle color="success" fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {interviewReadySkills} Interview Ready
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Verified color="primary" fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{certifiedSkills} Certified</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Work color="action" sx={{ mr: 1, fontSize: "1rem" }} />
                    Skills ({skills.length})
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                    {skills.map((skillData, index) => (
                      <Tooltip
                        key={index}
                        title={renderTooltipContent(skillData)}
                        arrow
                        placement="top"
                      >
                        <SkillChip
                          label={`${skillData.Skill} (${skillData.SkillsPoints})`}
                          color={skillData.RecentInterviewResult ? "success" : "default"}
                          variant={skillData.RecentInterviewResult ? "filled" : "outlined"}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </CardContent>

                <Collapse in={expandedCards[resource]} timeout="auto" unmountOnExit>
                  <CardContent sx={{ pt: 0 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Person color="action" sx={{ mr: 1, fontSize: "1rem" }} />
                      Additional Info
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Created by: {skills[0].CreatedBy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last updated: {new Date(skills[0].CreatedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Collapse>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SkillSets;
