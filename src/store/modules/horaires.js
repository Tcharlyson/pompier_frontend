import axios from 'axios';
import Vue from 'vue';

const horaires = { 

  state: { 
    horaires: [],
    horairesByDate: []
  },
  mutations: {
    resetState(state) {
      state.horaires = []
      state.horairesByDate = []
    },
    addHoraires(state, horaires) {
      state.horaires = horaires
    },
    addHorairesByDate(state, horaires) {
      state.horairesByDate = horaires
    }
  },

  getters: {
    horaires: state => state.horaires,
    horairesByDate: state => state.horairesByDate
  },

  actions: {
    fetchHoraires({ state, commit, rootState }) {
      axios.get('http://localhost:8001/api/horaires').then(response => {
        if(response.status !== 200) return
        commit('addHoraires', response.data)
      })
    },
    fetchHorairesByDate({ state, commit, rootState }, date) {
      axios.get('http://localhost:8001/api/horaires?date='+ date).then(response => {
        if (response.status !== 200) return
        commit('addHorairesByDate', response.data)
      })
    },
    putHoraire({ state, commit, dispatch }, data) {
      axios.put('http://localhost:8001/api/horaires/' + data.id, data.update).then(response => {
        // dispatch('fetchHorairesByDate', data.params)
      })
    },
    postHoraire({ state, commit, dispatch }, data) {
      return axios.post('http://localhost:8001/api/horaires/', data.post)
    },
    deleteHoraire({ state, commit, dispatch }, data) {
      axios.delete('http://localhost:8001/api/horaires/' + data.id).then(response => {
        // dispatch('fetchHorairesByDate', data.params)
      })
    }
  }
} 
export default horaires;