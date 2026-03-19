<template>
  <div class="layout-root">
    <AppHeader />
    <main class="page-shell layout-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout-root {
  min-height: 100vh;
  padding-bottom: var(--space-10);
}

.layout-main {
  padding-top: var(--space-8);
}

@media (max-width: 768px) {
  .layout-main {
    padding-top: var(--space-6);
  }
}
</style>
