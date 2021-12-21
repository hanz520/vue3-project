<template>
  <div class="app-header">
    <CollapseBtn class="collapse-btn" />
    <div class="app-header__option">
      <span class="app-message">消息</span>
      <span class="app-full-screen">全屏</span>
      <div class="app-user">用户</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CollapseBtn from '../sidebar/CollapseBtn.vue'
</script>

<style lang="scss">
.app-header {
  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-shadow: 0 2px 10px #0000005b;
  display: flex;
  justify-content: space-between;
  .collapse-btn {
    margin: 13px 0 0 20px;
  }
  &__option {
    margin-right: 20px;
    display: flex;
  }
}
</style>
