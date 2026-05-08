import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
 try {
   const authHeader = req.headers.authorization;

   if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({
      message: "No token provided"
    })
   }

   const token = authHeader.split(" ")[1];

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   req.user = decoded;
   req.user._id = decoded.id;

   next();
    
 } catch (error) {
   return res.status(401).json({
    message: "Invalid token"
   })
 }
}

export const authorize = (requiredRoles) => {
  return (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  }
}
//when router can use delete method then we can use this middleware to check if the user is admin or not