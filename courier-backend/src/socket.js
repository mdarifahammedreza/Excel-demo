
// src/Socket.js
let ioInstance;

module.exports = {
  init: (httpServer) => {
    const { Server } = require("socket.io");
    ioInstance = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    return ioInstance;
  },
  getIO: () => {
    if (!ioInstance) throw new Error("Socket.io not initialized");
    return ioInstance;
  },
};
