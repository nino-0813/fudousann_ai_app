import Link from "next/link";

import { CaseCard } from "@/components/case-card";
import { CtaBanner } from "@/components/cta-banner";
import { EstimateForm } from "@/components/estimate-form";
import { SectionTitle } from "@/components/section-title";
import {
  caseStudies,
  heroMetrics,
  sellingPoints,
  strengths,
} from "@/lib/mock-data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "福山AI査定",
    areaServed: "広島県福山市",
    description:
      "福山市に特化したAI不動産査定サービス。AI査定から売却相談までワンストップで提供。",
    url: "https://fukuyama-ai-estate.vercel.app",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-shell py-10 sm:py-14">
        <div className="grid gap-8 overflow-hidden rounded-[2.5rem] border border-white/70 bg-hero-glow p-6 shadow-soft sm:p-8 lg:grid-cols-[1.1fr,0.9fr] lg:p-12">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary-100 bg-white/80 px-4 py-2 text-sm font-medium text-primary-700">
              広島県福山市に特化した AI 不動産査定
            </div>
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">
                AI不動産査定
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                30秒でAI不動産査定
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                国交省取引データ、公示地価、周辺相場、独自AI分析を統合し、
                福山市の売却価格を高精度に可視化。初回査定から売却相談まで、
                ひとつの体験で完結します。
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/estimate"
                className="rounded-full bg-primary-600 px-6 py-4 text-center text-sm font-semibold text-white shadow-soft transition hover:bg-primary-700"
              >
                査定を開始
              </Link>
              <Link
                href="/market"
                className="rounded-full border border-slate-200 bg-white px-6 py-4 text-center text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700"
              >
                福山市の相場を見る
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 backdrop-blur"
                >
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <EstimateForm compact />
        </div>
      </section>

      <section className="page-shell py-10 sm:py-16">
        <SectionTitle
          eyebrow="Process"
          title="AI査定の仕組み"
          description="入力データを4つの情報レイヤーで解析し、福山市の売却マーケットに即した価格帯と戦略を返します。"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {sellingPoints.map((label, index) => (
            <div
              key={label}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"
            >
              <p className="text-sm font-semibold text-primary-600">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">{label}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                市況変化、駅距離、築年数、物件タイプを掛け合わせ、価格の上下要因を補正します。
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-10 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
          <SectionTitle
            eyebrow="Strength"
            title="信頼感とスピードを両立する査定体験"
            description="余白のあるモダンUIで、ユーザーが迷わず査定を完了し、そのまま相談アクションまで進める設計です。"
          />

          <div className="grid gap-4">
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
        </div>
      </section>

      <section className="page-shell py-10 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Success Stories"
            title="売却事例"
            description="AI査定と現場提案を組み合わせ、価格とスピードの両面で成果を出した事例を掲載しています。"
          />
          <Link href="/cases" className="text-sm font-semibold text-primary-700">
            すべて見る
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <CaseCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="page-shell py-10 sm:py-16">
        <CtaBanner
          title="AI査定のあと、そのまま売却相談まで。"
          description="価格に納得したら、福山市の売却事情に詳しいコンサルタントへ無料相談。相続、住み替え、空き家売却にも対応します。"
          primaryHref="/estimate"
          primaryLabel="無料査定"
          secondaryHref="/company"
          secondaryLabel="無料相談"
        />
      </section>
    </>
  );
}
