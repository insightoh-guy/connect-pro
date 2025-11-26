/**
 * API client for backend communication
 * Base URL: http://localhost:5000/api
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Helper function to set auth token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Helper function to remove auth token
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Generic fetch wrapper with error handling
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// ==================== AUTH API ====================
export const authApi = {
  signup: async (data: {
    email: string;
    password: string;
    full_name: string;
    phone: string;
    role?: string;
  }) => {
    const response = await apiRequest<{
      message: string;
      token: string;
      user: any;
    }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await apiRequest<{
      message: string;
      token: string;
      user: any;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  getCurrentUser: async () => {
    return apiRequest<{ user: any }>('/auth/me', {
      method: 'GET',
    });
  },
};

// ==================== TRAINER API ====================
export const trainerApi = {
  onboarding: async (data: {
    full_name: string;
    professional_title?: string;
    experience_years?: number;
    hourly_rate?: number;
    bio?: string;
    linkedin_url?: string;
    location_id?: number;
    location?: string;
    availability?: boolean;
  }) => {
    return apiRequest<{ message: string; trainer: any }>('/trainer/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getProfile: async () => {
    return apiRequest<{ trainer: any }>('/trainer/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (data: any) => {
    return apiRequest<{ message: string; trainer: any }>('/trainer/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getDashboard: async () => {
    return apiRequest<{ dashboard: any }>('/trainer/dashboard', {
      method: 'GET',
    });
  },

  addSkill: async (data: { skill_name: string; proficiency: number }) => {
    return apiRequest<{ message: string; skill: any }>('/trainer/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  deleteSkill: async (skillId: number) => {
    return apiRequest<{ message: string }>(`/trainer/skills/${skillId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== VENDOR API ====================
export const vendorApi = {
  onboarding: async (data: {
    name: string;
    vendor_type_id: number;
    gst_id?: string;
    website?: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country?: string;
  }) => {
    return apiRequest<{ message: string; vendor: any }>('/vendor/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getProfile: async () => {
    return apiRequest<{ vendor: any }>('/vendor/profile', {
      method: 'GET',
    });
  },
};

// ==================== JOBS API ====================
export const jobsApi = {
  getJobs: async (params?: {
    search?: string;
    level?: string;
    status?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.level) queryParams.append('level', params.level);
    if (params?.status) queryParams.append('status', params.status || 'open');

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';

    return apiRequest<{ jobs: any[]; total: number }>(endpoint, {
      method: 'GET',
    });
  },

  getJob: async (jobId: number) => {
    return apiRequest<{ job: any }>(`/jobs/${jobId}`, {
      method: 'GET',
    });
  },

  createJob: async (data: {
    title: string;
    description?: string;
    location?: string;
    type: 'online' | 'in-person' | 'hybrid';
    level: 'beginner' | 'intermediate' | 'advanced';
    duration?: string;
    start_date: string;
    end_date: string;
    participants?: number;
    hourly_rate: number;
    total_compensation: number;
    skills?: string[];
    status?: string;
  }) => {
    return apiRequest<{ message: string; job: any }>('/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  applyToJob: async (jobId: number) => {
    return apiRequest<{ message: string; application: any }>(`/jobs/${jobId}/apply`, {
      method: 'POST',
    });
  },

  getJobApplications: async (jobId: number) => {
    return apiRequest<{ applications: any[]; total: number }>(`/jobs/${jobId}/applications`, {
      method: 'GET',
    });
  },
};

// ==================== HEALTH CHECK ====================
export const healthCheck = async () => {
  return apiRequest<{ status: string; message: string }>('/health', {
    method: 'GET',
  });
};

