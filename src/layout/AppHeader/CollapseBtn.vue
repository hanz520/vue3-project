<template>
  <SvgIcon class="collapse-btn" :href="href" @click="toggle" />
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { useNavStore } from '@/store/modules/nav'
const { collapsed } = toRefs(useNavStore())

const href = computed(() => {
  return collapsed.value ? 'icon-indent' : 'icon-outdent'
})
const toggle = () => {
  collapsed.value = !collapsed.value
}
</script>

<style lang="scss">
.collapse-btn {
  margin: 13px 0 0 20px;
  font-size: 24px;
  transition: 0.2s color ease-out;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
  &:active {
    opacity: 0.6;
  }
}
</style>
