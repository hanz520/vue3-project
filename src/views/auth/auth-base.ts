import { SelectProps } from 'ant-design-vue'
import { ref } from 'vue'

// 用来渲染权限类型
export const typeConverter = new Map([
  [0, { color: 'default', text: '层级' }],
  [1, { color: 'success', text: '路由' }],
  [2, { color: 'warning', text: '接口' }],
  [3, { color: 'processing', text: '视图' }]
])

// 权限类型
export const typeOptions = ref<SelectProps['options']>([
  { label: '层级', value: 0 },
  { label: '路由', value: 1 },
  { label: '接口', value: 2 },
  { label: '视图', value: 3 }
])
