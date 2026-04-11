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

  const user = await User.findOne({email});
  if(!user){
    throw{
      statusCode:404,
      message:"User not found"
    }
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    throw{
      statusCode:400,
      message:"Invalid credentials"
    }
  }


  const token = await jwt.sign({
    id: user._id,
    email: user.email,
    role: user.role
    },process.env.JWT_SECRET, {expiresIn:"7d"})


  return{
    token
  }
}

export const profile = async (userId) => {

  const user = await User.findById(userId).select("-password");

  if(!user){
    throw{
      statusCode: 404,
      message:"User not found"
    }
  }

  return user
}