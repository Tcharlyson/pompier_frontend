import axios from 'axios';
import Vue from 'vue';

const editAgentSchema = {
  id: null,
  nom: '',
  prenom: '',
  id_grade: null,
  equipe: null,
  id_uv: null,
  specialite: '',
  carence: false,
  conduite: '',
  id_nomination: null,
  est_stagiaire: false,
  telephone: '',
  num: '',
  est_admin: false,
}

const agents = { 

  state: { 
    agents: [],
    editAgent: {}
  },
  mutations: {
    addAgents(state, agents) {
      state.agents = agents
    },
    resetState(state) {
      state.agents = []
    },
    editAgent(state, agent) {
      state.editAgent = { ...agent }
    },
    resetAgentState(state) {
      state.editAgent = { ...editAgentSchema }
    }
  },

  getters: {
    agents: state => state.agents,
    editAgent: state => state.editAgent
  },

  actions: {
    fetchAgents({ state, commit, rootState }) {
      axios.get('http://localhost:8001/api/agents').then(response => {
        if(response.status !== 200) return
        commit('addAgents', response.data)
      })
    },
    postAgent({ state, commit, dispatch }, params) {
      axios.post('http://localhost:8001/api/agents', params).then(response => {
        dispatch('fetchAgents')
        commit('resetAgentState')
      })
    },
    putAgent({ state, commit, dispatch }, params) {
      axios.put('http://localhost:8001/api/agents/' + params.id, params).then(response => {
        dispatch('fetchAgents')
        commit('resetAgentState')
      })
    },
    deleteAgent({ state, commit, dispatch }, id) {
      axios.delete('http://localhost:8001/api/agents/' + id).then(response => {
        dispatch('fetchAgents')
        commit('resetAgentState')
      })
    }
  }
} 
export default agents;