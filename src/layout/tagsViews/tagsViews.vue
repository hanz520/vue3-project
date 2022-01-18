<template>
  <div class="app-content">
    <Tags />
    <Views />
  </div>
</template>

<script lang="ts" setup>
import Tags from './tags.vue'
import Views from './views.vue'
</script>

<style lang="scss">
.app-content {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
