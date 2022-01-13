<template>
  <a-config-provider :locale="zhCN" :auto-insert-space-in-button="false">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import useStorage from './composition/hooks/useStorage'
import { useUserStore } from './store'

// 从storage获取用户信息存到store
const { getItem } = useStorage()
const userInfo = getItem('userInfo')
useUserStore().setUserInfo(userInfo)
</script>

<style lang="scss"></style>
