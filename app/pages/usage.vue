<script setup lang="ts">
import type { UsageViewModel } from "../../shared/usage";
import { formatCountdown, formatNumber } from "../utils/api";

useSeoMeta({
  title: "查询 | MiniMax M Plan",
  description: "输入 MiniMax API Key，查看当前订阅计划的共享调用额度、本周状态与支持模型范围。",
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
  countdownTimer = window.setInterval(() => {
    if (query.hasResult.value && query.vm.value) {
      now.value = Date.now();
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});

type SummaryItem = { label: string; value: string; tone?: "default" | "primary" };

// 官方控制台对齐算法：当剩余未满额时，官方以向下取整统计已用 (即 100 - remainingPercent - 1)
const currentUsedPercent = computed(() => {
  const vm = query.vm.value;
  if (!vm) return null;
  if (vm.remainingPercent != null) {
    return vm.remainingPercent === 100 ? 0 : Math.max(100 - vm.remainingPercent - 1, 0);
  }
  return vm.usedPercent;
});

const currentRemainPercent = computed(() => {
  if (currentUsedPercent.value != null) {
    return Math.max(100 - currentUsedPercent.value, 0);
  }
  return query.vm.value?.remainingPercent ?? null;
});

const currentItems = computed((): SummaryItem[] => {
  const vm = query.vm.value;
  if (!vm) return [];

  const usedDisplay = currentUsedPercent.value != null
    ? `${currentUsedPercent.value}%`
    : (vm.usedCount != null ? formatNumber(vm.usedCount) : "--");

  const remainDisplay = currentRemainPercent.value != null
    ? `${currentRemainPercent.value}%`
    : (vm.remainingCount != null ? formatNumber(vm.remainingCount) : "--");

  const totalDisplay = vm.totalCount != null && vm.totalCount > 0
    ? formatNumber(vm.totalCount)
    : "通用共享池";

  return [
    { label: "当前剩余", value: remainDisplay, tone: "primary" },
    { label: "已消耗", value: usedDisplay },
    { label: "额度机制", value: totalDisplay },
    { label: "窗口重置", value: formatCountdown(vm.resetTimestamp ?? null, now.value) },
  ];
});

const hasWeekly = computed(() => {
  const vm = query.vm.value;
  return Boolean(
    vm && (
      vm.weeklyRemainingPercent !== null || 
      vm.weeklyResetTimestamp !== null || 
      vm.weeklyTotalCount !== null
    )
  );
});

const weeklyUsedPercent = computed(() => {
  const vm = query.vm.value;
  if (!vm) return null;
  if (vm.weeklyRemainingPercent != null) {
    return vm.weeklyRemainingPercent === 100 ? 0 : Math.max(100 - vm.weeklyRemainingPercent - 1, 0);
  }
  return vm.weeklyUsedPercent;
});

const weeklyRemainPercent = computed(() => {
  if (weeklyUsedPercent.value != null) {
    return Math.max(100 - weeklyUsedPercent.value, 0);
  }
  return query.vm.value?.weeklyRemainingPercent ?? null;
});

const weeklyItems = computed((): SummaryItem[] => {
  const vm = query.vm.value;
  if (!vm) return [];

  const weeklyRemainDisplay = weeklyRemainPercent.value != null
    ? `${weeklyRemainPercent.value}%`
    : (vm.weeklyRemainingCount != null ? formatNumber(vm.weeklyRemainingCount) : "--");

  const weeklyUsedDisplay = weeklyUsedPercent.value != null
    ? `${weeklyUsedPercent.value}%`
    : (vm.weeklyUsedCount != null ? formatNumber(vm.weeklyUsedCount) : "--");

  const weeklyTotalDisplay = vm.weeklyTotalCount != null && vm.weeklyTotalCount > 0
    ? formatNumber(vm.weeklyTotalCount)
    : "全模型共享";

  return [
    { label: "本周剩余", value: weeklyRemainDisplay, tone: "primary" },
    { label: "本周已用", value: weeklyUsedDisplay },
    { label: "额度机制", value: weeklyTotalDisplay },
    { label: "本周重置", value: formatCountdown(vm.weeklyResetTimestamp ?? null, now.value) },
  ];
});
</script>

<template>
  <div class="usage-page">
    <section class="usage-hero">
      <h1 id="shared-quota-title" class="page-title">M Plan 额度查询</h1>
      <p class="page-lead">输入 MiniMax API Key，查看当前订阅计划的共享调用额度、本周状态与支持模型范围。</p>
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
      v-if="query.hasResult.value && query.vm.value"
      title="当前 5 小时配额"
      subtitle="控制文本、图像与语音等非视频模型"
      progress-label="当前 5 小时使用进度"
      :progress-value="currentUsedPercent"
      :items="currentItems"
    />

    <UsageSummarySection
      v-if="query.hasResult.value && hasWeekly"
      title="本周累计配额"
      subtitle="全模型共享周度总上限 · 包含 H3 视频模型"
      progress-label="本周使用进度"
      :progress-value="weeklyUsedPercent"
      :items="weeklyItems"
    />

    <ModelsList :models="query.vm.value?.models ?? []" />

    <RawResponsePanel
      v-if="query.hasResult.value"
      :raw="query.vm.value?.raw"
      :expanded="query.jsonExpanded.value"
      @toggle="query.toggleJson()"
    />
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
