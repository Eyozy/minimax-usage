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
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.9;
}

.dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 999px;
  flex-shrink: 0;
}

.warning .dot {
  background: var(--color-warning);
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.success {
  background: var(--color-success-soft);
  color: var(--color-success);
  border-color: rgba(21, 128, 61, 0.24);
}
.success .status-time {
  color: #14532d;
}

.success .dot {
  background: var(--color-success);
}

.error {
  background: var(--color-error-soft);
  color: var(--color-error);
  border-color: rgba(180, 35, 24, 0.24);
}
.error .status-time {
  color: #991b1b;
}

.error .dot {
  background: var(--color-error);
}

.warning {
  background: var(--color-warning-soft);
  color: #92400e;
  border-color: rgba(180, 83, 9, 0.28);
}
.warning .status-time {
  color: #78350f;
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
