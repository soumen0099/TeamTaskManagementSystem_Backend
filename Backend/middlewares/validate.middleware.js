export const validRegister = (req,res,next) => {
   const { userName, email, password } = req.body;

    const trimmedUserName = typeof userName === "string" ? userName.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const passwordValue = typeof password === "string" ? password : "";

    if (!trimmedUserName) {
      return res.status(400).json({
        message: "Username is required"
      });
    }

    if (!trimmedEmail) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address"
      });
    }

    if (!passwordValue) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    if (passwordValue.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    req.body.userName = trimmedUserName;
    req.body.email = trimmedEmail;
    next();
}


export const validLogin = (req,res,next) => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";

  if(!email || !password){
    return res.status(400).json({
      message:"All fields are required"
    })
  }

  req.body.email = email;
  next();
}

export const validProfilePictureUpdate = (req, res, next) => {
  const profilePicture = typeof req.body.profilePicture === "string" ? req.body.profilePicture.trim() : "";

  if (!profilePicture) {
    return res.status(400).json({
      message: "Profile picture is required"
    });
  }

  const isDataUrl = /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(profilePicture);
  const isHttpUrl = /^https?:\/\//i.test(profilePicture);

  if (!isDataUrl && !isHttpUrl) {
    return res.status(400).json({
      message: "Profile picture must be a valid image URL or supported base64 image"
    });
  }

  if (profilePicture.length > 5 * 1024 * 1024) {
    return res.status(413).json({
      message: "Profile picture is too large"
    });
  }

  req.body.profilePicture = profilePicture;
  next();
};