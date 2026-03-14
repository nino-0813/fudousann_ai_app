import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-slate-600 sm:px-6 lg:grid-cols-[1.2fr,1fr,1fr] lg:px-8">
        <div className="space-y-3">
          <p className="text-base font-semibold text-slate-900">福山AI査定</p>
          <p>
            広島県福山市の売却検討ユーザー向けに、AI査定から無料相談までを滑らかにつなぐ不動産売却プラットフォームです。
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-slate-900">Contents</p>
          <div className="grid gap-2">
            <Link href="/market">相場ページ</Link>
            <Link href="/guide">売却ガイド</Link>
            <Link href="/cases">成功事例</Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-slate-900">Contact</p>
          <div className="grid gap-2">
            <p>〒720-0067 広島県福山市西町1-1-1</p>
            <p>084-000-1234</p>
            <p>info@fukuyama-ai-estate.jp</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
