"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TrendPoint } from "@/lib/types";

type MarketChartProps = {
  data: TrendPoint[];
};

export function MarketChart({ data }: MarketChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[320px] w-full items-center justify-center rounded-[1.5rem] bg-slate-50 text-sm text-slate-500">
        チャートを読み込み中...
      </div>
    );
  }

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={320}>
        <LineChart data={data}>
          <CartesianGrid stroke="#dbe7f5" strokeDasharray="3 3" />
          <XAxis dataKey="period" tickLine={false} axisLine={false} />
          <YAxis
            tickFormatter={(value) => `${Math.round(value / 10000)}万`}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value) => {
              const numericValue =
                typeof value === "number" ? value : Number(value ?? 0);

              return `${Math.round(numericValue / 10000).toLocaleString("ja-JP")}万円`;
            }}
            contentStyle={{
              borderRadius: 18,
              border: "1px solid #dbe7f5",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="estimate"
            name="想定価格"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="market"
            name="相場平均"
            stroke="#94a3b8"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
