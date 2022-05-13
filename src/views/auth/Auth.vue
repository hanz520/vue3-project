<template>
  <div class="app-section">
    <div class="app-btntool">
      <a-space>
        <a-button type="primary" :loading="loading" @click="getAuthTreeFn">刷新</a-button>
        <a-button type="primary" @click="addFn(null)">添加一级节点</a-button>
      </a-space>
    </div>
    <a-table
      bordered
      size="middle"
      row-key="action"
      :loading="loading"
      :columns="columns"
      :data-source="authTree"
      :scroll="{ x: '100%' }"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'authName'">
          <a-tag :color="typeConverter.get(record.type)?.color">{{ typeConverter.get(record.type)?.text }}</a-tag>
          <span>{{ record.authName }}</span>
        </template>
        <template v-if="column.key === 'icon'">
          <svg-icon v-if="record.icon" :href="record.icon" style="font-size: 24px" />
        </template>
        <template v-if="column.key === 'onlyAdmin' || column.key === 'showOnNav'">
          <a-tag v-if="record[column.key] === 1" color="success">Yes</a-tag>
          <span v-else></span>
        </template>
        <template v-if="column.key === 'options'">
          <a-button
            type="link"
            size="small"
            :disabled="record.type === authType.interface || record.type === authType.view"
            @click="addFn(record)"
          >
            <svg-icon href="icon-add" />添加下级
          </a-button>
          <a-button type="link" size="small" @click="editFn(record)"> <svg-icon href="icon-edit" />编辑 </a-button>
          <a-popconfirm
            title="确定要删除吗？"
            :disabled="!!record.children && record.children.length > 0"
            @confirm="delFn(record)"
          >
            <a-button type="link" danger size="small" :disabled="!!record.children && record.children.length > 0">
              <svg-icon href="icon-delete" />删除
            </a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
  <aemAuthVue ref="aemAuthRef" :auth-tree="authTree" @done="getAuthTreeFn" />
</template>
<script lang="ts">
export default { name: 'Auth' }
</script>
<script lang="ts" setup>
import useFlag from '@/composition/hooks/useFlag'
import { Auth, authType } from '@/store/modules/user'
import type { TableColumnProps } from 'ant-design-vue'
import { onMounted, Ref, ref } from 'vue'
import aemAuthVue from './aemAuth.vue'
import { typeConverter } from './auth-base'

/**
 * 定义表列
 */
const columns: TableColumnProps[] = [
  { title: '层级/路由/接口/视图', dataIndex: 'authName', key: 'authName', width: 400 },
  { title: '权限值', dataIndex: 'action', key: 'action', width: 100 },
  { title: '路由图标', dataIndex: 'icon', key: 'icon', width: 100 },
  { title: '仅管理员', dataIndex: 'onlyAdmin', key: 'onlyAdmin', width: 100 },
  { title: '导航可见', dataIndex: 'showOnNav', key: 'showOnNav', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 100 },
  { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt', width: 100 },
  { title: '操作', dataIndex: 'options', key: 'options', fixed: 'right', width: 230 }
]

/**
 * 权限树数据
 */
const authTree: Ref<Auth[]> = ref([])
const [loading, { set: setLoading }] = useFlag(false)
const getAuthTreeFn = () => {
  setLoading(true)
  setTimeout(() => {
    authTree.value = [
      {
        id: 1,
        authName: '工作台',
        action: 'workb',
        type: 1,
        icon: 'icon-appstore',
        showOnNav: 1,
        children: [
          { id: 2, authName: '查看用户增长分析', action: 'view1', type: 3 },
          { id: 3, authName: '查看销售总额', action: 'view2', type: 3 }
        ]
      },
      {
        id: 4,
        authName: '系统管理',
        action: 'systemM',
        type: 0,
        icon: 'icon-appstore',
        showOnNav: 1,
        children: [
          {
            id: 5,
            authName: '用户管理',
            action: 'user',
            type: 1,
            icon: 'icon-appstore',
            showOnNav: 1,
            children: [
              { id: 6, authName: '用户列表接口', action: 'user/add', type: 2 },
              { id: 7, authName: '用户新增接口', action: 'user/add', type: 2 },
              { id: 8, authName: '用户编辑接口', action: 'user/add', type: 2 },
              { id: 9, authName: '用户删除接口', action: 'user/add', type: 2 }
            ]
          },
          { id: 10, authName: '角色管理', action: 'role', type: 1, icon: 'icon-appstore', showOnNav: 1 },
          { id: 11, authName: '权限管理', action: 'auth', type: 1, icon: 'icon-appstore', showOnNav: 1 }
        ]
      },
      {
        id: 12,
        authName: '产品管理',
        action: 'productM',
        type: 0,
        icon: 'icon-appstore',
        showOnNav: 1,
        children: [
          { id: 13, authName: '分类管理', action: 'classify', type: 1, icon: 'icon-appstore', showOnNav: 1 },
          { id: 14, authName: '产品', action: 'product', type: 1, icon: 'icon-appstore', showOnNav: 1 },
          {
            id: 15,
            authName: '产品集',
            action: 'productSet',
            type: 0,
            icon: 'icon-appstore',
            showOnNav: 1,
            children: [
              { id: 16, authName: '产品集A', action: 'productSetA', type: 1, icon: 'icon-appstore', showOnNav: 1 },
              { id: 17, authName: '产品集B', action: 'productSetB', type: 1, icon: 'icon-appstore', showOnNav: 1 }
            ]
          }
        ]
      }
    ]
    setLoading(false)
  }, 1000)
}
onMounted(() => {
  getAuthTreeFn()
})

/**
 * 权限树操作
 */
const aemAuthRef: Ref<typeof aemAuthVue | null> = ref(null)
const addFn = (record: Auth | null) => {
  aemAuthRef.value?.open(null, record ? record.id : 0)
}
const editFn = (record: Auth) => {
  aemAuthRef.value?.open(record, record.parentId)
}
const delFn = (record: Auth) => {
  console.log('删除权限', record)
}
</script>
<style lang="scss"></style>
