"""Greeting routes."""
import fastapi
from fastapi import APIRouter

from services import greeting_service

router = APIRouter(tags=["greeting"])


@router.get("/")
def greet() -> fastapi.responses.JSONResponse:
    """Return a JSON greeting message for the user."""
    return fastapi.responses.JSONResponse(greeting_service.get_greeting())
