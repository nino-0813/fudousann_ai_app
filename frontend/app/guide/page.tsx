import type { Metadata } from "next";

import { SectionTitle } from "@/components/section-title";
import { guideArticles } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "売却ガイド",
  description:
    "売却の流れ、査定とは何か、高く売るコツ、税金の基礎をまとめた不動産売却ガイド。",
};

export default function GuidePage() {
  return (
    <div className="page-shell py-10 sm:py-16">
      <SectionTitle
        eyebrow="Guide"
        title="売却ガイド"
        description="初めての売却でも迷わないように、査定から引き渡しまで必要な知識を記事形式で整理しました。"
      />

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        {guideArticles.map((article) => (
          <article
            key={article.title}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
          >
            <p className="text-sm font-semibold text-primary-600">{article.category}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              {article.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {article.description}
            </p>
            <p className="mt-6 text-sm font-medium text-slate-500">
              読了目安 {article.read_time}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
