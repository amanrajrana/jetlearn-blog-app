import ApiClient from "./appClient";

interface AuthResponse {
  token: string;
}

class AuthService {
  private baseUrl = "/api/v1/auth";

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await ApiClient.post<AuthResponse>(
      `${this.baseUrl}/login`,
      {
        username,
        password,
      }
    );

    return response.data;
  }

  async register(username: string, password: string): Promise<AuthResponse> {
    const response = await ApiClient.post<AuthResponse>(
      `${this.baseUrl}/register`,
      {
        username,
        password,
      }
    );

    return response.data;
  }

  async logout(): Promise<void> {
    // Extend to include backend logout logic if needed
    console.log("User logged out");
  }
}

const authService = new AuthService();

export default authService;
