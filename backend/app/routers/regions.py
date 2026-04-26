from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Era, Region, Resource
from ..schemas import EraWithResourcesOut, RegionOut, RegionWithErasOut

router = APIRouter(prefix="/regions", tags=["regions"])


@router.get("", response_model=list[RegionOut])
def list_regions(db: Session = Depends(get_db)):
    return db.query(Region).order_by(Region.name).all()


@router.get("/{region_id}", response_model=RegionWithErasOut)
def get_region(region_id: str, db: Session = Depends(get_db)):
    region = db.query(Region).filter(Region.id == region_id).first()
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    eras = (
        db.query(Era)
        .join(Era.regions)
        .filter(Region.id == region_id)
        .order_by(Era.sort_order)
        .all()
    )
    return RegionWithErasOut(
        id=region.id,
        name=region.name,
        center_lat=region.center_lat,
        center_lng=region.center_lng,
        eras=eras,
    )


@router.get("/{region_id}/eras/{era_id}", response_model=EraWithResourcesOut)
def get_region_era(region_id: str, era_id: str, db: Session = Depends(get_db)):
    region = db.query(Region).filter(Region.id == region_id).first()
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")

    era = (
        db.query(Era)
        .join(Era.regions)
        .filter(Region.id == region_id, Era.id == era_id)
        .first()
    )
    if not era:
        raise HTTPException(status_code=404, detail="Era not found for this region")

    resources = (
        db.query(Resource)
        .filter(
            Resource.scope == "region",
            Resource.scope_id == region_id,
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
