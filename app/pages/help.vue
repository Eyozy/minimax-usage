<script setup lang="ts">
useSeoMeta({
  title: "帮助 | MiniMax Token Plan 用量查询",
  description: "MiniMax Token Plan 查询工具的 API Key 获取、字段说明、常见问题与隐私声明。",
});

const sections = [
  {
    title: "API Key 获取",
    body: [
      "本工具仅支持查询 MiniMax Token Plan 的用量，请确认你已开通 Token Plan。",
      "登录 MiniMax 开放平台，前往「账户管理 / Token Plan」页面获取专属 API Key。",
      "Token Plan API Key 与按量计费 API Key 不可互换，请勿混用。",
      "Key 仅用于本次浏览器查询，不留存，不创建账号。",
    ],
  },
  {
    title: "字段解释",
    body: [
      "已使用：当前周期内已消耗的调用次数。",
      "剩余：当前周期内剩余可用的调用次数。",
      "重置时间：M2.7 基于 5 小时滚动窗口重置；语音、图像等其他模型每日重置。",
      "模型明细：各模型的调用次数明细，仅展示有配额的模型。",
    ],
  },
  {
    title: "常见问题",
    body: [
      "API Key 无效？请确认凭证完整复制，前后无多余空格。",
      "请求超时？先重试，再检查网络与接口可达性。",
      "数据显示异常？展开接口原始响应核对真实字段。",
    ],
  },
  {
    title: "隐私说明",
    body: [
      "API Key 仅保存在当前浏览器会话，关闭后不复用。",
      "网站不提供登录、协作、历史记录或长期存储。",
      "如需更严格的安全策略，建议部署到自有环境中使用。",
    ],
  },
];
</script>

<template>
  <div class="help-page">
    <section class="help-hero">
      <h1 class="page-title">使用帮助</h1>
      <p class="page-lead">API Key 获取、字段说明、常见问题与隐私声明。</p>
    </section>

    <div class="help-grid">
      <HelpSection v-for="section in sections" :key="section.title" :title="section.title" :body="section.body" />
    </div>

    <section class="feedback-card">
      <div class="feedback-copy">
        <p class="feedback-eyebrow">反馈问题</p>
        <h2 class="feedback-title">遇到 Bug 或想提建议，直接去 GitHub 提 Issue</h2>
        <p class="feedback-text">如果你发现查询异常、页面显示问题，或者希望补充功能，可以直接到仓库提交 Issue。</p>
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
        <span>反馈问题 / 提 Issue</span>
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
  border-radius: 1.5rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.96)),
    radial-gradient(circle at top right, rgba(226, 22, 126, 0.08), transparent 38%);
  box-shadow: 0 20px 50px -36px rgba(15, 23, 42, 0.45);
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
  padding: 0.85rem 1.15rem;
  border-radius: 999px;
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
