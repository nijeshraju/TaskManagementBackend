const Task = require("../model/task");
const { sendError, sendSuccess } = require("../jsonResponse");

// create task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { userId } = req.user;

    if (!title) {
      return sendError(res, "Task name required", 400);
    }

    const task = await Task.create({ userId, title, description });
    sendSuccess(res, "Task created successful", 201, task);
  } catch (error) {
    sendError(res, error?.message || "Server Error", 500, error);
  }
};

// get task list
const getAllTasks = async (req, res) => {
  try {
    const { filter } = req.query;
    const { userId } = req.user;

    let query = { userId };
    if (filter) query.status = filter === "completed" ? true : false;

    const tasks = await Task.find(query);
    sendSuccess(res, "Tasks fetched successful", 200, tasks);
  } catch (error) {
    sendError(res, error?.message || "Server Error", 500, error);
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      sendError(res, "Task id required", 400);
    }

    const task = await Task.findOne({ _id: id });

    if (!task) {
      return sendError(res, "Task not found", 400);
    }

    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedTask) {
      sendError(res, "Task not found", 400);
    }

    sendSuccess(res, "Tasks updated successful", 200, updatedTask);
  } catch (error) {
    sendError(res, error?.message || "Server Error", 500, error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
};
