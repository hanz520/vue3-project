<template>
  <div class="app-views">
    <!-- <keep-alive > -->
    <!-- <keep-alive>
      <router-view :key="key" />
    </keep-alive> -->
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="['Home', 'Workbench', 'Role', 'User', 'Auth', 'ProductSet']">
        <component :is="Component" ref="component" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useTagsViewStore } from '@/store/modules/tagsView'
import { onMounted, ref } from 'vue'

const { cachedViews } = useTagsViewStore()

const component = ref(null)
onMounted(() => {
  console.log(component.value)
})
const changeFn = () => {
  console.log(component.value)
}
</script>

<style lang="scss">
.app-views {
  width: 100%;
  height: calc(100% - 35px);
  overflow-y: auto;
}
</style>
