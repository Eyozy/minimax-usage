<script setup lang="ts">
const props = defineProps<{
  models: Array<{
    name: string;
    timeWindow: string;
    usedCount: number;
    remainingCount: number;
  }>;
}>();
</script>

<template>
  <section class="surface-card models-card" aria-labelledby="models-title">
    <div class="models-header">
      <div>
        <p class="section-eyebrow">模型明细</p>
        <h2 id="models-title">模型用量明细</h2>
      </div>
      <span class="models-badge">{{ models.length }} 个可用模型</span>
    </div>

    <div v-if="!models.length" class="empty-state">
      <p>提交 API Key 后，这里会展示各模型的已用与剩余调用次数。</p>
      <p class="empty-hint">
        还没有 API Key？
        <a href="https://platform.minimaxi.com/" target="_blank" rel="noopener noreferrer">前往 MiniMax 开放平台获取</a>
      </p>
    </div>

    <template v-else>
      <div class="column-head desktop-only" aria-hidden="true">
        <span>模型名称</span>
        <span>时间窗口</span>
        <span>已使用</span>
        <span>剩余</span>
      </div>
      <ul class="models-list desktop-only">
        <ModelRow v-for="model in models" :key="model.name" :model="model" />
      </ul>
      <ul class="models-list mobile-only">
        <ModelCard v-for="model in models" :key="model.name" :model="model" />
      </ul>
    </template>
  </section>
</template>

<style scoped>
.models-card {
  overflow: hidden;
}

.models-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5);
  border-bottom: 1px solid var(--color-border-muted);
}

.models-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.models-badge {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: var(--color-brand-soft);
  color: var(--color-brand);
  font-size: 0.8rem;
  font-weight: 700;
}

.column-head {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(120px, 0.9fr) minmax(96px, 0.7fr) minmax(96px, 0.7fr);
  gap: var(--space-4);
  padding: var(--space-3) var(--space-5);
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: rgba(248, 250, 252, 0.9);
  border-bottom: 1px solid var(--color-border-muted);
}

.column-head span:nth-child(3),
.column-head span:nth-child(4) {
  text-align: right;
}

.models-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.empty-state {
  padding: var(--space-8);
  text-align: center;
  color: var(--color-text-secondary);
}

.empty-hint {
  color: var(--color-text-muted);
}

.empty-hint a {
  color: var(--color-primary);
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
  }
}
</style>
