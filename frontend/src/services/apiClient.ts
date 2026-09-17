export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  meta?: any;
  error?: {
    code: string;
    message: string;
    fields?: Record<string, string>;
    requestId?: string;
  };
}

class ApiClient {
  private baseUrl =
    (import.meta.env.VITE_API_URL ? (import.meta.env.VITE_API_URL as string).replace(/\/$/, '') : '') +
    '/api/v1';

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });

      const json = await res.json().catch(() => ({
        success: false,
        error: {
          code: 'INVALID_JSON',
          message: 'Server returned an unreadable response.',
        },
      }));

      if (!res.ok) {
        return {
          success: false,
          error: json.error || {
            code: `HTTP_${res.status}`,
            message: json.message || 'Request failed.',
          },
        };
      }

      return json;
    } catch (err: any) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: err.message || 'Network connection failed. Please check your internet connection.',
        },
      };
    }
  }

  // Public Endpoints
  async submitProjectRequest(payload: any) {
    return this.request<{ referenceNumber: string; title: string }>('/project-requests', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async submitContactMessage(payload: any) {
    return this.request<{ id: string; message: string }>('/contact-messages', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async uploadAttachments(files: File[]) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    return this.request<any[]>('/uploads', {
      method: 'POST',
      body: formData,
    });
  }

  // Admin Endpoints
  async adminLogin(credentials: { email: string; password: string }) {
    return this.request<{ user: { email: string; role: string }; token: string }>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getAdminSession() {
    return this.request<{ user: { email: string; role: string } }>('/admin/auth/me');
  }

  async adminLogout() {
    return this.request('/admin/auth/logout', { method: 'POST' });
  }

  async getProjectRequests(params: Record<string, string | number> = {}) {
    const query = new URLSearchParams();
    for (const [key, val] of Object.entries(params)) {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, String(val));
      }
    }
    return this.request<any[]>(`/project-requests?${query.toString()}`);
  }

  async getProjectRequestById(id: string) {
    return this.request<any>(`/project-requests/${id}`);
  }

  async updateRequestStatus(id: string, status: string) {
    return this.request<any>(`/project-requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async addRequestNote(id: string, text: string) {
    return this.request<any>(`/project-requests/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }
}

export const apiClient = new ApiClient();
