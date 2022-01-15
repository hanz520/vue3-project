<template>
  <div class="login">
    <div class="login__wrap" :class="{ 'login__wrap--captcha': showCaptcha }">
      <div class="login__title">数据管理系统</div>
      <a-divider />
      <a-form ref="formRef" class="login__form" :model="loginData" :rules="rules">
        <a-form-item name="username">
          <a-input v-model:value="loginData.username" :maxlength="16" placeholder="用户名" />
        </a-form-item>
        <a-form-item name="password">
          <a-input
            v-model:value="loginData.password"
            :type="passwordType"
            :maxlength="16"
            placeholder="密码"
            @keydown.enter="submit"
          >
            <template #suffix>
              <svg-icon class="password-see" :href="iconHref" @click="toggle" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-if="showCaptcha" name="captcha">
          <a-row type="flex">
            <a-col :span="16"><a-input v-model:value="loginData.captcha" placeholder="验证码" /></a-col>
            <a-col :span="8">
              <div class="captcha-box">
                <img :src="captchaImg" />
                <span class="captcha-reload">
                  <svg-icon class="icon" href="icon-reload" />
                </span>
              </div>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-button style="width: 100%" type="primary" :loading="btnLoading" @click="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, toRaw } from 'vue'
import type { ComputedRef, UnwrapRef, Ref } from 'vue'
import captchaImg from './captcha.png'
import { Form, Modal } from 'ant-design-vue'
import type { LoginData, rulesType } from './type/index'
import { isEqual } from 'lodash'
import { useRouter } from 'vue-router'
import useFlag from '@/composition/hooks/useFlag'
import useCount from '@/composition/hooks/useCount'
import { useUserStore } from '@/store'
import { userInfoMockData } from '@/store/modules/user'
const router = useRouter()

/**
 * 控制密码是否可显示
 */
const [see, { toggle }] = useFlag(false)
const iconHref: ComputedRef<string> = computed(() => {
  return see.value ? 'icon-eye-close' : 'icon-eye'
})
const passwordType: ComputedRef<string> = computed(() => {
  return see.value ? 'text' : 'password'
})

/**
 *  登录失败三次，显示验证码
 */
const [failTime, { plus: addFailTime }] = useCount(0)
const showCaptcha = computed(() => {
  return failTime.value > 2
})

/**
 * todo: 进行登录操作
 */
const user: LoginData = {
  username: 'admin',
  password: 'admin123'
}
const formRef: Ref<typeof Form | null> = ref(null)
const defaultRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 2, max: 16, message: '用户名字数限制2-16', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 5, max: 16, message: '密码字数限制5-16', trigger: 'change' }
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'change' }]
}

const rules = computed(() => {
  const rules: rulesType = {}
  rules.username = defaultRules.username
  rules.password = defaultRules.password
  if (showCaptcha.value) {
    rules.captcha = defaultRules.captcha
  }
  return rules
})

const loginData: UnwrapRef<LoginData> = reactive({
  username: '',
  password: ''
})
const [btnLoading, { set: setBtnLoading }] = useFlag(false)
const submit = async () => {
  if (!btnLoading.value) {
    setBtnLoading(true)
    await formRef.value?.validate().finally(() => setBtnLoading(false))
    const data = toRaw(loginData)

    setBtnLoading(false)
    if (!isEqual(data, user)) {
      addFailTime()
      Modal.warning({
        content: () => '用户名或密码不正确',
        centered: true
      })
      return false
    }
    const userStore = useUserStore()

    userStore.setUserInfo(userInfoMockData)
    router.push({
      path: '/'
    })
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-30deg, #cfcfcf, #ffffff, #c2c2c2);
  &__wrap {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    background: #fff;
    backdrop-filter: blur(20px);
    padding: 20px 20px;
    &--captcha {
      padding: 10px 20px;
    }
  }
  &__title {
    font-size: 22px;
    text-align: center;
    line-height: 40px;
    font-weight: 500;
    background: linear-gradient(to bottom, #2676ac 5%, #7abbe6 25%, #2676ac);
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 2px;
    color: transparent;
  }
  &__form {
    width: 280px;
    margin: 0 auto;
  }
  .password-see {
    color: #999;
    cursor: pointer;
    user-select: none;
  }
  .captcha-box {
    position: relative;
    width: calc(100% - 5px);
    margin-left: 5px;
    height: 100%;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover .captcha-reload {
      opacity: 1;
      .icon {
        transform: rotate(180deg);
      }
    }
    .captcha-reload {
      position: absolute;
      display: block;
      opacity: 0;
      transition: 0.1s ease-in opacity;
      width: 100%;
      height: 100%;
      padding-top: 2px;
      background: rgba(0, 0, 0, 0.6);
      top: 0;
      left: 0;
      text-align: center;
      .icon {
        font-size: 26px;
        color: #d8d8d8;
        transition: 0.25s ease-in transform;
        transform: rotate(0);
      }
    }
  }
}
</style>
