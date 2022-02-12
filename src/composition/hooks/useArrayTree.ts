interface AT {
  parent?: AT | null
  children?: any[]
  [k: string]: any
}

interface extraFn<K> {
  (current: K, parent?: K): K
}
interface TreeToArrayFn {
  <T extends AT>(treeList: T[], extra?: (current: T, parent?: T) => T, parent?: T): T[]
}

interface ArrayToTreeFn {
  <T extends AT>(list: T[], pidKey: string, key: string, pid?: string | null): T[]
}

export interface ArrayTreeController {
  treeToArray: TreeToArrayFn
  arrayToTree: ArrayToTreeFn
}

export default function useArrayTree(): ArrayTreeController {
  /**
   *
   * @param treeList 需要进行转化为数组的树形数据
   * @param extra  用于再进行才做的时候,给每一次遍历附加进去对应的逻辑
   * @returns
   */
  const treeToArray = <T extends AT>(treeList: T[], extra?: extraFn<T>, parent?: T) => {
    return treeList.reduce((result: T[], current: T) => {
      const { children, ...others } = current
      let currentCopy = { ...others } as T
      const newParent = { ...others } as T
      if (extra) {
        currentCopy = extra(current, parent)
      } else {
        currentCopy.parent = parent || null
      }
      result.push(currentCopy)
      if (children) {
        result = [...result, ...treeToArray(children, extra, newParent)]
      }
      return result
    }, [])
  }

  /**
   *
   * @param list 待转换为树的数组
   * @param pidKey 用来标识父元素的标识符， 如：{pId: 0, id: 1, name: 'hanz'}，此时pidKey传递值为'pId'
   * @param key 元素的主键， 如：{pId: 0, id: 1, name: 'hanz'}，此时key传递值为'id'
   * @param pid 父元素的主键值 如：{pId: 0, id: 1, name: 'hanz'}，pid的值为0
   * @returns
   */
  const arrayToTree = <T extends AT>(list: T[], pidKey: string, key: string, pid: string | null = null) => {
    return list.reduce((result, current) => {
      if ((!pid && !current[pidKey]) || (pid && current[pidKey] == pid)) {
        const children = arrayToTree(list, pidKey, key, current[key])
        if (children.length > 0) {
          current.children = children
        }
        result.push(current)
      }
      return result
    }, <T[]>[])
  }

  return {
    treeToArray,
    arrayToTree
  }
}
