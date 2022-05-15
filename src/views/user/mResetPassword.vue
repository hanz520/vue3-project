<template>
  <a-modal v-model:visible="visible" :title="title" :confirm-loading="confirmLoading" :mask-closable="false" @ok="okFn">
    <a-form :model="formData" :label-col="{ style: { width: '100px' } }" autocomplete="off" :rules="rules">
      <a-form-item label="密码" v-bind="validateInfos.password">
        <a-input-password v-model:value="formData.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import useFlag from '@/composition/hooks/useFlag'
import { Form } from 'ant-design-vue'
import { reactive, UnwrapRef } from 'vue'
import { User } from './user'

/**
 * 表单处理
 */
const formData: UnwrapRef<Partial<User>> = reactive({
  password: undefined
})
const useForm = Form.useForm
const rules = reactive({
  password: [{ required: true, message: '请输入密码', trigger: 'change' }]
})
const { validate, resetFields, validateInfos } = useForm(formData, rules)

/**
 * 弹框处理
 */
const title = '重置密码'
const [visible, { set: setVisible }] = useFlag(false)
const open = (data: User) => {
  // 打开编辑弹框之前先重置表单
  resetFields()
  console.log(data)
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
