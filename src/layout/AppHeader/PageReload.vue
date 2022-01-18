<template>
  <span class="app-page-reload" @click="refreshView(route)">
    <SvgIcon href="icon-sync" class="app-page-reload__icon" />
  </span>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { useTagsViewStore } from '@/store'

import { useRoute } from 'vue-router'
const route = useRoute()
const { refreshView } = useTagsViewStore()
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
