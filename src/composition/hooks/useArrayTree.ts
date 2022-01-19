interface AT {
  [k: string]: any
}

interface extraFn<K> {
  (current: K, parent?: K): K
}
interface ArrayTreeFn {
  <T extends AT>(treeArray: T[], extra?: (current: T, parent?: T) => T, parent?: T): T[]
}

export interface ArrayTreeController {
  treeToArray: ArrayTreeFn
}

export default function useArrayTree(): ArrayTreeController {
  /**
   *
   * @param treeArray 需要进行转化为数组的树形数据
   * @param extra  用于再进行才做的时候,给每一次遍历附加进去对应的逻辑
   * @returns
   */
  const treeToArray: ArrayTreeFn = <T extends AT>(treeArray: T[], extra?: extraFn<T>, parent?: T) => {
    return treeArray.reduce((result: T[], current: T) => {
      const { children, ...others } = current
      let currentCopy = { ...others } as T
      if (extra) {
        currentCopy = extra(current, parent)
      }
      result.push(currentCopy)
      if (children) {
        result = [...result, ...treeToArray(children, extra, current)]
      }
      return result
    }, [])
  }

  return {
    treeToArray
  }
}
