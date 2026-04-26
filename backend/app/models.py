from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Region(Base):
    __tablename__ = "regions"

    id = Column(String, primary_key=True)  # slug, e.g. "western-europe"
    name = Column(String, nullable=False)
    center_lat = Column(Float, nullable=False)
    center_lng = Column(Float, nullable=False)

    countries = relationship("Country", back_populates="region")
    eras = relationship("Era", secondary="region_eras", back_populates="regions")


class Country(Base):
    __tablename__ = "countries"

    id = Column(Integer, primary_key=True)  # ISO numeric, e.g. 840
    name = Column(String, nullable=False)
    region_id = Column(String, ForeignKey("regions.id"), nullable=False)

    region = relationship("Region", back_populates="countries")
    eras = relationship("Era", secondary="country_eras", back_populates="countries")


class Era(Base):
    __tablename__ = "eras"

    id = Column(String, primary_key=True)  # e.g. "ancient"
    label = Column(String, nullable=False)
    display = Column(String, nullable=False)
    range_start = Column(Integer, nullable=False)
    range_end = Column(Integer, nullable=False)
    sort_order = Column(Integer, nullable=False)

    regions = relationship("Region", secondary="region_eras", back_populates="eras")
    countries = relationship("Country", secondary="country_eras", back_populates="eras")


class RegionEra(Base):
    __tablename__ = "region_eras"

    region_id = Column(String, ForeignKey("regions.id"), primary_key=True)
    era_id = Column(String, ForeignKey("eras.id"), primary_key=True)


class CountryEra(Base):
    __tablename__ = "country_eras"

    country_id = Column(Integer, ForeignKey("countries.id"), primary_key=True)
    era_id = Column(String, ForeignKey("eras.id"), primary_key=True)


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    creator = Column(String, nullable=False)
    url = Column(String, nullable=False)
    type = Column(String, nullable=False)    # "video" | "book"
    scope = Column(String, nullable=False)   # "region" | "country"
    scope_id = Column(String, nullable=False)  # region slug or str(country ISO numeric)
    era_id = Column(String, ForeignKey("eras.id"), nullable=False)

    era = relationship("Era")
