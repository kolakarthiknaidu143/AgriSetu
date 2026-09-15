const API_BASE = '/api';

export function getStoredToken(): string | null {
  return localStorage.getItem('agrisetu_token');
}

export function setStoredToken(token: string) {
  localStorage.setItem('agrisetu_token', token);
}

export function removeStoredToken() {
  localStorage.removeItem('agrisetu_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    let errorMsg = 'An unexpected error occurred.';
    try {
      const data = await res.json();
      errorMsg = data.error || errorMsg;
    } catch {
      errorMsg = `Server error (${res.status})`;
    }
    throw new Error(errorMsg);
  }

  return res.json();
}

export const api = {
  // Auth
  register: (data: any) => request<any>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (credentials: { email: string; password: string }) =>
    request<any>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  demoLogin: (role: string) =>
    request<any>('/auth/demo-login', { method: 'POST', body: JSON.stringify({ role }) }),
  getMe: () => request<any>('/auth/me'),

  // Markets
  getCrops: () => request<{ crops: any[] }>('/crops'),
  getMarkets: () => request<{ markets: any[] }>('/markets'),
  getMarketPrices: (query?: { crop?: string; state?: string; district?: string; market?: string }) => {
    const params = new URLSearchParams();
    if (query?.crop) params.append('crop', query.crop);
    if (query?.state) params.append('state', query.state);
    if (query?.district) params.append('district', query.district);
    if (query?.market) params.append('market', query.market);
    return request<{ prices: any[]; sourceNotice: string }>(`/markets/prices?${params.toString()}`);
  },
  getMarketTrends: (crop?: string) =>
    request<{ crop: string; historicalTrend: any[]; summary: any }>(`/markets/trends?crop=${encodeURIComponent(crop || 'Tomato')}`),

  // AI Modules
  predictPrice: (payload: any) =>
    request<any>('/ai/price-prediction', { method: 'POST', body: JSON.stringify(payload) }),
  recommendSaleWindow: (payload: any) =>
    request<any>('/ai/sale-window', { method: 'POST', body: JSON.stringify(payload) }),
  explainBuyerMatch: (payload: any) =>
    request<any>('/ai/buyer-match', { method: 'POST', body: JSON.stringify(payload) }),
  analyzeQuality: (payload: any) =>
    request<any>('/ai/quality-analysis', { method: 'POST', body: JSON.stringify(payload) }),
  getMarketInsights: (payload: any) =>
    request<any>('/ai/market-insights', { method: 'POST', body: JSON.stringify(payload) }),

  // Lots
  getLots: (query?: { farmerId?: string; crop?: string; status?: string; isAggregated?: boolean }) => {
    const params = new URLSearchParams();
    if (query?.farmerId) params.append('farmerId', query.farmerId);
    if (query?.crop) params.append('crop', query.crop);
    if (query?.status) params.append('status', query.status);
    if (query?.isAggregated !== undefined) params.append('isAggregated', String(query.isAggregated));
    return request<{ lots: any[] }>(`/lots?${params.toString()}`);
  },
  getLotById: (id: string) => request<{ lot: any }>(`/lots/${id}`),
  createLot: (payload: any) => request<any>('/lots', { method: 'POST', body: JSON.stringify(payload) }),
  updateLot: (id: string, payload: any) =>
    request<any>(`/lots/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),

  // Buyers & Requirements
  getBuyers: () => request<{ buyers: any[] }>('/buyers'),
  getBuyerRequirements: (query?: { crop?: string; district?: string }) => {
    const params = new URLSearchParams();
    if (query?.crop) params.append('crop', query.crop);
    if (query?.district) params.append('district', query.district);
    return request<{ requirements: any[] }>(`/buyers/requirements?${params.toString()}`);
  },
  createBuyerRequirement: (payload: any) =>
    request<any>('/buyers/requirements', { method: 'POST', body: JSON.stringify(payload) }),

  // Offers & Negotiation
  getOffers: () => request<{ offers: any[] }>('/offers'),
  createOffer: (payload: any) =>
    request<any>('/offers', { method: 'POST', body: JSON.stringify(payload) }),
  counterOffer: (id: string, payload: { counterPrice: number; message?: string }) =>
    request<any>(`/offers/${id}/counter`, { method: 'POST', body: JSON.stringify(payload) }),
  acceptOffer: (id: string) =>
    request<any>(`/offers/${id}/accept`, { method: 'POST' }),

  // Orders & Transactions
  getOrders: () => request<{ orders: any[] }>('/orders'),
  getOrderById: (id: string) => request<{ order: any; logistics?: any; dispute?: any }>(`/orders/${id}`),
  updateOrderStatus: (id: string, payload: { status?: string; action?: string }) =>
    request<any>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(payload) }),
  confirmInspection: (id: string, payload: any) =>
    request<any>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ action: 'CONFIRM_QUALITY', ...payload }) }),
  releaseEscrow: (id: string) =>
    request<any>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ action: 'RELEASE_ESCROW' }) }),

  // Logistics & Storage
  getLogistics: () => request<{ logistics: any[] }>('/logistics'),
  updateLogisticsStatus: (id: string, payload: { status?: string; description?: string }) =>
    request<any>(`/logistics/${id}/status`, { method: 'PUT', body: JSON.stringify(payload) }),
  getStorageFacilities: (query?: { crop?: string; district?: string }) => {
    const params = new URLSearchParams();
    if (query?.crop) params.append('crop', query.crop);
    if (query?.district) params.append('district', query.district);
    return request<{ facilities: any[] }>(`/storage?${params.toString()}`);
  },
  getColdStorages: (query?: any) => {
    const params = new URLSearchParams();
    if (query?.crop) params.append('crop', query.crop);
    if (query?.district) params.append('district', query.district);
    return request<{ facilities: any[] }>(`/storage?${params.toString()}`);
  },
  getMatchedBuyers: (lotId: string) => request<{ matchedBuyers: any[] }>(`/lots/${lotId}/matched-buyers`),

  // Disputes
  getDisputes: () => request<{ disputes: any[] }>('/disputes'),
  createDispute: (payload: any) =>
    request<any>('/disputes', { method: 'POST', body: JSON.stringify(payload) }),
  resolveDispute: (id: string, payload: any) =>
    request<any>(`/disputes/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),

  // Admin
  getAdminDashboard: () => request<any>('/admin/dashboard'),
  getVerifications: () => request<{ buyers: any[] }>('/admin/verifications'),
  verifyBuyer: (id: string, payload: { status: string; badge?: string }) =>
    request<any>(`/admin/buyers/${id}/verify`, { method: 'PUT', body: JSON.stringify(payload) }),
  resetSeedData: () => request<any>('/admin/seed-reset', { method: 'POST' }),

  // Notifications
  getNotifications: () => request<{ notifications: any[]; unreadCount: number }>('/notifications'),
  markNotificationRead: (id: string) =>
    request<any>(`/notifications/${id}/read`, { method: 'PUT' }),

  // Demo 20-Step Controller
  runDemoStep: (stepNumber: number) =>
    request<any>('/demo/complete-transaction-step', { method: 'POST', body: JSON.stringify({ stepNumber }) })
};
