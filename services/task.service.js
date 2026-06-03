import Tasks from "../models/Task.model.js";
import User from "../models/User.model.js";
import Team from "../models/Team.model.js";

export const createTask = async (createData) => {
  const receiveData = createData;
  if(
    !receiveData.title ||
    !receiveData.description ||
    !receiveData.priority || 
    !receiveData.dueDate 
  ){
    throw {
      statusCode: 400,
      message: "All fields are required"
    }
  }

  if (receiveData.assignedTo) {
    const assignedUserExists = await User.findById(receiveData.assignedTo);
    if (!assignedUserExists) {
      throw {
        statusCode: 404,
        message: "Assigned user not found"
      }
    }
  }

  const createdTask = await Tasks.create({
    title: receiveData.title,
    description: receiveData.description,
    priority: receiveData.priority,
    dueDate: receiveData.dueDate,
    assignedTo: receiveData.assignedTo || null,
    createdBy: receiveData.createdBy,
    team: receiveData.team || null,
    comments: receiveData.comments || [],
    status: receiveData.status || "To Do"
  });

  // Synchronize relationship: append task ID to parent Team's tasks list
  if (receiveData.team) {
    await Team.findByIdAndUpdate(receiveData.team, { $addToSet: { tasks: createdTask._id } });
  }

  // Populate references completely before returning
  const populatedTask = await Tasks.findById(createdTask._id)
    .populate("team")
    .populate("assignedTo", "-password")
    .populate("createdBy", "-password");

  return {
    message: "Task created successfully",
    task: populatedTask
  }
}

export const readTask = async (readData) => {
  const userId = readData.createdBy;

  // Collaborative Query: Fetch teams where the user is either the owner or a member
  const userTeams = await Team.find({
    $or: [
      { owner: userId },
      { "members.user": userId }
    ]
  });
  const teamIds = userTeams.map(team => team._id);

  // Retrieve tasks created by me, assigned to me, or belonging to any of my teams
  const tasksExists = await Tasks.find({
    $or: [
      { createdBy: userId },
      { assignedTo: userId },
      { team: { $in: teamIds } }
    ]
  })
    .populate("team")
    .populate("assignedTo", "-password")
    .populate("createdBy", "-password")
    .populate("comments.user", "-password");

  return {
    message: "Tasks fetched successfully",
    tasks: tasksExists
  }
}

export const updateTask = async (taskId, userID, updateData) => {
  const findTask = await Tasks.findById(taskId);
  if (!findTask) {
    throw {
      statusCode: 404,
      message: "Task not found"
    }
  }

  const isCreator = findTask.createdBy.toString() === userID.toString();
  const isAssignee = findTask.assignedTo && findTask.assignedTo.toString() === userID.toString();

  // Teammate authorization check
  let isTeamMember = false;
  if (findTask.team) {
    const teamDoc = await Team.findById(findTask.team);
    if (teamDoc) {
      isTeamMember = teamDoc.owner.toString() === userID.toString() ||
                     teamDoc.members.some(m => m.user.toString() === userID.toString());
    }
  }

  const hasAccess = isCreator || isAssignee || isTeamMember;
  if (!hasAccess) {
    throw {
      statusCode: 403,
      message: "You are not authorized to update this task"
    }
  }

  // Creator only: full administrative privilege
  if (isCreator) {
    if (updateData.title) findTask.title = updateData.title;
    if (updateData.description) findTask.description = updateData.description;
    if (updateData.priority) findTask.priority = updateData.priority;
    if (updateData.dueDate) findTask.dueDate = updateData.dueDate;
    if (updateData.assignedTo !== undefined) findTask.assignedTo = updateData.assignedTo || null;
    
    // If team is re-assigned, sync tasks lists between old and new teams
    if (updateData.team !== undefined && updateData.team !== findTask.team?.toString()) {
      if (findTask.team) {
        await Team.findByIdAndUpdate(findTask.team, { $pull: { tasks: findTask._id } });
      }
      if (updateData.team) {
        await Team.findByIdAndUpdate(updateData.team, { $addToSet: { tasks: findTask._id } });
      }
      findTask.team = updateData.team || null;
    }
  }

  // Collaborative upgrades: any authorized user (creator, assignee, or teammate) can update lanes and comments
  if (updateData.status) {
    findTask.status = updateData.status;
  }
  
  if (updateData.comments) {
    findTask.comments = updateData.comments;
  }

  await findTask.save();

  // Return fully populated fresh task object
  const populatedTask = await Tasks.findById(findTask._id)
    .populate("team")
    .populate("assignedTo", "-password")
    .populate("createdBy", "-password")
    .populate("comments.user", "-password");

  return {
    message: "Task updated successfully",
    task: populatedTask
  }
}

export const deleteTask = async (taskId, userID) => {
  const checkTask = await Tasks.findById(taskId);
  if (!checkTask) {
    throw {
      statusCode: 404,
      message: "Task not found"
    }
  }

  const ownerCheck = checkTask.createdBy.toString() === userID.toString();
  if (!ownerCheck) {
    throw {
      statusCode: 403,
      message: "You are not authorized to delete this task"
    }
  }

  await checkTask.deleteOne();

  // Synchronize relationship: remove task ID from parent Team's tasks list
  if (checkTask.team) {
    await Team.findByIdAndUpdate(checkTask.team, { $pull: { tasks: taskId } });
  }

  return {
    message: "Task deleted successfully",
    task: checkTask
  }
}