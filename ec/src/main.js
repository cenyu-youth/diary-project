import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

import 'lib-flexible/flexible'

import {
  Button,
  Divider,
  Collapse,
  CollapseItem,
  Popup,
  NavBar
} from 'vant';

Vue
  .use(Button)
  .use(Divider)
  .use(Collapse)
  .use(CollapseItem)
  .use(Popup)
  .use(NavBar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
