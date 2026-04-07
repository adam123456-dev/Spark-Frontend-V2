# Sparkz DCT — Frontend

React + Vite frontend for the **Disclosure Checklist Tool (DCT)**.

Connects to the v2 backend (`backend/`) running locally on port 8002.

---

## Local Setup

**Prerequisites:** Node.js 18+

```bash
cd sparkz-audit-flow/

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local      # if .env.example exists, otherwise create .env.local manually

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

**The backend must be running** at `http://localhost:8002` for the app to work.
See `backend/README.md` for backend setup instructions.

---

## Environment Variables

Create a `.env.local` file in this directory if one does not exist:

```
# URL of the v2 LLM-first backend (default: http://localhost:8002)
VITE_SPARKZ_API_URL=http://localhost:8002

# URL of the legacy v1 backend — only needed if using the old checklist/framework views
VITE_SPARKZ_LEGACY_API_URL=https://sparkz-dct-49d5c04c0d5c.herokuapp.com
```

Both variables have sensible defaults and are optional for local development.

---

## Project Structure

```
sparkz-audit-flow/
├── src/
│   ├── pages/
│   │   ├── Analysis.jsx        # Main analysis page (upload + SSE progress + results)
│   │   ├── Dashboard.jsx       # Dashboard overview
│   │   └── History.jsx         # Past runs (wires to GET /api/runs)
│   ├── components/
│   │   ├── analysis/
│   │   │   ├── AnalysisForm.jsx     # PDF upload + standard selector
│   │   │   ├── AnalysisResults.jsx  # Results table with human override UI
│   │   │   └── AnalysisSummary.jsx  # Summary stats (met/missing/etc.)
│   │   ├── services/
│   │   │   └── sparkzApi.jsx        # All API calls to the backend
│   │   ├── ApiHealthBanner.jsx      # Banner shown if backend is unreachable
│   │   └── SparkzLogo.jsx
│   └── App.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Key Files

**`src/components/services/sparkzApi.jsx`** — all communication with the backend.
Change `VITE_SPARKZ_API_URL` in `.env.local` (or the `NEW_API_BASE` constant) if you need
to point the app at a different backend URL.

**`src/pages/Analysis.jsx`** — the main user flow:
1. User uploads a PDF and selects a standard (FRS 105 or FRS 102)
2. Form POSTs to `/api/analyse` → receives a `run_id`
3. Page opens an `EventSource` to `/api/analyse/{run_id}/progress` and renders the progress panel
4. On `stage === "complete"`, fetches full results from `/api/results/{run_id}`
5. Renders `AnalysisSummary` + `AnalysisResults`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Running Both Services Together

Open two terminal tabs:

**Terminal 1 — Backend:**
```bash
cd backend/
source venv/bin/activate
python run.py
# → running on http://localhost:8002
```

**Terminal 2 — Frontend:**
```bash
cd sparkz-audit-flow/
npm run dev
# → running on http://localhost:5173
```

Then open `http://localhost:5173` in your browser and go to the **Analysis** page.
