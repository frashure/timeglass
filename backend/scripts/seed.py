#!/usr/bin/env python3
"""
Populate the database from src/data/regions.json and src/data/countries.json.

Safe to run once; exits early if regions already exist.

Data path resolution (in priority order):
  1. DATA_DIR environment variable
  2. <backend_root>/data/  — present inside the Docker image
  3. <project_root>/src/data/  — present in a local checkout
"""

import json
import os
import sys
from pathlib import Path

# Ensure app.* is importable when run as a script
_backend_root = Path(__file__).parent.parent
sys.path.insert(0, str(_backend_root))

from app.database import SessionLocal
from app.models import Country, CountryEra, Era, Region, RegionEra, Resource


def _find_data_dir() -> Path:
    if "DATA_DIR" in os.environ:
        return Path(os.environ["DATA_DIR"])
    bundled = _backend_root / "data"
    if bundled.exists():
        return bundled
    return _backend_root.parent / "src" / "data"


def _load(data_dir: Path, filename: str) -> dict:
    with open(data_dir / filename) as f:
        return json.load(f)


def seed() -> None:
    data_dir = _find_data_dir()
    regions_raw = _load(data_dir, "regions.json")["regions"]
    countries_raw = _load(data_dir, "countries.json")

    db = SessionLocal()
    try:
        if db.query(Region).count() > 0:
            print("Database already seeded — skipping.")
            return

        # Derive canonical era definitions from the first region.
        # All regions share the same five era IDs with the same metadata.
        era_defs: dict[str, dict] = {}
        first_eras = next(iter(regions_raw.values()))["eras"]
        for sort_order, era in enumerate(first_eras):
            era_defs[era["id"]] = dict(
                id=era["id"],
                label=era["label"],
                display=era["display"],
                range_start=era["range"][0],
                range_end=era["range"][1],
                sort_order=sort_order,
            )

        for era_def in era_defs.values():
            db.add(Era(**era_def))
        db.flush()

        for region_id, region in regions_raw.items():
            db.add(Region(
                id=region_id,
                name=region["name"],
                center_lat=region["center"][0],
                center_lng=region["center"][1],
            ))
            db.flush()

            for era in region["eras"]:
                db.add(RegionEra(region_id=region_id, era_id=era["id"]))
                for r in era["resources"]:
                    db.add(Resource(
                        title=r["title"],
                        creator=r["creator"],
                        url=r["url"],
                        type=r["type"],
                        scope="region",
                        scope_id=region_id,
                        era_id=era["id"],
                    ))

        db.flush()

        for country_id_str, country in countries_raw.items():
            country_id = int(country_id_str)
            db.add(Country(
                id=country_id,
                name=country["name"],
                region_id=country["regionId"],
            ))
            db.flush()

            for era in country["eras"]:
                db.add(CountryEra(country_id=country_id, era_id=era["id"]))
                for r in era["resources"]:
                    db.add(Resource(
                        title=r["title"],
                        creator=r["creator"],
                        url=r["url"],
                        type=r["type"],
                        scope="country",
                        scope_id=country_id_str,
                        era_id=era["id"],
                    ))

        db.commit()

        n_regions = db.query(Region).count()
        n_countries = db.query(Country).count()
        n_eras = db.query(Era).count()
        n_resources = db.query(Resource).count()
        print(
            f"Seeded: {n_regions} regions, {n_countries} countries, "
            f"{n_eras} eras, {n_resources} resources."
        )

    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
