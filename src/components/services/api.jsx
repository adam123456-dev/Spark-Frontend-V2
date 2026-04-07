const API_BASE = import.meta.env?.VITE_API_URL ?? 'http://localhost:3000/api';

export const mockUser = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  plan: 'Builder Plan',
  creditsUsed: 18,
  creditsTotal: 25,
  billingAmount: '£100.00',
  nextBillingDate: 'Oct 12, 2026',
};

export const mockAnalyses = [
  { id: '1', companyName: 'Velvet Labs Ltd', framework: 'IFRS', dateUploaded: 'Oct 24, 2025', status: 'Completed', missingDisclosures: 0 },
  { id: '2', companyName: 'Atlas Global Corp', framework: 'FRS 102', dateUploaded: 'Oct 23, 2025', status: 'Processing', missingDisclosures: null },
  { id: '3', companyName: 'Pulse Ventures', framework: 'IFRS', dateUploaded: 'Oct 22, 2025', status: 'Completed', missingDisclosures: 5 },
  { id: '4', companyName: 'Echo Trading Group', framework: 'FRS 102', dateUploaded: 'Oct 20, 2025', status: 'Completed', missingDisclosures: 2 },
  { id: '5', companyName: 'Northwind Trading', framework: 'FRS 102', dateUploaded: 'Oct 23, 2025', status: 'Processing', missingDisclosures: null },
  { id: '6', companyName: 'Stellar Innovations', framework: 'IFRS', dateUploaded: 'Oct 21, 2025', status: 'Completed', missingDisclosures: 14 },
  { id: '7', companyName: 'Nexus Logistics', framework: 'IFRS for SMEs', dateUploaded: 'Oct 20, 2025', status: 'Failed', missingDisclosures: null },
  { id: '8', companyName: 'Peak Software', framework: 'IFRS', dateUploaded: 'Oct 18, 2025', status: 'Completed', missingDisclosures: 2 },
  { id: '9', companyName: 'Acme Global Ltd', framework: 'IFRS', dateUploaded: 'Oct 24, 2025', status: 'Completed', missingDisclosures: 0 },
];

export const mockDisclosures = [
  { id: '1', standard: 'IAS', clause: '1.10', requirement: 'A complete set of financial statements comprises: a statement of financial position, a statement of profit or loss and other comprehensive income, and a statement of changes in equity.', status: 'Met', evidence: '"The annual report contains the Consolidated Balance Sheet (p. 42), Statement of Comprehensive Income (p. 44), and Statement of Changes in Equity (p. 45)..."' },
  { id: '2', standard: 'IAS', clause: '1.112', requirement: 'Disclosure of information about the basis of preparation of the financial statements and the specific accounting policies used.', status: 'Met', evidence: '"Note 2: Basis of Preparation. These financial statements have been prepared in accordance with IFRS Accounting Standards as issued by the IASB..."' },
  { id: '3', standard: 'IFRS', clause: '16.53', requirement: 'Disclosure of the interest expense on lease liabilities and the total cash outflow for leases.', status: 'Partial', evidence: '"Note 14 (Leases) discloses total cash outflow of £1.2m, but interest expense specifically related to lease liabilities is not explicitly isolated."' },
  { id: '4', standard: 'IAS', clause: '24.18', requirement: 'Disclosure of the nature of the related party relationship as well as information about those transactions.', status: 'Missing', evidence: 'No evidence found in uploaded documents.' },
  { id: '5', standard: 'IAS', clause: '36.90', requirement: 'Disclosure of the recoverable amount of an asset or cash-generating unit and the basis on which it was determined.', status: 'Met', evidence: '"Note 8 (Impairment): The Group performed impairment reviews using value-in-use calculations..."' },
  { id: '6', standard: 'IFRS', clause: '7.25', requirement: "Disclosure of the significance of financial instruments for the entity's financial position and performance.", status: 'Met', evidence: '"Note 19 (Financial Instruments) provides comprehensive disclosure of credit, liquidity, and market risks."' },
  { id: '7', standard: 'IAS', clause: '12.81', requirement: 'Disclosure of deferred tax assets and liabilities, and the amounts of deferred tax expense or income.', status: 'Partial', evidence: '"Note 11 (Tax) shows deferred tax balances but does not separately disclose movements in deferred tax expense for the period."' },
  { id: '8', standard: 'IAS', clause: '19.120', requirement: 'Disclosure of the characteristics of defined benefit plans and risks associated with them.', status: 'Missing', evidence: 'No evidence found in uploaded documents.' },
];

export const mockBillingHistory = [
  { id: '1', date: 'Sep 12, 2025', amount: '£100.00', status: 'Paid' },
  { id: '2', date: 'Aug 12, 2025', amount: '£100.00', status: 'Paid' },
  { id: '3', date: 'Jul 12, 2025', amount: '£100.00', status: 'Paid' },
  { id: '4', date: 'Jun 12, 2025', amount: '£100.00', status: 'Paid' },
];

export const authService = {
  login: async (email, password) => {
    // TODO: const res = await fetch(`${API_BASE}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password}) });
    return { user: mockUser, token: 'mock-token' };
  },
  signup: async (email, password, name) => {
    // TODO: real API call to `${API_BASE}/auth/signup`
    return { user: mockUser, token: 'mock-token' };
  },
  logout: async () => { /* TODO: call `${API_BASE}/auth/logout` */ },
};

export const analysisService = {
  getAll: async () => {
    // TODO: return fetch(`${API_BASE}/analyses`).then(r => r.json());
    return mockAnalyses;
  },
  getById: async (id) => mockAnalyses.find(a => a.id === id),
  create: async (data) => {
    // TODO: return fetch(`${API_BASE}/analyses`, { method:'POST', body: data }).then(r => r.json());
    return mockAnalyses[0];
  },
  delete: async (id) => { /* TODO: fetch(`${API_BASE}/analyses/${id}`, { method:'DELETE' }) */ },
  retry: async (id) => { /* TODO: fetch(`${API_BASE}/analyses/${id}/retry`, { method:'POST' }) */ },
};

export const checklistService = {
  getByAnalysisId: async (id) => {
    // TODO: return fetch(`${API_BASE}/analyses/${id}/checklist`).then(r => r.json());
    return mockDisclosures;
  },
  exportReport: async (id, format) => {
    // TODO: window.open(`${API_BASE}/analyses/${id}/export?format=${format}`);
  },
};

export const billingService = {
  getHistory: async () => {
    // TODO: return fetch(`${API_BASE}/billing/history`).then(r => r.json());
    return mockBillingHistory;
  },
  getUser: async () => {
    // TODO: return fetch(`${API_BASE}/user/profile`).then(r => r.json());
    return mockUser;
  },
};