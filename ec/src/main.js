import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookies from 'vue-cookies'

import qs from 'qs'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue
  .use(VueAxios,axios)
  .use(qs)
  .use(VueCookies)

// this.$cookies.config('7d','/')
Vue.config.productionTip = false

//配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import 'lib-flexible/flexible'

import {
  Button,
  Divider,
  Collapse,
  CollapseItem,
  Popup,
  NavBar,
  Toast,
  Dialog
} from 'vant';

Vue
  .use(Button)
  .use(Divider)
  .use(Collapse)
  .use(CollapseItem)
  .use(NavBar)
  .use(Popup)
  .use(Toast)
  .use(Dialog)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
