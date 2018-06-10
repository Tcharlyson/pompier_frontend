import Vue from 'vue'
import Vuex from 'vuex'
import agents from './modules/agents'
import grades from './modules/grades'
import nominations from './modules/nominations'
import uvs from './modules/uvs'
import user from './modules/user'
import logout from './modules/logout'

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    agents,
    user,
    logout,
    grades,
    nominations,
    uvs,
  },
  plugins: [createPersistedState()],
  actions: {
    clearAll({ commit }){
      commit('resetState')
    }
  }
})

export default store;
