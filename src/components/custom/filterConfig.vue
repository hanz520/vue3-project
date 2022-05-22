<template>
  <a-divider orientation="left" orientation-margin="0px">显示搜索项</a-divider>
  <a-checkable-tag
    v-for="item in filter"
    :key="item.name"
    v-model:checked="checkedFilterObj[item.name]"
    :disabled="true"
    @change="(checked: boolean) => changeFn(item, checked)"
  >
    {{ item.label }}
  </a-checkable-tag>
</template>

<script lang="ts" setup>
import { useCustomStore } from '@/store'
import { message } from 'ant-design-vue'
import { inject, ref, Ref } from 'vue'

const moduleName = inject('moduleName') as Ref<string>
const filter = inject('filter') as Ref<any[]>

const customStore = useCustomStore()

const selectedFilter: Ref<any[]> = ref([])
const checkedFilterObj: Ref<AnyObject> = ref({})
const { getFilter, setFilter } = customStore
// 初始化选择的列
const initFilter = async () => {
  selectedFilter.value = await getFilter(moduleName.value, filter.value ?? [])
  checkedFilterObj.value = {}
  selectedFilter.value.forEach((v) => {
    checkedFilterObj.value[v.name] = true
  })
}
const updateFilter = () => {
  const list = filter.value.filter((item) => {
    return checkedFilterObj.value[item.name]
  })
  setFilter(moduleName.value, list)
}

// 选择列操作
const changeFn = (col: any, checked: boolean) => {
  if (checked) {
    selectedFilter.value.push(col)
  } else {
    if (selectedFilter.value.length === 1) {
      message.warning('最少保证一个搜索项')
      checkedFilterObj.value[col.name] = true
      return false
    }
    const index = selectedFilter.value.findIndex((v) => v.name === col.name)
    selectedFilter.value.splice(index, 1)
  }
}

defineExpose({ initFilter, updateFilter })
</script>

<style lang="scss" scoped>
.custom-drag {
  cursor: move;
  user-select: none;
  transition: none;
}
.not-drag {
  cursor: not-allowed;
}
.ghost {
  opacity: 0.3;
}
</style>
