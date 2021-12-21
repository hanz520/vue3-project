<template>
  <div class="app-sidebar" :class="{ 'app-sidebar--collapsed': collapsed }">
    <Logo />
    <a-menu v-if="navList" v-model:selectedKeys="active" mode="inline" :inline-collapsed="collapsed" theme="dark">
      <Item v-for="item in navList" :key="item.route" :nav-item="item" />
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { useNavStore } from '@/store/modules/nav'
import { toRefs } from 'vue'
import Logo from './Logo.vue'
import Item from './Item.vue'
const useNav = useNavStore()
const { navList, active, collapsed } = toRefs(useNav)
const { initNavList } = useNav
/**
 * todo: 真正初始化不是在此处，后续优化
 */
initNavList()
</script>

<style lang="scss">
.app-sidebar {
  width: 240px;
  height: 100vh;
  background: #001529;
  color: #fff;
  transition: 0.25s ease-out width;
  // border-right: 1px solid #eee;
  box-shadow: 2px 0 10px #0000005b;
  @include scroll(y);
  &--collapsed {
    width: 50px;
    .ant-menu.ant-menu-inline-collapsed {
      width: 50px;
    }
  }
}
</style>
