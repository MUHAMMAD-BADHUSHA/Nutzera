const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

class ApiClient {
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_token");
    }
    return null;
  }

  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const token = this.getToken();

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || `HTTP error ${response.status}`);
    }

    return response.json();
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body });
  }

  put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiClient();