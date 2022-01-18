<template>
  <div class="app-header">
    <CollapseBtn />
    <div class="app-header__option">
      <Message />
      <FullScreen />
      <Reload />
      <HeadUser />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CollapseBtn from './CollapseBtn.vue'
import Message from './Message.vue'
import FullScreen from './FullScreen.vue'
import Reload from './PageReload.vue'
import HeadUser from './HeadUser.vue'
</script>

<style lang="scss">
@include b(app-header) {
  width: 100%;
  height: 50px;
  padding: 0 10px;
  // box-shadow: 0 2px 3px #0000005b;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  @include e(option) {
    margin-right: 20px;
    display: flex;
  }
}
</style>
