<template>
  <div class="app-wrap">
    <Sidebar class="app-sidebar" />
    <div class="app-container">
      <div class="app-header"></div>
      <div class="app-content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Sidebar from './sidebar/Sidebar.vue'
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
  background: #282c34;
  // border-right: 1px solid #eee;
  box-shadow: 2px 0 5px #0000004f;
  @include scroll(y);
}
.app-container {
  flex: 1;
}
.app-header {
  width: 100%;
  height: 50px;
  // background: lightgreen;
  border-bottom: 1px solid #eee;
}
.app-content {
  width: 100%;
  height: calc(100vh - 50px);
  // background: lightblue;
}
</style>
