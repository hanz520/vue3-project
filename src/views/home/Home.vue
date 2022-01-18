<template>
  <div>
    首页来着
    <a-input v-model:value="value"></a-input>
  </div>
</template>

<script lang="ts">
export default { name: 'Home' }
</script>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue'

const value = ref('hanz')
</script>
<style lang="scss"></style>
