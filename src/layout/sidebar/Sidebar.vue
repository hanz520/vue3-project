<template>
  <div>
    <Logo />
    <a-menu v-if="navList" mode="inline">
      <Item v-for="item in navList" :key="item.route" :nav-item="item" />
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { useNavStore } from '@/store/modules/nav'
import { toRefs } from 'vue'
import Logo from '../Logo.vue'
import Item from './Item.vue'
const useNav = useNavStore()
const { navList } = toRefs(useNav)
const { initNavList } = useNav
/**
 * todo: 真正初始化不是在此处，后续优化
 */
initNavList()
</script>

<style lang="scss" scoped></style>
