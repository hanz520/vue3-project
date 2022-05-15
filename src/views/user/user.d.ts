// todo: 此处取消Partial
export type User = Partial<{
  id: string
  username: string
  password: string
  phone: string
  avatar?: string
  loginTimes: number
  realName: string
  lastLoginIp: string
  lastLoginTime: string
  createAt: string
  updatedAt: string
  [k: string]: any
}>
