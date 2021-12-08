<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import useStorage from './composition/hooks/useStorage'
import { useUserStore } from './store'

// 从storage获取用户信息存到store
const { getItem } = useStorage()
const userInfo = getItem('userInfo')
useUserStore().setUserInfo(userInfo)
</script>

<style lang="scss"></style>
