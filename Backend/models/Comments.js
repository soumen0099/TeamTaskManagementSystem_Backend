import mongoose from "mongoose";


const commentsSchema = new mongoose.Schema({
  comments: [
   {   
     user: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    text: String,
    createdAt: Date 

  }
  ]
})


const Comments = mongoose.Schema("Comments", commentsSchema);

export default Comments;