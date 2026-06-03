import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


export const register = async (userName, email, password) => {

  const existingUser = await User.findOne({email});
  if(existingUser){
    throw {
      statusCode:409,
      message:"An account with this email already exists"
    }
  }

  const existingUserName = await User.findOne({ userName });
  if (existingUserName) {
    throw {
      statusCode: 409,
      message: "This username is already taken"
    };
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

  const userData = user.toObject();
  delete userData.password;

  return{
    token,
    user: userData
  }
}

export const profile = async (userId) => {

  const user = await User.findById(userId)
    .select("-password")
    .populate({
      path: "team",
      populate: [
        { path: "owner", select: "-password" },
        { path: "members.user", select: "-password" }
      ]
    });

  if(!user){
    throw{
      statusCode: 404,
      message:"User not found"
    }
  }

  return user
}

export const updateProfilePicture = async (userId, profilePicture) => {
  const user = await User.findById(userId);

  if (!user) {
    throw {
      statusCode: 404,
      message: "User not found"
    };
  }

  user.profilePicture = profilePicture;
  await user.save();

  const userData = user.toObject();
  delete userData.password;

  return userData;
};