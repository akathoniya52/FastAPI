"""FastAPI application - modular entry point."""
from fastapi import FastAPI, Request, requests
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

import database_models
from database import engine
from init_db import init_database
from routers import greeting, products

# Create all tables and seed if empty
database_models.Base.metadata.create_all(bind=engine)
init_database()

app = FastAPI(
    title="FastAPI Application",
    description="A simple FastAPI application with greeting and product endpoints.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create middleware for logging
@app.middleware("http")
async def log_request(request: Request, call_next):
    """Log the request."""
    print(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    print(f"Response: {response.status_code}")
    return response

# Include routers
app.include_router(greeting.router)
app.include_router(products.router)


def sync_products_sequence():
    """Sync PostgreSQL id sequence so new inserts get correct next value."""
    with engine.connect() as conn:
        conn.execute(
            text(
                "SELECT setval(pg_get_serial_sequence('products', 'id'), "
                "(SELECT COALESCE(MAX(id), 0) FROM products))"
            )
        )
        conn.commit()


@app.on_event("startup")
def on_startup():
    """Sync products id sequence on app startup."""
    sync_products_sequence()


if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    import uvicorn
    load_dotenv()
    PORT = os.getenv('PORT')
    uvicorn.run("main:app", host="0.0.0.0", port=int(PORT), reload=True)

    
    import time
    import requests

    URL = "https://fastapi-c2ep.onrender.com"
    print("Starting server keep alive...","URL:", URL)
    while True:
        print("Checking server...")

        try:
            response = requests.get(URL)

            if response.status_code == 200:
                print("✅ Server is alive")
            else:
                print(f"⚠️ Server responded with: {response.status_code}")

        except requests.exceptions.RequestException as e:
            print(f"❌ Error connecting to server: {e}")

        time.sleep(10)