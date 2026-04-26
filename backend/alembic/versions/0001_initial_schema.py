"""initial schema

Revision ID: 0001
Revises:
Create Date: 2026-04-26
"""

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade() -> None:
    op.create_table(
        "regions",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("center_lat", sa.Float(), nullable=False),
        sa.Column("center_lng", sa.Float(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "countries",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("region_id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["region_id"], ["regions.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "eras",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("label", sa.String(), nullable=False),
        sa.Column("display", sa.String(), nullable=False),
        sa.Column("range_start", sa.Integer(), nullable=False),
        sa.Column("range_end", sa.Integer(), nullable=False),
        sa.Column("sort_order", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "region_eras",
        sa.Column("region_id", sa.String(), nullable=False),
        sa.Column("era_id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["era_id"], ["eras.id"]),
        sa.ForeignKeyConstraint(["region_id"], ["regions.id"]),
        sa.PrimaryKeyConstraint("region_id", "era_id"),
    )

    op.create_table(
        "country_eras",
        sa.Column("country_id", sa.Integer(), nullable=False),
        sa.Column("era_id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["country_id"], ["countries.id"]),
        sa.ForeignKeyConstraint(["era_id"], ["eras.id"]),
        sa.PrimaryKeyConstraint("country_id", "era_id"),
    )

    op.create_table(
        "resources",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("creator", sa.String(), nullable=False),
        sa.Column("url", sa.String(), nullable=False),
        sa.Column("type", sa.String(), nullable=False),
        sa.Column("scope", sa.String(), nullable=False),
        sa.Column("scope_id", sa.String(), nullable=False),
        sa.Column("era_id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["era_id"], ["eras.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index("ix_resources_scope_scope_id", "resources", ["scope", "scope_id"])
    op.create_index("ix_resources_era_id", "resources", ["era_id"])


def downgrade() -> None:
    op.drop_table("resources")
    op.drop_table("country_eras")
    op.drop_table("region_eras")
    op.drop_table("eras")
    op.drop_table("countries")
    op.drop_table("regions")
