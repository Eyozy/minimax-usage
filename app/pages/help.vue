<script setup lang="ts">
useSeoMeta({
  title: "帮助 | MiniMax M Plan",
  description: "MiniMax M Plan 订阅计划额度查询工具的 API Key 获取、共享额度说明、字段解释与隐私声明。",
});

const sections = [
  {
    title: "API Key 获取",
    body: [
      "登录 MiniMax 开放平台控制台，在套餐详情中复制订阅 Key。",
      "官方客户端 MiniMax Code 登录直接使用。Claude Code 或 Cursor 等外部工具需要填写该 Key。",
      "订阅 Key 与按量计费 Key 完全独立，请勿混用。",
    ],
  },
  {
    title: "共享额度机制",
    body: [
      "所有支持模型共用同一份调用额度，不代表各模型拥有独立额度。",
      "官方按通用池统一扣减，接口不提供单个模型的细分调用数据。",
      "基础 Go 档位支持文本和多模态，不支持视频。Explore 和 Build 档位额外支持 H3 视频模型。",
    ],
  },
  {
    title: "双窗口刷新规则",
    body: [
      "文本等非视频模型按 5 小时滚动刷新，到期自动恢复满额。",
      "视频模型按 7 天自然周刷新。",
      "两个窗口独立计算，到期重置，未用完额度不结转。",
    ],
  },
  {
    title: "字段解释",
    body: [
      "当前剩余：5 小时周期内剩余的配额百分比。",
      "已消耗：5 小时周期内已使用的配额比例。",
      "本周用量：当前自然周内的累计配额消耗与剩余百分比。",
      "窗口重置：当前周期结束倒计时，结束后额度立即恢复。",
    ],
  },
  {
    title: "额度用尽处理",
    body: [
      "可等待时间窗口到期自动恢复，或在控制台购买积分包补充。",
      "调用时优先消耗套餐额度，超出部分自动从积分包扣除。",
    ],
  },
  {
    title: "常见问题",
    body: [
      "提示 401 需检查服务区域，国内 Key 请直连国内服务并关闭外部代理。",
      "额度充足却被限流通常是短时间内并发过高，稍后重试即可。",
    ],
  },
  {
    title: "隐私说明",
    body: [
      "Key 仅保存在当前浏览器会话 (Session) 中直连查询，关闭标签页即自动销毁。",
      "纯本地工具，不向任何第三方服务器上传或留存您的凭证。",
    ],
  },
];
</script>

<template>
  <div class="help-page">
    <section class="help-hero">
      <h1 class="page-title">使用帮助</h1>
      <p class="page-lead">API Key 获取、共享额度说明、字段解释与隐私声明。</p>
    </section>

    <div class="help-grid">
      <HelpSection v-for="section in sections" :key="section.title" :title="section.title" :body="section.body" />
    </div>

    <section class="feedback-card">
      <div class="feedback-copy">
        <p class="feedback-eyebrow">反馈建议</p>
        <h2 class="feedback-title">遇到问题或有建议，欢迎前往 GitHub 提 Issue</h2>
        <p class="feedback-text">我们持续跟进 MiniMax 官方 API 变动与 M Plan 功能更新。</p>
      </div>

      <a
        class="feedback-link focus-ring"
        href="https://github.com/Eyozy/minimax-usage/issues"
        target="_blank"
        rel="noreferrer"
        aria-label="前往 GitHub 提交 Issue"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.86 10.911c.575.106.784-.25.784-.556 0-.274-.01-1-.016-1.962-3.197.695-3.872-1.541-3.872-1.541-.523-1.328-1.277-1.681-1.277-1.681-1.044-.714.079-.699.079-.699 1.154.08 1.76 1.185 1.76 1.185 1.026 1.758 2.692 1.25 3.348.956.104-.743.402-1.25.731-1.538-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.449-2.282 1.184-3.086-.119-.29-.513-1.458.113-3.04 0 0 .965-.309 3.162 1.179a10.93 10.93 0 0 1 5.758 0c2.195-1.488 3.159-1.179 3.159-1.179.628 1.582.234 2.75.115 3.04.738.804 1.182 1.83 1.182 3.086 0 4.417-2.689 5.388-5.25 5.672.413.356.781 1.06.781 2.137 0 1.543-.014 2.787-.014 3.166 0 .308.206.668.79.555A11.503 11.503 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z"
          />
        </svg>
        <span>前往 GitHub 提 Issue</span>
      </a>
    </section>
  </div>
</template>

<style scoped>
.help-page {
  display: grid;
  gap: var(--space-8);
}

.help-hero {
  display: grid;
  gap: var(--space-4);
}

.help-grid {
  display: grid;
  gap: var(--space-4);
}

.feedback-card {
  display: grid;
  gap: var(--space-5);
  padding: clamp(1.25rem, 2vw, 1.75rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card, 12px);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.feedback-copy {
  display: grid;
  gap: var(--space-3);
}

.feedback-eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.feedback-title {
  margin: 0;
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  line-height: 1.3;
}

.feedback-text {
  margin: 0;
  color: var(--color-text-secondary);
}

.feedback-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: fit-content;
  padding: 0.65rem 1.15rem;
  border-radius: var(--radius-control, 8px);
  background: var(--color-text);
  color: white;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feedback-link svg {
  width: 1rem;
  height: 1rem;
  flex: none;
}

.feedback-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px -20px rgba(15, 23, 42, 0.8);
}
</style>
