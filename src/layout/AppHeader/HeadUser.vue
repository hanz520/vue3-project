<template>
  <a-popover placement="bottom" overlay-class-name="app-head-user-popover">
    <template #content>
      <div class="app-head-user-dropdown">
        <div class="app-head-user-dropdown__item"><SvgIcon href="icon-user" /> 个人信息</div>
        <div class="app-head-user-dropdown__item"><SvgIcon href="icon-setting" /> 设置</div>
        <div class="app-head-user-dropdown__item" @click="logout"><SvgIcon href="icon-logout" />退出</div>
      </div>
    </template>
    <div class="app-head-user">
      <div class="app-head-user__avatar">
        <img src="@/assets/avatar.jpg" />
      </div>
      <div class="app-head-user__name">年少不识愁滋味</div>
      <div class="app-head-user__icon"><SvgIcon href="icon-down" /></div>
    </div>
  </a-popover>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  const userStore = useUserStore()
  userStore.setUserInfo(null)
  router.push({ name: 'login' })
}
</script>

<style lang="scss">
.app-head-user {
  $headUser: &;
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #f3f3f3;
  }
  &__avatar {
    width: 30px;
    height: 30px;
    font-size: 0;
    line-height: 0;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__icon {
    margin-left: 5px;
    transition: 0.1s ease transform;
    .svg-icon {
      font-size: 12px;
    }
    // #{$headUser}:hover & {
    //   transform: rotate(180deg);
    // }
  }
}
.app-head-user-dropdown {
  width: 150px;
  &__item {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    cursor: pointer;
    &:hover {
      background: #1890ff;
      color: #fff;
    }
    .svg-icon {
      margin-right: 10px;
    }
  }
}
.app-head-user-popover .ant-popover-inner-content {
  padding: 10px 0;
}
</style>
