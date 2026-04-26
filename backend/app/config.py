from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://timeglass:timeglass@db:5432/timeglass"
    cors_origins: list[str] = ["http://localhost:8080"]

    class Config:
        env_file = ".env"


settings = Settings()
