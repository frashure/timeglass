from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://timeglass:timeglass@db:5432/timeglass"
    cors_origins: str = "http://localhost:8080,http://localhost:5173"
    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 30

    def get_cors_origins(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    class Config:
        env_file = ".env"


settings = Settings()
