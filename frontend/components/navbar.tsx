"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "トップ" },
  { href: "/estimate", label: "AI査定" },
  { href: "/result", label: "査定結果" },
  { href: "/market", label: "相場" },
  { href: "/guide", label: "売却ガイド" },
  { href: "/cases", label: "成功事例" },
  { href: "/company", label: "会社紹介" },
  { href: "/dashboard", label: "ダッシュボード" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-lg font-semibold text-white shadow-soft">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">福山AI査定</p>
            <p className="text-xs text-slate-500">Fukuyama Property Intelligence</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/estimate"
          className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-700"
        >
          査定を開始
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 pb-4 lg:hidden">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium transition",
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
