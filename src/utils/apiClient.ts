import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.request(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  }

  // GET request
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
    });
  }

  // POST request
  async post<T>(url: string, data?: unknown): Promise<T> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
    });
  }

  // PUT request
  async put<T>(url: string, data?: unknown): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
    });
  }

  // DELETE request
  async delete<T>(url: string): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      url,
    });
  }
}

// Create a singleton instance
const apiClient = new ApiClient();

export default apiClient;