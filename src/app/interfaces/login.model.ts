export interface LoginModel {
  name: string;
  password: string;
}

export interface AuthenticatedResponse {
  token: string;
  refreshToken: string;
}
