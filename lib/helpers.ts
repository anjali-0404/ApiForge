import { ApiProject, HttpMethod } from "./types";

export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function methodClass(method: HttpMethod) {
  if (method === "GET") return "method-get";
  if (method === "POST") return "method-post";
  if (method === "PUT") return "method-put";
  return "method-delete";
}

export function createApiBaseUrl(api: ApiProject) {
  const slug = api.name.toLowerCase().replace(/\s+/g, "-");
  return `https://apiforge.dev/mock/${slug}/v${api.version}/`;
}

export function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
