<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    value: number | null | undefined;
    embedded?: boolean;
  }>(),
  {
    embedded: false,
  }
);

const safeValue = computed(() => Math.max(0, Math.min(props.value ?? 0, 100)));
const textValue = computed(() => `${(props.value ?? 0).toFixed(1)}%`);

// 动态语义色计算: < 70% 科技蓝, 70%~90% 琥珀橙, >= 90% 警戒红
const progressColor = computed(() => {
  const val = props.value ?? 0;
  if (val >= 90) return "#dc2626";
  if (val >= 70) return "#d97706";
  return "#2563eb";
});
</script>

<template>
  <div v-if="embedded" class="embedded-progress">
    <div
      class="progress-track"
      role="progressbar"
      :aria-label="label"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="safeValue"
      :aria-valuetext="textValue"
    >
      <div
        class="progress-fill"
        :style="{ transform: `scaleX(${safeValue / 100})`, backgroundColor: progressColor }"
      />
    </div>
  </div>
  <section v-else class="surface-card progress-card">
    <div class="progress-header">
      <span>{{ label }}</span>
      <strong :style="{ color: progressColor }">{{ textValue }}</strong>
    </div>
    <div
      class="progress-track"
      role="progressbar"
      :aria-label="label"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="safeValue"
      :aria-valuetext="textValue"
    >
      <div
        class="progress-fill"
        :style="{ transform: `scaleX(${safeValue / 100})`, backgroundColor: progressColor }"
      />
    </div>
  </section>
</template>

<style scoped>
.embedded-progress {
  width: 100%;
}

.progress-card {
  padding: var(--space-5);
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  font-weight: 700;
}

.progress-header strong {
  font-family: var(--font-mono);
}

.progress-track {
  overflow: hidden;
  height: 8px;
  border-radius: 999px;
  background: var(--color-border-muted);
}

.progress-fill {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--color-primary);
  transform-origin: left center;
  will-change: transform;
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease;
}
</style>
