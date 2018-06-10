import axios from 'axios';

const grades = { 

  state: { 
    grades: [] 
  },

  mutations: {
    addGrades(state, grades) {
      state.grades = grades
    },
    resetState(state) {
      state.grades = []
    }
  },

  getters: {
    grades: state => state.grades
  },

  actions: {
    fetchGrades({ state, commit, rootState }) {
      axios.get('http://localhost:8001/api/grades').then(response => {
        if(response.status !== 200) return
        commit('addGrades', response.data)
      })
    }
  }
} 
export default grades;