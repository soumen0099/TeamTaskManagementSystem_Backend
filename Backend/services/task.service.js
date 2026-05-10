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

export const readTask = async (readData) => {
  const tasksExists = await Tasks.find(
    {createdBy: readData.createdBy}
  )

  return{
    message:"Tasks fetched successfully",
    tasks: tasksExists
  }

}


export const updateTask = async (taskId, userID, updateData) => {

  const findTask = await Tasks.findById(taskId);
  if(!findTask){
    throw{
      statusCode:404,
      message:"Task not found"
    }
  }

  const ownerCheck = findTask.createdBy.toString() === userID;
  if(!ownerCheck){
    throw{
      statusCode:403,
      message:"You are not authorized to update this task"
    }
  }

  // update data
  if(updateData.title) findTask.title = updateData.title;
  if(updateData.description) findTask.description = updateData.description;
  if(updateData.priority) findTask.priority = updateData.priority;
  if(updateData.dueDate) findTask.dueDate = updateData.dueDate

   await findTask.save();

   return{
    message:"Task updated successfully",
    task: findTask
   }

}


export const deleteTask = async (taskId, userID) => {

  const checkTask = await Tasks.findById(taskId);
  if(!checkTask){
    throw{
      statusCode:404,
      message:"Task not found"
    }
  }

  const ownerCheck = checkTask.createdBy.toString() === userID;
  if(!ownerCheck){
    throw{
      statusCode:403,
      message:"You are not authorized to delete this task"
    }
  }
   await checkTask.deleteOne();
    
return{
  message:"Task deleted successfully",
  task: checkTask
}

}