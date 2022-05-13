<template>
  <div class="app-sidebar" :class="{ 'app-sidebar--collapsed': collapsed }">
    <Logo />
    <a-menu
      v-if="navTree"
      v-model:selectedKeys="active"
      v-model:openKeys="openKeys"
      mode="inline"
      :inline-collapsed="collapsed"
      theme="dark"
    >
      <template v-for="item in navTree">
        <Item v-if="item.showOnNav === 1" :key="item.action" :nav-item="item" />
      </template>
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
const { navTree, navList, active, collapsed, openKeys } = toRefs(useNav)
const { setActive, addOpenKeys } = useNav

// 根据路由变化选中高亮
const route = useRoute()
const getMatchedRouteName = () => {
  let tempRouteName = route.name as string
  const auth = navList.value?.find((item) => item.action === tempRouteName)
  if (auth?.path) {
    addOpenKeys(auth?.path)
  }
}
watch(
  route,
  () => {
    setActive([route.name] as string[])
    // 设置打开的item
    getMatchedRouteName()
  },
  { immediate: true }
)
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
  @include thin-scroll();
}
</style>
