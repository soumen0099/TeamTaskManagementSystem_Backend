import Team from "../models/team.model.js";
import User from "../models/User.model.js";


export const createTeam = async (teamData) => {

  const { teamName, description, owner, members } = teamData;
  if (!teamName) {
    throw {
      statusCode: 400,
      message: "Team name is required"
    }

    }

const existingTeam = await Team.findOne({teamName})
if(existingTeam){
  throw{
    statusCode: 400,
    message: "Team already exists"
  }
}

const teamCreate = await Team.create({
  teamName: teamName,
  owner: owner,
  members: [
  {
    user: owner,
    role: "admin"
  }
]
  })

  return {
    message:"Team created successfully",
    team:teamCreate
  }
  
}

export const addMember = async (teamId, loggedInUserId, memberUserId) => {
  const team = await Team.findById(teamId)
  if(!team){
    throw{
      statusCode: 404,
      message: "Team not found"
    }
  }
  const isOwner = team.owner.toString() === loggedInUserId;
  if(!isOwner){
        throw{
      statusCode: 403,
      message: "Only the team owner can add members"
    }
  }
  const memberUser = await User.findById(memberUserId);
  if(!memberUser){
    throw{
      statusCode: 404,
      message: "User not found"
    }
  }
  const teamMember = team.members.some(
  member => member.user.toString() === memberUserId.toString());
  if(teamMember){
    throw{
      statusCode: 400,
      message: "Duplicate member"
    }
  }

  team.members.push({
    user: memberUserId,
    role:"member"
  })
  await team.save()
  return{
    message: "Member added successfully",
  }
}

export const removeMember = async (teamId,loggedInUserId,memberUserId) => {
  const team = await Team.findById(teamId)
  if (!team) {
    throw{
      statusCode:404,
      message: "Team not found"
    }
  }

  const owner = team.owner.toString() === loggedInUserId;
if (!owner) {
  throw{
    statusCode:403,
    message: "Only Team owner can remove members"
  }
}

  const memberUser = await User.findById(memberUserId);
  if(!memberUser){
    throw{
      statusCode: 404,
      message: "User not found"
    }
  }

  team.members = team.members.filter(member => member.user.toString() !== memberUserId.toString());
  await team.save()
  return{
    message: "Member removed successfully"
  }
}

export const getSingleTeam = async () => {
  
}

export const updateTeam = async () => {

}

export const deleteTeam = async () => {

}
// 1. createTeam ✔️
// 2. addMember✔️
// 3. removeMember
// 4. getSingleTeam
// 5. updateTeam
// 6. deleteTeam