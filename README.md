# Travel Story

Travel Story is a full-stack journaling app for recording travel experiences with photos, visited locations, dates, favorites, search, and date-range filtering.

## Overview

The project has two parts:

- `backend/` - an Express + MongoDB API for authentication, travel story CRUD, image upload, search, and filtering.
- `frontend/travel-story-app/` - a React + Vite client for sign up, login, dashboard browsing, story creation, editing, and viewing.

## Tech Stack

- Frontend: React, Vite, React Router, Axios, React Day Picker, React Modal, React Toastify, Moment, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, multer, CORS

## Main Features

- User authentication with sign up and login
- JWT-based protected API requests
- Create, edit, view, and delete travel stories
- Upload and remove story images
- Mark stories as favorites
- Search stories by title, story text, or visited location
- Filter stories by date range
- Responsive dashboard UI with cards, modals, and empty states

## Project Structure

```text
backend/
  index.js
  utilities.js
  multer.js
  config.json
  models/
    user.model.js
    travelStory.model.js
  uploads/

frontend/travel-story-app/
  src/
    App.jsx
    main.jsx
    pages/
      Auth/
      Home/
    components/
      Cards/
      input/
    utils/
```

## Setup

### Backend

1. Install dependencies:

```bash
cd backend
npm install
```

2. Start the API server:

```bash
npm start
```

The backend runs on `http://localhost:8000`.

Required backend configuration:

- `ACCESS_TOKEN_SECRET` in your environment
- `MONGODB_URI` in your environment (preferred)
- `FRONTEND_URL` (comma-separated allowed origins for CORS)
- `SERVER_URL` (public backend URL used to build uploaded image URLs)

Example: copy `backend/.env.example` to `backend/.env` and fill values.

### Frontend

1. Install dependencies:

```bash
cd frontend/travel-story-app
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend runs on Vite's local dev server and talks to `http://localhost:8000` through Axios.

Example: copy `frontend/travel-story-app/.env.example` to `frontend/travel-story-app/.env`.

## Deployment

### Backend on Render

1. Create a new **Web Service** from this repository.
2. Set **Root Directory** to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
  - `MONGODB_URI`
  - `ACCESS_TOKEN_SECRET`
  - `FRONTEND_URL` = your Netlify site URL (for example `https://your-site.netlify.app`)
  - `SERVER_URL` = your Render backend URL (for example `https://travel-story-api.onrender.com`)

Optional: keep `PORT` empty on Render (Render injects it automatically).

### Frontend on Netlify

This repo includes `netlify.toml` configured for the Vite app in `frontend/travel-story-app`.

1. Create a new Netlify site from this repository.
2. Add environment variable:
  - `VITE_API_URL` = your Render backend URL (for example `https://travel-story-api.onrender.com`)
3. Deploy.

Client-side routing fallback is configured through `frontend/travel-story-app/public/_redirects`.

### GitHub Actions CI/CD

The repository also includes a GitHub Actions workflow at [/.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) that:

- runs backend dependency installation and JavaScript syntax checks on every push and pull request to `main`
- runs frontend linting and production builds on every push and pull request to `main`
- deploys the backend to Render on pushes to `main`
- deploys the frontend to Netlify on pushes to `main`

For the deploy jobs, add these repository secrets in GitHub:

- `RENDER_DEPLOY_HOOK_URL`
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

## Important Note About Images

Uploaded files are currently stored in `backend/uploads`. On Render, local disk is ephemeral, so files can be lost after redeploy/restart. For production, use object storage (Cloudinary, S3, etc.) for persistent images.

## API Summary

### Auth

- `POST /create-account` - create a new user and return a token
- `POST /login` - authenticate an existing user and return a token
- `GET /get-user` - fetch the current user

### Stories

- `GET /get-all-stories` - list current user's stories
- `POST /add-travel-story` - add a story
- `PUT /edit-story/:id` - update a story
- `DELETE /delete-story/:id` - delete a story
- `PUT /update-is-favourite/:id` - toggle favorite status
- `GET /search` - search stories
- `GET /travel-stories/filter` - filter stories by visited date range

### Files

- `POST /image-upload` - upload a story image
- `DELETE /delete-image` - delete an uploaded image

## Notes

- The frontend uses `react-day-picker` for the date filter and the story date selector.
- Images are stored locally in the backend `uploads/` folder.
- The client stores the JWT in `localStorage` under `token`.
- `backend/config.json` currently holds the MongoDB connection string, so it should be treated as sensitive configuration.
