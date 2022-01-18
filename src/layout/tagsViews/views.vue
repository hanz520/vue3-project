<template>
  <div class="app-views">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useTagsViewStore } from '@/store/modules/tagsView'

const { cachedViews } = useTagsViewStore()
</script>

<style lang="scss">
.app-views {
  width: 100%;
  height: calc(100% - 35px);
  overflow-y: auto;
  padding: 20px;
}
</style>
