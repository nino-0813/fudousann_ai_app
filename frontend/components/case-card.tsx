import type { CaseStudy } from "@/lib/types";
import { formatCompactPrice } from "@/lib/utils";

type CaseCardProps = {
  item: CaseStudy;
};

export function CaseCard({ item }: CaseCardProps) {
  const premium = item.closing_price - item.appraisal_price;

  return (
    <article className="rounded-4xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary-600">{item.district}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{item.title}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {item.type}
        </span>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-600">
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
          <span>査定価格</span>
          <strong className="text-slate-950">
            {formatCompactPrice(item.appraisal_price)}
          </strong>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
          <span>成約価格</span>
          <strong className="text-slate-950">
            {formatCompactPrice(item.closing_price)}
          </strong>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
          <span>売却期間</span>
          <strong className="text-slate-950">{item.sale_period}</strong>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{item.note}</p>
      <p className="mt-4 text-sm font-semibold text-emerald-600">
        査定比 {premium >= 0 ? "+" : ""}
        {Math.round((premium / item.appraisal_price) * 100)}%
      </p>
    </article>
  );
}
