<template>
  <section class="hero surface-card">
    <div class="hero-copy">
      <div class="hero-header">
        <h1 class="page-title">MiniMax M Plan 用量查询</h1>
        <p class="page-lead">
          专为 M Plan 订阅设计，实时查询 5 小时与周度共享调用额度、窗口重置倒计时及支持模型范围。
        </p>
      </div>
      <ul class="hero-points">
        <li>当前 5 小时窗口与本周共享调用额度双维度对比</li>
        <li>支持模型范围共用统一额度池，无需拆分计算</li>
        <li>直连官方接口解析原始响应，官方返回结果真实透明</li>
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
          <p>即时查看 5 小时共享调用额度剩余比例与滚动重置倒计时。</p>
        </article>
        <article class="panel-item">
          <span class="panel-kicker">周级视角</span>
          <strong>本周额度</strong>
          <p>查看本周累计消耗与剩余状态，掌握整体用量节奏。</p>
        </article>
        <article class="panel-item">
          <span class="panel-kicker">额度机制</span>
          <strong>全模型共享池</strong>
          <p>支持模型范围共用统一额度，官方已不再拆分单模型明细。</p>
        </article>
      </div>
      <div class="panel-note">
        <span class="panel-note-label">隐私边界</span>
        <p>会话级直连 MiniMax 官方，无外部数据库，关闭标签页即自动销毁。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: clamp(1.5rem, 3vw, 2.5rem);
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.95fr);
  gap: var(--space-6);
  align-items: stretch;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-4);
}

.hero-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.hero-copy .page-title {
  font-size: clamp(2rem, 3.6vw, 3rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.page-lead {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: clamp(0.95rem, 1.4vw, 1.05rem);
  line-height: 1.65;
}

.hero-points {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: var(--space-1) 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
}

.hero-points li {
  position: relative;
  padding-left: 1.25rem;
  line-height: 1.65;
  font-size: 0.95rem;
}

.hero-points li::before {
  content: "";
  position: absolute;
  top: 0.65rem;
  left: 0;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: var(--color-primary);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 8rem;
  height: var(--control-height, 46px);
  padding: 0 var(--space-5);
  border-radius: var(--radius-control, 8px);
  font-weight: 700;
  font-size: 1rem;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-5);
  border: 1px solid var(--color-border-muted);
  border-radius: var(--radius-xl);
  background:
    linear-gradient(180deg, rgba(248, 250, 252, 0.94), rgba(255, 255, 255, 0.98));
}

.panel-grid {
  display: grid;
  gap: 0;
}

.panel-item {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-2);
  border-bottom: 1px solid var(--color-border-muted);
}

.panel-item:last-child {
  border-bottom: none;
}

.panel-kicker {
  color: var(--color-text-muted);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.panel-item strong {
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  color: var(--color-text);
}

.panel-item p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  line-height: 1.55;
}

.panel-note {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-brand-soft);
}

.panel-note-label {
  color: var(--color-brand);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.panel-note p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  line-height: 1.55;
}

@media (max-width: 960px) {
  .hero {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: var(--space-4);
    gap: var(--space-5);
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .action-btn {
    width: 100%;
  }
}
</style>
