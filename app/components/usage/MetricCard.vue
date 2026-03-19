<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  tone?: "default" | "primary";
}>();
</script>

<template>
  <article class="metric-card" :class="tone === 'primary' ? 'primary' : ''">
    <div class="metric-label">{{ label }}</div>
    <div class="metric-value">{{ value }}</div>
  </article>
</template>

<style scoped>
.metric-card {
  display: grid;
  gap: var(--space-2);
  min-height: 108px;
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.96);
}

.metric-label {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.metric-value {
  font-family: var(--font-mono);
  font-size: clamp(1.05rem, 3vw, 1.5rem);
  font-weight: 700;
}

.primary {
  background: var(--color-primary);
  border-color: transparent;
  color: #fff;
}

.primary .metric-label {
  color: rgba(255, 255, 255, 0.88);
}

@media (max-width: 768px) {
  .metric-card {
    min-height: 92px;
    padding: var(--space-4);
  }
}
</style>
