<template>
  <div class="app-section">
    <div class="app-btntool">
      <a-space>
        <a-switch
          v-model:checked="navMode"
          checked-children="显示导航"
          un-checked-children="显示全部"
          :checked-value="true"
          :un-checked-value="false"
        />
        <a-button type="primary">刷新</a-button>
        <a-button type="primary">添加一级节点</a-button>
      </a-space>
    </div>
    <a-table
      bordered
      size="middle"
      row-key="action"
      :columns="columns"
      :data-source="data"
      :scroll="{ x: '100%' }"
      default-expand-all-rows
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'authName'">
          <a-tag :color="typeConverter.get(record.type)?.color">{{ typeConverter.get(record.type)?.text }}</a-tag>
          <span>{{ record.authName }}</span>
        </template>
        <!-- <template v-if="column.key === 'type'">
          <a-tag :color="typeConverter.get(record.type)?.color">{{ typeConverter.get(record.type)?.text }}</a-tag>
        </template> -->
        <template v-if="column.key === 'icon'">
          <svg-icon v-if="record.icon" :href="record.icon" style="font-size: 24px" />
        </template>
        <template v-if="column.key === 'onlyAdmin' || column.key === 'showOnNav'">
          <a-tag v-if="record[column.key] === 1" color="success">Yes</a-tag>
          <span v-else></span>
        </template>
        <template v-if="column.key === 'options'">
          <a-button type="link" size="small"><svg-icon href="icon-add" /> 添加下级</a-button>
          <a-button type="link" size="small"> <svg-icon href="icon-edit" />编辑 </a-button>
          <a-popconfirm title="确定要删除吗？">
            <a-button type="link" danger size="small"><svg-icon href="icon-delete" />删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
export default { name: 'Auth' }
</script>
<script lang="ts" setup>
import { Auth } from '@/store/modules/user'
import type { TableColumnProps } from 'ant-design-vue'
import { onMounted, reactive, Ref, ref } from 'vue'

const columns: TableColumnProps[] = [
  { title: '层级/路由/接口/视图', dataIndex: 'authName', key: 'authName', width: 400 },
  // { title: '类型', dataIndex: 'type', key: 'type', width: 80 },
  { title: '权限值', dataIndex: 'action', key: 'action', width: 100 },
  { title: '路由图标', dataIndex: 'icon', key: 'icon', width: 100 },
  { title: '仅管理员', dataIndex: 'onlyAdmin', key: 'onlyAdmin', width: 100 },
  { title: '导航可见', dataIndex: 'showOnNav', key: 'showOnNav', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 100 },
  { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt', width: 100 },
  { title: '操作', dataIndex: 'options', key: 'options', fixed: 'right', width: 230 }
]

const navMode: Ref<boolean> = ref(false)
const typeConverter = new Map([
  [0, { color: 'default', text: '层级' }],
  [1, { color: 'success', text: '路由' }],
  [2, { color: 'warning', text: '接口' }],
  [3, { color: 'processing', text: '视图' }]
])

const data: Auth[] = [
  {
    authName: '工作台',
    action: 'workb',
    type: 1,
    icon: 'icon-appstore',
    showOnNav: 1,
    children: [
      { authName: '查看用户增长分析', action: 'view1', type: 3 },
      { authName: '查看销售总额', action: 'view2', type: 3 }
    ]
  },
  {
    authName: '系统管理',
    action: 'systemM',
    type: 0,
    icon: 'icon-appstore',
    showOnNav: 1,
    children: [
      {
        authName: '用户管理',
        action: 'user',
        type: 1,
        icon: 'icon-appstore',
        showOnNav: 1,
        children: [
          { authName: '用户列表接口', action: 'user/add', type: 2 },
          { authName: '用户新增接口', action: 'user/add', type: 2 },
          { authName: '用户编辑接口', action: 'user/add', type: 2 },
          { authName: '用户删除接口', action: 'user/add', type: 2 }
        ]
      },
      { authName: '角色管理', action: 'role', type: 1, icon: 'icon-appstore', showOnNav: 1 },
      { authName: '权限管理', action: 'auth', type: 1, icon: 'icon-appstore', showOnNav: 1 }
    ]
  },
  {
    authName: '产品管理',
    action: 'productM',
    type: 0,
    icon: 'icon-appstore',
    showOnNav: 1,
    children: [
      { authName: '分类管理', action: 'classify', type: 1, icon: 'icon-appstore', showOnNav: 1 },
      { authName: '产品', action: 'product', type: 1, icon: 'icon-appstore', showOnNav: 1 },
      {
        authName: '产品集',
        action: 'productSet',
        type: 0,
        icon: 'icon-appstore',
        showOnNav: 1,
        children: [
          { authName: '产品集A', action: 'productSetA', type: 1, icon: 'icon-appstore', showOnNav: 1 },
          { authName: '产品集B', action: 'productSetB', type: 1, icon: 'icon-appstore', showOnNav: 1 }
        ]
      }
    ]
  }
]
</script>
<style lang="scss"></style>
