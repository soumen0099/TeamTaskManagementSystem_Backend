import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  priority:{
    type:String,
    enum:["Low","Medium","High"],
    required:true
  },
  dueDate:{
    type:Date,
    required:true
  },
  assignedTo:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Users"
  },
  createdById:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Users"
  },
  team:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Teams"
  },
  comments:[{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    text: String,
  }]
},{ timestamps: true })


const Tasks = mongoose.model("Tasks",taskSchema);


export default Tasks;