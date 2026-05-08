import Tasks from "../models/Task.model.js";
import User from "../models/User.model.js";

export const createTask = async (createData) => {
   const receiveData = createData;
   if(
    !receiveData.title ||
     !receiveData.description ||
      !receiveData.priority || 
      !receiveData.dueDate 
    ){
    throw {
      statusCode:400,
      message:"All fields are required"
    }
   }

 if(receiveData.assignedTo){
    const assignedUserExists = await User.findById(receiveData.assignedTo);
   if(!assignedUserExists){
    throw{
      statusCode:404,
      message:"Assigned user not found"
    }
  }
 }

  const createdTask = await Tasks.create({
    title: receiveData.title,
    description: receiveData.description,
    priority: receiveData.priority,
    dueDate: receiveData.dueDate,
    assignedTo: receiveData.assignedTo,
    createdBy: receiveData.createdBy,
    team: receiveData.team,
    comments: receiveData.comments || []
  })

  return {
    message:"Task created successfully",
    task: createdTask
  }
}

export const readTask = async (req) => {

}


export const updateTask = async (req) => {

}


export const deleteTask = async (req) => {

}