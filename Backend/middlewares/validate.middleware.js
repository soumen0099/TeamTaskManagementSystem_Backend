export const validRegister = (req,res,next) => {
   const{userName, email, password} = req.body
    if(!userName || !email || !password){
      return res.status(400).json({
        message:"All fields are required"
      })
    }

    next();
}


export const validLogin = (req,res,next) => {
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({
      message:"All fields are required"
    })
  }
  next();
}