<script setup lang="ts">
useSeoMeta({
  title: "MiniMax Token Plan 用量查询",
  description: "MiniMax Token Plan 专属查询工具，实时查看已使用额度、剩余额度与模型消耗明细。",
});
</script>

<template>
  <div class="home-page">
    <HeroEntry />
    <FeatureHighlights />
  </div>
</template>

<style scoped>
.home-page {
  display: grid;
  gap: var(--space-8);
}
</style>
