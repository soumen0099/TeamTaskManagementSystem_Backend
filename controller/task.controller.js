import {createTask,readTask,updateTask,deleteTask} from "../services/task.service.js";


export const createTaskController = async (req, res) => {
  try {
    const createData ={
      ...req.body,
      createdBy: req.user._id
    }
    const result = await createTask(createData);
    return res.status(201).json(result);
   }catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }

  }

  export const readTaskController = async (req, res) => {
    try {
      const readData ={
        createdBy: req.user._id
      }
      const result = await readTask(readData);
      return res.status(200).json(result);
     }catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  export const updateTaskController = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userID = req.user._id;
      const updateData = req.body;
      const result = await updateTask(taskId, userID, updateData);
      return res.status(200).json(result);
     }catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  export const deleteTaskController = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userID = req.user._id;
      const result = await deleteTask(taskId, userID);
      return res.status(200).json(result);
      }catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }