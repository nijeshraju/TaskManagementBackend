const Joi = require("joi");

const createTaskSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().min(3).required().messages({
    "string.empty": "Title is required",
    "string.min": "Task title must be at least 3 characters",
  }),
  description: Joi.string().min(5).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
  }),
  status: Joi.string()
    .valid("Pending", "InProgress", "Completed")
    .default("Pending"),
});

const updateTaskSchema = Joi.object({
  status: Joi.string()
    .valid("Pending", "InProgress", "Completed")
    .required()
    .messages({
      "any.only": "Status must be one of Pending, InProgress, or Completed",
      "string.empty": "Status is required",
    }),
});

module.exports = { createTaskSchema, updateTaskSchema };
