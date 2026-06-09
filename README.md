# Products Card

Minimal React + Express + MongoDB app showing 3 product cards.

## Project structure

```
products-card/
├── frontend/     # React app (Vite)
├── backend/      # Express API + MongoDB
└── package.json  # Runs both together
```

## Setup

1. Copy `backend/.env.example` to `backend/.env` and set your MongoDB URI.
2. Install dependencies:

```bash
npm install
npm run install:all
```

3. Seed the database:

```bash
npm run seed
```

4. Start both servers:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api/products

## Run separately

```bash
# Backend only
cd backend
npm run dev

# Frontend only
cd frontend
npm run dev
```
