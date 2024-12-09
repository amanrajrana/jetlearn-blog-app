interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Centralized API request utility
export default class ApiClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static async request<T = any>(
    url: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    const response = await fetch(url, options);
    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
      const errorMessage =
        contentType && contentType.includes("application/json")
          ? (await response.json()).message
          : response.statusText;

      throw new Error(`Error: ${errorMessage}`);
    }

    const data = contentType?.includes("application/json")
      ? await response.json()
      : null;

    return {
      success: true,
      data,
    };
  }

  /**
   * Utility to make a Post request
   */
  static async post<T>(
    url: string,
    body: Record<string, unknown>,
    headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
  }

  /**
   * Utility to make a Get request
   */
  static async get<T>(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: "GET",
      headers,
    });
  }

  /**
   * Utility to make a Put request
   */
  static async put<T>(
    url: string,
    body: Record<string, unknown>,
    headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers,
    });
  }

  /**
   * Utility to make a Delete request
   */

  static async delete<T>(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: "DELETE",
      headers,
    });
  }
}
