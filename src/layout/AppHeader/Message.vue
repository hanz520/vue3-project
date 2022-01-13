<template>
  <a-popover placement="bottom" trigger="click">
    <template #content>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="通知"><a-empty :image="simpleImage" /></a-tab-pane>
        <a-tab-pane key="2" tab="消息" force-render><a-empty :image="simpleImage" /></a-tab-pane>
        <a-tab-pane key="3" tab="待办"><a-empty :image="simpleImage" /></a-tab-pane>
      </a-tabs>
    </template>

    <span class="app-message">
      <a-badge count="5">
        <SvgIcon class="app-message__icon" href="icon-bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { Empty } from 'ant-design-vue'
import { ref } from 'vue'

let activeKey = ref('1')
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>

<style lang="scss">
.app-message {
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
