import axios from 'axios';
import Vue from 'vue';

const editVehiculeSchema = {
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

const vehicules = { 

  state: { 
    vehicules: [],
    editVehicule: {}
  },
  mutations: {
    addVehicules(state, vehicules) {
      state.vehicules = vehicules
    },
    resetState(state) {
      state.vehicules = []
    },
    editVehicule(state, vehicule) {
      state.editVehicule = { ...vehicule }
    },
    resetVehiculeState(state) {
      state.editVehicule = { ...editVehiculeSchema }
    }
  },

  getters: {
    vehicules: state => state.vehicules,
    editVehicule: state => state.editVehicule
  },

  actions: {
    fetchVehicules({ state, commit, rootState }) {
      axios.get('http://localhost:8001/api/vehicules').then(response => {
        if(response.status !== 200) return
        commit('addVehicules', response.data)
      })
    },
    postVehicule({ state, commit, dispatch }, params) {
      axios.post('http://localhost:8001/api/vehicules', params).then(response => {
        dispatch('fetchVehicules')
        commit('resetVehiculeState')
      })
    },
    putVehicule({ state, commit, dispatch }, params) {
      axios.put('http://localhost:8001/api/vehicules/' + params.id, params).then(response => {
        dispatch('fetchVehicules')
        commit('resetVehiculeState')
      })
    },
    deleteVehicule({ state, commit, dispatch }, id) {
      axios.delete('http://localhost:8001/api/vehicules/' + id).then(response => {
        dispatch('fetchVehicules')
        commit('resetVehiculeState')
      })
    }
  }
} 
export default vehicules;