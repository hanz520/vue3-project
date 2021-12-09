<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="hrefFormatter"></use>
  </svg>
</template>

<script lang="ts" setup>
import { withDefaults, computed } from 'vue'

interface propsType {
  href: string
}
const props = withDefaults(defineProps<propsType>(), {
  href: 'icon-smile'
})
const hrefFormatter = computed(() => {
  return `#${props.href}`
})
</script>

<style lang="scss" scoped>
.svg-icon {
  overflow: hidden;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  font-size: 16px;
}
</style>
