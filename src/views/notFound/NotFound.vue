<template>
  <div class="app-not-found">
    <img src="@/assets/404error.png" />
    <p class="app-not-found__text">未找到当前页面， <a-button type="link" @click="backHome">返回首页</a-button></p>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const backHome = () => {
  router.push('/')
}
</script>

<style lang="scss">
.app-not-found {
  width: 800px;
  margin: 0 auto;
  padding-top: 100px;
  text-align: center;
  img {
    width: 100%;
  }
  &__text {
    margin-top: -70px;
    font-size: 16px;
    .ant-btn-link {
      font-size: 16px;
      padding: 0;
    }
  }
}
</style>
