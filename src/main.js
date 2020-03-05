import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCookie from 'vue-cookie'
import * as filters from './services/filters'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueCookie);


for (let [k, v] of Object.entries(filters)) {
  if (typeof v === 'function') {
    Vue.filter(k, v)
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.$cookies.config('300d');
