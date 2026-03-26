<script setup lang="ts">
import type { UsageViewModel } from "../../shared/usage";
import { formatCountdown, formatNumber } from "../utils/api";

useSeoMeta({
  title: "查询 | MiniMax Token Plan 用量查询",
  description: "输入 Token Plan 专属 API Key，查看当前调用次数余量与各模型明细。",
});

const query = useUsageQuery();
const keyModel = computed({
  get: () => query.apiKey.value,
  set: (value: string) => {
    query.saveApiKey(value);
  },
});

const timeWindow = computed(() => query.vm.value?.timeWindow ?? "");
const isOk = computed(() => query.vm.value?.ok ?? false);
const now = ref(Date.now());
let countdownTimer: number | null = null;

onMounted(() => {
  countdownTimer = window.setInterval(() => { now.value = Date.now(); }, 1000);
});

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});

type SummaryItem = { label: string; value: string; tone?: "default" | "primary" };

const currentItems = computed((): SummaryItem[] => {
  const vm = query.vm.value;
  return [
    { label: "已使用", value: formatNumber(vm?.usedCount), tone: "primary" },
    { label: "剩余", value: formatNumber(vm?.remainingCount) },
    { label: "总额度", value: formatNumber(vm?.totalCount) },
    { label: "窗口重置", value: formatCountdown(vm?.resetTimestamp ?? null, now.value) },
  ];
});

const weeklyItems = computed((): SummaryItem[] => {
  const vm = query.vm.value;
  return [
    { label: "本周已使用", value: formatNumber(vm?.weeklyUsedCount) },
    { label: "本周剩余", value: formatNumber(vm?.weeklyRemainingCount) },
    { label: "本周总额度", value: formatNumber(vm?.weeklyTotalCount) },
    { label: "本周重置", value: formatCountdown(vm?.weeklyResetTimestamp ?? null, now.value) },
  ];
});
</script>

<template>
  <div class="usage-page">
    <section class="usage-hero">
      <h1 class="page-title">Token Plan 用量查询</h1>
      <p class="page-lead">输入 Token Plan 专属 API Key，查看当前调用次数余量与各模型明细。</p>
    </section>

    <ApiKeyForm
      v-model="keyModel"
      :loading="query.loading.value"
      @submit="query.submit()"
      @refresh="query.refresh()"
    />

    <StatusBanner
      v-if="query.hasResult.value"
      :loading="query.loading.value"
      :status-label="query.statusLabel.value"
      :time-window="timeWindow"
      :ok="isOk"
    />

    <UsageSummarySection
      title="当前窗口（5h）"
      :subtitle="query.vm.value?.primaryModelName"
      progress-label="当前窗口使用进度（5h）"
      :progress-value="query.vm.value?.usedPercent"
      :items="currentItems"
    />

    <UsageSummarySection
      v-if="query.vm.value?.weeklyTotalCount !== null"
      title="本周用量"
      :subtitle="query.vm.value?.primaryModelName"
      progress-label="本周使用进度"
      :progress-value="query.vm.value?.weeklyUsedPercent"
      :items="weeklyItems"
    />

    <ModelsList :models="query.vm.value?.models ?? []" />

    <RawResponsePanel v-if="query.hasResult.value" :raw="query.vm.value?.raw" :expanded="query.jsonExpanded.value" @toggle="query.toggleJson()" />
  </div>
</template>

<style scoped>
.usage-page {
  display: grid;
  gap: var(--space-6);
}

.usage-hero {
  display: grid;
  gap: var(--space-4);
}
</style>
