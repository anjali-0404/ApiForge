import { ApiProject } from "../lib/types";

export const dummyApiData: ApiProject[] = [
  {
    id: "1",
    name: "User Service",
    version: "1.2",
    status: "active",
    authType: "apikey",
    description: "User profiles, onboarding, and permissions.",
    createdAt: "2026-02-10",
    endpoints: [
      {
        id: "e1",
        method: "GET",
        path: "/users",
        statusCode: 200,
        delay: 120,
        description: "Get all users",
        response: JSON.stringify({ users: [{ id: 1, name: "John" }] }, null, 2)
      },
      {
        id: "e2",
        method: "POST",
        path: "/users",
        statusCode: 201,
        delay: 180,
        description: "Create user",
        requestExample: JSON.stringify({ name: "John" }, null, 2),
        response: JSON.stringify({ id: 2, name: "John" }, null, 2)
      }
    ]
  },
  {
    id: "2",
    name: "Payments",
    version: "2.0",
    status: "active",
    authType: "jwt",
    description: "Payment intents, refunds, and invoices.",
    createdAt: "2026-01-22",
    endpoints: [
      {
        id: "e3",
        method: "GET",
        path: "/payments/:id",
        statusCode: 200,
        delay: 90,
        description: "Fetch payment by id",
        response: JSON.stringify({ id: "pay_123", amount: 2500, currency: "usd" }, null, 2)
      }
    ]
  },
  {
    id: "3",
    name: "Auth Gateway",
    version: "1.0",
    status: "draft",
    authType: "none",
    description: "Session, login, and refresh flows.",
    createdAt: "2026-03-05",
    endpoints: []
  }
];
