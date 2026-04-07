import mongoose from "mongoose";


const commentsSchema = new mongoose.Schema({
  comments: [
   {   
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    text: String,

  }
  ]
},{ timestamps: true })


const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;