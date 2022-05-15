<template>
  <a-modal v-model:visible="visible" :title="title" :confirm-loading="confirmLoading" :mask-closable="false" @ok="okFn">
    <a-form
      ref="formRef"
      :model="formData"
      name="basic"
      :label-col="{ style: { width: '100px' } }"
      autocomplete="off"
      :rules="rules"
    >
      <a-form-item label="上级节点" name="parentId">
        <a-tree-select
          key="action"
          v-model:value="formData.parentId"
          :tree-line="true && { showLeafIcon: false }"
          :field-names="{ value: 'id' }"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '450px', overflow: 'auto' }"
          placeholder="请选择节点"
          allow-clear
          tree-default-expand-all
          :tree-data="authTreeFilter"
        >
          <template #title="{ id, type, authName }">
            <a-tag v-if="id === 0" color="default">虚拟节点</a-tag>
            <a-tag v-else :color="typeConverter.get(type)?.color">{{ typeConverter.get(type)?.text }}</a-tag>
            <span>{{ authName }}</span>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item label="类型" name="type">
        <a-select ref="select" v-model:value="formData.type" style="width: 100%" :options="typeOptions"></a-select>
      </a-form-item>
      <a-form-item label="节点名称" name="authName">
        <a-input v-model:value="formData.authName" />
      </a-form-item>

      <template v-if="formData.type === authType.route">
        <a-form-item label="路由名" name="action">
          <a-input v-model:value="formData.action" />
        </a-form-item>
        <a-form-item label="导航图标" name="icon">
          <a-input v-model:value="formData.icon" />
        </a-form-item>
        <a-form-item label="导航可见" name="showOnNav">
          <a-switch
            v-model:checked="formData.showOnNav"
            checked-children="是"
            un-checked-children="否"
            :checked-value="1"
            :un-checked-value="0"
          />
        </a-form-item>
      </template>

      <template v-else-if="formData.type === authType.interface">
        <a-form-item label="权限值" name="action">
          <a-input v-model:value="formData.action" />
        </a-form-item>
      </template>

      <template v-else-if="formData.type === authType.view">
        <a-form-item label="视图名" name="action">
          <a-input v-model:value="formData.action" />
        </a-form-item>
      </template>

      <a-form-item label="仅admin权限" name="onlyAdmin">
        <a-switch
          v-model:checked="formData.onlyAdmin"
          checked-children="是"
          un-checked-children="否"
          :checked-value="1"
          :un-checked-value="0"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { uuid } from '@/common/ts/tools'
import useFlag from '@/composition/hooks/useFlag'
import { Auth, authType } from '@/store/modules/user'
import { Form } from 'ant-design-vue'
import { computed, reactive, ref, Ref, toRaw, UnwrapRef } from 'vue'
import { typeConverter, typeOptions } from './auth-base'

/**
 * 父组件传参接收
 */
interface PropsType {
  authTree: Auth[]
}
const props = defineProps<PropsType>()

/**
 * 过滤可选择的上级节点
 */
const filter = (list: Auth[]) => {
  return list.filter((item) => {
    if (item.children && item.children.length > 0) item.children = filter(item.children)
    return item.type === authType.level || item.type === authType.route
  })
}
const authTreeFilter = computed(() => {
  const tree: Auth = {
    id: 0,
    authName: '根节点',
    action: 'root',
    type: 0,
    children: filter(props.authTree)
  }
  return [tree]
})

/**
 * 打开弹框，并初始化界面
 */
let formData: UnwrapRef<Partial<Auth>> = reactive({})
let modalType: Ref<'add' | 'edit'> = ref('add')
const title = computed(() => (modalType.value === 'edit' ? '编辑权限' : '新增权限'))
const [visible, { set: setVisible }] = useFlag(false)
const open = (data: Auth | null, parentId: number) => {
  modalType.value = data !== null ? 'edit' : 'add'
  formRef.value?.resetFields()
  Object.assign(formData, { parentId, type: 0, authName: null, action: null, icon: null, onlyAdmin: 0 }, data)
  setVisible(true)
}

/**
 * 校验规则
 */
const rules = {
  authName: [{ required: true, message: '请输入节点名称', trigger: 'change' }],
  action: [{ required: true, message: '请输入权限值', trigger: 'change' }],
  icon: [{ required: true, message: '请输入图标样式名', trigger: 'change' }]
}

const emits = defineEmits(['done'])
const [confirmLoading, { set: setLoading }] = useFlag(false)
const formRef: Ref<typeof Form | null> = ref(null)
const okFn = async () => {
  setLoading(true)
  const valid = await formRef.value?.validate().catch(() => setLoading(false))
  if (valid) {
    const params = { ...toRaw(formData) }
    // 如果是层级，自动生成一个uuid当做action
    if (params.type === authType.level) {
      params.action = uuid()
    }
    // 过滤掉多余的传参
    if (params.type !== authType.level) {
      delete params.icon
      delete params.showOnNav
    }
    // todo: 调用接口
    console.log(params)
    setLoading(false)
    emits('done')
  }
}
defineExpose({ open })
</script>
