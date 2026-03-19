import type { UsageViewModel } from "../../shared/usage";

type ResolveApiBaseOptions = {
  apiBase?: string;
  nodeEnv?: string;
};

type ErrorPayload = {
  statusLabel?: unknown;
  error?: unknown;
  message?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function resolveApiBase(options: ResolveApiBaseOptions = {}) {
  const explicitBase = options.apiBase?.trim();

  if (explicitBase) {
    return explicitBase;
  }

  return options.nodeEnv === "development" ? "http://localhost:3000" : "";
}

export function resolveRemainsEndpoint(apiBase: string) {
  const normalizedBase = apiBase.trim().replace(/\/+$/, "");

  if (!normalizedBase) {
    return "/api/remains";
  }

  if (/^https?:\/\//.test(normalizedBase)) {
    return `${normalizedBase}/api/remains`;
  }

  if (normalizedBase === "/api") {
    return "/api/remains";
  }

  return `${normalizedBase}/remains`;
}

export function readUsageErrorPayload(cause: unknown): UsageViewModel | null {
  if (!isRecord(cause) || !isRecord(cause.data)) {
    return null;
  }

  if (typeof cause.data.statusLabel !== "string") {
    return null;
  }

  return cause.data as UsageViewModel;
}

export function readRequestError(cause: unknown) {
  const payload = readUsageErrorPayload(cause);

  if (payload?.statusLabel) {
    return payload.statusLabel;
  }

  if (isRecord(cause) && isRecord(cause.data)) {
    const data = cause.data as ErrorPayload;

    if (typeof data.error === "string") {
      return data.error;
    }

    if (typeof data.message === "string") {
      return data.message;
    }
  }

  if (cause instanceof Error) {
    return cause.message;
  }

  return "请求失败，请稍后重试";
}

export function formatCountdown(targetTimestamp: number | null, now = Date.now()) {
  if (!targetTimestamp) {
    return "-";
  }

  const remainingMilliseconds = Math.max(targetTimestamp - now, 0);
  const totalSeconds = Math.ceil(remainingMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
