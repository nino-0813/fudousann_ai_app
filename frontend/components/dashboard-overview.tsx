"use client";

import {
  ArrowRight,
  BarChart3,
  FileSearch,
  LogOut,
  MailCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { dashboardHistory } from "@/lib/mock-data";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { formatCompactPrice } from "@/lib/utils";

export function DashboardOverview() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const completedCount = dashboardHistory.filter(
    (item) => item.status === "査定完了",
  ).length;
  const consultingCount = dashboardHistory.filter(
    (item) => item.status === "相談中",
  ).length;
  const latestEstimate = dashboardHistory[0];

  useEffect(() => {
    const client = getSupabaseBrowserClient();

    if (!client) {
      return;
    }

    void client.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });
  }, []);

  async function handleMagicLink() {
    const client = getSupabaseBrowserClient();

    if (!client) {
      setMessage("Supabase 環境変数が未設定のため、現在はデモモードです。");
      return;
    }

    const origin =
      typeof window !== "undefined" ? window.location.origin : undefined;

    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: origin ? `${origin}/dashboard` : undefined,
      },
    });

    setMessage(
      error
        ? error.message
        : "ログインリンクを送信しました。メールをご確認ください。",
    );
  }

  async function handleSignOut() {
    const client = getSupabaseBrowserClient();

    if (!client) {
      return;
    }

    await client.auth.signOut();
    setUser(null);
    setMessage("ログアウトしました。");
  }

  return (
    <>
      <div className="space-y-4 md:hidden">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-slate-950 via-slate-900 to-primary-900 p-5 text-white shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-200">
                Dashboard
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                売却の進捗を
                <br />
                ひと目で管理
              </h2>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <Sparkles className="h-5 w-5 text-primary-200" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-[1.25rem] bg-white/10 p-3 backdrop-blur">
              <p className="text-[11px] text-primary-100">最新査定</p>
              <p className="mt-2 text-lg font-semibold">
                {formatCompactPrice(latestEstimate.price)}
              </p>
            </div>
            <div className="rounded-[1.25rem] bg-white/10 p-3 backdrop-blur">
              <p className="text-[11px] text-primary-100">査定完了</p>
              <p className="mt-2 text-lg font-semibold">{completedCount}件</p>
            </div>
            <div className="rounded-[1.25rem] bg-white/10 p-3 backdrop-blur">
              <p className="text-[11px] text-primary-100">相談中</p>
              <p className="mt-2 text-lg font-semibold">{consultingCount}件</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-200">
            査定履歴、相談状況、次に取るべきアクションをスマホで確認しやすいように整理しています。
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary-50 p-3 text-primary-600">
              <MailCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">アカウント</p>
              <p className="text-xs text-slate-500">
                {user ? "ログイン中" : "Magic Link でログイン"}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] bg-slate-50 p-4">
            <p className="break-all text-sm font-semibold leading-6 text-slate-900">
              {user ? `ログイン中: ${user.email}` : "メールアドレスでログイン"}
            </p>

            {!user ? (
              <div className="mt-4 space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="owner@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-500"
                />
                <button
                  onClick={handleMagicLink}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  <MailCheck className="h-4 w-4" />
                  ログインリンクを送信
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignOut}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                <LogOut className="h-4 w-4" />
                ログアウト
              </button>
            )}

            {message ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
            ) : null}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Link
            href="/estimate"
            className="rounded-[1.5rem] border border-primary-100 bg-primary-50 p-4 shadow-soft"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-slate-950">新規査定</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              30秒で価格を確認
            </p>
          </Link>
          <Link
            href="/market"
            className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <BarChart3 className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-slate-950">相場を見る</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              地域相場を比較
            </p>
          </Link>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
                History
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                査定履歴
              </h3>
            </div>
            <Link
              href="/estimate"
              className="text-sm font-semibold text-primary-700"
            >
              すべて更新
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {dashboardHistory.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-slate-950">
                      {item.address}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.id} / {item.created_at}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-500">査定価格</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                      {formatCompactPrice(item.price)}
                    </p>
                  </div>
                  <Link
                    href="/result"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary-700 shadow-sm"
                  >
                    <FileSearch className="h-4 w-4" />
                    詳細
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="hidden grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] gap-3 md:grid md:gap-5 lg:grid-cols-[0.95fr,1.25fr] lg:gap-6">
      <section className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-600 sm:text-sm sm:tracking-[0.24em]">
          Account
        </p>
        <h2 className="mt-2 text-base font-semibold tracking-tight text-slate-950 sm:mt-3 sm:text-2xl">
          顧客ダッシュボード
        </h2>
        <p className="mt-3 text-[11px] leading-5 text-slate-600 sm:mt-4 sm:text-sm sm:leading-7">
          Magic Link ログインに対応。Supabase を設定すると、本番環境では査定履歴と相談状況をユーザー単位で管理できます。
        </p>

        <div className="mt-4 space-y-3 rounded-[1rem] bg-slate-50 p-3 sm:mt-8 sm:space-y-4 sm:rounded-[1.5rem] sm:p-5">
          <p className="break-all text-xs font-semibold leading-5 text-slate-900 sm:text-sm sm:leading-6">
            {user ? `ログイン中: ${user.email}` : "メールアドレスでログイン"}
          </p>

          {!user ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="owner@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none transition focus:border-primary-500 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              />
              <button
                onClick={handleMagicLink}
                className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full bg-primary-600 px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-primary-700 sm:min-h-12 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
              >
                <MailCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sm:hidden">リンク送信</span>
                <span className="hidden sm:inline">ログインリンクを送信</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-slate-300 sm:min-h-12 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
            >
              <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ログアウト
            </button>
          )}

          {message ? (
            <p className="text-[11px] leading-5 text-slate-600 sm:text-sm">
              {message}
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-8">
        <div className="flex items-start justify-between gap-3 sm:items-center">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-600 sm:text-sm sm:tracking-[0.24em]">
              History
            </p>
            <h2 className="mt-2 text-base font-semibold tracking-tight text-slate-950 sm:mt-3 sm:text-2xl">
              査定履歴
            </h2>
          </div>
          <Link
            href="/estimate"
            className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1 rounded-full border border-primary-100 bg-primary-50 px-3 py-2 text-[11px] font-semibold text-primary-700 sm:min-h-11 sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
          >
            <span className="sm:hidden">新規査定</span>
            <span className="hidden sm:inline">新しく査定する</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
          {dashboardHistory.map((item) => (
            <article
              key={item.id}
              className="rounded-[1rem] border border-slate-200 p-3 sm:rounded-[1.5rem] sm:p-5"
            >
              <div className="flex items-start justify-between gap-2.5 sm:items-center sm:gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-5 text-slate-900 sm:text-base sm:leading-6">
                    {item.address}
                  </p>
                  <p className="mt-1 break-words text-[11px] text-slate-500 sm:text-sm">
                    {item.id} / {item.created_at}
                  </p>
                </div>
                <span className="w-fit shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 sm:px-3 sm:text-xs">
                  {item.status}
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between gap-3 sm:mt-4 sm:items-center">
                <p className="text-base font-semibold tracking-tight text-slate-950 sm:text-2xl">
                  {formatCompactPrice(item.price)}
                </p>
                <Link
                  href="/result"
                  className="shrink-0 text-[11px] font-semibold text-primary-700 transition hover:text-primary-800 sm:text-sm"
                >
                  <span className="sm:hidden">詳細</span>
                  <span className="hidden sm:inline">詳細を見る</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}
