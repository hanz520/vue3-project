<template>
  <a-form layout="inline" :model="searchData">
    <a-form-item label="用户名">
      <a-input v-model:value="searchData.fieldA" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model:value="searchData.fieldB" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="searchData.fieldC" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="角色">
      <a-select v-model:value="searchData.fieldD" placeholder="请选择" style="width: 120px">
        <a-select-option value="1">运维工程师</a-select-option>
        <a-select-option value="2">web工程师</a-select-option>
        <a-select-option value="3">php工程师</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary">搜索</a-button>
    </a-form-item>
    <a-form-item>
      <a-button>重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
export default { name: 'Auth' }
</script>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const searchData = reactive({
  fieldA: '',
  fieldB: '',
  fieldC: '',
  fieldD: ''
})
</script>

<style lang="scss" scoped>
.ant-form-inline {
  margin-bottom: -10px;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
