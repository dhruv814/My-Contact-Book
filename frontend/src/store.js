import Vue from 'vue'
import Vuex from 'vuex'
import { alert } from './store/alert.module';
import { account } from './store/account.module';
import { users } from './store/users.module';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    alert,
    account,
    users
  }
})
