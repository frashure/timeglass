from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routers import countries, eras, regions

app = FastAPI(title="Timeglass API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(regions.router)
app.include_router(countries.router)
app.include_router(eras.router)


@app.get("/health")
def health():
    return {"status": "ok"}
