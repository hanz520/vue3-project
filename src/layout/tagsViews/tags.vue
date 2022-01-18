<template>
  <div class="app-tags">
    <div
      v-for="view in visitedViews"
      :key="view.fullPath"
      :class="{ 'app-tags__item--active': isActive(view) }"
      class="app-tags__item"
      @click="routerTo(view)"
    >
      <span v-if="view.meta.icon" class="app-tags__icon"><SvgIcon :href="`${view.meta.icon as string}`" /></span>
      {{ view.meta.title }}
      <span v-if="!isHideClose(view)" class="app-tags__close" @click="delView(view)"
        ><SvgIcon href="icon-close"
      /></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useTagsViewStore } from '@/store/index'

const route = useRoute()
const router = useRouter()
const { visitedViews, addView, delView, cachedViews } = useTagsViewStore()

// 当前显示路由
const isActive = (view: RouteLocationNormalizedLoaded) => {
  return view.path === route.path
}

//
const isHideClose = (view: RouteLocationNormalizedLoaded) => {
  return cachedViews.length === 1 && view.name === 'Workbench'
}

// 添加缓存
watch(
  route,
  (val) => {
    addView(val)
  },
  { immediate: true }
)

// 默认显示Workbench
watch(visitedViews, () => {
  if (visitedViews.length == 0) {
    router.push({ name: 'Workbench' })
  }
})
// 跳转
const routerTo = (view: RouteLocationNormalizedLoaded) => {
  router.push(view.fullPath)
}
</script>

<style lang="scss">
.app-tags {
  width: 100%;
  height: 35px;
  box-shadow: 0 2px 3px #0000002f;
  padding: 0 20px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
  &__item {
    padding: 0 10px;
    height: 30px;
    flex-shrink: 0;
    border: 1px solid #eee;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    line-height: 30px;
    margin-top: 5px;
    margin-right: 3px;
    min-width: 100px;
    white-space: nowrap;
    cursor: pointer;
    &--active {
      background: #1890ff;
      color: #fff;
      border-color: #1890ff;
      .app-tags__close {
        background: #1890ff;
        color: #fff;
      }
    }
    &:hover {
      .app-tags__close {
        background: #eee;
        color: #777;
      }
    }
  }
  &__close {
    margin-left: 5px;
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    vertical-align: middle;
    line-height: 18px;
    text-align: center;
    position: relative;
    transition: 0.15s ease-out all;
    top: -2px;
    color: #777;
    .svg-icon {
      font-size: 12px;
    }
  }
  &__icon {
    margin-right: 5px;
    .svg-icon {
      font-size: 14px;
    }
  }
}
</style>
