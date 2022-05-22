import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { TableColumnProps } from 'ant-design-vue'
import { useCustomStore } from '@/store'

export interface CustomController {
  columns: Ref<TableColumnProps[]> // 用户自定义显示的列
  filter: Ref<any[]>
}

interface Config {
  columns?: TableColumnProps[]
  filter?: any[]
  button?: string[]
}

export type UseCustom = (name: string, config: Config) => CustomController

export default function useCustom(name: string, config: Config): CustomController {
  const moduleName = name
  const customStore = useCustomStore()
  const { customMap, getColumn, getFilter } = customStore

  /**
   * 表格列
   */
  const columnsFlag = config.columns !== undefined // 是否需要进行表格列配置
  const defaultColumns: TableColumnProps[] = config.columns ?? []
  const columns: Ref<TableColumnProps[]> = ref(defaultColumns)
  const initColumns = async () => {
    columns.value = await getColumn(moduleName, defaultColumns)
  }
  const updateColumns = () => {
    columns.value = customMap[moduleName].column ?? defaultColumns // 如果为空，直接用默认的配置
  }
  if (columnsFlag) {
    initColumns()
  }

  /**
   * 搜索项
   */
  const filterFlag = config.filter !== undefined
  const defaultFilter: any[] = config.filter ?? []
  const filter: Ref<any[]> = ref(defaultFilter)
  const initFilter = async () => {
    filter.value = await getFilter(moduleName, defaultFilter)
  }
  const updateFilter = () => {
    filter.value = customMap[moduleName].filter ?? defaultFilter
  }
  if (filterFlag) {
    initFilter()
  }

  /**
   * 操作按钮
   */

  // customMap有更新，需要重新渲染界面
  watch(customMap, () => {
    if (customMap[moduleName]) {
      if (columnsFlag) {
        updateColumns()
      }
      if (filterFlag) {
        updateFilter()
      }
    }
  })
  return { columns, filter }
}
