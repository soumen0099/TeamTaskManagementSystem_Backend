# Team Task Management System — Backend Documentation

## Project overview
A Node.js + Express backend for managing users, teams, tasks, and comments. Includes JWT authentication and MongoDB persistence (Mongoose).

Base URL (local): `http://localhost:<PORT>/api`
Default PORT: `5500` (or `process.env.PORT`)

Server entry: `server.js` (registers routes at `/api/auth`, `/api/tasks`, `/api/teams`).

---

## Run locally

1. Open terminal in `Backend` folder

```bash
cd Backend
npm install
npm run dev
```

2. Ensure MongoDB connection string and JWT secret are set in env variables (see below).

---

## Required environment variables
- `MONGO_URI` (or `MONGODB_URI` / `MONGODB_ATLAS_URI`) — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `PORT` — optional server port (default 5500)

---

## Authentication

- POST `/api/auth/register` — Register new user
  - Middleware: `validRegister`
  - Body (JSON): `{ "userName": "...", "email": "...", "password": "..." }`

- POST `/api/auth/login` — Authenticate and receive JWT
  - Middleware: `validLogin`
  - Body (JSON): `{ "email": "...", "password": "..." }`
  - Response typically contains JWT. Use this token in `Authorization` header: `Bearer <token>`

- GET `/api/auth/profile` — Protected, returns user profile
  - Requires header: `Authorization: Bearer <token>`

Auth middleware file: `Backend/middlewares/auth.middleware.js`
- returns 401 `{ message: "No token provided" }` if header missing
- returns 401 `{ message: "Invalid token" }` if token invalid/expired

---

## API Endpoints

All team and task endpoints require `Authorization: Bearer <token>` (except auth routes).

### Teams
- POST `/api/teams/create`
  - Body (JSON expected by controller/service):
    ```json
    {
      "teamName": "string",
      "description": "string",
      "owner": "USER_OBJECT_ID",
      "members": []
    }
    ```
  - Response: `{ message: "Team created successfully", team: { ... } }`
  - Note: `owner` must be a MongoDB ObjectId; `members` can be omitted as owner is auto-added as admin.
  - Common errors: 400 (validation), 401 (auth)

- POST `/api/teams/add-member/:teamId`
  - Body (JSON): `{ "memberUserId": "USER_OBJECT_ID" }`
  - Response: `{ message: "Member added successfully" }`
  - Errors:
    - 404 `Team not found`
    - 403 `Only the team owner can add members`
    - 404 `User not found` (if `memberUserId` invalid or absent)

- POST `/api/teams/remove-member/:teamId`
  - Body (JSON): `{ "memberUserId": "USER_OBJECT_ID" }`
  - Important: backend reads `memberUserId` from request body, not query string.
  - Response: `{ message: "Member removed successfully" }`

Routes file: `Backend/routes/team.routes.js`
Controller: `Backend/controller/team.controller.js`
Service: `Backend/services/team.service.js`
Model: `Backend/models/Team.model.js`

### Tasks
- POST `/api/tasks/create` — create task
  - Body example:
    ```json
    {
      "title": "...",
      "description": "...",
      "priority": "Low|Medium|High",
      "dueDate": "ISO_DATE",
      "assignedTo": "USER_OBJECT_ID",
      "team": "TEAM_OBJECT_ID"
    }
    ```
- GET `/api/tasks/read` — read tasks (protected)
- PUT `/api/tasks/update/:id` — update task
- DELETE `/api/tasks/delete/:id` — delete task

Routes file: `Backend/routes/task.routes.js`
Controller: `Backend/controller/task.controller.js`
Model: `Backend/models/Task.model.js`

### Comments
- Comments are attached in task model as an array (see `Task.model.js`). There is also `Comment.model.js` available.

---

## Data models (summary)

### Users (`Backend/models/User.model.js`)
- `userName` (string, unique)
- `email` (string, unique)
- `password` (string, hashed)
- `profilePicture` (string)
- `role` (`admin` | `member`)
- `skills` (array of strings)
- `team` (array of Team ObjectIds)

### Team (`Backend/models/Team.model.js`)
- `teamName` (string, unique)
- `teamDescription` (string)
- `owner` (ObjectId → `Users`) — required
- `members` — array of `{ user: ObjectId, role: "admin"|"member" }`
- `tasks` — array of Task ObjectIds

Important: `owner` and members' `user` values must be MongoDB ObjectIds. Passing username strings will cause Mongoose cast errors (`Cast to ObjectId failed`).

### Task (`Backend/models/Task.model.js`)
- `title`, `description`, `priority`, `dueDate`
- `assignedTo` (ObjectId → Users)
- `createdBy` (ObjectId → Users)
- `team` (ObjectId → Teams)
- `comments` (array of `{ user:ObjectId, text }`)

---

## Error responses and common pitfalls
- Missing/invalid token: 401 `{ message: "No token provided" }` or `{ message: "Invalid token" }`
- Validation errors: 400 with specific message (e.g., `Team name is required`)
- Mongoose cast errors: "Cast to ObjectId failed" — make sure to send real ObjectId strings for fields typed as ObjectId.
- Controller/Service mismatches: Some controller fields use `description` while Team model expects `teamDescription`. Expect small naming mismatches.

---

## Postman / Example flow (quick)
1. Register a user (save returned user `_id`)
   - POST `/api/auth/register` body: `{ "userName": "soumen", "email": "a@b.com", "password": "pass123" }`
2. Login and get token
   - POST `/api/auth/login` body: `{ "email": "a@b.com", "password": "pass123" }`
   - Header to use: `Authorization: Bearer <token>`
3. Create team (use created user `_id` as owner)
   - POST `/api/teams/create`
   - Body: `{ "teamName":"Soumen","description":"hello","owner":"<USER_ID>" }`
4. Add member
   - POST `/api/teams/add-member/<TEAM_ID>` body: `{ "memberUserId": "<OTHER_USER_ID>" }`
5. Remove member
   - POST `/api/teams/remove-member/<TEAM_ID>` body: `{ "memberUserId": "<OTHER_USER_ID>" }`

---

## Frontend integration notes
- Always include `Authorization: Bearer <token>` for protected requests.
- Use database `_id` values for owner/member/assignedTo/team fields.
- Validate required fields in the UI: teamName, task title/description/priority/dueDate.
- Expect returned team/task objects — prefer reading returned object fields (avoid assumptions about field names when there are minor mismatches).

---

## Next suggestions (choose one)
- I can generate a Postman collection file and save it to the repo.
- I can fix the `description` vs `teamDescription` mismatch in the backend.
- I can generate a minimal frontend sample (React) demonstrating login → create team → add member.

---

_Last updated: May 24, 2026_
