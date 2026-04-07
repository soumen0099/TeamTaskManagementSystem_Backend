import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  profilePicture:{
    type:String,
    default:""
  },
  role:{
    type:String,
    enum:["admin","member"],
    default:"member"
  },
  skills:{
    type:[String],
    default:[]
  },
  team:[
    {
      type: ObjectId,
      ref: "Teams"
    }
  ],
  createdAt: Date,
  updatedAt: Date
})

const Users = mongoose.model("Users", UsersSchema);


export default Users;