// New backend (v2) — LLM-first architecture (`/api/analyse`, `/api/results`, etc.)
export const SPARKZ_V2_API_BASE =
  import.meta.env.VITE_SPARKZ_API_URL ?? 'http://localhost:8002';

// Legacy backend (v1) — checklist tree + templates only (NOT used for PDF analysis)
export const SPARKZ_LEGACY_API_BASE =
  import.meta.env.VITE_SPARKZ_LEGACY_API_URL ?? 'https://sparkz-dct-49d5c04c0d5c.herokuapp.com';

const NEW_API_BASE = SPARKZ_V2_API_BASE;
const LEGACY_API_BASE = SPARKZ_LEGACY_API_BASE;

const get = (base, path) =>
  fetch(`${base}${path}`).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });

async function postJson(base, path, data) {
  const r = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!r.ok) {
    let detail = `HTTP ${r.status}`;
    try { const j = await r.json(); detail = j.detail || j.message || detail; } catch {}
    const err = new Error(detail);
    err.status = r.status;
    throw err;
  }
  return r.json();
}

export const sparkzApi = {
  // ── Health ──────────────────────────────────────────────────────────────
  health: () => fetch(`${NEW_API_BASE}/api/health`).then(r => r.json()),

  // ── Analysis (new v2 pipeline) ──────────────────────────────────────────

  /** POST /api/analyse — returns { run_id, status } immediately */
  startAnalysis: (formData) =>
    fetch(`${NEW_API_BASE}/api/analyse`, {
      method: 'POST',
      body: formData,
    }).then(async r => {
      if (!r.ok) {
        let detail = `HTTP ${r.status}`;
        try { const j = await r.json(); detail = j.detail || j.message || detail; } catch {}
        const err = new Error(detail);
        err.status = r.status;
        throw err;
      }
      return r.json();
    }),

  /** Returns the SSE URL for a run's progress stream */
  progressUrl: (runId) => `${NEW_API_BASE}/api/analyse/${runId}/progress`,

  /** GET /api/results/{runId} — returns full results once complete */
  getResults: (runId) => get(NEW_API_BASE, `/api/results/${runId}`),

  /** GET /api/results/{runId}/export — download CSV */
  exportUrl: (runId) => `${NEW_API_BASE}/api/results/${runId}/export`,

  /** PATCH /api/results/{runId}/items/{itemId} — human override */
  updateItem: (runId, itemId, body) =>
    fetch(`${NEW_API_BASE}/api/results/${runId}/items/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(r => r.json()),

  /** GET /api/runs — list all past runs */
  listRuns: () => get(NEW_API_BASE, '/api/runs'),

  // ── Legacy v1 endpoints (checklist tree, frameworks) ────────────────────
  frameworks: (jurisdiction = 'UK') => get(LEGACY_API_BASE, `/frameworks?jurisdiction=${jurisdiction}`),
  framework: (code) => get(LEGACY_API_BASE, `/frameworks/${code}`),
  templates: (frameworkCode) => get(LEGACY_API_BASE, `/checklist${frameworkCode ? `?framework_code=${frameworkCode}` : ''}`),
  checklistTree: (templateCode, frameworkCode) =>
    get(LEGACY_API_BASE, `/checklist/${templateCode}${frameworkCode ? `?framework_code=${frameworkCode}` : ''}`),
};
