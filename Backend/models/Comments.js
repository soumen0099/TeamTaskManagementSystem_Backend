import mongoose from "mongoose";


const commentsSchema = new mongoose.Schema({
  comments: [
   {   
     user: {
      type: ObjectId,
      ref: "Users",
      required: true
    },
    text: String,
    createdAt: Date 

  }
  ]
})


const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;