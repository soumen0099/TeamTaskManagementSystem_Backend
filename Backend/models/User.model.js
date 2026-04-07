import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const UsersSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true,
    minlength:6
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams"
    }
  ]
},{ timestamps: true }
)

// Pre-save hook to hash password before saving
UsersSchema.pre("save", async function(next){
  if(this.isModified("password")){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
})

// Method to compare entered password with hashed password
UsersSchema.methods.comparePassword = async function(enterPassword){
  const isMatch = await bcrypt.compare(enterPassword, this.password);
  return isMatch;
}

const Users = mongoose.model("Users", UsersSchema);

export default Users;