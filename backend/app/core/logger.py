import sys
import logging
import structlog
from typing import Any, Dict

from .config import settings


def configure_logging() -> None:
    """
    Configures structured logging for the application.
    
    Sets up structlog with appropriate processors and formatting based on the
    environment (development vs production).
    """
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=logging.DEBUG if settings.DEBUG else logging.INFO,
    )

    shared_processors = [
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.StackInfoRenderer(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
    ]

    if settings.ENVIRONMENT == "development":
        processors = [
            *shared_processors,
            structlog.dev.ConsoleRenderer(colors=True),
        ]
    else:
        processors = [
            *shared_processors,
            structlog.processors.format_exc_info,
            structlog.processors.JSONRenderer(),
        ]

    structlog.configure(
        processors=processors,
        logger_factory=structlog.PrintLoggerFactory(),
        wrapper_class=structlog.make_filtering_bound_logger(
            logging.DEBUG if settings.DEBUG else logging.INFO
        ),
        cache_logger_on_first_use=True,
    )


def get_logger(name: str = None) -> structlog.BoundLogger:
    """
    Creates a structured logger instance with optional context.
    
    Args:
        name: Optional name for the logger context
        
    Returns:
        A configured structured logger instance
    """
    logger = structlog.get_logger(name)
    return logger


def get_request_id() -> str:
    """
    Retrieves the current request ID from context.
    
    Returns:
        The current request ID or None if not set
    """
    return structlog.contextvars.get_contextvars().get("request_id")


def log_request_middleware(request_id: str) -> Dict[str, Any]:
    """
    Creates a middleware context dict for request logging.
    
    Args:
        request_id: The unique identifier for the request
        
    Returns:
        Dict with request context information
    """
    return {
        "request_id": request_id,
        "environment": settings.ENVIRONMENT,
    }