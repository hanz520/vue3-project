<template>
  <a-modal v-model:visible="visible" :title="title" :confirm-loading="confirmLoading" :mask-closable="false" @ok="okFn">
    <div style="max-height: calc(100vh - 300px); overflow: auto">
      <a-tree
        v-model:checkedKeys="checkedKeys"
        checkable
        default-expand-all
        :show-line="true && { showLeafIcon: false }"
        :tree-data="authTree"
        :check-strictly="true"
        :field-names="{ key: 'id' }"
      >
        <template #title="{ type, authName }">
          <a-tag :color="typeConverter.get(type)?.color">{{ typeConverter.get(type)?.text }}</a-tag>
          <span>{{ authName }}</span>
        </template>
      </a-tree>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import useFlag from '@/composition/hooks/useFlag'
import { Auth } from '@/store/modules/user'
import { computed, onMounted, reactive, ref, Ref, UnwrapRef } from 'vue'
import { typeConverter } from '../auth/auth-base'
import { Role } from './role'

const authTree: Ref<Auth[]> = ref([])
const getAuthTree = () => {
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
}
onMounted(() => {
  getAuthTree()
})

/**
 * 选中的节点处理
 */
let checkedKeys: Ref<number[]> = ref([])
const getCheckedBerfore = () => {
  setTimeout(() => {
    checkedKeys.value = [1, 3, 5]
  }, 500)
}
/**
 * 弹框处理
 */
const title = '角色配置权限'
const [visible, { set: setVisible }] = useFlag(false)
const open = (data: Role | null) => {
  getCheckedBerfore()
  setVisible(true)
}

const emits = defineEmits(['done'])
const [confirmLoading, { set: setLoading }] = useFlag(false)
const okFn = async () => {
  setLoading(true)
  setTimeout(() => {
    console.log('hanzzz', checkedKeys.value)
    emits('done')
    // todo: 调用接口
    setLoading(false)
  }, 1000)
}
defineExpose({ open })
</script>
