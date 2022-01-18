<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="['Auth', 'Role']">
      <component :is="Component" ref="component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'Middleware'
}
</script>
