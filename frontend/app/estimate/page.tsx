import type { Metadata } from "next";

import { CtaBanner } from "@/components/cta-banner";
import { EstimateForm } from "@/components/estimate-form";
import { SectionTitle } from "@/components/section-title";
import { sellingPoints, strengths } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "AI査定",
  description:
    "住所、土地面積、築年数、建物タイプ、間取り、駅距離を入力して福山市の不動産をAI査定。",
};

export default function EstimatePage() {
  return (
    <div className="page-shell py-10 sm:py-16">
      <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
            Estimate
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            最短30秒で、福山市の売却価格をAI査定
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            入力項目は住所、土地面積、築年数、建物タイプ、間取り、駅距離のみ。査定結果では推定価格、
            価格レンジ、㎡単価、周辺相場比較、AIコメントをまとめて表示します。
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {sellingPoints.map((point) => (
              <div
                key={point}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft"
              >
                <p className="text-sm font-semibold text-primary-600">{point}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  査定ロジックに必要な地域データを常時取り込み、価格の根拠を補強します。
                </p>
              </div>
            ))}
          </div>
        </div>

        <EstimateForm />
      </section>

      <section className="py-10 sm:py-16">
        <SectionTitle
          eyebrow="Benefits"
          title="売却相談につながるフォーム設計"
          description="ユーザーの負荷を下げながら、売却提案に必要な情報は漏れなく取得できるように設計しています。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {strengths.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"
            >
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        title="査定後は無料で売却戦略をご提案します。"
        description="相場の読み方、売り出し価格、写真撮影、広告戦略まで一気通貫で相談できます。"
        primaryHref="/result"
        primaryLabel="結果ページを見る"
        secondaryHref="/company"
        secondaryLabel="相談予約"
      />
    </div>
  );
}
