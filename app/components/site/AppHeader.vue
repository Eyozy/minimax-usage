<template>
  <header class="header">
    <div class="page-shell header-inner">
      <NuxtLink class="brand focus-ring" to="/">
        <BrandMark />
        <span class="brand-text">MiniMax Token Plan 用量查询</span>
      </NuxtLink>
      <button class="hamburger focus-ring" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen" aria-label="切换菜单">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="nav" :class="{ open: menuOpen }" aria-label="主导航">
        <NuxtLink class="nav-link focus-ring" to="/" @click="menuOpen = false">首页</NuxtLink>
        <NuxtLink class="nav-link focus-ring" to="/usage" @click="menuOpen = false">查询</NuxtLink>
        <NuxtLink class="nav-link focus-ring" to="/help" @click="menuOpen = false">帮助</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.84);
  border-bottom: 1px solid rgba(208, 215, 222, 0.7);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 72px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text);
  font-weight: 800;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-text);
  border-radius: 1px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav {
  display: flex;
  gap: var(--space-2);
}

.nav-link {
  padding: 0.625rem 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 600;
  position: relative;
}

.nav-link.router-link-active {
  color: var(--color-text);
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0.25rem;
  left: 0.9rem;
  right: 0.9rem;
  height: 2px;
  background: var(--color-primary);
  border-radius: 1px;
}

.nav-link:hover {
  color: var(--color-text);
}

@media (max-width: 640px) {
  .hamburger {
    display: flex;
  }

  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    padding: var(--space-2) 0;
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid var(--color-border-muted);
  }

  .nav.open {
    display: flex;
  }

  .nav-link {
    padding: var(--space-3) var(--space-4);
  }

  .nav-link.router-link-active::after {
    display: none;
  }
}
</style>
