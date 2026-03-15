export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type AuthType = "none" | "apikey" | "jwt";

export type Endpoint = {
  id: string;
  method: HttpMethod;
  path: string;
  statusCode: number;
  delay: number;
  requestExample?: string;
  response: string;
  description: string;
};

export type ApiProject = {
  id: string;
  name: string;
  version: string;
  status: "active" | "draft";
  authType: AuthType;
  description: string;
  createdAt: string;
  endpoints: Endpoint[];
};
