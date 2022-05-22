<template>
  <a-button type="primary" @click="openConfigFn"><svg-icon href="icon-setting" /></a-button>
  <a-modal v-model:visible="visible" title="自定义配置" width="1000px" @ok="okFn">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane v-if="columns !== undefined" key="column" tab="表格列">
        <columnsConfigVue ref="columnsConfigRef" />
      </a-tab-pane>
      <a-tab-pane v-if="filter !== undefined" key="filter" tab="搜索项" force-render>
        <filterConfigVue ref="filterConfigRef" />
      </a-tab-pane>
      <a-tab-pane v-if="button !== undefined" key="button" tab="操作按钮">操作按钮</a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script lang="ts" setup>
import useFlag from '@/composition/hooks/useFlag'
import { nextTick, provide, ref, Ref, toRefs } from 'vue'
import columnsConfigVue from './columnsConfig.vue'
import filterConfigVue from './filterConfig.vue'

/**
 * 父组件传参接收
 */
interface PropsType {
  moduleName: string
  columns?: any[]
  filter?: any[]
  button?: any[]
}
const props = defineProps<PropsType>()

const { moduleName, columns, filter, button } = toRefs(props)

/**
 * 注入数据到子组件
 */
provide('moduleName', moduleName)
provide('columns', columns)
provide('filter', filter)
provide('button', button)

const activeKey: Ref<'column' | 'filter' | 'button'> = ref(
  columns !== undefined ? 'column' : filter !== undefined ? 'filter' : 'button'
)

// 打开配置
const [visible, { set: setVisible }] = useFlag(false)
const columnsConfigRef: Ref<typeof columnsConfigVue | null> = ref(null)
const filterConfigRef: Ref<typeof filterConfigVue | null> = ref(null)

const openConfigFn = () => {
  setVisible(true)
  nextTick(() => {
    if (columns !== undefined) {
      columnsConfigRef.value?.initColumns()
    }
    if (filter !== undefined) {
      filterConfigRef.value?.initFilter()
    }
  })
}

const okFn = () => {
  console.log(columnsConfigRef.value)
  if (activeKey.value === 'column') {
    columnsConfigRef.value?.updateColumns()
  }
  if (activeKey.value === 'filter') {
    filterConfigRef.value?.updateFilter()
  }
  if (activeKey.value === 'button') {
    console.log('button提交')
  }
  emits('done')
  setVisible(false)
}

const emits = defineEmits(['done'])
</script>
