<template>
  <a-modal v-model:visible="visible" :title="title" :confirm-loading="confirmLoading" :mask-closable="false" @ok="okFn">
    <a-form :model="formData" :label-col="{ style: { width: '100px' } }" autocomplete="off" :rules="rules">
      <a-form-item label="用户名" v-bind="validateInfos.username">
        <a-input v-model:value="formData.username" />
      </a-form-item>
      <a-form-item label="真实姓名" v-bind="validateInfos.realName">
        <a-input v-model:value="formData.realName" />
      </a-form-item>
      <a-form-item label="手机号码" v-bind="validateInfos.phone">
        <a-input v-model:value="formData.phone" />
      </a-form-item>
      <a-form-item label="密码" v-bind="validateInfos.password">
        <a-input-password v-model:value="formData.password" />
      </a-form-item>
      <a-form-item label="角色" v-bind="validateInfos.roleIds">
        <a-select ref="select" v-model:value="formData.roleIds" style="width: 100%"></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import useFlag from '@/composition/hooks/useFlag'
import { Form } from 'ant-design-vue'
import { computed, reactive, ref, Ref, UnwrapRef } from 'vue'
import { User } from './user'

/**
 * 表单处理
 */
const formData: UnwrapRef<Partial<User>> = reactive({
  username: undefined,
  realName: undefined,
  phone: undefined,
  password: undefined,
  roleIds: undefined
})
const useForm = Form.useForm
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  realName: [{ required: true, message: '请输入真实姓名', trigger: 'change' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
  roleIds: [{ required: true, message: '请选择角色', trigger: 'change' }]
})
const { validate, resetFields, validateInfos } = useForm(formData, rules)

/**
 * 弹框处理
 */
let modalType: Ref<'add' | 'edit'> = ref('add')
const title = computed(() => (modalType.value === 'edit' ? '编辑管理员' : '新增管理员'))
const [visible, { set: setVisible }] = useFlag(false)
const open = (data: User | null) => {
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
