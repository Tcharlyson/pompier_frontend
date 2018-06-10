import axios from 'axios';

const uvs = { 

  state: { 
    uvs: [] 
  },

  mutations: {
    addUvs(state, uvs) {
      state.uvs = uvs
    },
    resetState(state) {
      state.uvs = []
    }
  },

  getters: {
    uvs: state => state.uvs
  },

  actions: {
    fetchUvs({ state, commit, rootState }) {
      axios.get('http://localhost:8001/api/uvs').then(response => {
        if(response.status !== 200) return
        commit('addUvs', response.data)
      })
    }
  }
} 
export default uvs;