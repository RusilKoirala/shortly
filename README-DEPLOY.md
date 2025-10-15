# Deployment guide

This repository contains a backend (Express + MongoDB) and a frontend (Vite + React).

Backend (Render)
- Set up a new Web Service on Render using the `backend` folder as the root.
- Environment variables (set in Render dashboard):
  - MONGO_URI
  - JWT_SECRET
  - PORT (Render provides one automatically; optional)
  - CLIENT_URL (set to your Netlify site URL, e.g. https://your-site.netlify.app)
  - NODE_ENV=production
  - COOKIE_DOMAIN (optional)
- Start command: `npm start` (in backend folder)
- Build command: none required for Node server
- Health check: `/` returns a basic message

Notes:
- Ensure the `start` script in `backend/package.json` is `node backend/server.js` or adjust Render's Start Command accordingly.
- Render provides HTTPS, so cookies will be sent with `secure` flag when `NODE_ENV=production`.

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
