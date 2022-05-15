<template>
  <div class="app-section">
    <div class="app-btntool">
      <a-button type="primary" @click="addEditRoleFn(null)">新建角色</a-button>
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
            <a-button type="link" size="small" @click="addEditRoleFn(record)">
              <svg-icon href="icon-edit" />编辑
            </a-button>
            <a-button type="link" size="small" @click="setAuthFn(record)">
              <svg-icon href="icon-setting" />配置权限
            </a-button>
            <a-popconfirm title="确定要删除吗？" @confirm="delRoleFn(record)">
              <a-button type="link" danger size="small"><svg-icon href="icon-delete" />删除</a-button>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <aemRoleVue ref="aemRoleRef" />
  <mSetAuthVue ref="mSetAuthRef" />
</template>

<script lang="ts">
export default { name: 'Role' }
</script>
<script lang="ts" setup>
import useFlag from '@/composition/hooks/useFlag'
import type { TableColumnProps, TableProps, TablePaginationConfig } from 'ant-design-vue'
import { onMounted, reactive, Ref, ref } from 'vue'
import aemRoleVue from './aemRole.vue'
import mSetAuthVue from './mSetAuth.vue'
import { Role } from './role'

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
  { title: '角色名', dataIndex: 'roleName', width: 150 },
  { title: '角色码', dataIndex: 'role', width: 150 },
  { title: '状态', dataIndex: 'status', width: 80 },
  { title: '创建时间', dataIndex: 'createAt', width: 110 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 110 },
  { title: '操作', dataIndex: 'action', fixed: 'right', width: 230 }
]
const [loading, { set: setLoading }] = useFlag(true)

let list: Ref<Role[]> = ref([])

const getListFn = (page: TablePaginationConfig = pagination) => {
  console.log('查询数据', page)
  setLoading(true)
  setTimeout(() => {
    list.value = [
      {
        id: '1',
        roleName: '超级管理员',
        role: 'admin',
        status: 1
      },
      {
        id: '2',
        roleName: '商城运营',
        role: 'scyy',
        status: 1
      },
      {
        id: '3',
        roleName: '研发工程师',
        role: 'yyggs',
        status: 1
      }
    ]
    pagination.total = 200
    pagination.pageSize = page.pageSize
    pagination.current = page.current
    setLoading(false)
  }, 500)
}
onMounted(() => getListFn())

const switchSatutsFn = (record: Role) => {
  console.log(record)
}

const aemRoleRef: Ref<typeof aemRoleVue | null> = ref(null)
const mSetAuthRef: Ref<typeof mSetAuthVue | null> = ref(null)
const addEditRoleFn = (record: Role | null) => aemRoleRef.value?.open(record)
const setAuthFn = (record: Role) => mSetAuthRef.value?.open(record)
const delRoleFn = (record: Role) => console.log(record)
</script>
<style lang="scss"></style>
