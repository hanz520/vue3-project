<template>
  <span class="app-full-screen">
    <SvgIcon class="app-full-screen__icon" href="icon-compress" />
  </span>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
</script>

<style lang="scss">
.app-full-screen {
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
