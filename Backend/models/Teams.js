import mongoose from "mongoose";


const TeamsSchema = new mongoose.Schema({
  teamName:{
    type:String,
    required:true,
    unique:true
  },
  teamDescription:{
    type:String,
    default:""
  },
  owner:{
    type: ObjectId,
    ref: "user"
  },
  members:[
    {
      user: {
        type: ObjectId,
        ref: "User"
      },
      role:{
        type: String,
        enum: ["admin","member"],
        default: "member"
      }
    }
  ],
  task: {
    type: ObjectId,
    ref: "Task"
  },
  createdAt: Date,
  updateAt: Date
})


const Teams = mongoose.Schema("Team", TeamsSchema);


export default Teams; 