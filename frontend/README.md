# Product Manager Frontend

React + TypeScript frontend for the FastAPI Product Manager backend.

## Setup

```bash
npm install
```

## Development

1. Start the FastAPI backend (from project root):
   ```bash
   python main.py
   # or: uvicorn main:app --reload
   ```

2. Start the frontend dev server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173

The Vite dev server proxies `/api/*` requests to the backend at `http://localhost:8000`.

## Build

```bash
npm run build
```

## Production

For production, set `VITE_API_URL` to your backend URL before building, e.g.:
```bash
VITE_API_URL=https://api.example.com npm run build
```
