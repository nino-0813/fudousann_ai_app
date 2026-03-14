import type {
  CaseStudy,
  DashboardEstimate,
  GuideArticle,
  MarketArea,
  StaffMember,
  TrendPoint,
} from "@/lib/types";

export const heroMetrics = [
  { label: "査定依頼数", value: "2,480+" },
  { label: "平均表示速度", value: "3.2秒" },
  { label: "相談化率", value: "31%" },
];

export const marketAreas: MarketArea[] = [
  {
    area: "福山駅周辺",
    land_price: 268000,
    condo_price: 358000,
    annual_change: 4.2,
    demand: "高い",
  },
  {
    area: "南蔵王町",
    land_price: 201000,
    condo_price: 282000,
    annual_change: 3.4,
    demand: "高い",
  },
  {
    area: "春日町",
    land_price: 184000,
    condo_price: 248000,
    annual_change: 2.9,
    demand: "安定",
  },
  {
    area: "神辺町",
    land_price: 138000,
    condo_price: 198000,
    annual_change: 1.8,
    demand: "安定",
  },
];

export const marketTrend: TrendPoint[] = [
  { period: "2021", estimate: 2450, market: 2320 },
  { period: "2022", estimate: 2520, market: 2380 },
  { period: "2023", estimate: 2610, market: 2460 },
  { period: "2024", estimate: 2690, market: 2520 },
  { period: "2025", estimate: 2810, market: 2610 },
  { period: "2026", estimate: 2890, market: 2680 },
];

export const guideArticles: GuideArticle[] = [
  {
    title: "不動産売却の流れを6ステップで理解する",
    description: "査定依頼から引き渡しまで、初めての売却でも迷わない全体像を整理。",
    read_time: "6分",
    category: "売却の流れ",
  },
  {
    title: "AI査定と訪問査定の違い",
    description: "机上査定で把握できることと、訪問査定で精度が上がるポイントを比較。",
    read_time: "4分",
    category: "査定とは",
  },
  {
    title: "高く売るためのリフォーム判断",
    description: "費用をかけるべき改善と、そのまま売るほうが良いケースを解説。",
    read_time: "7分",
    category: "高く売るコツ",
  },
  {
    title: "売却時に知っておきたい税金の基礎",
    description: "譲渡所得税、特別控除、住み替え時の注意点をやさしく整理。",
    read_time: "5分",
    category: "税金",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: "築16年の戸建て売却",
    district: "南蔵王町",
    type: "戸建て",
    appraisal_price: 31800000,
    closing_price: 33100000,
    sale_period: "42日",
    note: "写真撮影と価格戦略を見直し、査定比104%で成約。",
  },
  {
    title: "駅徒歩8分のマンション",
    district: "福山駅周辺",
    type: "マンション",
    appraisal_price: 28600000,
    closing_price: 29200000,
    sale_period: "29日",
    note: "投資需要も取り込み、問い合わせ数が初週で集中。",
  },
  {
    title: "相続した土地の現金化",
    district: "神辺町",
    type: "土地",
    appraisal_price: 16800000,
    closing_price: 16400000,
    sale_period: "51日",
    note: "造成提案資料を添えて、開発業者との交渉を円滑化。",
  },
];

export const dashboardHistory: DashboardEstimate[] = [
  {
    id: "EST-240901",
    address: "福山市南蔵王町3丁目",
    created_at: "2026-03-01",
    price: 32400000,
    status: "査定完了",
  },
  {
    id: "EST-240845",
    address: "福山市春日町5丁目",
    created_at: "2026-02-18",
    price: 28600000,
    status: "相談中",
  },
  {
    id: "EST-240792",
    address: "福山市神辺町新湯野",
    created_at: "2026-02-05",
    price: 17100000,
    status: "成約",
  },
];

export const staffMembers: StaffMember[] = [
  {
    name: "石田 智也",
    role: "代表取締役 / 宅地建物取引士",
    profile: "福山市で16年。不動産売却と相続案件を中心に年間300件以上の相談に対応。",
  },
  {
    name: "村上 美咲",
    role: "売却コンサルタント",
    profile: "共働き世帯向けの住み替え支援に強く、LINE相談から契約までを一気通貫で伴走。",
  },
  {
    name: "河野 玲央",
    role: "データアナリスト",
    profile: "国交省データ、地価公示、商圏人口の変化を掛け合わせて査定アルゴリズムを改善。",
  },
];

export const sellingPoints = [
  "国交省取引データ",
  "公示地価",
  "周辺相場",
  "AI分析",
];

export const strengths = [
  {
    title: "高精度AI",
    body: "福山市内のエリア特性と成約データを加味し、現場感のある価格帯を提示します。",
  },
  {
    title: "無料査定",
    body: "入力は最短30秒。会員登録なしでもすぐに概算価格を確認できます。",
  },
  {
    title: "即結果",
    body: "価格レンジ、坪単価、周辺比較、売り出し戦略までワンビューで表示します。",
  },
];
