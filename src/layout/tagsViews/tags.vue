<template>
  <div ref="appTags" class="app-tags">
    <div class="app-tags__content">
      <!-- <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div>
      <div class="app-tags__item">充数的标签</div> -->
      <div
        v-for="view in visitedViews"
        :key="view.fullPath"
        :class="{ 'app-tags__item--active': isActive(view) }"
        class="app-tags__item"
        @click="routerToFn(view)"
        @contextmenu.prevent="openMenu(view, $event)"
      >
        <span v-if="view.meta.icon" class="app-tags__icon"><SvgIcon :href="`${view.meta.icon as string}`" /></span>
        {{ view.meta.title }}
        <span v-if="!isHideClose(view)" class="app-tags__close" @click.stop.prevent="closeFn(view)"
          ><SvgIcon href="icon-close"
        /></span>
      </div>
    </div>

    <div
      v-if="menuVisible"
      class="app-tags__contextmenu"
      :style="{ left: menuPosition.left + 'px', top: menuPosition.top + 'px' }"
    >
      <div class="app-tags__contextmenuitem" @click="refreshFn(currentView!)">刷新</div>
      <div class="app-tags__contextmenuitem" @click="closeFn(currentView!)">关闭</div>
      <div class="app-tags__contextmenuitem" @click="closeOthersFn(currentView!)">关闭其他</div>
      <div class="app-tags__contextmenuitem" @click="closeAllFn(currentView!)">关闭所有</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, Ref, ref, watch } from 'vue'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useTagsViewStore } from '@/store/index'
import useFlag from '@/composition/hooks/useFlag'

const route = useRoute()
const router = useRouter()
const { visitedViews, addView, delView, cachedViews, refreshView } = useTagsViewStore()

/**
 * 状态控制相关
 */
const isActive = (view: RouteLocationNormalizedLoaded) => {
  return view.path === route.path
}
const isHideClose = (view: RouteLocationNormalizedLoaded) => {
  return cachedViews.length === 1 && view.name === 'Workbench'
}

/**
 * 路由操作功能
 */
// 跳转
const routerToFn = (view: RouteLocationNormalizedLoaded) => {
  router.push(view.fullPath)
}

// 添加
watch(route, (val) => addView(val), { immediate: true })

// 刷新
const refreshFn = (view: RouteLocationNormalizedLoaded) => {
  refreshView(view)
}

// 删除单个
const closeFn = (view: RouteLocationNormalizedLoaded) => {
  delView(view).then(({ visitedViews }) => {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
      router.push(latestView)
    } else {
      router.push({ name: 'Workbench' })
    }
  })
}

// 删除其他
const closeOthersFn = (view: RouteLocationNormalizedLoaded) => {}

// 删除全部
const closeAllFn = (view: RouteLocationNormalizedLoaded) => {}

/**
 * 右键菜单功能
 */
const appTags: Ref<HTMLDivElement | null> = ref(null)
const menuPosition = reactive({
  top: 0,
  left: 0
})
const currentView: Ref<RouteLocationNormalizedLoaded | null> = ref(null)
const [menuVisible, menuHandler] = useFlag(false)
const openMenu = (view: RouteLocationNormalizedLoaded, event: MouseEvent) => {
  if (appTags.value) {
    const menuMinWidth = 105
    const offsetLeft = appTags.value?.getBoundingClientRect().left
    const offsetWidth = appTags.value?.offsetWidth
    const maxLeft = offsetWidth - menuMinWidth
    const left = event.clientX - offsetLeft + 10

    menuPosition.left = left > maxLeft ? maxLeft : left
    menuPosition.top = event.clientY - 50

    menuHandler.set(true)
    document.body.addEventListener('click', closeMenu)
    currentView.value = view
  }
}
const closeMenu = () => {
  menuHandler.set(false)
  document.body.removeEventListener('click', closeMenu)
}
</script>

<style lang="scss">
.app-tags {
  width: 100%;
  height: 35px;
  box-shadow: 0 2px 5px #0000002f;
  display: flex;
  justify-content: flex-start;
  position: relative;
  &__content {
    display: flex;
    justify-content: flex-start;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100%;
    height: 35px;
    padding: 0 20px;
    &:hover {
      overflow-x: auto;
    }
  }
  &__item {
    padding: 0 10px;
    height: 30px;
    flex-shrink: 0;
    border: 1px solid #dddddd;
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
  &__contextmenu {
    position: absolute;
    left: 50px;
    top: 10px;
    background: #fff;
    border: 1px solid #dddddd;
    z-index: 1000;
    box-shadow: 4px 4px 5px #00000049;
    border-radius: 2px;
  }
  &__contextmenuitem {
    padding: 6px 15px;
    border-bottom: 1px solid #dddddd;
    cursor: pointer;
    font-size: 12px;
  }
  &__contextmenuitem:last-child {
    border: none;
  }
  &__contextmenuitem:hover {
    background: #eee;
  }
}
</style>
