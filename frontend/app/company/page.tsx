import type { Metadata } from "next";

import { CtaBanner } from "@/components/cta-banner";
import { SectionTitle } from "@/components/section-title";
import { staffMembers } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "会社紹介",
  description:
    "会社概要、スタッフ紹介、相談予約導線を備えた会社紹介ページ。",
};

export default function CompanyPage() {
  return (
    <div className="page-shell py-10 sm:py-16">
      <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
        <SectionTitle
          eyebrow="Company"
          title="福山市の売却に強い、不動産データドリブンチーム"
          description="地場の営業力と、データ分析を掛け合わせて、価格の根拠と売却戦略の両方を提供します。"
        />

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <div className="grid gap-4 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
              <span>会社名</span>
              <strong className="text-slate-950">福山AI査定株式会社</strong>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
              <span>所在地</span>
              <strong className="text-slate-950">広島県福山市西町1-1-1</strong>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
              <span>営業時間</span>
              <strong className="text-slate-950">9:00 - 18:30</strong>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
              <span>相談予約</span>
              <strong className="text-slate-950">084-000-1234</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {staffMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-lg font-semibold text-primary-700">
                {member.name.slice(0, 1)}
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                {member.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-primary-600">{member.role}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{member.profile}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
            Reservation
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            相談予約
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            住み替え、相続、空き家、投資売却など、状況に応じた相談予約を受け付けています。必要に応じて訪問査定も可能です。
          </p>
        </div>

        <form className="mt-8 grid gap-4 md:grid-cols-2">
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500"
            placeholder="お名前"
          />
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500"
            placeholder="メールアドレス"
          />
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500 md:col-span-2"
            placeholder="物件所在地"
          />
          <textarea
            className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500 md:col-span-2"
            placeholder="ご相談内容"
          />
          <button className="rounded-full bg-primary-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary-700 md:col-span-2">
            相談予約を送信
          </button>
        </form>
      </section>

      <section className="mt-10">
        <CtaBanner
          title="AI査定結果を持って、具体的な売却相談へ。"
          description="査定レンジをもとに、売り出し価格や成約までの想定期間を具体化します。"
          primaryHref="/estimate"
          primaryLabel="無料査定"
        />
      </section>
    </div>
  );
}
