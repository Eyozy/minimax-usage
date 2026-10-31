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

const currentUsedDisplay = computed(() => {
  const vm = query.vm.value;
  if (!vm) return "--";
  if (currentUsedPercent.value != null) return `${currentUsedPercent.value}%`;
  return vm.usedCount != null ? formatNumber(vm.usedCount) : "--";
});

const currentRemainDisplay = computed(() => {
  const vm = query.vm.value;
  if (!vm) return "--";
  if (currentRemainPercent.value != null) return `${currentRemainPercent.value}%`;
  return vm.remainingCount != null ? formatNumber(vm.remainingCount) : "--";
});

const currentCountdown = computed(() => {
  const vm = query.vm.value;
  return formatCountdown(vm?.resetTimestamp ?? null, now.value);
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

const weeklyUsedDisplay = computed(() => {
  const vm = query.vm.value;
  if (!vm) return "--";
  if (weeklyUsedPercent.value != null) return `${weeklyUsedPercent.value}%`;
  return vm.weeklyUsedCount != null ? formatNumber(vm.weeklyUsedCount) : "--";
});

const weeklyRemainDisplay = computed(() => {
  const vm = query.vm.value;
  if (!vm) return "--";
  if (weeklyRemainPercent.value != null) return `${weeklyRemainPercent.value}%`;
  return vm.weeklyRemainingCount != null ? formatNumber(vm.weeklyRemainingCount) : "--";
});

const weeklyCountdown = computed(() => {
  const vm = query.vm.value;
  return formatCountdown(vm?.weeklyResetTimestamp ?? null, now.value);
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

    <Transition name="panel-fade">
      <StatusBanner
        v-if="query.hasResult.value"
        :loading="query.loading.value"
        :status-label="query.statusLabel.value"
        :time-window="timeWindow"
        :ok="isOk"
      />
    </Transition>

    <Transition name="panel-fade">
      <UsageSummarySection
        v-if="query.hasResult.value && query.vm.value"
        :current-used-percent="currentUsedPercent"
        :current-remain-display="currentRemainDisplay"
        :current-used-display="currentUsedDisplay"
        :current-countdown="currentCountdown"
        :has-weekly="hasWeekly"
        :weekly-used-percent="weeklyUsedPercent"
        :weekly-remain-display="weeklyRemainDisplay"
        :weekly-used-display="weeklyUsedDisplay"
        :weekly-countdown="weeklyCountdown"
      />
    </Transition>

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
