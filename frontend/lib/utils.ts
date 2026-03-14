import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactPrice(value: number) {
  return `${Math.round(value / 10000).toLocaleString("ja-JP")}万円`;
}

export function formatUnitPrice(value: number) {
  return `${Math.round(value).toLocaleString("ja-JP")}円/㎡`;
}
