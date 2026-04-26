from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_user
from ..database import get_db
from ..models import Bookmark, Country, Region, User
from ..schemas import BookmarkCreate, BookmarkOut

router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


def _enrich(bookmark: Bookmark, db: Session) -> BookmarkOut:
    if bookmark.scope == "country":
        row = db.query(Country).filter(Country.id == int(bookmark.scope_id)).first()
        scope_name = row.name if row else bookmark.scope_id
    else:
        row = db.query(Region).filter(Region.id == bookmark.scope_id).first()
        scope_name = row.name if row else bookmark.scope_id

    era = bookmark.era
    return BookmarkOut(
        id=bookmark.id,
        scope=bookmark.scope,
        scope_id=bookmark.scope_id,
        era_id=bookmark.era_id,
        scope_name=scope_name,
        era_label=era.label,
        era_display=era.display,
        created_at=bookmark.created_at,
    )


@router.get("", response_model=list[BookmarkOut])
def list_bookmarks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    bookmarks = (
        db.query(Bookmark)
        .filter(Bookmark.user_id == current_user.id)
        .order_by(Bookmark.created_at.desc())
        .all()
    )
    return [_enrich(b, db) for b in bookmarks]


@router.post("", response_model=BookmarkOut, status_code=status.HTTP_201_CREATED)
def create_bookmark(
    body: BookmarkCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing = (
        db.query(Bookmark)
        .filter(
            Bookmark.user_id == current_user.id,
            Bookmark.scope == body.scope,
            Bookmark.scope_id == body.scope_id,
            Bookmark.era_id == body.era_id,
        )
        .first()
    )
    if existing:
        return _enrich(existing, db)

    bookmark = Bookmark(
        user_id=current_user.id,
        scope=body.scope,
        scope_id=body.scope_id,
        era_id=body.era_id,
    )
    db.add(bookmark)
    db.commit()
    db.refresh(bookmark)
    return _enrich(bookmark, db)


@router.delete("/{bookmark_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bookmark(
    bookmark_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    bookmark = db.query(Bookmark).filter(
        Bookmark.id == bookmark_id,
        Bookmark.user_id == current_user.id,
    ).first()
    if not bookmark:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bookmark not found")
    db.delete(bookmark)
    db.commit()
