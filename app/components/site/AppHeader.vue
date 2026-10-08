<template>
  <header class="header">
    <div class="page-shell header-inner">
      <NuxtLink class="brand focus-ring" to="/">
        <BrandMark />
        <span class="brand-text">MiniMax M Plan 用量查询</span>
      </NuxtLink>

      <!-- 桌面端常规导航 -->
      <nav class="desktop-nav" aria-label="桌面端导航">
        <NuxtLink class="nav-link focus-ring" to="/">首页</NuxtLink>
        <NuxtLink class="nav-link focus-ring" to="/usage">查询</NuxtLink>
        <NuxtLink class="nav-link focus-ring" to="/help">帮助</NuxtLink>
      </nav>

      <!-- 移动端汉堡触发器容器 -->
      <div class="mobile-nav-wrapper">
        <button
          class="hamburger focus-ring"
          :class="{ active: menuOpen }"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="mobile-nav-panel"
          aria-label="切换导航菜单"
          @click="menuOpen = !menuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- 右侧浮动气泡面板 (Popover Panel) -->
        <nav
          id="mobile-nav-panel"
          class="nav-popover"
          :class="{ 'is-open': menuOpen }"
          aria-label="移动端快速导航"
        >
          <NuxtLink class="popover-link focus-ring" to="/" @click="menuOpen = false">
            <span class="link-label">首页</span>
            <svg class="link-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 12l4-4-4-4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          <NuxtLink class="popover-link focus-ring" to="/usage" @click="menuOpen = false">
            <span class="link-label">查询</span>
            <svg class="link-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 12l4-4-4-4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          <NuxtLink class="popover-link focus-ring" to="/help" @click="menuOpen = false">
            <span class="link-label">帮助</span>
            <svg class="link-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 12l4-4-4-4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
const route = useRoute();

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && menuOpen.value) {
    menuOpen.value = false;
  }
}

function handleOutsideClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (menuOpen.value && target && !target.closest('.mobile-nav-wrapper')) {
    menuOpen.value = false;
  }
}

watch(() => route.path, () => {
  menuOpen.value = false;
});

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("click", handleOutsideClick);
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(208, 215, 222, 0.7);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 64px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text);
  font-weight: 800;
}

.brand-text {
  font-size: 1rem;
}

/* 桌面端导航 */
.desktop-nav {
  display: flex;
  gap: var(--space-2);
}

.nav-link {
  padding: 0.5rem 0.875rem;
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: var(--radius-md);
  position: relative;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.nav-link.router-link-active {
  color: var(--color-primary);
  font-weight: 700;
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0.25rem;
  left: 0.875rem;
  right: 0.875rem;
  height: 2px;
  background: var(--color-primary);
  border-radius: 1px;
}

.nav-link:hover {
  color: var(--color-text);
}

/* 移动端汉堡及 Popover 布局容器 */
.mobile-nav-wrapper {
  display: none;
  position: relative;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--radius-md);
  transition: background-color 0.15s ease;
}

.hamburger:hover {
  background: var(--color-surface-muted);
}

.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.18s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 精致右侧浮动气泡菜单 (Popover) */
.nav-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 168px;
  padding: 0.375rem;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12),
              0 2px 6px rgba(15, 23, 42, 0.04);
  transform-origin: top right;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.94) translateY(-6px);
  transition: opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.18s ease;
  pointer-events: none;
  z-index: 50;
}

.nav-popover.is-open {
  opacity: 1;
  visibility: visible;
  transform: scale(1) translateY(0);
  pointer-events: auto;
}

.popover-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.75rem;
  border-radius: var(--radius-control);
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 600;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.popover-link:hover,
.popover-link:active {
  background: var(--color-surface-muted);
  color: var(--color-text);
}

.popover-link.router-link-active {
  background: var(--color-brand-soft);
  color: var(--color-brand);
  font-weight: 700;
}

.link-arrow {
  width: 14px;
  height: 14px;
  opacity: 0.4;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.popover-link:hover .link-arrow,
.popover-link.router-link-active .link-arrow {
  opacity: 0.9;
  transform: translateX(2px);
}

@media (max-width: 640px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav-wrapper {
    display: block;
  }
}
</style>
