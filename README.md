# 福山AI査定

広島県福山市に特化した不動産会社向けの AI 査定 Web サービスです。`Next.js 14` フロントエンドと `FastAPI` 査定 API を分離し、`Supabase` 連携を前提にした構成で実装しています。

## 構成

```text
.
├── frontend/              # Next.js 14 App Router
├── backend/               # FastAPI AI査定API
└── supabase/schema.sql    # Supabaseテーブル定義
```

## Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

主な機能:

- `app/page.tsx`: Apple ライクなトップページ
- `app/estimate/page.tsx`: AI査定フォーム
- `app/result/page.tsx`: Recharts を使った価格結果画面
- `app/market/page.tsx`: SEO 用の相場ページ
- `app/dashboard/page.tsx`: Supabase Auth 前提のダッシュボード
- `app/api/estimate/route.ts`: FastAPI プロキシ兼フォールバック API

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API:

- `POST /api/estimate`
- `GET /health`

## Supabase

`supabase/schema.sql` を SQL Editor で実行してください。

作成テーブル:

- `users`
- `properties`
- `estimates`
- `consultations`

## Vercel デプロイ

1. Vercel に `frontend/` をルートディレクトリとして接続
2. 環境変数 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `BACKEND_API_URL` を設定
3. バックエンドは Render / Railway / Fly.io などで `backend/` を起動し、`BACKEND_API_URL` に設定

## デザイン方針

- white / blue / gray ベース
- Inter フォント
- スマホファースト
- 余白重視のカード UI
- 信頼感のあるモダンなアニメーション
