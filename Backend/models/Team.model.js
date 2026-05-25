import mongoose from "mongoose";


const TeamSchema = new mongoose.Schema({
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
    ref: "Users",
    required:true
  },
  members:[
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true
      },
      role:{
        type: String,
        enum: ["admin","member"],
        default: "member"
      }
    }
  ],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tasks"
  }]
},{ timestamps: true })


const Team = mongoose.model("Team", TeamSchema);


export default Team; 