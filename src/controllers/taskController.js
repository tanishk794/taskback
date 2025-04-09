const Task = require("../../model/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, taskDate, priority, status } = req.body;
    console.log(req.body);

    const task = new Task({
      title,
      description,
      taskDate,
      priority,
      status,
      user: req.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "title",
      "description",
      "taskDate",
      "priority",
      "status",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates" });
    }

    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

// Get tasks by date
exports.getTasksByDate = async (req, res) => {
  try {
    const taskDate = req.params.date; // Expecting a string in YYYY-MM-DD format

    const tasks = await Task.find({
      user: req.userId,
      taskDate: taskDate, // Direct string comparison
    });

    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks by date", error: error.message });
  }
};

// set task reminder
exports.setRemider = async (req, res) => {
  try {
    const { taskId, reminderTime } = req.body;

    if (!taskId || !reminderTime) {
      return res
        .status(400)
        .json({ message: "Task ID and reminder time are required." });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (!task.taskDate) {
      return res
        .status(400)
        .json({ message: "Task does not have a valid taskDate." });
    }

    // Combine task date and reminder time into ISO 8601 format with IST offset
    const dateTimeWithIST = new Date(`${task.taskDate}T${reminderTime}:00+05:30`);

    // Save to DB (Mongo stores in UTC, but we preserve IST logic this way)
    task.reminder = dateTimeWithIST;
    await task.save();

    res.status(200).json({ message: "Reminder set successfully", task });
  } catch (error) {
    console.error("Error setting reminder:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
