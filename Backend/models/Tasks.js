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
    type: ObjectId,
    ref:"Users"
  },
  createdById:{
    type: ObjectId,
    ref:"Users"
  },
  team:{
    type: ObjectId,
    ref:"Teams"
  },
  comments:[{
    user: {
      type: ObjectId,
      ref: "Users"
    },
    text: String,
    createdAt: Date,
    updateAt: Date
  }]
})


const Tasks = mongoose.model("Tasks",taskSchema);


export default Tasks;