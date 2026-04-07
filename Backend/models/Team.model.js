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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tasks"
  }
},{ timestamps: true })


const Teams = mongoose.model("Teams", TeamsSchema);


export default Teams; 