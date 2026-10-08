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

const showKey = ref(false);
</script>

<template>
  <section class="surface-card form-card">
    <form class="form-grid" :aria-busy="loading ? 'true' : 'false'" @submit.prevent="$emit('submit')">
      <div class="field-group">
        <label class="field-label" for="api-key-input">MiniMax API Key</label>
        <div class="controls-row">
          <div class="input-wrapper">
            <input
              id="api-key-input"
              class="field-input"
              :value="modelValue"
              :type="showKey ? 'text' : 'password'"
              placeholder="输入 MiniMax API Key（如 sk-...）"
              autocomplete="off"
              spellcheck="false"
              aria-describedby="api-key-hint"
              required
              :disabled="loading"
              @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
            <button
              v-if="modelValue"
              type="button"
              class="toggle-visibility focus-ring"
              :aria-label="showKey ? '隐藏 API Key' : '显示 API Key'"
              :title="showKey ? '隐藏 API Key' : '显示 API Key'"
              @click="showKey = !showKey"
            >
              <svg v-if="!showKey" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
          <button class="button-primary focus-ring action-button primary-action" type="submit" :disabled="loading">
            <svg v-if="loading" class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
            </svg>
            <span>{{ loading ? "查询中..." : "查询用量" }}</span>
          </button>
          <button class="button-secondary focus-ring action-button" type="button" :disabled="loading || !modelValue.trim()" @click="emit('refresh')">
            刷新
          </button>
        </div>
        <p id="api-key-hint" class="field-hint">
          仅在当前浏览器会话 (Session) 中直连官方接口查询，无服务端数据库存储，关闭标签页即自动销毁。
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

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.field-input {
  width: 100%;
  height: var(--control-height, 46px);
  padding: 0 var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: #fff;
  transition: border-color 150ms ease;
}

.input-wrapper .field-input {
  padding-right: 2.75rem;
}

.field-input:focus,
.field-input:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: none;
}

.field-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toggle-visibility {
  position: absolute;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: color 150ms ease;
}

.toggle-visibility:hover {
  color: var(--color-text);
}

.toggle-visibility svg {
  width: 1.125rem;
  height: 1.125rem;
}

.field-hint {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.action-button {
  min-width: 6.5rem;
  height: var(--control-height, 46px);
  padding-inline: var(--space-4);
  align-self: stretch;
  border-radius: var(--radius-lg);
}

.primary-action {
  min-width: 8rem;
}

.spinner-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.375rem;
  animation: form-spin 600ms linear infinite;
}

@keyframes form-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
