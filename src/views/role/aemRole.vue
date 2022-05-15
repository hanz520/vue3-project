<template>
  <a-modal v-model:visible="visible" :title="title" :confirm-loading="confirmLoading" :mask-closable="false" @ok="okFn">
    <a-form :model="formData" :label-col="{ style: { width: '100px' } }" autocomplete="off" :rules="rules">
      <a-form-item label="角色名称" v-bind="validateInfos.roleName">
        <a-input v-model:value="formData.roleName" />
      </a-form-item>
      <a-form-item label="角色编码" v-bind="validateInfos.role">
        <a-input v-model:value="formData.role" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import useFlag from '@/composition/hooks/useFlag'
import { Form } from 'ant-design-vue'
import { computed, reactive, ref, Ref, UnwrapRef } from 'vue'
import { Role } from './role'

/**
 * 表单处理
 */
const formData: UnwrapRef<Partial<Role>> = reactive({
  roleName: undefined,
  role: undefined
})
const useForm = Form.useForm
const rules = reactive({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
  role: [{ required: true, message: '请输入角色编码', trigger: 'change' }]
})
const { validate, resetFields, validateInfos } = useForm(formData, rules)

/**
 * 弹框处理
 */
let modalType: Ref<'add' | 'edit'> = ref('add')
const title = computed(() => (modalType.value === 'edit' ? '编辑角色' : '新增角色'))
const [visible, { set: setVisible }] = useFlag(false)
const open = (data: Role | null) => {
  modalType.value = data !== null ? 'edit' : 'add'
  // 打开编辑弹框之前先重置表单
  resetFields()
  Object.assign(formData, data)
  setVisible(true)
}

const emits = defineEmits(['done'])
const [confirmLoading, { set: setLoading }] = useFlag(false)
const okFn = async () => {
  const valid = await validate()
  setLoading(true)
  setTimeout(() => {
    console.log('hanzzz', valid)
    emits('done')
    // todo: 调用接口
    setLoading(false)
  }, 1000)
}
defineExpose({ open })
</script>
