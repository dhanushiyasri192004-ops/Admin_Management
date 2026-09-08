import { apiRequest } from './api';

export const dataService = {
  // Reports & Summaries
  getDashboardSummary: () => apiRequest('/reports/dashboard-summary'),
  getBusinessReports: () => apiRequest('/reports/business-reports'),

  // Hierarchy & Geo
  getHierarchy: () => apiRequest('/admin/hierarchy'),
  getSubordinateAdmins: () => apiRequest('/admin/subordinates'),
  getDistricts: () => apiRequest('/admin/districts'),
  updateDistrictStatus: (id, status) => apiRequest(`/admin/districts/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  getDivisions: () => apiRequest('/admin/divisions'),

  // Customers & Membership
  getCustomers: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/customers${qs ? `?${qs}` : ''}`);
  },
  getMembershipCards: () => apiRequest('/customers/membership-cards'),
  upgradeMembership: (data) => apiRequest('/customers/upgrade-membership', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Vendors
  getVendors: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/vendors${qs ? `?${qs}` : ''}`);
  },

  // Orders & Bookings
  getOrders: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/orders${qs ? `?${qs}` : ''}`);
  },
  updateOrderStatus: (id, status) => apiRequest(`/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),

  getBookings: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/bookings${qs ? `?${qs}` : ''}`);
  },
  updateBookingStatus: (id, data) => apiRequest(`/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Jobs & Technicians
  getJobs: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/jobs${qs ? `?${qs}` : ''}`);
  },
  getTechnicians: () => apiRequest('/jobs/technicians'),
  updateJobStatus: (id, data) => apiRequest(`/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Payments
  getAgentPayments: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/payments/agents${qs ? `?${qs}` : ''}`);
  },
  requestAgentPayment: (data) => apiRequest('/payments/agents/request', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  processAgentPayment: (id, data) => apiRequest(`/payments/agents/${id}/process`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  getVendorPayments: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/payments/vendors${qs ? `?${qs}` : ''}`);
  },
  processVendorPayment: (id, data) => apiRequest(`/payments/vendors/${id}/process`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // KYC
  getKYCRecords: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/kyc${qs ? `?${qs}` : ''}`);
  },
  processKYC: (id, data) => apiRequest(`/kyc/${id}/process`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Pincode Manager
  getPincodes: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/pincodes${qs ? `?${qs}` : ''}`);
  },
  updatePincode: (pincode, data) => apiRequest(`/pincodes/${pincode}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Operations: Executives, Support Team, Agents
  getExecutives: () => apiRequest('/operations/executives'),
  getSupportTeam: () => apiRequest('/operations/support-team'),
  updateSupportTicket: (id, data) => apiRequest(`/operations/support-team/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  getAgents: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/operations/agents${qs ? `?${qs}` : ''}`);
  }
};
