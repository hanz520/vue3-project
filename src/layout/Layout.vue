<template>
  <div class="app-wrap">
    <Sidebar class="app-sidebar" />
    <div class="app-container">
      <AppHeader class="app-header" />
      <div class="app-content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import Sidebar from './sidebar/Sidebar.vue'
import AppHeader from './AppHeader/AppHeader.vue'
</script>

<style lang="scss">
.app-wrap {
  width: 100%;
  height: 100%;
  display: flex;
}
.app-sidebar {
  width: 240px;
  height: 100vh;
  background: #001529;
  color: #fff;
  transition: 0.25s ease-out width;
  // border-right: 1px solid #eee;
  box-shadow: 2px 0 10px #0000005b;
  @include scroll(y);
}
.app-container {
  flex: 1;
}
.app-header {
  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-shadow: 0 2px 10px #0000005b;
  display: flex;
  justify-content: space-between;
}
.app-content {
  width: 100%;
  height: calc(100vh - 50px);
  // background: lightblue;
}
</style>
