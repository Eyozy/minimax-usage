<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  loading: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  submit: [];
  refresh: [];
}>();

</script>

<template>
  <section class="surface-card form-card">
    <form class="form-grid" :aria-busy="loading ? 'true' : 'false'" @submit.prevent="$emit('submit')">
      <div class="field-group">
        <label class="field-label" for="api-key-input">Token Plan API Key</label>
        <div class="controls-row">
          <input
            id="api-key-input"
            class="field-input focus-ring"
            :value="modelValue"
            type="password"
            placeholder="Token Plan API Key"
            autocomplete="off"
            spellcheck="false"
            aria-describedby="api-key-hint"
            required
            :disabled="loading"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          />
          <button class="button-primary focus-ring action-button primary-action" type="submit" :disabled="loading">查询用量</button>
          <button class="button-secondary focus-ring action-button" type="button" :disabled="loading || !modelValue.trim()" @click="emit('refresh')">
            刷新
          </button>
        </div>
        <p id="api-key-hint" class="field-hint">
          API Key 仅用于本次查询，关闭页面即清除。
        </p>
      </div>
    </form>
  </section>
</template>

<style scoped>
.form-card {
  padding: var(--space-5);
}

.form-grid {
  display: block;
}

.field-group {
  display: grid;
  gap: var(--space-2);
}

.controls-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: var(--space-3);
  align-items: stretch;
}

.field-label {
  font-weight: 700;
}

.field-input {
  width: 100%;
  height: 56px;
  padding: 0 var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: #fff;
  transition: border-color 150ms ease;
}

.field-input:focus-visible {
  border-color: var(--color-primary);
}

.field-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.field-hint {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.action-button {
  min-width: 7rem;
  height: 56px;
  padding-inline: var(--space-5);
  align-self: stretch;
  border-radius: var(--radius-lg);
}

.primary-action {
  min-width: 8.5rem;
}

@media (max-width: 768px) {
  .controls-row {
    grid-template-columns: 1fr;
  }

  .action-button {
    width: 100%;
  }
}
</style>
