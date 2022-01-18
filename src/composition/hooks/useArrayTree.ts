import { cloneDeep } from 'lodash'
interface AT {
  pname?: string | null
  [k: string]: any
}

interface ArrayTreeFn {
  <T extends AT>(treeArray: T[], key?: string, pname?: string | null): T[]
}

export interface ArrayTreeController {
  treeToArray: ArrayTreeFn
}

export default function useArrayTree(): ArrayTreeController {
  /**
   *
   * @param treeArray 需要进行转化为数组的树形数据
   * @param key  用来给子元素设置pname的字段名称，如果为undefined，说明数据里面自带父子关系，不需要再设置
   * @param pname 父元素的字段名称值
   * @returns
   */
  const treeToArray: ArrayTreeFn = <T extends AT>(treeArray: T[], key?: string, pname?: string | null) => {
    return treeArray.reduce((result: T[], current: T) => {
      const item: T = cloneDeep(current)
      const children: T[] = item.children
      delete item.children
      if (!key) {
        result.push(item)
        if (children) {
          result = [...result, ...treeToArray(children)]
        }
      } else {
        item.pname = pname
        result.push(item)
        if (children) {
          result = [...result, ...treeToArray(children, key, item[key])]
        }
      }
      return result
    }, [])
  }

  return {
    treeToArray
  }
}
