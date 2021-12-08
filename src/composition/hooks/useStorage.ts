/**
 * useStorage存储的信息分为两块：
 *    1.退出登录后需要清除的信息，如：用户信息等  'login'
 *    2.退出登录后不需要清除的信息，如皮肤，表格列显示等信息  'permanent'
 *    3.sessionStorage  'session'
 *
 */
enum storageType {
  'login' = 'login',
  'permanent' = 'permanent',
  'session' = 'session'
}
type StorageType = keyof typeof storageType
type SetItemType = (name: string, value: any, type?: StorageType) => void
type DelItemType = (name: string, type?: StorageType) => void
type GetItemType = (name: string, type?: StorageType) => any
type DieType = (type?: StorageType) => void
type ListType = () => any
// type SetZoneNameType = (zoneName: string) => void

export interface StorageController {
  /**
   *  @function setItem  保存数据
   *    @param {string} name 保存的数据名
   *    @param {any} value 需要保存的数据
   *    @param {StorageType} type 存储的类型
   */
  setItem: (name: string, value: any, type?: StorageType) => void
  /**
   * @function delItem  删除数据
   *    @param {string} name 数据名
   *    @param {StorageType} type 存储类型
   */
  delItem: (name: string, type?: StorageType) => void
  /**
   *  @function getItem  获取数据
   *    @param {string} name 数据名
   *    @param {StorageType} type 存储类型
   *    @returns {any} 有相关数据则返回数据，没有返回null
   */
  getItem: (name: string, type?: StorageType) => any
  /**
   *  @function die  清空数据
   *    @param {StorageType} type 存储类型
   */
  die: (type?: StorageType) => void
  /**
   * @function list 返回所有的数据
   */
  list: () => any
  /**
   * @function show 查看所有的数据
   */
  show: () => void
  /**
   * @function setZoneName 自定义数据空间的名称，默认为dataZone，改不改其实没什么卵用，适用于强迫症患者
   */
  setZoneName: (zoneName: string) => void
}

export default function useStorage(): StorageController {
  const LS = window.localStorage
  const SS = window.sessionStorage

  /**
   *
   * 获取空间名前缀
   */
  const getPrefix = () => {
    return LS.getItem('customDataZoneName') || 'dataZone'
  }

  /**
   * 第一个字母大写
   * @param str
   * @returns
   */
  const titleCase = (str: string) => {
    const arr = str.split('')
    arr[0] = arr[0].toUpperCase()
    return arr.join('')
  }

  /**
   * 根据存储类型存储返回存储空间名 和 storage
   * @param type
   */
  const getName = (type: StorageType) => {
    const dataName: string = getPrefix() + titleCase(type)
    const storage = type == 'session' ? SS : LS
    return { dataName: dataName, storage }
  }

  const setItem: SetItemType = (name, value, type = 'login') => {
    const { dataName, storage } = getName(type)
    // JSON.parse 解析null 还是为null
    let obj = JSON.parse(storage.getItem(dataName) as string)
    if (obj == null) {
      obj = {}
    }
    obj[name] = value
    storage.setItem(dataName, JSON.stringify(obj))
  }

  const delItem: DelItemType = (name, type = 'login') => {
    const { dataName, storage } = getName(type)
    const obj = JSON.parse(storage.getItem(dataName) as string)
    if (obj === null) {
      return false
    } else {
      if (obj[name] !== undefined) {
        delete obj[name]
        storage.setItem(dataName, JSON.stringify(obj))
      }
    }
  }

  const getItem: GetItemType = (name, type = 'login') => {
    const { dataName, storage } = getName(type)
    const obj = JSON.parse(storage.getItem(dataName) as string)
    if (obj !== null && obj[name] !== undefined) {
      return obj[name]
    }
    return null
  }
  const die: DieType = (type = 'login') => {
    const { dataName, storage } = getName(type)
    storage.removeItem(dataName)
  }
  const list: ListType = () => {
    return {
      [getPrefix() + 'Permanent']: JSON.parse(LS.getItem(getName('permanent').dataName) as string),
      [getPrefix() + 'Login']: JSON.parse(LS.getItem(getName('login').dataName) as string),
      [getPrefix() + 'Session']: JSON.parse(SS.getItem(getName('session').dataName) as string)
    }
  }
  const show = () => {
    const showObj = list()
    for (const key in showObj) {
      console.info(key, showObj[key])
    }
  }

  const setZoneName = (zoneName: string) => {
    if (zoneName === getPrefix()) {
      return false
    }
    Object.keys(storageType).forEach((type) => {
      const { dataName, storage } = getName(<StorageType>type)
      const storageData = storage.getItem(dataName)
      if (storageData) {
        storage.setItem(zoneName + titleCase(type), storageData)
        storage.removeItem(dataName)
      }
    })
    LS.setItem('customDataZoneName', zoneName)
  }

  return {
    setItem,
    delItem,
    getItem,
    die,
    list,
    show,
    setZoneName
  }
}
