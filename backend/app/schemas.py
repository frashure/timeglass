from pydantic import BaseModel, ConfigDict


class ResourceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    creator: str
    url: str
    type: str


class EraOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    label: str
    display: str
    range_start: int
    range_end: int
    sort_order: int


class EraWithResourcesOut(EraOut):
    resources: list[ResourceOut]


class RegionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    center_lat: float
    center_lng: float


class RegionWithErasOut(RegionOut):
    eras: list[EraOut]


class CountryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    region_id: str


class CountryWithErasOut(CountryOut):
    eras: list[EraOut]
