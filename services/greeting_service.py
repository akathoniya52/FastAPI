"""Greeting service."""
from constant import USER_NAME


def get_greeting() -> dict[str, str]:
    """Return greeting message."""
    return {"message": f"Hello, {USER_NAME}!"}
