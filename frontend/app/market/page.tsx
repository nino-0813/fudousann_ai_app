import type { Metadata } from "next";

import { CtaBanner } from "@/components/cta-banner";
import { MarketChart } from "@/components/market-chart";
import { SectionTitle } from "@/components/section-title";
import { marketAreas, marketTrend } from "@/lib/mock-data";
import { formatCompactPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "不動産相場",
  description:
    "福山市の地域別土地価格、マンション価格、価格推移を掲載したSEO向け不動産相場ページ。",
};

export default function MarketPage() {
  return (
    <div className="page-shell py-10 sm:py-16">
      <SectionTitle
        eyebrow="Market"
        title="福山市の不動産相場"
        description="地域別の土地価格、マンション価格、価格推移を整理し、売却判断の基準をわかりやすく提示します。"
      />

      <section className="mt-10 grid gap-4 lg:grid-cols-4">
        {marketAreas.map((area) => (
          <article
            key={area.area}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"
          >
            <p className="text-sm font-semibold text-primary-600">{area.area}</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>土地価格</span>
                <strong className="text-slate-950">
                  {formatCompactPrice(area.land_price * 100)}
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span>マンション価格</span>
                <strong className="text-slate-950">
                  {formatCompactPrice(area.condo_price * 75)}
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span>前年比</span>
                <strong className="text-emerald-600">+{area.annual_change}%</strong>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
            Trends
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            土地価格・マンション価格の推移
          </h2>
          <p className="text-sm leading-7 text-slate-600">
            福山市全体の取引傾向を年次で比較。駅近エリアの需要増加により、中心部の価格上昇が継続しています。
          </p>
        </div>

        <div className="mt-8">
          <MarketChart data={marketTrend} />
        </div>
      </section>

      <section className="mt-10">
        <CtaBanner
          title="相場を見たら、次はあなたの物件価格を確認。"
          description="地域平均だけでなく、築年数や駅距離を反映した物件単位の価格をAIが算出します。"
          primaryHref="/estimate"
          primaryLabel="AI査定を始める"
        />
      </section>
    </div>
  );
}
