import type { Metadata } from "next";

import { DashboardOverview } from "@/components/dashboard-overview";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "ダッシュボード",
  description:
    "ログイン機能、顧客ダッシュボード、査定履歴を提供するマイページ。",
};

export default function DashboardPage() {
  return (
    <div className="page-shell py-10 sm:py-16">
      <SectionTitle
        eyebrow="Dashboard"
        title="査定履歴と相談状況をまとめて管理"
        description="Supabase Auth と接続すると、ログインユーザーごとに査定履歴、相談ステータス、将来のレポート保存機能を統合できます。"
      />

      <section className="mt-10">
        <DashboardOverview />
      </section>
    </div>
  );
}
