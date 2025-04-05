import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/User.routes.js";
import threatRoutes from "./routes/threat.routes.js";
import reportRoutes from "./routes/report.routes.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
    cors: { 
        origin: "*" 
    } 
});

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1", authRoutes);              // localhost:5000/api/v1
app.use("/api/v1/threats", threatRoutes);    // localhost:5000/api/v1/threats
app.use("/api/v1/reports", reportRoutes);    // localhost:5000/api/v1/reports

// WebSocket for real-time alerts
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("newThreat", (threatData) => {
    io.emit("alert", threatData); // Broadcast threat alerts
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
