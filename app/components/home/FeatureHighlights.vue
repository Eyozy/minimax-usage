<script setup lang="ts">
const items = [
  {
    title: "安全无留存",
    body: "客户端会话级直连官方，不设外部数据库，敏感凭证绝不留存。",
  },
  {
    title: "双窗口监控",
    body: "5 小时与周度配额双视角查看，重置倒计时实时刷新。",
  },
  {
    title: "官方结果对照",
    body: "直接展开服务端原始响应，随时核对上游字段与配额状态。",
  },
];
</script>

<template>
  <section class="feature-grid">
    <article v-for="item in items" :key="item.title" class="feature-card surface-card">
      <h2>{{ item.title }}</h2>
      <p>{{ item.body }}</p>
    </article>
  </section>
</template>

<style scoped>
.feature-grid {
  margin-top: var(--space-8);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

.feature-card {
  padding: var(--space-5);
}

.feature-card h2 {
  margin: 0 0 var(--space-2);
  font-size: clamp(0.95rem, 2vw, 1.05rem);
}

.feature-card p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

@media (max-width: 960px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
