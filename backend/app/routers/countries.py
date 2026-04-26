from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Country, Era, Resource
from ..schemas import CountryOut, CountryWithErasOut, EraWithResourcesOut

router = APIRouter(prefix="/countries", tags=["countries"])


@router.get("", response_model=list[CountryOut])
def list_countries(db: Session = Depends(get_db)):
    return db.query(Country).order_by(Country.name).all()


@router.get("/{country_id}", response_model=CountryWithErasOut)
def get_country(country_id: int, db: Session = Depends(get_db)):
    country = db.query(Country).filter(Country.id == country_id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")
    eras = (
        db.query(Era)
        .join(Era.countries)
        .filter(Country.id == country_id)
        .order_by(Era.sort_order)
        .all()
    )
    return CountryWithErasOut(
        id=country.id,
        name=country.name,
        region_id=country.region_id,
        eras=eras,
    )


@router.get("/{country_id}/eras/{era_id}", response_model=EraWithResourcesOut)
def get_country_era(country_id: int, era_id: str, db: Session = Depends(get_db)):
    country = db.query(Country).filter(Country.id == country_id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")

    era = (
        db.query(Era)
        .join(Era.countries)
        .filter(Country.id == country_id, Era.id == era_id)
        .first()
    )
    if not era:
        raise HTTPException(status_code=404, detail="Era not found for this country")

    resources = (
        db.query(Resource)
        .filter(
            Resource.scope == "country",
            Resource.scope_id == str(country_id),
            Resource.era_id == era_id,
        )
        .all()
    )
    return EraWithResourcesOut(
        id=era.id,
        label=era.label,
        display=era.display,
        range_start=era.range_start,
        range_end=era.range_end,
        sort_order=era.sort_order,
        resources=resources,
    )
