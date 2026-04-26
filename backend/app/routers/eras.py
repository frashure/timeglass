from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Era
from ..schemas import EraOut

router = APIRouter(prefix="/eras", tags=["eras"])


@router.get("", response_model=list[EraOut])
def list_eras(db: Session = Depends(get_db)):
    return db.query(Era).order_by(Era.sort_order).all()


@router.get("/{era_id}", response_model=EraOut)
def get_era(era_id: str, db: Session = Depends(get_db)):
    era = db.query(Era).filter(Era.id == era_id).first()
    if not era:
        raise HTTPException(status_code=404, detail="Era not found")
    return era
