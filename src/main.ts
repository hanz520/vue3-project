import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './common/css/reset.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'

import '//at.alicdn.com/t/font_2989824_4l5g8izn558.js'
import svgIcon from '@/components/svgIcon/index.vue'

const app = createApp(App)

app.component('SvgIcon', svgIcon)
app.use(Antd).use(router).mount('#app')
