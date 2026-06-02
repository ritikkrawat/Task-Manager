const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

// Create file if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

const readTasks = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

module.exports = { readTasks, writeTasks };