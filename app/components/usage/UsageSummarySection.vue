<script setup lang="ts">
const props = defineProps<{
  title: string;
  progressLabel: string;
  progressValue: number | null | undefined;
  items: Array<{ label: string; value: string; tone?: "default" | "primary" }>;
}>();
</script>

<template>
  <section class="summary-section">
    <div class="summary-header">
      <p class="section-eyebrow">{{ title }}</p>
    </div>
    <div class="summary-grid">
      <MetricCard
        v-for="item in items"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :tone="item.tone"
      />
    </div>
    <UsageProgress :label="progressLabel" :value="progressValue" />
  </section>
</template>

<style scoped>
.summary-section {
  display: grid;
  gap: var(--space-4);
}

.summary-header {
  margin-top: var(--space-2);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
}

@media (max-width: 960px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
