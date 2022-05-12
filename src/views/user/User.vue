<template>
  <div class="app-section">
    <Search ref="searchRef" :config="searchConfig" @search="doSearchFn"></Search>
  </div>
  <div class="app-section">
    <div class="app-btntool">
      <a-button type="primary">新建用户</a-button>
    </div>
    <a-table
      bordered
      size="middle"
      row-key="username"
      :loading="loading"
      :columns="columns"
      :data-source="list"
      :scroll="{ x: true }"
      :pagination="pagination"
      @change="getListFn"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a-button type="link" size="small" @click="editUser(record)"><svg-icon href="icon-edit" />编辑</a-button>
            <a-button type="link" size="small" @click="resetPassword(record)">
              <svg-icon href="icon-reset-password" />重置密码
            </a-button>
            <a-popconfirm title="确定要删除吗？" @confirm="deleteUser(record)">
              <a-button type="link" danger size="small"><svg-icon href="icon-delete" />删除</a-button>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
export default { name: 'User' }
</script>
<script lang="ts" setup>
import Search, { SearchConfig } from '@/components/search/Search.vue'
import useFlag from '@/composition/hooks/useFlag'
import type { TableColumnProps, TableProps, TablePaginationConfig } from 'ant-design-vue'
import { onMounted, reactive, Ref, ref } from 'vue'

/**
 * 搜索模块功能
 */
const searchRef: Ref<typeof Search | null> = ref(null)
const data: SearchConfig[] = [
  { type: 'input', name: 'username', label: '用户名' },
  { type: 'input', name: 'phone', label: '手机号' },
  { type: 'input', name: 'nickname', label: '昵称' },
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
let searchConfig: Ref<SearchConfig[]> = ref(data)
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
const columns: TableColumnProps[] = [
  { title: '用户名', dataIndex: 'username', width: 150 },
  { title: '昵称', dataIndex: 'nickname', width: 150 },
  { title: '注册时间', dataIndex: 'createTime', width: 150 },
  { title: '角色', dataIndex: 'role', width: 100 },
  { title: '手机号', dataIndex: 'phone', width: 110 },
  { title: '操作', dataIndex: 'action', key: 'action', fixed: 'right', width: 270 }
]
const [loading, { set: setLoading }] = useFlag(true)
type ListItem = {
  id: string
  username: string
  nickname: string
  createTime: string
  role: string
  phone: string
  loginTimes: number
  // [k: string]: any
}
let list: Ref<ListItem[]> = ref([])

const getListFn = (page: TablePaginationConfig = pagination) => {
  const searchData = searchRef.value?.getSearchData()
  console.log('查询数据', searchData, page)
  setLoading(true)
  setTimeout(() => {
    list.value = [
      {
        id: '1',
        username: 'zhangsan',
        nickname: '张三',
        createTime: '2022/02/17 10:35:01',
        role: '运维工程师',
        phone: '18622352024',
        loginTimes: 1920
      },
      {
        id: '2',
        username: 'lisi',
        nickname: '李四',
        createTime: '2022/02/25 16:52:31',
        role: 'php工程师',
        phone: '18689653251',
        loginTimes: 120
      },
      {
        id: '3',
        username: 'hanz',
        nickname: '汉子',
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
  }, 1500)
}
onMounted(() => getListFn())

const editUser = (record: ListItem) => console.log(record)
const resetPassword = (record: ListItem) => console.log(record)
const deleteUser = (record: ListItem) => console.log(record)
</script>
<style lang="scss"></style>
