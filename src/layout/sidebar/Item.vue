<template>
  <a-menu-item v-if="!hasSub" :key="navItem.route" @click="itemClick">
    <template v-if="navItem.icon" #icon>
      <SvgIcon class="nav-item-icon" :href="navItem.icon" />
    </template>
    <span>{{ navItem.name }}</span>
  </a-menu-item>
  <a-sub-menu v-if="hasSub" :key="navItem.route">
    <template v-if="navItem.icon" #icon>
      <SvgIcon class="nav-item-icon" :href="navItem.icon" />
    </template>
    <template #title>{{ navItem.name }}</template>
    <Item v-for="item in navItem.children" :key="item.route" :nav-item="item" />
  </a-sub-menu>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import type { ComputedRef } from 'vue'
import type { ItemFace } from './type'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { useRouter } from 'vue-router'

export interface PropsType {
  navItem: ItemFace
}
const props = defineProps<PropsType>()
const { navItem } = toRefs(props)

/**
 * 判断当前路由是否有子路由
 */
const hasSub: ComputedRef<boolean> = computed(() => {
  const children = navItem.value.children
  if (children && Array.isArray(children) && children.length > 0) {
    return true
  }
  return false
})

/**
 * 进行路由跳转
 */
const router = useRouter()
const itemClick = () => {
  if (router.hasRoute(navItem.value.route)) {
    router.push({
      name: navItem.value.route
    })
  } else {
    router.push('/404')
    console.error('sidebar组件找不到路由' + navItem.value)
  }
}
</script>

<style lang="scss">
.nav-item-icon {
  font-size: 16px;
}
</style>
