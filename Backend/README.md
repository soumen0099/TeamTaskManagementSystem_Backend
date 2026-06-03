# Backend — WorkPulse (Team Task Management System)

This folder contains the Express.js backend for the WorkPulse application.

## Features
- User authentication (register, login)
- JWT-based protected routes
- Profile endpoint and profile-picture update (`PUT /api/auth/profile-picture`)
- Task and Team APIs

## Quick start
1. Install dependencies:

```bash
cd Backend
npm install
```

2. Create a `.env` file (example):

```
PORT=8800
MONGO_URI=mongodb://localhost:27017/workpulse
JWT_SECRET=some_long_secret
```

3. Start the server (dev):

```bash
npm run dev
```

## Important endpoints
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — login (returns `token` and `user`)
- `GET /api/auth/profile` — protected, returns profile
- `PUT /api/auth/profile-picture` — protected, accepts `{ profilePicture: string }` (data URL or http(s) URL)

## Security & notes
- The project uses JWT stored in `localStorage` on the frontend — consider switching to httpOnly cookies to reduce XSS risk.
- Current avatar uploads accept base64 data URLs; for production use, move images to S3/Cloudinary and store only URLs.
- Server JSON body limit was increased to support base64 images — keep image sizes controlled.

## Testing & development
- Ensure MongoDB is running and `MONGO_URI` is correct.
- Health check: `GET /api/health`.

## Contact
For issues, open an issue on the repository or contact the maintainer.
