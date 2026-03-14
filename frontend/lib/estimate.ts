import { marketAreas, marketTrend } from "@/lib/mock-data";
import type { EstimateInput, EstimateResponse, MarketArea } from "@/lib/types";

const neighborhoodKeywords: Record<string, string[]> = {
  "福山駅周辺": ["東桜町", "三之丸町", "霞町", "丸之内", "紅葉町", "福山駅"],
  南蔵王町: ["南蔵王", "蔵王"],
  春日町: ["春日町", "伊勢丘"],
  神辺町: ["神辺", "新湯野", "道上"],
};

function resolveArea(address: string): MarketArea {
  const matchedArea = marketAreas.find((area) =>
    neighborhoodKeywords[area.area]?.some((keyword) => address.includes(keyword)),
  );

  return matchedArea ?? marketAreas[1];
}

export function generateMockEstimate(input: EstimateInput): EstimateResponse {
  const area = resolveArea(input.address);
  const stationDistance = input.station_distance ?? 12;
  const landSize = Number(input.land_size);
  const age = Number(input.age);

  const baseUnitPrice =
    input.type === "マンション" ? area.condo_price : area.land_price;
  const stationFactor = Math.max(0.88, 1.06 - stationDistance * 0.008);
  const ageFactor = input.type === "土地" ? 1 : Math.max(0.72, 1 - age * 0.012);
  const typeFactor =
    input.type === "戸建て" ? 1.12 : input.type === "マンション" ? 1.08 : 0.96;

  const unitPrice = Math.round(baseUnitPrice * stationFactor * ageFactor * typeFactor);
  const price = Math.round(unitPrice * landSize);
  const spread = Math.max(900000, Math.round(price * 0.07));
  const marketAverage = Math.round(baseUnitPrice * landSize);
  const confidenceScore = Math.min(
    95,
    Math.max(79, Math.round(88 + area.annual_change - stationDistance * 0.4)),
  );

  const trend = marketTrend.map((point, index) => ({
    period: point.period,
    estimate: Math.round(price * (0.87 + index * 0.03)),
    market: Math.round(marketAverage * (0.85 + index * 0.028)),
  }));

  const premiumRate = ((price - marketAverage) / marketAverage) * 100;
  const aiComment =
    premiumRate >= 3
      ? `${area.area}では需要が強く、駅距離と流通性のバランスから相場を上回る売出しが狙えます。写真品質と初動2週間の反響設計が高値成約の鍵です。`
      : `${area.area}では直近の成約価格は安定推移です。相場レンジ内で価格を設計しつつ、内覧導線を整えることで売却期間を短縮できます。`;

  return {
    price,
    price_range: {
      min: price - spread,
      max: price + spread,
    },
    unit_price: unitPrice,
    ai_comment: aiComment,
    confidence_score: confidenceScore,
    market_average: marketAverage,
    suggested_action:
      premiumRate >= 3
        ? "まずは強気の売出しで反響を計測し、2週間後に価格調整判断を行う戦略が有効です。"
        : "競合物件と並んだ際に埋もれないよう、価格と見せ方を同時に最適化するのがおすすめです。",
    trend,
  };
}

export async function requestEstimate(input: EstimateInput) {
  const response = await fetch("/api/estimate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("査定APIの呼び出しに失敗しました。");
  }

  return (await response.json()) as EstimateResponse;
}
