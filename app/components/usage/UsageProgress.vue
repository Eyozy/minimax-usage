<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: number | null | undefined;
}>();

const safeValue = computed(() => Math.min(props.value ?? 0, 100));
const textValue = computed(() => `${(props.value ?? 0).toFixed(1)}%`);
</script>

<template>
  <section class="surface-card progress-card">
    <div class="progress-header">
      <span>{{ label }}</span>
      <strong>{{ textValue }}</strong>
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
        :style="{ transform: `scaleX(${safeValue / 100})` }"
      />
    </div>
  </section>
</template>

<style scoped>
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
  color: var(--color-primary);
  font-family: var(--font-mono);
}

.progress-track {
  overflow: hidden;
  height: 0.75rem;
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
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
