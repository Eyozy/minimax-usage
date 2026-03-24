import type { UsageViewModel } from "../../shared/usage.js";

const REMAINS_ENDPOINT =
  "https://www.minimaxi.com/v1/api/openplatform/coding_plan/remains";

type ModelRemain = {
  start_time?: number;
  end_time?: number;
  remains_time?: number;
  current_interval_total_count?: number;
  current_interval_usage_count?: number;
  model_name?: string;
  current_weekly_total_count?: number;
  current_weekly_usage_count?: number;
  weekly_remains_time?: number;
};

type MiniMaxRawPayload = {
  base_resp?: {
    status_code?: number;
    status_msg?: string;
  };
  status_code?: number;
  status_msg?: string;
  model_remains?: ModelRemain[];
};

export type RemainsResult = {
  ok: boolean;
  statusCode: number | null;
  summary: string;
  raw: unknown;
};

export type RemainsResponse = {
  statusCode: number;
  body: UsageViewModel;
};

type FetchLike = typeof fetch;

const emptyUsageViewModel = {
  primaryModelName: "",
  timeWindow: "",
  resetInLabel: "",
  resetTimestamp: null,
  totalCount: null,
  remainingCount: null,
  usedCount: null,
  usedPercent: null,
  weeklyTotalCount: null,
  weeklyUsedCount: null,
  weeklyRemainingCount: null,
  weeklyUsedPercent: null,
  weeklyResetTimestamp: null,
  weeklyResetInLabel: "",
  models: [],
} satisfies Omit<UsageViewModel, "ok" | "statusLabel" | "raw">;

const dateTimeFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const timeFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatDateTime(timestamp: number) {
  return dateTimeFormatter.format(timestamp).replace(/\//g, "-");
}

function formatTime(timestamp: number) {
  return timeFormatter.format(timestamp);
}

function formatResetIn(milliseconds: number) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function readStatus(response: MiniMaxRawPayload) {
  return {
    statusCode: response.status_code ?? response.base_resp?.status_code ?? null,
    statusMessage: response.status_msg ?? response.base_resp?.status_msg ?? null,
  };
}

function buildModelCard(model: ModelRemain) {
  const totalCount = model.current_interval_total_count ?? 0;
  const remainingCount = model.current_interval_usage_count ?? 0;
  const usedCount = Math.max(totalCount - remainingCount, 0);

  if (typeof model.start_time !== "number" || typeof model.end_time !== "number") {
    return {
      name: model.model_name ?? "Unknown Model",
      timeWindow: "",
      totalCount,
      remainingCount,
      usedCount,
    };
  }

  return {
    name: model.model_name ?? "Unknown Model",
    timeWindow: `${formatTime(model.start_time)} ~ ${formatTime(model.end_time)}`,
    totalCount,
    remainingCount,
    usedCount,
  };
}

export function validateApiKey(apiKey: string) {
  if (!apiKey.trim()) {
    return { ok: false, message: "缺少 API Key" };
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(apiKey)) {
    return { ok: false, message: "API Key 格式无效" };
  }

  if (apiKey.length < 10) {
    return { ok: false, message: "API Key 长度不足" };
  }

  return { ok: true, message: "" };
}

export function buildErrorViewModel(message: string, raw: unknown = null): UsageViewModel {
  return {
    ok: false,
    statusLabel: message,
    raw,
    ...emptyUsageViewModel,
  };
}

export function buildUsageViewModel(result: RemainsResult): UsageViewModel {
  const payload = (result.raw ?? null) as MiniMaxRawPayload | null;
  const models = Array.isArray(payload?.model_remains) ? payload.model_remains : [];
  const primaryModel = models[0];

  if (!primaryModel) {
    return result.ok
      ? {
          ok: result.ok,
          statusLabel: payload?.base_resp?.status_msg ?? result.summary,
          raw: result.raw,
          ...emptyUsageViewModel,
        }
      : buildErrorViewModel(result.summary, result.raw);
  }

  const totalCount = primaryModel.current_interval_total_count ?? 0;
  const remainingCount = primaryModel.current_interval_usage_count ?? 0;
  const usedCount = Math.max(totalCount - remainingCount, 0);
  const weeklyTotalCount = primaryModel.current_weekly_total_count ?? 0;
  const weeklyRemainingCount = primaryModel.current_weekly_usage_count ?? 0;
  const weeklyUsedCount = Math.max(weeklyTotalCount - weeklyRemainingCount, 0);
  const hasWeeklyQuota = weeklyTotalCount > 0 || weeklyRemainingCount > 0;
  const primaryModelName = primaryModel.model_name ?? "";

  if (typeof primaryModel.start_time !== "number" || typeof primaryModel.end_time !== "number") {
    return {
      ok: result.ok,
      statusLabel: payload?.base_resp?.status_msg ?? result.summary,
      raw: result.raw,
      ...emptyUsageViewModel,
      primaryModelName,
      totalCount,
      remainingCount,
      usedCount,
      usedPercent: totalCount > 0 ? Math.round((usedCount / totalCount) * 100) : 0,
      weeklyTotalCount: hasWeeklyQuota ? weeklyTotalCount : null,
      weeklyUsedCount: hasWeeklyQuota ? weeklyUsedCount : null,
      weeklyRemainingCount: hasWeeklyQuota ? weeklyRemainingCount : null,
      weeklyUsedPercent: hasWeeklyQuota && weeklyTotalCount > 0 ? Math.round((weeklyUsedCount / weeklyTotalCount) * 100) : null,
      models: models.filter(m => m.current_interval_total_count !== 0 || m.current_interval_usage_count !== 0).map(buildModelCard),
    };
  }

  return {
    ok: result.ok,
    statusLabel: payload?.base_resp?.status_msg ?? result.summary,
    raw: result.raw,
    primaryModelName,
    timeWindow: `${formatDateTime(primaryModel.start_time)} ~ ${formatTime(primaryModel.end_time)} (UTC+8)`,
    resetInLabel:
      typeof primaryModel.remains_time === "number"
        ? formatResetIn(primaryModel.remains_time)
        : "",
    resetTimestamp:
      typeof primaryModel.remains_time === "number"
        ? Date.now() + primaryModel.remains_time
        : null,
    totalCount,
    remainingCount,
    usedCount,
    usedPercent: totalCount > 0 ? Math.round((usedCount / totalCount) * 100) : 0,
    weeklyTotalCount: hasWeeklyQuota ? weeklyTotalCount : null,
    weeklyUsedCount: hasWeeklyQuota ? weeklyUsedCount : null,
    weeklyRemainingCount: hasWeeklyQuota ? weeklyRemainingCount : null,
    weeklyUsedPercent: hasWeeklyQuota && weeklyTotalCount > 0 ? Math.round((weeklyUsedCount / weeklyTotalCount) * 100) : null,
    weeklyResetTimestamp:
      hasWeeklyQuota && typeof primaryModel.weekly_remains_time === "number"
        ? Date.now() + primaryModel.weekly_remains_time
        : null,
    weeklyResetInLabel:
      hasWeeklyQuota && typeof primaryModel.weekly_remains_time === "number"
        ? formatResetIn(primaryModel.weekly_remains_time)
        : "",
    models: models.filter(m => m.current_interval_total_count !== 0 || m.current_interval_usage_count !== 0).map(buildModelCard),
  };
}

export async function fetchRemains(apiKey: string, fetchImpl: FetchLike = fetch): Promise<RemainsResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetchImpl(REMAINS_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    const payload = (await response.json()) as MiniMaxRawPayload;
    const { statusCode, statusMessage } = readStatus(payload);

    if (statusCode === 0) {
      return { ok: true, statusCode, summary: "查询成功", raw: payload };
    }

    if (statusCode === 1004) {
      return { ok: false, statusCode, summary: "请检查 API Key 是否正确", raw: payload };
    }

    return {
      ok: false,
      statusCode,
      summary: statusMessage ?? "MiniMax 返回了未识别的响应",
      raw: payload,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "请求 MiniMax 失败";
    return {
      ok: false,
      statusCode: null,
      summary: message.includes("aborted") ? "请求超时，请重试" : message,
      raw: null,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function handleRemainsRequest(
  apiKey: string,
  fetchImpl?: FetchLike,
): Promise<RemainsResponse> {
  const validation = validateApiKey(apiKey);

  if (!validation.ok) {
    return {
      statusCode: 400,
      body: buildErrorViewModel(validation.message),
    };
  }

  const result = await fetchRemains(apiKey, fetchImpl);
  return {
    statusCode: result.ok ? 200 : 502,
    body: buildUsageViewModel(result),
  };
}
