import customVue from './custom.vue'
import useCustom, { UseCustom } from './useCustom'

type CustomVue = typeof customVue

interface Custom extends CustomVue {
  useCustom: UseCustom
}

customVue.useCustom = useCustom
const custom: Custom = customVue as Custom

export default custom
