// import React, { useEffect, useRef, useState } from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

// // If you're using MDBox from your own theme, import that instead
// const MDBox = (props) => <Box {...props} />;

// const ClockReminder = () => {
//   const canvasRef = useRef(null);
//   const [time, setTime] = useState(new Date());
//   const [reminderText, setReminderText] = useState("");
//   const [reminders, setReminders] = useState([]);

//   // Digital Clock
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//       drawAnalogClock();
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Analog Clock
//   const drawAnalogClock = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const radius = canvas.height / 2;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.translate(radius, radius);
//     const now = new Date();

//     drawFace(ctx, radius);
//     drawNumbers(ctx, radius);
//     drawTime(ctx, radius, now);

//     ctx.translate(-radius, -radius); // reset
//   };

//   const drawFace = (ctx, radius) => {
//     ctx.beginPath();
//     ctx.arc(0, 0, radius, 0, 2 * Math.PI);
//     ctx.fillStyle = "#f5f5f5";
//     ctx.fill();

//     const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
//     grad.addColorStop(0, "#333");
//     grad.addColorStop(0.5, "white");
//     grad.addColorStop(1, "#333");
//     ctx.strokeStyle = grad;
//     ctx.lineWidth = radius * 0.1;
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
//     ctx.fillStyle = "#333";
//     ctx.fill();
//   };

//   const drawNumbers = (ctx, radius) => {
//     ctx.font = radius * 0.15 + "px arial";
//     ctx.textBaseline = "middle";
//     ctx.textAlign = "center";
//     for (let num = 1; num <= 12; num++) {
//       const ang = (num * Math.PI) / 6;
//       ctx.rotate(ang);
//       ctx.translate(0, -radius * 0.85);
//       ctx.rotate(-ang);
//       ctx.fillText(num.toString(), 0, 0);
//       ctx.rotate(ang);
//       ctx.translate(0, radius * 0.85);
//       ctx.rotate(-ang);
//     }
//   };

//   const drawTime = (ctx, radius, now) => {
//     let hour = now.getHours();
//     let minute = now.getMinutes();
//     let second = now.getSeconds();

//     // Hour hand
//     hour = hour % 12;
//     hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
//     drawHand(ctx, hour, radius * 0.5, radius * 0.07);

//     // Minute hand
//     minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
//     drawHand(ctx, minute, radius * 0.8, radius * 0.07);

//     // Second hand
//     second = (second * Math.PI) / 30;
//     drawHand(ctx, second, radius * 0.9, radius * 0.02, "#d32f2f");
//   };

//   const drawHand = (ctx, pos, length, width, color = "#333") => {
//     ctx.beginPath();
//     ctx.lineWidth = width;
//     ctx.lineCap = "round";
//     ctx.strokeStyle = color;
//     ctx.moveTo(0, 0);
//     ctx.rotate(pos);
//     ctx.lineTo(0, -length);
//     ctx.stroke();
//     ctx.rotate(-pos);
//   };

//   const addReminder = () => {
//     if (reminderText.trim() !== "") {
//       setReminders([...reminders, reminderText]);
//       setReminderText("");
//     }
//   };

//   return (
//     <Grid item xs={12} md={6} lg={3}>
//       <MDBox mb={1.5} p={2} boxShadow={3} borderRadius="xl" bgcolor="white">
//         <Typography variant="h6" gutterBottom textAlign="center">
//           🕒 Analog & Digital Clock
//         </Typography>

//         {/* Analog Clock */}
//         <Box display="flex" justifyContent="center" mb={2}>
//           <canvas
//             ref={canvasRef}
//             width={200}
//             height={200}
//             style={{ background: "#fafafa", borderRadius: "50%" }}
//           />
//         </Box>

//         {/* Digital Clock */}
//         <Typography variant="h5" textAlign="center" color="primary">
//           {time.toLocaleTimeString()}
//         </Typography>

//         {/* Reminder Section */}
//         <Box mt={3}>
//           <Typography variant="h6">
//             <AccessAlarmIcon fontSize="small" sx={{ mr: 1 }} />
//             Set Reminder
//           </Typography>
//           <Box display="flex" gap={1} mt={1}>
//             <TextField
//               fullWidth
//               size="small"
//               placeholder="e.g. Team Meeting at 3PM"
//               value={reminderText}
//               onChange={(e) => setReminderText(e.target.value)}
//             />
//             <Button variant="contained" color="primary" onClick={addReminder}>
//               Add
//             </Button>
//           </Box>

//           {/* Reminder List */}
//           <List dense sx={{ mt: 2 }}>
//             {reminders.map((reminder, index) => (
//               <ListItem key={index}>
//                 <ListItemText primary={`🔔 ${reminder}`} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </MDBox>
//     </Grid>
//   );
// };

// export default ClockReminder;

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  IconButton,
} from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import DeleteIcon from "@mui/icons-material/Delete";
import BeepSound from "../../assets/audios/Beep.wav";

// Simulate MDBox if not using a custom one
const MDBox = (props) => <Box {...props} />;

const ClockReminder = () => {
  const canvasRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [reminderText, setReminderText] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const [isRinging, setIsRinging] = useState(false);
  const beepSound = useRef(null);
  const stopTimeoutRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    if (stored) {
      setReminders(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on reminders change
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Clock updates + reminder trigger
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      drawAnalogClock();

      reminders.forEach((reminder, index) => {
        const [hour, minute] = reminder.time.split(":").map(Number);
        if (
          hour === now.getHours() &&
          minute === now.getMinutes() &&
          now.getSeconds() === 0 &&
          !isRinging
        ) {
          triggerAlarm(reminder.text);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [reminders, isRinging]);

  const triggerAlarm = (text) => {
    if (beepSound.current) {
      beepSound.current.loop = true;
      beepSound.current.currentTime = 0;
      beepSound.current.play();
    }

    setIsRinging(true);

    if (Notification.permission === "granted") {
      new Notification(`Reminder: ${text}`);
    }

    stopTimeoutRef.current = setTimeout(() => {
      stopAlarm();
    }, 10000); // stop after 10 seconds
  };

  const stopAlarm = () => {
    if (beepSound.current) {
      beepSound.current.pause();
      beepSound.current.currentTime = 0;
      beepSound.current.loop = false;
    }
    setIsRinging(false);
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }
  };

  const drawAnalogClock = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const radius = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);
    const now = new Date();

    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius, now);

    ctx.translate(-radius, -radius); // reset
  };

  const drawFace = (ctx, radius) => {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#f5f5f5";
    ctx.fill();

    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  };

  const drawNumbers = (ctx, radius) => {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
      const ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  };

  const drawTime = (ctx, radius, now) => {
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour % 12;
    hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    second = (second * Math.PI) / 30;
    drawHand(ctx, second, radius * 0.9, radius * 0.02, "#d32f2f");
  };

  const drawHand = (ctx, pos, length, width, color = "#333") => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  };

  const addReminder = () => {
    if (reminderText.trim() !== "" && reminderTime !== "") {
      setReminders([...reminders, { text: reminderText, time: reminderTime }]);
      setReminderText("");
      setReminderTime("");
    }
  };

  const deleteReminder = (indexToDelete) => {
    setReminders((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", bgcolor: "#f0f2f5", p: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <MDBox p={4} boxShadow={4} borderRadius={4} bgcolor="white">
            <Typography variant="h4" gutterBottom textAlign="center" color="primary">
              🕒 Smart Clock & Reminder
            </Typography>

            {/* Analog Clock */}
            <Box display="flex" justifyContent="center" mb={2}>
              <canvas
                ref={canvasRef}
                width={250}
                height={250}
                style={{ background: "#ffffff", borderRadius: "50%" }}
              />
            </Box>

            {/* Digital Clock */}
            <Typography variant="h4" textAlign="center" color="secondary">
              {time.toLocaleTimeString()}
            </Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              {time.toDateString()}
            </Typography>

            {/* Reminder Input */}
            <Box mt={4}>
              <Typography variant="h6">
                <AccessAlarmIcon fontSize="small" sx={{ mr: 1 }} />
                Set Reminder
              </Typography>
              <Box display="flex" gap={2} mt={1} flexDirection={{ xs: "column", sm: "row" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Reminder Text"
                  value={reminderText}
                  onChange={(e) => setReminderText(e.target.value)}
                />
                <TextField
                  type="time"
                  size="small"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={addReminder}>
                  Add
                </Button>
              </Box>

              {/* Reminder List */}
              <List dense sx={{ mt: 2 }}>
                {reminders.map((reminder, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => deleteReminder(index)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`🔔 ${reminder.text}`}
                      secondary={`⏰ ${reminder.time}`}
                    />
                  </ListItem>
                ))}
              </List>

              {/* Stop Alarm Button */}
              {isRinging && (
                <Box textAlign="center" mt={2}>
                  <Button variant="contained" color="error" onClick={stopAlarm}>
                    🔕 Stop Alarm
                  </Button>
                </Box>
              )}
            </Box>
          </MDBox>
        </Grid>
      </Grid>
      <audio ref={beepSound} src={BeepSound} />
    </Box>
  );
};

export default ClockReminder;
