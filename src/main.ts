import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import Login from './views/Login.vue'
import Registratie from './views/Registratie.vue'
import Portfolio from   './views/Portfolio.vue'
import Stocks from   './views/Stocks.vue'


import './registerServiceWorker'
import VueAxios from "vue-axios";



Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.component('login', Login);
Vue.component('Registratie', Registratie);
Vue.component('Portfolio', Portfolio);
Vue.component('Stocks', Stocks);





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
