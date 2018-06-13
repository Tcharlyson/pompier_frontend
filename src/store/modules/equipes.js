import axios from 'axios';

const equipes = { 

  state: { 
    equipes: [] 
  },

  mutations: {
    addEquipes(state, equipes) {
      state.equipes = equipes
    },
    resetState(state) {
      state.equipes = []
    }
  },

  getters: {
    equipes: state => state.equipes
  },

  actions: {
    fetchEquipes({ state, commit, rootState }) {
      axios.get('http://localhost:8001/api/equipes').then(response => {
        if(response.status !== 200) return
        commit('addEquipes', response.data)
      })
    }
  }
} 
export default equipes;