const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://sgtaskmanager.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

module.exports = app;