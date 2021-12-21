<template>
  <div>
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
.collapse-btn {
  margin: 13px 0 0 20px;
}
.app-header__option {
  margin-right: 20px;
  display: flex;
}
</style>
