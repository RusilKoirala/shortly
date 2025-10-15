# Deployment guide

This repository contains a backend (Express + MongoDB) and a frontend (Vite + React).

Backend (Render)

Option A — Deploy the `backend` folder as the service root (recommended):
- On Render create a new Web Service and set the service root to the `backend` folder.
- Render will run `npm install` and then `npm start` inside the `backend` folder.

Option B — Deploy the repo root and set the start command manually:
- If you deploy the repository root, set the Start Command in Render to `npm --prefix backend start` so it runs the backend start script in the `backend` folder.

Environment variables (set in Render dashboard):
  - MONGO_URI
  - JWT_SECRET
  - PORT (Render provides one automatically; optional)
  - CLIENT_URL (set to your Netlify site URL, e.g. https://your-site.netlify.app)
  - NODE_ENV=production
  - COOKIE_DOMAIN (optional)
-- Start command: `npm start` (Render will run this in the service root; if the service root is `backend` this runs `node server.js`. If you're deploying the repo root, use `npm --prefix backend start` as the Start Command.)
-- Build command: none required for Node server
- Health check: `/` returns a basic message

Notes:
Note: the `backend/package.json` start script is `node server.js` so it works when the service root is the `backend` folder. If you deploy the repository root, either set Render's Start Command to `npm --prefix backend start` or change the start command in Render accordingly.

Frontend (Netlify)
- Create a new site on Netlify and connect your repo.
- Set the build command to `npm run build` and publish directory to `dist`.
- Set the following build environment variables in Netlify (Site settings > Build & deploy > Environment):
  - VITE_API_URL = https://your-backend.onrender.com/api
- The repo includes `netlify.toml` and a `_redirects` file to handle SPA routing.

Local development
- Backend: `npm run dev` (from root or backend folder depending on your setup)
- Frontend: `npm run dev` (from frontend folder)

Troubleshooting
- If cookies are not sent from frontend to backend in production, verify:
  - FRONTEND is served from HTTPS
  - Backend `CLIENT_URL` matches frontend origin
  - Browser blocks third-party cookies — SameSite=None and Secure are required for cross-site cookies

*** End of file
