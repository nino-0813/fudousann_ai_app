import { NextResponse } from "next/server";

import { generateMockEstimate } from "@/lib/estimate";
import type { EstimateInput } from "@/lib/types";

function normalizePayload(payload: Partial<EstimateInput>): EstimateInput {
  return {
    address: payload.address ?? "福山市南蔵王町3丁目",
    land_size: Number(payload.land_size ?? 110),
    age: Number(payload.age ?? 14),
    type: payload.type ?? "戸建て",
    layout: payload.layout ?? "4LDK",
    station_distance: Number(payload.station_distance ?? 11),
  };
}

async function tryBackendEstimate(input: EstimateInput) {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return null;
  }

  const response = await fetch(`${backendUrl}/api/estimate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return NextResponse.json(await response.json());
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<EstimateInput>;
  const input = normalizePayload(payload);

  try {
    const backendResult = await tryBackendEstimate(input);

    if (backendResult) {
      return backendResult;
    }

    return NextResponse.json(generateMockEstimate(input));
  } catch {
    return NextResponse.json(generateMockEstimate(input));
  }
}
