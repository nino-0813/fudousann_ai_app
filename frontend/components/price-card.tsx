type PriceCardProps = {
  label: string;
  value: string;
  description: string;
  highlight?: boolean;
};

export function PriceCard({
  label,
  value,
  description,
  highlight = false,
}: PriceCardProps) {
  return (
    <div
      className={`rounded-4xl border p-6 shadow-soft transition ${
        highlight
          ? "border-primary-200 bg-primary-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
