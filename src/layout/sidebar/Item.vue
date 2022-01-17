<template>
  <template v-if="!navItem.hide">
    <a-menu-item v-if="!hasSub" :key="navItem.name" @click="itemClick">
      <template v-if="icon" #icon>
        <SvgIcon class="nav-item-icon" :href="icon" />
      </template>
      <span>{{ navItem.meta?.title }}</span>
    </a-menu-item>
    <a-sub-menu v-if="hasSub" :key="navItem.name">
      <template v-if="icon" #icon>
        <SvgIcon class="nav-item-icon" :href="icon" />
      </template>
      <template #title>{{ navItem.meta?.title }}</template>
      <Item v-for="item in navItem.children" :key="item.name" :nav-item="item" />
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import type { ComputedRef } from 'vue'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { RouteRecordRaw, useRouter } from 'vue-router'

export interface PropsType {
  navItem: RouteRecordRaw
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

const icon: ComputedRef<string | undefined> = computed(() => {
  if (navItem.value.meta?.icon) {
    return navItem.value.meta?.icon as string
  } else {
    return undefined
  }
})

/**
 * 进行路由跳转
 */
const router = useRouter()
const itemClick = () => {
  if (navItem.value.name && router.hasRoute(navItem.value.name)) {
    router.push({
      name: navItem.value.name
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
