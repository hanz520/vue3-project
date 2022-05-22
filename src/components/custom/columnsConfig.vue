<template>
  <a-divider orientation="left" orientation-margin="0px">显示列</a-divider>
  <a-checkable-tag
    v-for="col in columns"
    :key="col.dataIndex"
    v-model:checked="checkedColumnsObj[col?.dataIndex]"
    :disabled="true"
    @change="(checked: boolean) => columnChangeFn(col, checked)"
  >
    {{ col.title }}
  </a-checkable-tag>
  <a-divider orientation="left" orientation-margin="0px">列顺序</a-divider>
  <!-- <a-tag
    v-for="col in selectedColumns"
    :key="col.dataIndex"
    :color="hasFixed(col) ? 'error' : 'success'"
    :class="{ 'custom-drag': !hasFixed(col) }"
    >{{ col.title }}</a-tag
  > -->
  <draggable
    :list="selectedColumns"
    ghost-class="ghost"
    filter=".not-drag"
    :animation="300"
    item-key="dataIndex"
    :move="onMove"
  >
    <template #item="{ element: col }">
      <a-tag
        :key="col.dataIndex"
        :color="hasFixed(col) ? 'error' : 'success'"
        :class="{ 'custom-drag': !hasFixed(col), 'not-drag': hasFixed(col) }"
        >{{ col.title }}</a-tag
      >
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import { useCustomStore } from '@/store'
import { message, TableColumnProps } from 'ant-design-vue'
import { inject, ref, Ref, toRaw } from 'vue'
import draggable from 'vuedraggable'

const moduleName = inject('moduleName') as Ref<string>
const columns = inject('columns') as Ref<any[]>

const customStore = useCustomStore()

const hasFixed = (col: TableColumnProps) => {
  return col.fixed === 'left' || col.fixed === 'right'
}

/**
 * 表格列配置
 */
const selectedColumns: Ref<any[]> = ref([])
const checkedColumnsObj: Ref<AnyObject> = ref({})
const { getColumn, setColumn } = customStore
// 初始化选择的列
const initColumns = async () => {
  selectedColumns.value = await getColumn(moduleName.value, columns.value ?? [])
  checkedColumnsObj.value = {}
  selectedColumns.value.forEach((v) => {
    checkedColumnsObj.value[v.dataIndex] = true
  })
}
const updateColumns = () => {
  setColumn(moduleName.value, toRaw(selectedColumns.value))
}

// 选择列操作
const columnChangeFn = (col: any, checked: boolean) => {
  if (checked) {
    if (col.fixed === 'left') {
      selectedColumns.value.unshift(col)
    } else if (col.fixed === 'right') {
      selectedColumns.value.push(col)
    } else {
      const index = selectedColumns.value.findIndex((item) => item.fixed === 'right')
      if (index >= 0) {
        selectedColumns.value.splice(index, 0, col)
      } else {
        selectedColumns.value.push(col)
      }
    }
  } else {
    if (selectedColumns.value.length === 1) {
      message.warning('最少保证显示一列')
      checkedColumnsObj.value[col.dataIndex] = true
      return false
    }
    const index = selectedColumns.value.findIndex((v) => v.dataIndex === col.dataIndex)
    selectedColumns.value.splice(index, 1)
  }
}

// 拖拽操作:禁止拖拽到带有fixed的项目
const onMove = (e: any) => {
  if (e.relatedContext.element.fixed) return false
  return true
}

defineExpose({ initColumns, updateColumns })
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
