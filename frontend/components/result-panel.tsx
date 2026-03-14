"use client";

import { Download, Loader2, MessageSquareMore } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { MarketChart } from "@/components/market-chart";
import { PriceCard } from "@/components/price-card";
import { requestEstimate } from "@/lib/estimate";
import type { EstimateInput, EstimateResponse, PropertyType } from "@/lib/types";
import { formatCompactPrice, formatUnitPrice } from "@/lib/utils";

function buildInputFromQuery(searchParams: URLSearchParams): EstimateInput {
  return {
    address: searchParams.get("address") ?? "福山市南蔵王町3丁目",
    land_size: Number(searchParams.get("land_size") ?? 110),
    age: Number(searchParams.get("age") ?? 14),
    type: (searchParams.get("type") as PropertyType) ?? "戸建て",
    layout: searchParams.get("layout") ?? "4LDK",
    station_distance: Number(searchParams.get("station_distance") ?? 11),
  };
}

export function ResultPanel() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<EstimateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const input = useMemo(
    () => buildInputFromQuery(searchParams),
    [searchParams],
  );

  useEffect(() => {
    let mounted = true;

    async function fetchEstimate() {
      try {
        setLoading(true);
        const nextResult = await requestEstimate(input);
        if (mounted) {
          setResult(nextResult);
        }
      } catch (fetchError) {
        if (mounted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "査定結果を取得できませんでした。",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void fetchEstimate();

    return () => {
      mounted = false;
    };
  }, [input]);

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
          査定ロジックが価格を分析しています...
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="rounded-[2rem] border border-rose-100 bg-rose-50 p-8 text-rose-700">
        {error || "査定結果が見つかりません。"}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-3">
        <PriceCard
          label="推定価格"
          value={formatCompactPrice(result.price)}
          description={`${input.address} / ${input.type} / ${input.layout ?? "間取り未入力"}`}
          highlight
        />
        <PriceCard
          label="価格レンジ"
          value={`${formatCompactPrice(result.price_range.min)} - ${formatCompactPrice(
            result.price_range.max,
          )}`}
          description={`AI信頼度 ${result.confidence_score}% の予測レンジ`}
        />
        <PriceCard
          label="㎡単価"
          value={formatUnitPrice(result.unit_price)}
          description="近隣エリアの成約単価と駅距離補正を反映"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,0.9fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
                Market Insight
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                周辺相場比較と価格推移
              </h2>
            </div>
            <p className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              周辺相場比 {Math.round(((result.price - result.market_average) / result.market_average) * 100)}%
            </p>
          </div>
          <div className="mt-6">
            <MarketChart data={result.trend} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
            AI Comment
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            売却戦略サマリー
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{result.ai_comment}</p>
          <div className="mt-6 rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">推奨アクション</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {result.suggested_action}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              PDFレポート
            </button>
            <Link
              href="/company"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700"
            >
              <MessageSquareMore className="h-4 w-4" />
              無料相談
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
