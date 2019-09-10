import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "primeicons/primeicons.css";
import "primevue/resources/themes/nova-light/theme.css";
import "primevue/resources/primevue.min.css";

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
