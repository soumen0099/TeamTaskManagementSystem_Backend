import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


export const register = async (userName, email, password) => {

  const existingUser = await User.findOne({email});
  if(existingUser){
    throw {
      statusCode:400,
      message:"User already exists"
    }
  }

  const user = await User.create({
    userName,
    email,
    password: password,
  })


  const token = await jwt.sign({
    id: user._id,
    email: user.email,
    role: user.role
  }, process.env.JWT_SECRET, {expiresIn:"7d"})

  const userData = user.toObject();
  delete userData.password;
  return{
    user:userData,
    token
  }
}

export const login = async (email, password) => {

}

export const profile = async (userId) => {

}