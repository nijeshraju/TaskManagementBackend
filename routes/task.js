const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const authMiddleware = require("../middleware/auth");
const validate = require("../middleware/validate");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../utils/validation/taskValidation");

router.get("/", authMiddleware, taskController.getAllTasks);
router.post(
  "/",
  authMiddleware,
  validate(createTaskSchema),
  taskController.createTask,
);
router.put(
  "/:id",
  authMiddleware,
  validate(updateTaskSchema),
  taskController.updateTask,
);

module.exports = router;
