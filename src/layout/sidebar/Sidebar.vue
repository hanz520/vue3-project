<template>
  <div class="app-sidebar" :class="{ 'app-sidebar--collapsed': collapsed }">
    <Logo />
    <a-menu v-if="routeList" v-model:selectedKeys="active" mode="inline" :inline-collapsed="collapsed" theme="dark">
      <Item v-for="item in routeList" :key="item.name" :nav-item="item" />
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { useNavStore } from '@/store/modules/nav'
import { toRefs, watch } from 'vue'
import Logo from './Logo.vue'
import Item from './Item.vue'
import { useRoute } from 'vue-router'
const useNav = useNavStore()
const { routeList, active, collapsed } = toRefs(useNav)
const { setActive } = useNav

// 根据路由变化选中高亮
const route = useRoute()
watch(route, () => setActive([route.name] as string[]), { immediate: true })
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
