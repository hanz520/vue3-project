/**
 * 自定义表格列、搜索项、操作按钮等
 */

import useStorage from '@/composition/hooks/useStorage'
import { message, TableColumnProps } from 'ant-design-vue'
import { defineStore } from 'pinia'

interface CustomOption {
  column: TableColumnProps[]
  filter: any[]
  button: any[]
}

interface customState {
  defaultMap: { [k: string]: CustomOption } // 当前模块默认的配置数据
  customMap: { [k: string]: CustomOption } // 存起来的表格列、搜索项、操作按钮的顺序和是否显示等
}

/**
 * 具体实现
 */
export const useCustomStore = defineStore({
  id: 'custom',
  state(): customState {
    return {
      defaultMap: {},
      customMap: {}
    }
  },
  actions: {
    // 从本地或者数据库获取配置项
    getOptionFromDB(moduleName: string): Promise<CustomOption> {
      return new Promise((reslove) => {
        setTimeout(() => {
          const { getItem } = useStorage()
          const map = getItem('customMap')
          reslove(map ? map[moduleName] : {})
        }, 500)
      })
    },
    setOptionToDB() {
      const { setItem } = useStorage()
      setItem('customMap', this.customMap)
      message.success('保存成功')
    },
    async getOption(moduleName: string) {
      // 从map获取
      let option: CustomOption | undefined = this.customMap[moduleName]
      if (option) return option
      // 从本地或者数据库获取，并更新到map
      option = await this.getOptionFromDB(moduleName)
      this.customMap[moduleName] = option
      return option
    },
    setColumn(moduleName: string, columns: TableColumnProps[]) {
      this.customMap[moduleName].column = [...columns]
      this.setOptionToDB()
    },
    async getColumn(moduleName: string, columns: TableColumnProps[]): Promise<TableColumnProps[]> {
      const option = await this.getOption(moduleName)
      if (this.defaultMap[moduleName] === undefined) {
        this.defaultMap[moduleName] = { column: columns, filter: [], button: [] }
      } else {
        this.defaultMap[moduleName].column = columns
      }
      return [...(option?.column ?? columns)]
    },
    setFilter(moduleName: string, filter: any[]) {
      this.customMap[moduleName].filter = [...filter]
      this.setOptionToDB()
    },
    async getFilter(moduleName: string, filter: any[]): Promise<any[]> {
      const option = await this.getOption(moduleName)
      if (this.defaultMap[moduleName] === undefined) {
        this.defaultMap[moduleName] = { filter: filter, column: [], button: [] }
      } else {
        this.defaultMap[moduleName].filter = filter
      }
      return [...(option?.filter ?? filter)]
    }
  }
})
