

import { createTeam, addMember, removeMember } from "../services/team.service.js";

export const createTeamController = async (req, res) => { 
  try {
    const teamName = req.body.teamName;
    // Owner must come from the authenticated user to avoid tampering
    const owner = req.user && (req.user._id || req.user.id);
    const description = req.body.description || req.body.teamDescription || "";
    const members = req.body.members || [];

    const team = await createTeam({
      teamName,
      description,
      owner,
      members
    });

    return res.status(201).json(team);
  }catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }

}

export const addMemberController = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const loggedInUserId = req.user._id;
    const memberUserId = req.body.memberUserId;
    const team = await addMember(teamId, loggedInUserId, memberUserId);
    return res.status(200).json(team);
  } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
  }
}


export const removeMemberController = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const loggedInUserId = req.user._id;
    const memberUserId = req.body.memberUserId;
    const team = await removeMember(teamId, loggedInUserId, memberUserId);
    return res.status(200).json(team);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}