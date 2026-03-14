import type { Metadata } from "next";
import { Suspense } from "react";

import { ResultPanel } from "@/components/result-panel";

export const metadata: Metadata = {
  title: "査定結果",
  description:
    "推定価格、価格レンジ、㎡単価、周辺相場比較、価格推移グラフ、AIコメントを表示する査定結果ページ。",
};

export default function ResultPage() {
  return (
    <div className="page-shell py-10 sm:py-16">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
          Result
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          AI査定結果
        </h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          推定価格に加えて、周辺相場との差分や過去トレンドから「どの価格で、いつ売り出すべきか」までを可視化します。
        </p>
      </section>

      <section className="mt-10">
        <Suspense
          fallback={
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
              査定データを準備しています...
            </div>
          }
        >
          <ResultPanel />
        </Suspense>
      </section>
    </div>
  );
}
