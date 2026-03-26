<script setup lang="ts">
import { formatNumber } from "../../utils/api";

defineProps<{
  model: {
    name: string;
    timeWindow: string;
    usedCount: number;
    remainingCount: number;
  };
}>();

</script>

<template>
  <li class="model-card">
    <div class="model-head">
      <strong>{{ model.name }}</strong>
      <span>{{ model.timeWindow || "当前窗口" }}</span>
    </div>
    <div class="metric-line">
      <span class="metric-key">已使用</span>
      <span class="metric-value">{{ formatNumber(model.usedCount) }}</span>
    </div>
    <div class="metric-line remaining">
      <span class="metric-key">剩余</span>
      <span class="metric-value">{{ formatNumber(model.remainingCount) }}</span>
    </div>
  </li>
</template>

<style scoped>
.model-card {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.model-head {
  display: grid;
  gap: var(--space-2);
}

.model-head strong {
  overflow-wrap: anywhere;
  line-height: 1.45;
}

.model-head span {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.metric-line {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(4.75rem, auto);
  align-items: center;
  gap: var(--space-4);
  padding: 0.65rem 0.8rem;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
  font-size: 0.9375rem;
}

.metric-key {
  color: var(--color-text-secondary);
  font-weight: 700;
}

.metric-value {
  justify-self: end;
  min-width: 4.75rem;
  font-family: var(--font-mono);
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.remaining {
  color: var(--color-success);
}
</style>
