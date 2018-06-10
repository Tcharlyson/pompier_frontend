import axios from 'axios';

const user = { 

  state: { 
    user: {
      id: null,
      username: null,
      isLogged: false,
      isAdmin: false,
    }
  },

  mutations: {
    addUser(state, agent) {
      state.user = {
        id: agent.id, 
        isLogged: true,
        username: agent.grade.diminutif + '. ' + agent.nom.toUpperCase() + ' ' + agent.prenom,
        isAdmin: agent.est_admin 
      }
    },
    resetState(state) {
      state.user = {
        id: null,
        username: null,
        isLogged: false,
        isAdmin: false,
      } 
    }
  },

  getters: {
    currentUser: state => state.user
  },

  actions: {
    addUser({ state, commit, rootState }, agent) {
      commit('addUser', agent)
    }
  }
} 
export default user;