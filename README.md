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
- MongoDB connection string in `backend/config.json`

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
