<script setup lang="ts">
defineProps<{
  title: string;
  body: string[];
}>();
</script>

<template>
  <section class="help-section surface-card">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="item in body" :key="item">{{ item }}</li>
    </ul>
  </section>
</template>

<style scoped>
.help-section {
  padding: var(--space-5);
}

.help-section h2 {
  margin: 0 0 var(--space-3);
  font-size: 1.1rem;
}

.help-section ul {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
}
</style>
