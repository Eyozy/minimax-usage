<script setup lang="ts">
const props = defineProps<{
  currentUsedPercent: number | null;
  currentRemainDisplay: string;
  currentUsedDisplay: string;
  currentCountdown: string;
  hasWeekly: boolean;
  weeklyUsedPercent: number | null;
  weeklyRemainDisplay: string;
  weeklyUsedDisplay: string;
  weeklyCountdown: string;
}>();

const getUsageColor = (val: number | null) => {
  if (val == null) return undefined;
  if (val >= 90) return "#dc2626";
  if (val >= 70) return "#d97706";
  return undefined;
};

const currentUsedColor = computed(() => getUsageColor(props.currentUsedPercent));
const weeklyUsedColor = computed(() => getUsageColor(props.weeklyUsedPercent));
</script>

<template>
  <section class="quotas-dual-grid" :class="{ 'single-col': !hasWeekly }">
    <!-- 卡片 1：当前 5 小时配额 -->
    <article class="surface-card quota-card">
      <div class="card-top-content">
        <div class="card-top-row">
          <h2 class="card-title">当前 5 小时配额</h2>
          <span class="reset-badge">
            <svg class="reset-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{{ currentCountdown && currentCountdown !== '-' ? `${currentCountdown} 重置` : '窗口重置' }}</span>
          </span>
        </div>
        <p class="card-desc">覆盖文本对话、图像生成与语音合成等常规模型</p>

        <div class="progress-wrapper">
          <UsageProgress
            embedded
            label="当前 5 小时使用进度"
            :value="currentUsedPercent"
          />
        </div>
      </div>

      <div class="card-bottom-content">
        <div class="card-divider" />
        <div class="metrics-row">
          <div class="metric-col primary">
            <span class="metric-label">当前剩余</span>
            <span class="metric-value">{{ currentRemainDisplay }}</span>
          </div>
          <div class="metric-col">
            <span class="metric-label">已消耗</span>
            <span class="metric-value metric-used" :style="{ color: currentUsedColor }">{{ currentUsedDisplay }}</span>
          </div>
        </div>
      </div>
    </article>

    <!-- 卡片 2：本周累计配额 (仅在拥有周度额度时显示) -->
    <article v-if="hasWeekly" class="surface-card quota-card">
      <div class="card-top-content">
        <div class="card-top-row">
          <h2 class="card-title">本周累计配额</h2>
          <span class="reset-badge">
            <svg class="reset-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{{ weeklyCountdown && weeklyCountdown !== '-' ? `${weeklyCountdown} 重置` : '本周重置' }}</span>
          </span>
        </div>
        <p class="card-desc">全模型周度累计额度（包含 H3 视频模型）</p>

        <div class="progress-wrapper">
          <UsageProgress
            embedded
            label="本周使用进度"
            :value="weeklyUsedPercent"
          />
        </div>
      </div>

      <div class="card-bottom-content">
        <div class="card-divider" />
        <div class="metrics-row">
          <div class="metric-col primary">
            <span class="metric-label">本周剩余</span>
            <span class="metric-value">{{ weeklyRemainDisplay }}</span>
          </div>
          <div class="metric-col">
            <span class="metric-label">本周已用</span>
            <span class="metric-value metric-used" :style="{ color: weeklyUsedColor }">{{ weeklyUsedDisplay }}</span>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.quotas-dual-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.quotas-dual-grid.single-col {
  grid-template-columns: 1fr;
}

@media (max-width: 720px) {
  .quotas-dual-grid {
    grid-template-columns: 1fr;
  }
}

.quota-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  border-radius: var(--radius-card);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--motion-base), box-shadow var(--motion-base);
}

.quota-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 6px;
}

.card-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.reset-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border-muted);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
  flex-shrink: 0;
}

.reset-icon {
  width: 12px;
  height: 12px;
  color: var(--color-text-muted);
}

.card-desc {
  margin: 0 0 16px;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.progress-wrapper {
  margin-bottom: 4px;
}

.card-divider {
  height: 1px;
  border-top: 1px dashed var(--color-border);
  margin-bottom: 14px;
}

.metrics-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}

.metric-value {
  font-family: var(--font-mono);
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
}

.metric-used {
  color: var(--color-text-secondary);
  transition: color var(--motion-base);
}
</style>
