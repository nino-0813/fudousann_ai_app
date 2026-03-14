from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import EstimateRequest, EstimateResponse, PriceRange, TrendPoint

app = FastAPI(
    title="Fukuyama AI Estimate API",
    version="1.0.0",
    description="広島県福山市向けの不動産AI査定API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MARKET_AREAS = [
    {
        "area": "福山駅周辺",
        "keywords": ["東桜町", "三之丸町", "霞町", "丸之内", "紅葉町", "福山駅"],
        "land_price": 268000,
        "condo_price": 358000,
        "annual_change": 4.2,
    },
    {
        "area": "南蔵王町",
        "keywords": ["南蔵王", "蔵王"],
        "land_price": 201000,
        "condo_price": 282000,
        "annual_change": 3.4,
    },
    {
        "area": "春日町",
        "keywords": ["春日町", "伊勢丘"],
        "land_price": 184000,
        "condo_price": 248000,
        "annual_change": 2.9,
    },
    {
        "area": "神辺町",
        "keywords": ["神辺", "新湯野", "道上"],
        "land_price": 138000,
        "condo_price": 198000,
        "annual_change": 1.8,
    },
]

MARKET_TREND = [
    {"period": "2021", "estimate": 2450, "market": 2320},
    {"period": "2022", "estimate": 2520, "market": 2380},
    {"period": "2023", "estimate": 2610, "market": 2460},
    {"period": "2024", "estimate": 2690, "market": 2520},
    {"period": "2025", "estimate": 2810, "market": 2610},
    {"period": "2026", "estimate": 2890, "market": 2680},
]


def resolve_area(address: str) -> dict:
    for area in MARKET_AREAS:
        if any(keyword in address for keyword in area["keywords"]):
            return area
    return MARKET_AREAS[1]


def build_estimate(payload: EstimateRequest) -> EstimateResponse:
    area = resolve_area(payload.address)
    station_distance = payload.station_distance or 11
    base_unit_price = (
        area["condo_price"] if payload.type == "マンション" else area["land_price"]
    )
    station_factor = max(0.88, 1.06 - station_distance * 0.008)
    age_factor = 1 if payload.type == "土地" else max(0.72, 1 - payload.age * 0.012)

    if payload.type == "戸建て":
        type_factor = 1.12
    elif payload.type == "マンション":
        type_factor = 1.08
    else:
        type_factor = 0.96

    unit_price = round(base_unit_price * station_factor * age_factor * type_factor)
    price = round(unit_price * payload.land_size)
    spread = max(900000, round(price * 0.07))
    market_average = round(base_unit_price * payload.land_size)
    confidence_score = min(
        95, max(79, round(88 + area["annual_change"] - station_distance * 0.4))
    )
    premium_rate = ((price - market_average) / market_average) * 100

    if premium_rate >= 3:
        ai_comment = (
            f"{area['area']}では需要が強く、駅距離と流通性のバランスから相場を上回る売出しが狙えます。"
            "写真品質と初動2週間の反響設計が高値成約の鍵です。"
        )
        suggested_action = (
            "まずは強気の売出しで反響を計測し、2週間後に価格調整判断を行う戦略が有効です。"
        )
    else:
        ai_comment = (
            f"{area['area']}では直近の成約価格は安定推移です。"
            "相場レンジ内で価格を設計しつつ、内覧導線を整えることで売却期間を短縮できます。"
        )
        suggested_action = (
            "競合物件と並んだ際に埋もれないよう、価格と見せ方を同時に最適化するのがおすすめです。"
        )

    trend = [
        TrendPoint(
            period=point["period"],
            estimate=round(price * (0.87 + index * 0.03)),
            market=round(market_average * (0.85 + index * 0.028)),
        )
        for index, point in enumerate(MARKET_TREND)
    ]

    return EstimateResponse(
        price=price,
        price_range=PriceRange(min=price - spread, max=price + spread),
        unit_price=unit_price,
        ai_comment=ai_comment,
        confidence_score=confidence_score,
        market_average=market_average,
        suggested_action=suggested_action,
        trend=trend,
    )


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.post("/api/estimate", response_model=EstimateResponse)
def estimate(payload: EstimateRequest) -> EstimateResponse:
    return build_estimate(payload)
