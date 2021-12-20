<template>
  <div class="app-logo">
    <span class="app-logo__icon"><img src="@/assets/logo.svg" /></span>
    <span class="app-logo__title">数据管理中心</span>
  </div>
</template>

<!-- <script lang="ts" setup></script> -->

<style lang="scss">
.app-logo {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: $text-color;
  // border-bottom: 1px solid #eee;
  font-size: 0;
  &__icon {
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    line-height: 30px;
    img {
      height: 100%;
    }
  }
  &__title {
    margin-left: 10px;
    vertical-align: middle;
    line-height: 1.5;
    font-size: 16px;
    color: #ffffffb6;
    transition: 0.25s ease all;
    white-space: nowrap;
    .app-sidebar--collapsed & {
      width: 0;
      display: inline-block;
      opacity: 0;
      margin-left: 0;
    }
  }
}
</style>
