// // server.js
// const http = require('http');
// const dotenv = require('dotenv');
// const app = require('./app');
// const connectDB = require('./config/db');
// dotenv.config();
// connectDB();


// const server = http.createServer(app);
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
// src/index.js
const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');
dotenv.config();
connectDB();
const socketService = require("./socket");

const server = http.createServer(app);
const io = socketService.init(server); // Initialize Socket.IO with the server and get the instance

// socket 
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("joinCustomerRoom", (parcelId) => {
    socket.join(`customer:${parcelId}`);
    console.log(`Joined room: customer:${parcelId}`);
  });

  socket.on("agentLocationUpdate", (data) => {
    console.log("Received agent location update:", JSON.stringify(data));
    io.to(`customer:${data.parcelId}`).emit("locationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});