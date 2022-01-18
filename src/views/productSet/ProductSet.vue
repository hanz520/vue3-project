<template>
  <div>产品集合</div>
  <a-input v-model:value="name"></a-input>
</template>

<script lang="ts">
export default { name: 'ProductSetA' }
</script>
<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('hanz')
</script>

<style lang="scss" scoped></style>
