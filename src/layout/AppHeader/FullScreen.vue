<template>
  <span class="app-full-screen" @click="doToggle">
    <SvgIcon class="app-full-screen__icon" :href="icon" />
  </span>
</template>

<script lang="ts" setup>
import screenfull from 'screenfull'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { computed, Ref, ref } from 'vue'
import { Modal } from 'ant-design-vue'
const isFullscreen: Ref<boolean> = ref(false)

const icon = computed(() => {
  return isFullscreen.value ? 'icon-compress' : 'icon-expend'
})

screenfull.onchange(() => {
  isFullscreen.value = screenfull.isFullscreen
})

const doToggle = () => {
  if (!screenfull.isEnabled) {
    Modal.info({
      title: '提示',
      content: '您的浏览器不支持全屏'
    })
    return false
  }
  screenfull.toggle()
}
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
