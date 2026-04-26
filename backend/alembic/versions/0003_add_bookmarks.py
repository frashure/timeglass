"""add bookmarks table

Revision ID: 0003
Revises: 0002
Create Date: 2026-04-26
"""

revision = "0003"
down_revision = "0002"
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade() -> None:
    op.create_table(
        "bookmarks",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("scope", sa.String(), nullable=False),
        sa.Column("scope_id", sa.String(), nullable=False),
        sa.Column("era_id", sa.String(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["era_id"], ["eras.id"]),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("user_id", "scope", "scope_id", "era_id"),
    )
    op.create_index("ix_bookmarks_user_id", "bookmarks", ["user_id"])


def downgrade() -> None:
    op.drop_index("ix_bookmarks_user_id", table_name="bookmarks")
    op.drop_table("bookmarks")
