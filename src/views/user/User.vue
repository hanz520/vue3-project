<template>
  <div class="app-section">
    <Search ref="searchRef" :config="filter" @search="doSearchFn"></Search>
  </div>
  <div class="app-section">
    <div class="app-btntool">
      <a-space>
        <customVue module-name="user" :columns="defaultColumns" :filter="defaultFilter" />
        <a-button type="primary" @click="addEditUserFn(null)">新建用户</a-button>
      </a-space>
    </div>
    <a-table
      bordered
      size="middle"
      row-key="username"
      :loading="loading"
      :columns="columns"
      :data-source="list"
      :scroll="{ x: '100%' }"
      :pagination="pagination"
      @change="getListFn"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-switch
            v-model:checked="record.status"
            checked-children="启用"
            un-checked-children="禁用"
            :checked-value="1"
            :un-checked-value="0"
            @change="switchSatutsFn(record)"
          />
        </template>
        <template v-if="column.dataIndex === 'action'">
          <span>
            <a-button type="link" size="small" @click="addEditUserFn(record)">
              <svg-icon href="icon-edit" />编辑
            </a-button>
            <a-button type="link" size="small" @click="resetPasswordFn(record)">
              <svg-icon href="icon-reset-password" />重置密码
            </a-button>
            <a-popconfirm title="确定要删除吗？" @confirm="delUserFn(record)">
              <a-button type="link" danger size="small"><svg-icon href="icon-delete" />删除</a-button>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <aemUserVue ref="aemUserRef" />
  <mResetPasswordVue ref="mResetPasswordRef" />
</template>

<script lang="ts">
export default { name: 'User' }
</script>
<script lang="ts" setup>
import customVue from '@/components/custom'
import Search, { SearchConfig } from '@/components/search/Search.vue'
import useFlag from '@/composition/hooks/useFlag'
import type { TableColumnProps, TableProps, TablePaginationConfig } from 'ant-design-vue'
import { onMounted, reactive, Ref, ref } from 'vue'
import aemUserVue from './aemUser.vue'
import mResetPasswordVue from './mResetPassword.vue'
import { User } from './user'

/**
 * 搜索模块功能
 */
const searchRef: Ref<typeof Search | null> = ref(null)
const defaultFilter: SearchConfig[] = [
  { type: 'input', name: 'username', label: '用户名' },
  { type: 'input', name: 'phone', label: '手机号' },
  { type: 'input', name: 'realName', label: '昵称' },
  {
    type: 'select',
    name: 'role',
    label: '角色',
    options: [
      { label: '运维工程师', value: 1 },
      { label: 'web工程师', value: 2 },
      { label: 'php工程师', value: 3 },
      { label: 'java工程师', value: 4 },
      { label: 'python工程师', value: 5 }
    ]
  }
]

const { filter } = customVue.useCustom('user', { filter: defaultFilter })

// let searchConfig: Ref<SearchConfig[]> = ref(data)
const doSearchFn = () => {
  if (pagination) pagination.current = 1
  getListFn()
}

/**
 * 翻页模块定义
 */
type Pagination = TableProps['pagination']
const pagination: Pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
  showTotal: (t: number) => `共${t}条`
})

/**
 * 列表模块
 */
const defaultColumns: TableColumnProps[] = [
  { title: '用户名', dataIndex: 'username', width: 150 },
  { title: '真实姓名', dataIndex: 'realName', width: 150 },
  { title: '角色', dataIndex: 'role', width: 100 },
  { title: '手机号', dataIndex: 'phone', width: 110 },
  { title: '头像', dataIndex: 'avatar', width: 110 },
  { title: '状态', dataIndex: 'status', width: 80 },
  { title: '最后登录IP', dataIndex: 'lastLoginIp', width: 110 },
  { title: '最后登录时间', dataIndex: 'lastLoginTime', width: 110 },
  { title: '创建时间', dataIndex: 'createAt', width: 110 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 110 },
  { title: '操作', dataIndex: 'action', fixed: 'right', width: 230 }
]
const { columns } = customVue.useCustom('user', { columns: defaultColumns })

const list: Ref<User[]> = ref([])
const [loading, { set: setLoading }] = useFlag(true)
const getListFn = (page: TablePaginationConfig = pagination) => {
  const searchData = searchRef.value?.getSearchData()
  console.log('查询数据', searchData, page)
  setLoading(true)
  setTimeout(() => {
    list.value = [
      {
        id: '1',
        username: 'zhangsan',
        realName: '张三',
        createTime: '2022/02/17 10:35:01',
        role: '运维工程师',
        phone: '18622352024',
        loginTimes: 1920
      },
      {
        id: '2',
        username: 'lisi',
        realName: '李四',
        createTime: '2022/02/25 16:52:31',
        role: 'php工程师',
        phone: '18689653251',
        loginTimes: 120
      },
      {
        id: '3',
        username: 'hanz',
        realName: '汉子',
        createTime: '2021/11/07 12:18:31',
        role: '前端工程师',
        phone: '18565363580',
        loginTimes: 2180
      }
    ]
    pagination.total = 200
    pagination.pageSize = page.pageSize
    pagination.current = page.current
    setLoading(false)
  }, 500)
}
onMounted(() => getListFn())

const switchSatutsFn = (record: User) => {
  console.log(record)
}

const aemUserRef: Ref<typeof aemUserVue | null> = ref(null)
const mResetPasswordRef: Ref<typeof mResetPasswordVue | null> = ref(null)
const addEditUserFn = (record: User | null) => aemUserRef.value?.open(record)
const resetPasswordFn = (record: User) => mResetPasswordRef.value?.open(record)
const delUserFn = (record: User) => console.log(record)
</script>
<style lang="scss"></style>
