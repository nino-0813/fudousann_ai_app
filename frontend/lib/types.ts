export type PropertyType = "戸建て" | "土地" | "マンション";

export type EstimateInput = {
  address: string;
  land_size: number;
  age: number;
  type: PropertyType;
  layout?: string;
  station_distance?: number;
};

export type PriceRange = {
  min: number;
  max: number;
};

export type TrendPoint = {
  period: string;
  estimate: number;
  market: number;
};

export type EstimateResponse = {
  price: number;
  price_range: PriceRange;
  unit_price: number;
  ai_comment: string;
  confidence_score: number;
  market_average: number;
  suggested_action: string;
  trend: TrendPoint[];
};

export type MarketArea = {
  area: string;
  land_price: number;
  condo_price: number;
  annual_change: number;
  demand: string;
};

export type GuideArticle = {
  title: string;
  description: string;
  read_time: string;
  category: string;
};

export type CaseStudy = {
  title: string;
  district: string;
  type: PropertyType;
  appraisal_price: number;
  closing_price: number;
  sale_period: string;
  note: string;
};

export type StaffMember = {
  name: string;
  role: string;
  profile: string;
};

export type DashboardEstimate = {
  id: string;
  address: string;
  created_at: string;
  price: number;
  status: "査定完了" | "相談中" | "成約";
};
