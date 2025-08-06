from fastapi import APIRouter
from app.routes.start import router as start_router

router = APIRouter()

# Register all route files here
router.include_router(start_router)

