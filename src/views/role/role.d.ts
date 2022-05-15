export interface Role {
  id?: string
  roleName: string // 角色名称
  role: string // 角色编码
  status: number // 角色状态
  [k: string]: any
}
