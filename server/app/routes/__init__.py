from fastapi import APIRouter
from app.routes.profile import router as profile_router
from app.routes.preferences import router as preferences_router

router = APIRouter()

# Register routers with prefixes
router.include_router(profile_router, prefix="/save_profile")
router.include_router(preferences_router, prefix="/save_preferences")
