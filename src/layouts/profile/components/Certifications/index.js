import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
  Paper,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const certifications = [
  {
    title: "Informatica MDM SaaS Implementation Practitioner",
    university: "Informatica University",
    issued: "July 2024",
    expires: "July 2026",
    status: "Active",
  },
  {
    title: "Informatica Cloud Data Quality Professional",
    university: "Informatica University",
    issued: "Jan 2024",
    expires: "Jan 2026",
    status: "Active",
  },
  {
    title: "Informatica Product 360 Professional",
    university: "Informatica University",
    issued: "Jan 2023",
    expires: "Jan 2025",
    status: "Expired",
  },
];

const getStatusStyle = (status) => {
  return {
    label: status,
    color: status === "Active" ? "success" : "error",
    variant: "outlined",
    size: "small",
    sx: { fontWeight: "bold", mt: 1 },
  };
};

export default function CertificationCards() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const certificationContent = (
    <>
      <Grid container spacing={3}>
        {certifications.map((cert, index) => {
          const statusProps = getStatusStyle(cert.status);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={4}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#2c3e50", mb: 1 }}>
                    {cert.title}
                  </Typography>
                  <Chip {...statusProps} />

                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {cert.university}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    Issued: {cert.issued} • Expires: {cert.expires}
                  </Typography>
                  <Button variant="text" fullWidth sx={{ color: "secondary" }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );

  return (
    <>
      <Box sx={{ px: 2, py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            p: 2,
            background: "linear-gradient(to right,rgb(8, 13, 17), #3498db)",
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            🌟 Certifications
          </Typography>
          <Box sx={{ color: "white", fontSize: 20, cursor: "pointer" }} onClick={handleOpenModal}>
            ⛶
          </Box>
        </Paper>

        {certificationContent}
      </Box>

      {/* Fullscreen Modal */}
      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "background.default",
            p: 4,
            overflowY: "auto",
          }}
        >
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
          {certificationContent}
        </Box>
      </Modal>
    </>
  );
}
