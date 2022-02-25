<template>
  <div class="app-section" style="margin-bottom: 15px">
    <Search />
  </div>
  <div class="app-section">
    <div class="app-btntool">
      <a-button type="primary">新建用户</a-button>
    </div>
    <a-table
      bordered
      :columns="columns"
      :row-key="(record: any) => record.username"
      :data-source="list"
      :scroll="{ x: true }"
      :pagination="pagination"
      :loading="loading"
      size="middle"
      @change="getListFn"
    >
      <template #action="{ record }">
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
    </a-table>
  </div>
</template>

<script lang="ts">
export default { name: 'User' }
</script>
<script lang="ts" setup>
import Search from '@/components/search/Search.vue'
import useFlag from '@/composition/hooks/useFlag'
import { ColumnProps, TableState } from 'ant-design-vue/lib/table/interface'
import { onMounted, reactive, Ref, ref } from 'vue'

const columns: ColumnProps[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 150
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 150
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: 150
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 100
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 110
  },
  {
    title: '登录次数',
    dataIndex: 'loginTimes',
    width: 80
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 150,
    slots: { customRender: 'action' }
  }
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

type Pagination = TableState['pagination']
const pagination: Pagination = reactive({
  pageSize: 20,
  total: 0,
  showTotal: (t: number) => `共${t}条`
})

const getListFn = (page: Pagination = pagination) => {
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
    setLoading(false)
  }, 1500)
}
onMounted(() => {
  getListFn()
})

const editUser = (record: ListItem) => console.log(record)
const resetPassword = (record: ListItem) => console.log(record)
const deleteUser = (record: ListItem) => console.log(record)
</script>
<style lang="scss">
.app-section {
  background: #fff;
  padding: 20px;
}
.app-btntool {
  text-align: right;
  padding-bottom: 20px;
}
</style>
