import type { Metadata } from "next";

import { CaseCard } from "@/components/case-card";
import { SectionTitle } from "@/components/section-title";
import { caseStudies } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "成功事例",
  description:
    "査定価格、成約価格、売却期間を掲載した福山市の売却成功事例一覧。",
};

export default function CasesPage() {
  return (
    <div className="page-shell py-10 sm:py-16">
      <SectionTitle
        eyebrow="Cases"
        title="成功事例"
        description="査定価格と成約価格の差分、売却期間、改善施策をまとめたカードUIで、売却成果をわかりやすく訴求します。"
      />

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {caseStudies.map((item) => (
          <CaseCard key={item.title} item={item} />
        ))}
      </section>
    </div>
  );
}
