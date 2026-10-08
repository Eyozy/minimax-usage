<script setup lang="ts">
const props = defineProps<{
  models: Array<{
    name: string;
  }>;
}>();

const baseModelNames = [
  "MiniMax-M3.1-Flash-Preview",
  "MiniMax-M3",
  "MiniMax-M2.7-highspeed",
  "MiniMax-M2.7",
  "Speech-2.8-HD",
  "Speech-2.8-Turbo",
  "image-01",
  "image-01-live",
];

const modelNames = computed(() => {
  const returnedNames = props.models
    .map((item) => item.name)
    .filter((name) => name && !name.toLowerCase().includes("general"));
  return returnedNames.length > 0 ? returnedNames : baseModelNames;
});
</script>

<template>
  <section class="surface-card models-card" aria-labelledby="models-title">
    <div class="models-header">
      <div>
        <p class="section-eyebrow">支持范围</p>
        <h2 id="models-title">该订阅计划支持的模型</h2>
      </div>
      <span class="models-badge">统一额度池</span>
    </div>

    <div class="models-info">
      <p class="models-tip">
        所有支持模型<strong>共用同一份调用额度</strong>。共享额度状态以页面上方总览为准。
      </p>
    </div>

    <div v-if="!models.length" class="empty-state">
      <p>查询后，该订阅计划支持的模型范围会在此确认。</p>
      <p class="empty-hint">
        没有 API Key？
        <a href="https://platform.minimax.cn/console/plan" target="_blank" rel="noopener noreferrer">前往 MiniMax 控制台获取</a>
      </p>
    </div>

    <ul v-else class="models-list" role="list">
      <li
        v-for="name in modelNames"
        :key="name"
        class="model-pill"
      >
        <span class="pill-name">{{ name }}</span>
      </li>
    </ul>

    <div class="models-footnote">
      <span class="footnote-tag">进阶模型说明</span>
      <span class="footnote-text">
        视频模型（MiniMax-H3）仅在 <strong>Explore / Build</strong> 档位可用，且仅消耗周累计配额；基础 Go 档位不包含视频生成权限。
      </span>
    </div>
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
  font-size: clamp(1rem, 2vw, 1.2rem);
}

.models-badge {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: var(--color-brand-soft);
  color: var(--color-brand);
  font-size: 0.8rem;
  font-weight: 700;
}

.models-info {
  padding: var(--space-3) var(--space-5);
  background: rgba(248, 250, 252, 0.7);
  border-bottom: 1px solid var(--color-border-muted);
}

.models-tip {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.models-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-5);
  list-style: none;
}

.model-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-muted);
  background: #ffffff;
  transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
}

.model-pill:hover {
  border-color: var(--color-primary);
  background: var(--color-surface-muted);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.pill-name {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.875rem;
  line-height: 1.4;
  word-break: break-word;
}

.models-footnote {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  background: rgba(248, 250, 252, 0.8);
  border-top: 1px solid var(--color-border-muted);
}

.footnote-tag {
  flex: none;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: #ffffff;
  border: 1px solid var(--color-border-muted);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.footnote-text {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.footnote-text strong {
  color: var(--color-text-secondary);
  font-weight: 600;
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
</style>
