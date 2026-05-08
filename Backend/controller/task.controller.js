import {createTask} from "../services/task.service.js";


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