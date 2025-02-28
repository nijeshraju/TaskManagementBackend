const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const taskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending,", "InProgress", "Completed"],
      default: "Pending,",
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.method("toJSON", function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});

module.exports = mongoose.model("task", taskSchema);
