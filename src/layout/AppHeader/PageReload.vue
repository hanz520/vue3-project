<template>
  <span class="app-page-reload" @click="refresh">
    <SvgIcon href="icon-sync" class="app-page-reload__icon" />
  </span>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
// todo: 根据路由进行刷新
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const refresh = () => {
  router.replace({
    name: 'redirect',
    query: {
      prename: route.name as string,
      preparams: JSON.stringify(route.params),
      prequery: JSON.stringify(route.query)
    }
  })
}
</script>

<style lang="scss">
.app-page-reload {
  padding: 0 15px;
  line-height: 50px;
  cursor: pointer;
  &:hover {
    background: #f3f3f3;
  }
  &__icon {
    font-size: 20px;
  }
}
</style>
