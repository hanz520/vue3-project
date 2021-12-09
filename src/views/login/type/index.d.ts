// 登录信息的类型
export interface LoginData {
  username: string
  password: string
  captcha?: string
}

// 登录信息校验规则的类型
export type rulesType = {
  [k in keyof LoginData]?: any
}
