<script setup lang="ts">
useSeoMeta({
  title: "MiniMax M Plan",
  description: "MiniMax M Plan 专属查询工具，实时查看 5 小时与周度共享调用额度、窗口重置倒计时与模型支持范围。",
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
