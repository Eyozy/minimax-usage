<script setup lang="ts">
defineProps<{
  raw: unknown;
  expanded: boolean;
}>();

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <section class="surface-card raw-panel">
    <button
      class="raw-toggle focus-ring"
      type="button"
      :aria-expanded="expanded ? 'true' : 'false'"
      aria-controls="raw-response-content"
      @click="$emit('toggle')"
    >
      <span>原始返回数据</span>
      <span class="toggle-right">
        <span>{{ expanded ? "收起" : "展开" }}</span>
        <svg class="toggle-chevron" :class="{ rotated: expanded }" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </span>
    </button>
    <div v-show="expanded" id="raw-response-content" class="raw-content">
      <pre>{{ JSON.stringify(raw ?? {}, null, 2) }}</pre>
    </div>
  </section>
</template>

<style scoped>
.raw-panel {
  overflow: hidden;
}

.raw-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border: 0;
  background: transparent;
  font-weight: 700;
  text-align: left;
  transition: background-color 150ms ease;
}

.raw-toggle:hover {
  background: var(--color-surface-muted);
}

.toggle-right {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 600;
}

.toggle-chevron {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.toggle-chevron.rotated {
  transform: rotate(180deg);
}

.raw-content {
  border-top: 1px solid var(--color-border-muted);
}

.raw-content pre {
  margin: 0;
  overflow: auto;
  padding: var(--space-5);
  background: #f8fafc;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
}
</style>
