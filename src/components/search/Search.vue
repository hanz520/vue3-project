<template>
  <a-form layout="inline" :model="searchData">
    <template v-for="item in configRender" :key="item.name">
      <a-form-item v-if="item.type === 'input'" :label="showLabel ? item.label : ''">
        <a-input
          v-model:value="searchData[item.name]"
          :placeholder="item.placeholder"
          :style="`width: ${item.width}px`"
        />
      </a-form-item>
      <a-form-item v-if="item.type === 'select'" :label="showLabel ? item.label : ''">
        <a-select
          v-model:value="searchData[item.name]"
          :mode="item.selectMode"
          allow-clear
          show-search
          :placeholder="item.placeholder"
          :max-tag-count="1"
          :filter-option="filterOption"
          :style="`width: ${item.width}px`"
        >
          <a-select-option v-for="opt in item.options" :key="opt.value" :value="opt.value" :label="opt.label">
            {{ opt.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </template>
    <slot />
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="searchFn">搜索</a-button>
        <a-button @click="resetFn">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
export default { name: 'Auth' }
</script>

<script lang="ts" setup>
import { reactive, Ref, ref, toRefs, watchEffect } from 'vue'

/**
 * 类型定义
 */
export interface TypeSearchConfigSelection {
  label: string
  value: number | string
}

export type SearchConfig =
  | {
      type: 'input'
      name: string
      label: string
      placeholder?: string
      width?: number
      options?: TypeSearchConfigSelection[]
    }
  | {
      type: 'select'
      name: string
      label: string
      placeholder?: string
      width?: number
      selectMode?: 'combobox' | 'multiple'
      options: TypeSearchConfigSelection[]
    }

/**
 * 父组件传参接收
 */
interface PropsType {
  config: SearchConfig[]
  showLabel?: boolean
}
const props = withDefaults(defineProps<PropsType>(), {
  showLabel: true
})
const { config, showLabel } = toRefs(props)

/**
 * 生成渲染搜索项界面的数据
 */
const configRender: Ref<SearchConfig[]> = ref([])
const placeholderText = {
  select: '请选择',
  input: '请输入'
}
watchEffect(() => {
  configRender.value = config.value
  // 补全未配置项
  configRender.value.forEach((item) => {
    item.placeholder = item.placeholder || placeholderText[item.type] + (item.label || '')
    item.width = item.width || 180
    if (item.type === 'select') {
      item.selectMode = item.selectMode || 'combobox'
    }
  })
})

const filterOption = (input: string, option: any) => {
  return option.label.indexOf(input) >= 0
}

// 生成搜索对象  todo: 精准类型
const searchData: AnyObject = reactive({})

// 获取搜索内容
const getSearchData = () => {
  return searchData
}

// 点击搜索按钮
const emits = defineEmits(['search'])
const searchFn = () => {
  emits('search', getSearchData())
}
// 点击重置按钮
const resetFn = () => {
  let needSearch = false
  for (let key in searchData) {
    if (searchData[key] !== null) needSearch = true
    delete searchData[key]
  }
  if (needSearch) searchFn()
}

defineExpose({ getSearchData })
</script>

<style lang="scss" scoped>
.ant-form-inline {
  margin-bottom: -10px;
}
.ant-form-item {
  margin-bottom: 10px;
}
::v-deep .ant-select-selection-overflow {
  flex-wrap: nowrap;
}
</style>
