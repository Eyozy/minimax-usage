<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
  statusLabel: string;
  timeWindow: string;
  ok: boolean;
}>();

const toneClass = computed(() => {
  if (props.loading) {
    return "warning";
  }

  return props.ok ? "success" : "error";
});
</script>

<template>
  <div class="status-banner" :class="toneClass" role="status" aria-live="polite" aria-atomic="true">
    <div class="status-copy">
      <span class="dot" aria-hidden="true"></span>
      <span>{{ loading ? "查询中" : statusLabel }}</span>
    </div>
    <span class="status-time">{{ loading ? "正在查询最新用量数据" : timeWindow }}</span>
  </div>
</template>

<style scoped>
.status-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
}

.status-copy {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 700;
}

.status-time {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 999px;
}

.success {
  background: var(--color-success-soft);
  color: var(--color-success);
  border-color: rgba(21, 128, 61, 0.18);
}

.success .dot {
  background: var(--color-success);
}

.error {
  background: var(--color-error-soft);
  color: var(--color-error);
  border-color: rgba(180, 35, 24, 0.18);
}

.error .dot {
  background: var(--color-error);
}

.warning {
  background: var(--color-warning-soft);
  color: var(--color-warning);
  border-color: rgba(180, 83, 9, 0.2);
}

.warning .dot {
  background: var(--color-warning);
}

@media (max-width: 640px) {
  .status-banner {
    align-items: flex-start;
    flex-direction: column;
  }

  .status-time {
    overflow-wrap: anywhere;
  }
}
</style>
