const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const server = http.createServer(app);
//Route import 
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const parcelRoutes = require('./routes/parcelRoutes');
const agentRoutes = require("./routes/agentRoutes");
const reportRoutes = require('./routes/reportRoutes');


//midleware
app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/reports", reportRoutes);



// ODM/
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      // console.log("Server running...");
    });
  })
  .catch(console.error);

module.exports = app;
