<template>
  <div>权限管理</div>
  <a-input v-model:value="name"></a-input>
</template>
<script lang="ts">
export default { name: 'Auth' }
</script>
<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('hanz')
</script>
<style lang="scss"></style>
