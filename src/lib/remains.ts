import type { UsageViewModel } from "../../shared/usage.js";

const REMAINS_ENDPOINT =
  "https://www.minimax.cn/v1/token_plan/remains";

type ModelRemain = {
  start_time?: number;
  end_time?: number;
  remains_time?: number;
  current_interval_total_count?: number;
  current_interval_usage_count?: number;
  current_interval_remaining_percent?: number;
  current_interval_status?: number;
  model_name?: string;
  current_weekly_total_count?: number;
  current_weekly_usage_count?: number;
  current_weekly_remaining_percent?: number;
  current_weekly_status?: number;
  weekly_start_time?: number;
  weekly_end_time?: number;
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
  remainingPercent: null,
  intervalStatus: null,
  weeklyTotalCount: null,
  weeklyUsedCount: null,
  weeklyRemainingCount: null,
  weeklyUsedPercent: null,
  weeklyRemainingPercent: null,
  weeklyStatus: null,
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

function buildModelItem(model: ModelRemain) {
  const name = model.model_name === "general" ? "General (M Plan 通用共享池)" : (model.model_name ?? "Unknown Model");
  return { name };
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
  const statusLabel = payload?.base_resp?.status_msg ?? result.summary;

  if (!primaryModel) {
    return result.ok
      ? { ok: true, statusLabel, raw: result.raw, ...emptyUsageViewModel }
      : buildErrorViewModel(result.summary, result.raw);
  }

  const rawTotal = primaryModel.current_interval_total_count ?? 0;
  const rawRemaining = primaryModel.current_interval_usage_count ?? 0;
  const hasCountQuota = rawTotal > 0;
  const totalCount = hasCountQuota ? rawTotal : null;
  const remainingCount = hasCountQuota ? rawRemaining : null;
  const usedCount = hasCountQuota ? Math.max(rawTotal - rawRemaining, 0) : null;

  const rawRemainingPercent = primaryModel.current_interval_remaining_percent ?? null;
  let usedPercent: number | null = null;
  let remainingPercent: number | null = null;

  if (rawRemainingPercent != null) {
    remainingPercent = rawRemainingPercent;
    usedPercent = Math.max(100 - rawRemainingPercent, 0);
  } else if (hasCountQuota && totalCount! > 0) {
    usedPercent = Math.round((usedCount! / totalCount!) * 100);
    remainingPercent = Math.max(100 - usedPercent, 0);
  }

  const rawWeeklyTotal = primaryModel.current_weekly_total_count ?? 0;
  const rawWeeklyRemaining = primaryModel.current_weekly_usage_count ?? 0;
  const hasWeeklyCount = rawWeeklyTotal > 0;
  const weeklyTotalCount = hasWeeklyCount ? rawWeeklyTotal : null;
  const weeklyRemainingCount = hasWeeklyCount ? rawWeeklyRemaining : null;
  const weeklyUsedCount = hasWeeklyCount ? Math.max(rawWeeklyTotal - rawWeeklyRemaining, 0) : null;

  const rawWeeklyRemainingPercent = primaryModel.current_weekly_remaining_percent ?? null;
  let weeklyUsedPercent: number | null = null;
  let weeklyRemainingPercent: number | null = null;

  if (rawWeeklyRemainingPercent != null) {
    weeklyRemainingPercent = rawWeeklyRemainingPercent;
    weeklyUsedPercent = Math.max(100 - rawWeeklyRemainingPercent, 0);
  } else if (hasWeeklyCount && weeklyTotalCount! > 0) {
    weeklyUsedPercent = Math.round((weeklyUsedCount! / weeklyTotalCount!) * 100);
    weeklyRemainingPercent = Math.max(100 - weeklyUsedPercent, 0);
  }

  const hasWeeklyQuota =
    hasWeeklyCount ||
    weeklyRemainingPercent != null ||
    typeof primaryModel.weekly_remains_time === "number";

  const hasTimeWindow =
    typeof primaryModel.start_time === "number" && typeof primaryModel.end_time === "number";

  const mappedModels = models.map(buildModelItem);

  return {
    ok: result.ok,
    statusLabel,
    raw: result.raw,
    primaryModelName: primaryModel.model_name === "general" ? "General (M Plan 统一共享池)" : (primaryModel.model_name ?? ""),
    timeWindow: hasTimeWindow
      ? `${formatDateTime(primaryModel.start_time!)} ~ ${formatTime(primaryModel.end_time!)} (UTC+8)`
      : "",
    resetInLabel: typeof primaryModel.remains_time === "number" ? formatResetIn(primaryModel.remains_time) : "",
    resetTimestamp: typeof primaryModel.remains_time === "number" ? Date.now() + primaryModel.remains_time : null,
    totalCount,
    remainingCount,
    usedCount,
    usedPercent,
    remainingPercent,
    intervalStatus: primaryModel.current_interval_status ?? null,
    weeklyTotalCount,
    weeklyUsedCount,
    weeklyRemainingCount,
    weeklyUsedPercent,
    weeklyRemainingPercent,
    weeklyStatus: primaryModel.current_weekly_status ?? null,
    weeklyResetTimestamp: hasWeeklyQuota && typeof primaryModel.weekly_remains_time === "number"
      ? Date.now() + primaryModel.weekly_remains_time
      : null,
    weeklyResetInLabel: hasWeeklyQuota && typeof primaryModel.weekly_remains_time === "number"
      ? formatResetIn(primaryModel.weekly_remains_time)
      : "",
    models: mappedModels,
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
    const statusCode = payload.status_code ?? payload.base_resp?.status_code ?? null;
    const statusMessage = payload.status_msg ?? payload.base_resp?.status_msg ?? null;

    if (statusCode === 0) {
      return { ok: true, statusCode, summary: "查询成功", raw: payload };
    }

    if (statusCode === 1004) {
      return { ok: false, statusCode, summary: "API Key 鉴权失败：请确认 Key 有效，且属于国内开放平台订阅（非海外版）", raw: payload };
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
