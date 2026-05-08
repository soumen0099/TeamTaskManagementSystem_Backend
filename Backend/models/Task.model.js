import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams"
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    text: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;