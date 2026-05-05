from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routers import auth, bookmarks, countries, eras, regions

app = FastAPI(title="Timeglass API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

app.include_router(regions.router)
app.include_router(countries.router)
app.include_router(eras.router)
app.include_router(auth.router)
app.include_router(bookmarks.router)


@app.get("/health")
def health():
    return {"status": "ok"}
