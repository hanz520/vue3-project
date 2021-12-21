<template>
  <div class="app-wrap">
    <Sidebar />
    <div class="app-container">
      <AppHeader />
      <div class="app-content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './sidebar/Sidebar.vue'
import AppHeader from './AppHeader/AppHeader.vue'
</script>

<style lang="scss">
.app-wrap {
  width: 100%;
  height: 100%;
  display: flex;
}
.app-container {
  flex: 1;
}
.app-content {
  width: 100%;
  height: calc(100vh - 50px);
  // background: lightblue;
}
</style>
