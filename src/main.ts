import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import 'normalize.css'
import './common/css/reset.css'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import router from './router'

import SvgIcon from '@/components/svgIcon/SvgIcon.vue'

const app = createApp(App)

const pinia = createPinia()

app.component('SvgIcon', SvgIcon)
app.use(router).use(pinia).mount('#app')
