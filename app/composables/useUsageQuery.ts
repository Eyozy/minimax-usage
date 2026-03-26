import type { UsageViewModel } from "../../shared/usage";
import {
  readRequestError,
  readUsageErrorPayload,
  resolveRemainsEndpoint,
} from "../utils/api";

type QueryState = "idle" | "loading" | "success" | "error";

export function useUsageQuery() {
  const config = useRuntimeConfig();
  const apiKey = useState("usage-api-key", () => "");
  const vm = ref<UsageViewModel | null>(null);
  const state = ref<QueryState>("idle");
  const error = ref<string | null>(null);
  const jsonExpanded = ref(false);

  const loading = computed(() => state.value === "loading");
  const hasResult = computed(() => vm.value !== null || error.value !== null || loading.value);
  const statusLabel = computed(() => {
    if (loading.value) {
      return "查询中";
    }

    if (error.value) {
      return error.value;
    }

    return vm.value?.statusLabel ?? "等待查询";
  });

  const endpoint = computed(() => {
    return resolveRemainsEndpoint(config.public.apiBase);
  });

  function saveApiKey(value: string) {
    apiKey.value = value;
    if (import.meta.client) sessionStorage.setItem("minimax_api_key", value);
  }

  async function runQuery(nextKey?: string) {
    const value = (nextKey ?? apiKey.value).trim();

    if (!value || loading.value) {
      return;
    }

    saveApiKey(value);
    state.value = "loading";
    error.value = null;

    try {
      const response = await $fetch<UsageViewModel>(endpoint.value, {
        method: "POST",
        body: { apiKey: value },
      });

      vm.value = response;
      state.value = response.ok ? "success" : "error";
      error.value = response.ok ? null : response.statusLabel;
    } catch (cause) {
      vm.value = readUsageErrorPayload(cause);
      state.value = "error";
      error.value = readRequestError(cause);
    }
  }

  function toggleJson() {
    jsonExpanded.value = !jsonExpanded.value;
  }

  if (import.meta.client) {
    onMounted(() => {
      apiKey.value = sessionStorage.getItem("minimax_api_key") ?? "";
    });
  }

  return {
    apiKey,
    vm,
    state,
    loading,
    hasResult,
    statusLabel,
    error,
    jsonExpanded,
    saveApiKey,
    submit: runQuery,
    refresh: () => runQuery(),
    toggleJson,
  };
}
