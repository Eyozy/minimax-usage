<script setup lang="ts">
const items = [
  {
    title: "移动端适配",
    body: "手机端自动切换卡片布局，信息清晰不堆叠。",
  },
  {
    title: "模型级明细",
    body: "快速定位各模型已使用量与剩余额度。",
  },
  {
    title: "原始响应",
    body: "直接展开服务端返回数据，核对字段与状态。",
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
  font-size: 1.05rem;
}

.feature-card p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
