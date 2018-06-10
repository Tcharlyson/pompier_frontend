import axios from 'axios';

const nominations = { 

  state: { 
    nominations: [] 
  },

  mutations: {
    addNominations(state, nominations) {
      state.nominations = nominations
    },
    resetState(state) {
      state.nominations = []
    }
  },

  getters: {
    nominations: state => state.nominations
  },

  actions: {
    fetchNominations({ state, commit, rootState }) {
      axios.get('http://localhost:8001/api/nominations').then(response => {
        if(response.status !== 200) return
        commit('addNominations', response.data)
      })
    }
  }
} 
export default nominations;