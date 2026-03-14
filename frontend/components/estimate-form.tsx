"use client";

import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { EstimateInput, PropertyType } from "@/lib/types";
import { requestEstimate } from "@/lib/estimate";

const propertyTypes: PropertyType[] = ["戸建て", "土地", "マンション"];

const defaultForm: EstimateInput = {
  address: "福山市南蔵王町3丁目",
  land_size: 110,
  age: 14,
  type: "戸建て",
  layout: "4LDK",
  station_distance: 11,
};

type EstimateFormProps = {
  compact?: boolean;
};

export function EstimateForm({ compact = false }: EstimateFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<EstimateInput>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const params = useMemo(() => new URLSearchParams(), []);

  function updateField<K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await requestEstimate(form);

      params.set("address", form.address);
      params.set("land_size", String(form.land_size));
      params.set("age", String(form.age));
      params.set("type", form.type);
      params.set("layout", form.layout ?? "");
      params.set("station_distance", String(form.station_distance ?? ""));

      router.push(`/result?${params.toString()}`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "査定の実行に失敗しました。",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8 ${
        compact ? "" : "lg:p-10"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary-50 p-3 text-primary-600">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">AI不動産査定</p>
          <p className="text-sm text-slate-500">
            住所と物件条件から福山市の相場を即時算出します。
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">住所</span>
          <input
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500"
            placeholder="福山市南蔵王町3丁目"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">土地面積 (㎡)</span>
          <input
            type="number"
            min={20}
            value={form.land_size}
            onChange={(event) => updateField("land_size", Number(event.target.value))}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">築年数</span>
          <input
            type="number"
            min={0}
            value={form.age}
            onChange={(event) => updateField("age", Number(event.target.value))}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">建物タイプ</span>
          <select
            value={form.type}
            onChange={(event) => updateField("type", event.target.value as PropertyType)}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">間取り</span>
          <input
            value={form.layout}
            onChange={(event) => updateField("layout", event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500"
            placeholder="4LDK"
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">駅距離 (分)</span>
          <input
            type="number"
            min={1}
            value={form.station_distance}
            onChange={(event) =>
              updateField("station_distance", Number(event.target.value))
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary-500"
            required
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      <motion.button
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={isSubmitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        AI査定を開始
      </motion.button>
    </form>
  );
}
