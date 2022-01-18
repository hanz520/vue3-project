<template>
  <div class="app-tags">
    <div class="app-tags__item app-tags__item--active">
      <span class="app-tags__icon"><SvgIcon href="icon-appstore" /></span>
      首页
      <span class="app-tags__close"><SvgIcon href="icon-close" /></span>
    </div>
    <div class="app-tags__item">
      <span class="app-tags__icon"><SvgIcon href="icon-appstore" /></span>
      工作台
      <span class="app-tags__close"><SvgIcon href="icon-close" /></span>
    </div>
    <div class="app-tags__item">
      <span class="app-tags__icon"><SvgIcon href="icon-setting" /></span>
      用户管理
      <span class="app-tags__close"><SvgIcon href="icon-close" /></span>
    </div>
    <div class="app-tags__item">
      <span class="app-tags__icon"><SvgIcon href="icon-appstore" /></span>
      权限管理
      <span class="app-tags__close"><SvgIcon href="icon-close" /></span>
    </div>
    <div class="app-tags__item">
      <span class="app-tags__icon"><SvgIcon href="icon-appstore" /></span>
      角色管理
      <span class="app-tags__close"><SvgIcon href="icon-close" /></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
</script>

<style lang="scss">
.app-tags {
  width: 100%;
  height: 35px;
  box-shadow: 0 2px 3px #0000002f;
  padding: 0 20px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
  &__item {
    padding: 0 10px;
    height: 30px;
    flex-shrink: 0;
    border: 1px solid #eee;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    line-height: 30px;
    margin-top: 5px;
    margin-right: 3px;
    min-width: 100px;
    white-space: nowrap;
    cursor: pointer;
    &--active {
      background: #1890ff;
      color: #fff;
      border-color: #1890ff;
      .app-tags__close {
        background: #1890ff;
        color: #fff;
      }
    }
    &:hover {
      .app-tags__close {
        background: #eee;
        color: #777;
      }
    }
  }
  &__close {
    margin-left: 5px;
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    vertical-align: middle;
    line-height: 18px;
    text-align: center;
    position: relative;
    transition: 0.15s ease-out all;
    top: -2px;
    color: #777;
    .svg-icon {
      font-size: 12px;
    }
  }
  &__icon {
    margin-right: 5px;
    .svg-icon {
      font-size: 14px;
    }
  }
}
</style>
