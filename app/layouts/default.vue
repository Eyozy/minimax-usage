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
  display: flex;
  flex-direction: column;
}

.layout-main {
  flex: 1 0 auto;
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
}

@media (max-width: 768px) {
  .layout-main {
    padding-top: var(--space-6);
    padding-bottom: var(--space-6);
  }
}
</style>
