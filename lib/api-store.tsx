"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { dummyApiData } from "../data/dummy-api-data";
import { ApiProject, Endpoint } from "./types";
import { makeId } from "./helpers";

type CreateApiInput = Pick<ApiProject, "name" | "version" | "description" | "authType">;

type ApiStoreValue = {
  apis: ApiProject[];
  createApi: (input: CreateApiInput) => ApiProject;
  updateApi: (id: string, partial: Partial<ApiProject>) => void;
  deleteApi: (id: string) => void;
  getApiById: (id: string) => ApiProject | undefined;
  addEndpoint: (apiId: string, endpoint: Omit<Endpoint, "id">) => void;
  updateEndpoint: (apiId: string, endpointId: string, partial: Partial<Endpoint>) => void;
  deleteEndpoint: (apiId: string, endpointId: string) => void;
};

const ApiStoreContext = createContext<ApiStoreValue | null>(null);

export function ApiStoreProvider({ children }: { children: ReactNode }) {
  const [apis, setApis] = useState<ApiProject[]>(dummyApiData);

  const store = useMemo<ApiStoreValue>(() => {
    return {
      apis,
      createApi: (input) => {
        const created: ApiProject = {
          id: makeId("api"),
          name: input.name,
          version: input.version,
          description: input.description,
          authType: input.authType,
          status: "draft",
          createdAt: new Date().toISOString().slice(0, 10),
          endpoints: []
        };
        setApis((prev) => [created, ...prev]);
        return created;
      },
      updateApi: (id, partial) => {
        setApis((prev) => prev.map((api) => (api.id === id ? { ...api, ...partial } : api)));
      },
      deleteApi: (id) => {
        setApis((prev) => prev.filter((api) => api.id !== id));
      },
      getApiById: (id) => apis.find((api) => api.id === id),
      addEndpoint: (apiId, endpoint) => {
        setApis((prev) =>
          prev.map((api) =>
            api.id === apiId
              ? { ...api, endpoints: [...api.endpoints, { ...endpoint, id: makeId("ep") }] }
              : api
          )
        );
      },
      updateEndpoint: (apiId, endpointId, partial) => {
        setApis((prev) =>
          prev.map((api) =>
            api.id === apiId
              ? {
                  ...api,
                  endpoints: api.endpoints.map((endpoint) =>
                    endpoint.id === endpointId ? { ...endpoint, ...partial } : endpoint
                  )
                }
              : api
          )
        );
      },
      deleteEndpoint: (apiId, endpointId) => {
        setApis((prev) =>
          prev.map((api) =>
            api.id === apiId
              ? { ...api, endpoints: api.endpoints.filter((endpoint) => endpoint.id !== endpointId) }
              : api
          )
        );
      }
    };
  }, [apis]);

  return <ApiStoreContext.Provider value={store}>{children}</ApiStoreContext.Provider>;
}

export function useApiStore() {
  const context = useContext(ApiStoreContext);
  if (!context) throw new Error("useApiStore must be used inside ApiStoreProvider");
  return context;
}
