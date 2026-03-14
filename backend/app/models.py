from pydantic import BaseModel, Field


class EstimateRequest(BaseModel):
    address: str = Field(..., examples=["福山市南蔵王町3丁目"])
    land_size: float = Field(..., ge=20)
    age: int = Field(..., ge=0)
    type: str = Field(..., examples=["戸建て"])
    layout: str | None = Field(default="4LDK")
    station_distance: int | None = Field(default=11, ge=1)


class PriceRange(BaseModel):
    min: int
    max: int


class TrendPoint(BaseModel):
    period: str
    estimate: int
    market: int


class EstimateResponse(BaseModel):
    price: int
    price_range: PriceRange
    unit_price: int
    ai_comment: str
    confidence_score: int
    market_average: int
    suggested_action: str
    trend: list[TrendPoint]
