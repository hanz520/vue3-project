<template>
  <div class="app-wrap">
    <Sidebar />
    <div class="app-container">
      <AppHeader />
      <TagsViews />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './sidebar/Sidebar.vue'
import AppHeader from './AppHeader/AppHeader.vue'
import TagsViews from './tagsViews/tagsViews.vue'
</script>

<style lang="scss">
.app-wrap {
  width: 100%;
  height: 100%;
  display: flex;
}
.app-container {
  flex: 1;
  overflow: hidden;
}
</style>
