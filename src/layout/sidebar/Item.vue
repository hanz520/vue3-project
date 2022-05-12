<template>
  <template v-if="!navItem.hide">
    <a-menu-item v-if="!hasSub" :key="navItem.action" @click="itemClick">
      <template v-if="icon" #icon>
        <SvgIcon class="nav-item-icon" :href="icon" />
      </template>
      <span>{{ navItem.authName }}</span>
    </a-menu-item>
    <a-sub-menu v-if="hasSub" :key="navItem.action">
      <template v-if="icon" #icon>
        <SvgIcon class="nav-item-icon" :href="icon" />
      </template>
      <template #title>{{ navItem.authName }}</template>
      <template v-for="item in navItem.children">
        <Item v-if="item.showOnNav === 1" :key="item.action" :nav-item="item" />
      </template>
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import type { ComputedRef } from 'vue'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { useRouter } from 'vue-router'
import { Auth } from '@/store/modules/user'

interface PropsType {
  navItem: Auth
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
  return navItem.value?.icon
})

/**
 * 进行路由跳转
 */
const router = useRouter()
const itemClick = () => {
  if (navItem.value.action && router.hasRoute(navItem.value.action)) {
    router.push({
      name: navItem.value.action
    })
  } else {
    router.push('/404')
    console.error('路由未定义' + navItem.value)
  }
}
</script>

<style lang="scss">
.nav-item-icon {
  font-size: 16px;
}
</style>
