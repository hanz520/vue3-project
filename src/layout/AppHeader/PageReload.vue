<template>
  <span class="app-page-reload">
    <SvgIcon href="icon-sync" class="app-page-reload__icon" />
  </span>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
// todo: 根据路由进行刷新
// import { useRouter } from 'vue-router'
// const router = useRouter()
// console.log(router)
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
