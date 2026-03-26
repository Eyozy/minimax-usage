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
  <li class="model-row">
    <span class="model-name">{{ model.name }}</span>
    <span class="model-window">{{ model.timeWindow || "当前窗口" }}</span>
    <span class="model-stat used">{{ formatNumber(model.usedCount) }}</span>
    <span class="model-stat remaining">{{ formatNumber(model.remainingCount) }}</span>
  </li>
</template>

<style scoped>
.model-row {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(120px, 0.9fr) minmax(96px, 0.7fr) minmax(96px, 0.7fr);
  gap: var(--space-4);
  align-items: center;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border-muted);
  transition: background-color 150ms ease;
}

.model-row:hover {
  background: var(--color-surface-muted);
}

.model-name {
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 700;
}

.model-window {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

.model-stat {
  text-align: right;
  justify-self: end;
  min-width: 4rem;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
}

.used {
  color: var(--color-text-secondary);
}

.remaining {
  color: var(--color-success);
}

.model-row:last-child {
  border-bottom: 0;
}
</style>
