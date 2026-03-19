<template>
  <footer class="page-shell footer">
    <div class="footer-inner">
      <p class="footer-copy">MiniMax Token Plan 专属查询工具 · API Key 仅用于本次查询，不留存</p>
      <a
        class="footer-link focus-ring"
        href="https://github.com/Eyozy/minimax-usage"
        target="_blank"
        rel="noreferrer"
        aria-label="在 GitHub 查看项目并反馈问题"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.86 10.911c.575.106.784-.25.784-.556 0-.274-.01-1-.016-1.962-3.197.695-3.872-1.541-3.872-1.541-.523-1.328-1.277-1.681-1.277-1.681-1.044-.714.079-.699.079-.699 1.154.08 1.76 1.185 1.76 1.185 1.026 1.758 2.692 1.25 3.348.956.104-.743.402-1.25.731-1.538-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.449-2.282 1.184-3.086-.119-.29-.513-1.458.113-3.04 0 0 .965-.309 3.162 1.179a10.93 10.93 0 0 1 5.758 0c2.195-1.488 3.159-1.179 3.159-1.179.628 1.582.234 2.75.115 3.04.738.804 1.182 1.83 1.182 3.086 0 4.417-2.689 5.388-5.25 5.672.413.356.781 1.06.781 2.137 0 1.543-.014 2.787-.014 3.166 0 .308.206.668.79.555A11.503 11.503 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z"
          />
        </svg>
        <span>GitHub</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--space-10);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border-muted);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.footer-copy {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.9rem;
  border: 1px solid var(--color-border-muted);
  border-radius: 999px;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 700;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.footer-link svg {
  width: 1rem;
  height: 1rem;
  flex: none;
}

.footer-link:hover {
  color: var(--color-text);
  border-color: var(--color-border);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .footer-inner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
