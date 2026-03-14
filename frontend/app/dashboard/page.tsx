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
      <div className="md:hidden">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          スマホで見やすい
          <br />
          査定ダッシュボード
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          査定履歴と相談状況を、移動中でも確認しやすいスマホ専用UIに再設計しています。
        </p>
      </div>

      <div className="hidden md:block">
        <SectionTitle
          eyebrow="Dashboard"
          title="査定履歴と相談状況をまとめて管理"
          description="Supabase Auth と接続すると、ログインユーザーごとに査定履歴、相談ステータス、将来のレポート保存機能を統合できます。"
        />
      </div>

      <section className="mt-10">
        <DashboardOverview />
      </section>
    </div>
  );
}
