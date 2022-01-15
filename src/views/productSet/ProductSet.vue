<template>
  <div>产品集合</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route)
onMounted(() => {
  console.log(route)
})
</script>

<style lang="scss" scoped></style>
