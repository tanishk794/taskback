const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

// Apply auth middleware to all routes
router.use(authMiddleware);



// Get tasks by date
router.get("/date/:date", taskController.getTasksByDate);



// Create new task for the loggedIn user
router.post("/", taskController.createTask);

// Update task based on Id recieve
router.put("/:id", taskController.updateTask);

// Delete task based on Id recieve
router.delete("/:id", taskController.deleteTask);

router.post("/set-reminder",taskController.setRemider)

module.exports = router;
