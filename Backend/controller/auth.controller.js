import * as authService from "../services/auth.service.js";


export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = await authService.register(userName, email, password);
    res.status(201).json({
      message:"User registered successfully",
      data
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message:error.message
    })
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.status(200).json({
      message:"User logged in successfully",
      token: data.token
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message:error.message
    })
  }
};


export const profileUser = async (req, res) => {
  try {
   const data = await authService.profile(req.user.id); 
   res.status(200).json({
    message:"Profile fetched successfully",
    data
   })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message:error.message
    })
  }
};