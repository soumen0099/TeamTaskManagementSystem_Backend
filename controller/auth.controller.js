import * as authService from "../services/auth.service.js";

const parseAuthError = (error) => {
  if (error?.statusCode) {
    return {
      statusCode: error.statusCode,
      message: error.message || "Request failed"
    };
  }

  if (error?.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || {})[0];
    if (duplicateField === "email") {
      return { statusCode: 409, message: "An account with this email already exists" };
    }
    if (duplicateField === "userName") {
      return { statusCode: 409, message: "This username is already taken" };
    }
    return { statusCode: 409, message: "Duplicate value detected" };
  }

  if (error?.name === "ValidationError") {
    const firstMessage = Object.values(error.errors || {})[0]?.message;
    return {
      statusCode: 400,
      message: firstMessage || "Validation failed"
    };
  }

  return {
    statusCode: 500,
    message: error?.message || "Internal server error"
  };
};


export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = await authService.register(userName, email, password);
    res.status(201).json({
      message:"User registered successfully",
      data
    })
  } catch (error) {
    const parsedError = parseAuthError(error);
    res.status(parsedError.statusCode).json({
      message: parsedError.message
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.status(200).json({
      message:"User logged in successfully",
      token: data.token,
      user: data.user
    })
  } catch (error) {
    const parsedError = parseAuthError(error);
    res.status(parsedError.statusCode).json({
      message: parsedError.message
    });
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
    const parsedError = parseAuthError(error);
    res.status(parsedError.statusCode).json({
      message: parsedError.message
    });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const data = await authService.updateProfilePicture(req.user.id, profilePicture);

    res.status(200).json({
      message: "Profile picture updated successfully",
      data
    });
  } catch (error) {
    const parsedError = parseAuthError(error);
    res.status(parsedError.statusCode).json({
      message: parsedError.message
    });
  }
};