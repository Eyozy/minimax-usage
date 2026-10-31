<script setup lang="ts">
const props = defineProps<{
  models: Array<{
    name: string;
  }>;
}>();

type SubscriptionTier = "all" | "go" | "explore_build";

const currentTier = ref<SubscriptionTier>("all");
const isVideoSupported = computed(() => currentTier.value !== "go");
const copiedId = ref<string | null>(null);
let copyTimer: ReturnType<typeof setTimeout> | null = null;

const copyModelId = async (id: string) => {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(id);
      copiedId.value = id;
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        if (copiedId.value === id) {
          copiedId.value = null;
        }
      }, 1500);
    }
  } catch {
    // 复制异常静默回退
  }
};

onBeforeUnmount(() => {
  if (copyTimer) {
    clearTimeout(copyTimer);
  }
});

const languageModels = ["MiniMax-M3.1-Flash", "MiniMax-M3"];
const imageModels = ["image-01", "image-01-live"];
const speechModels = ["speech-2.8-hd", "speech-2.8-turbo"];
const videoModels = ["MiniMax-H3", "MiniMax-H3-Max"];
</script>

<template>
  <section class="surface-card models-card" aria-labelledby="models-title">
    <div class="models-header">
      <div class="models-header-left">
        <h2 id="models-title">支持的模型</h2>
        <p class="models-subtitle">
          所有支持模型<strong>共用同一份调用额度</strong>，具体余量请参考上方配额卡片。
        </p>
      </div>

      <div class="tier-segmented" role="tablist" aria-label="订阅档位筛选">
        <button
          type="button"
          role="tab"
          :aria-selected="currentTier === 'all'"
          :class="['tier-segment-btn', { 'is-active': currentTier === 'all' }]"
          @click="currentTier = 'all'"
        >
          全部
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="currentTier === 'go'"
          :class="['tier-segment-btn', { 'is-active': currentTier === 'go' }]"
          @click="currentTier = 'go'"
        >
          Go
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="currentTier === 'explore_build'"
          :class="['tier-segment-btn', { 'is-active': currentTier === 'explore_build' }]"
          @click="currentTier = 'explore_build'"
        >
          Explore / Build
        </button>
      </div>
    </div>

    <div v-if="!models.length" class="empty-state">
      <p>查询后，支持的模型范围会在此确认。</p>
      <p class="empty-hint">
        没有 API Key？
        <a href="https://platform.minimax.cn/console/plan" target="_blank" rel="noopener noreferrer">前往 MiniMax 控制台获取</a>
      </p>
    </div>

    <div v-else class="models-groups-container">
      <!-- 1. 语言模型 -->
      <div class="model-group">
        <div class="group-header">
          <div class="group-title">语言模型</div>
          <span class="group-rule-tag">共享额度池</span>
        </div>

        <ul class="models-list language-grid" role="list">
          <li
            v-for="id in languageModels"
            :key="id"
            class="model-pill model-pill-item"
          >
            <span class="model-id-text">{{ id }}</span>
            <button
              type="button"
              class="btn-icon-mini"
              :class="{ copied: copiedId === id }"
              :aria-label="copiedId === id ? `已复制 ${id}` : `复制模型名称 ${id}`"
              @click="copyModelId(id)"
            >
              {{ copiedId === id ? "已复制 ✓" : "复制" }}
            </button>
          </li>
        </ul>
      </div>

      <!-- 2. 多模态模型 -->
      <div class="model-group">
        <div class="group-header">
          <div class="group-title">多模态模型</div>
          <span class="group-rule-tag">共享额度池</span>
        </div>

        <div class="multimodal-grid">
          <!-- 图像生成 -->
          <div class="sub-modality-card">
            <div class="sub-modality-header">
              <span>图像生成</span>
            </div>
            <ul class="models-list sub-model-pill-row" role="list">
              <li
                v-for="id in imageModels"
                :key="id"
                class="model-pill model-pill-item"
              >
                <span class="model-id-text">{{ id }}</span>
                <button
                  type="button"
                  class="btn-icon-mini"
                  :class="{ copied: copiedId === id }"
                  :aria-label="copiedId === id ? `已复制 ${id}` : `复制模型名称 ${id}`"
                  @click="copyModelId(id)"
                >
                  {{ copiedId === id ? "已复制 ✓" : "复制" }}
                </button>
              </li>
            </ul>
          </div>

          <!-- 语音合成 -->
          <div class="sub-modality-card">
            <div class="sub-modality-header">
              <span>语音合成</span>
            </div>
            <ul class="models-list sub-model-pill-row" role="list">
              <li
                v-for="id in speechModels"
                :key="id"
                class="model-pill model-pill-item"
              >
                <span class="model-id-text">{{ id }}</span>
                <button
                  type="button"
                  class="btn-icon-mini"
                  :class="{ copied: copiedId === id }"
                  :aria-label="copiedId === id ? `已复制 ${id}` : `复制模型名称 ${id}`"
                  @click="copyModelId(id)"
                >
                  {{ copiedId === id ? "已复制 ✓" : "复制" }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 3. 视频模型 (Explore / Build 可用，基于 CSS Grid 实现零跳动平滑折叠) -->
      <div
        class="video-collapsible-wrapper"
        :class="{ 'is-expanded': isVideoSupported }"
        :aria-hidden="!isVideoSupported"
      >
        <div class="video-collapsible-inner">
          <div class="model-group video-group">
            <div class="group-header">
              <div class="group-title">视频模型</div>
              <span class="group-rule-tag">Explore / Build 档位专属 · 扣除周配额</span>
            </div>

            <ul class="models-list video-grid" role="list">
              <li
                v-for="id in videoModels"
                :key="id"
                class="model-pill model-pill-item"
              >
                <span class="model-id-text">{{ id }}</span>
                <button
                  type="button"
                  class="btn-icon-mini"
                  :class="{ copied: copiedId === id }"
                  :tabindex="isVideoSupported ? 0 : -1"
                  :aria-label="copiedId === id ? `已复制 ${id}` : `复制模型名称 ${id}`"
                  @click="copyModelId(id)"
                >
                  {{ copiedId === id ? "已复制 ✓" : "复制" }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 屏幕阅读器播报 -->
    <span class="sr-only" role="status" aria-live="polite">
      {{ copiedId ? `已复制 ${copiedId}` : "" }}
    </span>
  </section>
</template>

<style scoped>
.models-card {
  overflow: hidden;
}

.models-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border-muted);
  background: #ffffff;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.models-header-left h2 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.3;
}

.models-subtitle {
  margin: 4px 0 0;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.models-subtitle strong {
  color: var(--color-text);
  font-weight: 600;
}

/* 档位筛选 Segmented Control */
.tier-segmented {
  display: inline-flex;
  background: var(--color-surface-muted);
  padding: 3px;
  border-radius: var(--radius-control);
  border: 1px solid var(--color-border-muted);
  gap: 2px;
}

.tier-segment-btn {
  border: none;
  background: transparent;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm, 6px);
  cursor: pointer;
  transition: background-color 180ms cubic-bezier(0.16, 1, 0.3, 1),
              color 180ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1);
  font-family: inherit;
  white-space: nowrap;
}

.tier-segment-btn:hover {
  color: var(--color-text);
}

.tier-segment-btn.is-active {
  background: #ffffff;
  color: var(--color-text);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
  font-weight: 700;
}

.models-groups-container {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
}

.models-groups-container > .model-group + .model-group {
  margin-top: var(--space-5);
}

.model-group {
  display: grid;
  gap: var(--space-2);
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.group-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.group-title::before {
  content: "";
  width: 3px;
  height: 12px;
  background: var(--color-primary);
  border-radius: 2px;
}

.group-rule-tag {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* 列表与网格 */
.models-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.language-grid,
.video-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}

@media (max-width: 640px) {
  .language-grid,
  .video-grid {
    grid-template-columns: 1fr;
  }
}

.model-pill-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid var(--color-border-muted);
  border-radius: var(--radius-control);
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.model-pill-item:hover {
  border-color: var(--color-primary);
  background: #fafcff;
}

.model-id-text {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  word-break: break-all;
}

.btn-icon-mini {
  border: 1px solid var(--color-border-muted);
  background: var(--color-surface-muted);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 3px 8px;
  border-radius: var(--radius-sm, 6px);
  font-size: 0.75rem;
  font-weight: 600;
  font-family: inherit;
  transition: background-color 180ms cubic-bezier(0.16, 1, 0.3, 1),
              border-color 180ms cubic-bezier(0.16, 1, 0.3, 1),
              color 180ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 120ms ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.btn-icon-mini:active {
  transform: scale(0.96);
}

.btn-icon-mini:hover {
  color: var(--color-primary);
  background: rgba(29, 78, 216, 0.08);
  border-color: #bfdbfe;
}

.btn-icon-mini.copied {
  background: var(--color-success-soft);
  border-color: #a7f3d0;
  color: var(--color-success);
}

/* 多模态生成网格 (图像 + 语音) */
.multimodal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

@media (max-width: 640px) {
  .multimodal-grid {
    grid-template-columns: 1fr;
  }
}

.sub-modality-card {
  border: 1px solid var(--color-border-muted);
  border-radius: var(--radius-control);
  padding: 10px 12px;
  background: #fafbfd;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sub-modality-header {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sub-model-pill-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.video-collapsible-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  margin-top: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 240ms cubic-bezier(0.16, 1, 0.3, 1),
              margin-top 300ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: grid-template-rows, opacity, margin-top, transform;
}

.video-collapsible-wrapper.is-expanded {
  grid-template-rows: 1fr;
  opacity: 1;
  margin-top: var(--space-5);
  transform: translateY(0);
  pointer-events: auto;
}

.video-collapsible-inner {
  overflow: hidden;
  min-height: 0;
}

@media (prefers-reduced-motion: reduce) {
  .video-collapsible-wrapper {
    transition: none;
  }
}

.empty-state {
  padding: var(--space-8);
  text-align: center;
  color: var(--color-text-secondary);
}

.empty-hint {
  color: var(--color-text-muted);
  margin-top: var(--space-2);
}

.empty-hint a {
  color: var(--color-brand);
  text-decoration: underline;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
