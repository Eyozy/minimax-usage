<template>
  <section class="hero surface-card">
    <div class="hero-copy">
      <h1 class="page-title">实时查看 MiniMax Token Plan 用量</h1>
      <p class="page-lead">
        输入 Token Plan API Key，实时查看剩余调用次数、已用额度与各模型明细。
      </p>
      <ul class="hero-points">
        <li>当前 5 小时窗口与本周额度双维度对比</li>
        <li>按模型拆分调用次数，快速定位额度消耗来源</li>
        <li>原始响应一键展开，随时核对接口返回数据</li>
      </ul>
      <div class="hero-actions">
        <NuxtLink class="action-btn primary focus-ring" to="/usage">开始查询</NuxtLink>
        <NuxtLink class="action-btn secondary focus-ring" to="/help">使用帮助</NuxtLink>
      </div>
    </div>
    <div class="hero-panel" aria-label="工具摘要">
      <div class="panel-grid">
        <article class="panel-item">
          <span class="panel-kicker">查询范围</span>
          <strong>当前窗口额度</strong>
          <p>即时查看已用与剩余调用次数，以及 5 小时窗口重置倒计时。</p>
        </article>
        <article class="panel-item">
          <span class="panel-kicker">周级视角</span>
          <strong>本周额度</strong>
          <p>查看本周累计消耗与剩余，掌握整体用量节奏。</p>
        </article>
        <article class="panel-item">
          <span class="panel-kicker">拆分查看</span>
          <strong>模型级明细</strong>
          <p>各模型调用次数单独列出，仅展示有配额的模型。</p>
        </article>
      </div>
      <div class="panel-note">
        <span class="panel-note-label">隐私边界</span>
        <p>API Key 仅在本次查询中使用，页面关闭后即失效，不上传不留存。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: clamp(1.5rem, 3vw, 2.5rem);
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.9fr);
  gap: var(--space-6);
  align-items: stretch;
}

.hero-copy {
  display: grid;
  gap: var(--space-4);
}

.hero-points {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
}

.hero-points li {
  position: relative;
  padding-left: 1.1rem;
  line-height: 1.7;
}

.hero-points li::before {
  content: "";
  position: absolute;
  top: 0.72rem;
  left: 0;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 999px;
  background: var(--color-primary);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 8.5rem;
  height: 56px;
  padding: 0 var(--space-5);
  border-radius: var(--radius-lg);
  font-weight: 700;
  transition: transform 150ms ease, background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.action-btn.primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 10px 24px rgba(29, 78, 216, 0.22);
}

.action-btn.primary:hover {
  transform: translateY(-1px);
}

.action-btn.secondary {
  background: #fff;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.action-btn.secondary:hover {
  background: var(--color-surface-muted);
}

.hero-panel {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5);
  border: 1px solid var(--color-border-muted);
  border-radius: var(--radius-xl);
  background:
    linear-gradient(180deg, rgba(248, 250, 252, 0.92), rgba(255, 255, 255, 0.98));
}

.panel-grid {
  display: grid;
  gap: 0;
}

.panel-item {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border-muted);
}

.panel-item:last-child {
  border-bottom: none;
}

.panel-kicker {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.panel-item strong {
  font-size: clamp(0.95rem, 2vw, 1.05rem);
}

.panel-item p,
.panel-note p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.panel-note {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-brand-soft);
}

.panel-note-label {
  color: var(--color-brand);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 960px) {
  .hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero {
    gap: var(--space-5);
  }
}
</style>
