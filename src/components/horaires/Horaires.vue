<template src="./horaires.html"></template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex';
export default {
  name: 'horaires',
  data () {
    return {
      timetable: {
        element: {
          value: null,
          date: null,
          target: null,
          equipe: null,
          id: null,
        }
      },
      date: Vue.moment(new Date()).format("YYYY-MM-DD"),
      type: 'astreinte', 
      href: null
    }
  },
  methods: {
    changeDate(date) {
      this.date = Vue.moment(date).format("YYYY-MM-DD")
      this.href = 'http://localhost:8001/api/astreintes?from=' + this.date + '&to=' + Vue.moment(this.date).add(1, 'days').format("YYYY-MM-DD")
      this.$store.dispatch('fetchHorairesByDate', this.date)
      this.clearCells()
    },
    clicked(e) {
      if(e.target.attributes[0] && e.target.attributes[2] && e.target.attributes[1]) {
        this.timetable.element.value = parseInt(e.target.attributes[0].nodeValue,10)
        this.timetable.element.id = e.target.parentElement.dataset.id
        this.timetable.element.equipe = e.target.attributes[2].nodeValue
        this.timetable.element.date = e.target.attributes[1].nodeValue
      }

      if(Vue.moment(this.timetable.element.date + ' ' + this.timetable.element.value + ':00:00',"YYYY-MM-DD HH").diff(Vue.moment().format("YYYY-MM-DD HH")) >= 0) {
        this.saveHoraire()
      } else {
        this.$dialog.confirm('Vous ne pouvez pas éditer une astreinte/garde antérieure', {okText: 'J\'ai compris',cancelText: 'Fermer'})
      }
    },
    fillFromDatabase(id, equipe, value) {
      this.horairesByDate.map((horaire) => {
        // VARIABLES SET
        var start_time = parseInt(horaire.horaire_debut.split(' ')[1].split(':')[0])
        const end_time = parseInt(horaire.horaire_fin.split(' ')[1].split(':')[0])
        const parent = document.querySelectorAll('tr[data-id="'+id+'"]')[0]
        value = parseInt(value)
      
        if(parent) {
          var child = parent.querySelector('[value="'+value+'"][data-date="'+this.date+'"]')
        }
        

        // CONDITION
        if(parseInt(id) === parseInt(horaire.id_agent)
        && Vue.moment(horaire.horaire_debut).format("YYYY-MM-DD") === this.date 
        && Vue.moment(horaire.horaire_fin).format("YYYY-MM-DD") === this.date 
        && value === start_time) {
          const equipeDetails = this.equipe(this.date, equipe, value, horaire.created_at, horaire.type)
          if(child) {
            child.style.backgroundColor = equipeDetails.color;
            child.dataset.id = horaire.id
          }
        }
      })
    },
    saveHoraire() {
      const parent = document.querySelectorAll('tr[data-id="'+this.timetable.element.id+'"]')[0]
      if(parent) {
        const enfant = parent.querySelector('[value="'+this.timetable.element.value+'"][data-date="'+this.date+'"]')
        if(enfant.dataset.id) {
          this.$store.dispatch('deleteHoraire', {
            id: enfant.dataset.id,
            params: this.date
          }).then(() => {
            enfant.style.backgroundColor = 'white';
            enfant.dataset.id = '';
          })
        } else {
          if(this.timetable.element.value === 24) return
          var end_date = this.date + ' ' + (this.timetable.element.value + 1) + ':00:00'
          if(this.timetable.element.value === 23) {
            end_date = this.date + ' ' + this.timetable.element.value + ':59:59'
          }
          // MIDNIGHT HACK
          this.$store.dispatch('postHoraire', {
            post: {
              id_agent: this.timetable.element.id,
              type: this.type,
              horaire_debut: this.date + ' ' + this.timetable.element.value + ':00:00',
              horaire_fin: end_date,
            },
            params: this.date
          }).then((response) => {
            const equipeDetails = this.equipe(this.date, this.timetable.element.equipe, this.timetable.element.value, Vue.moment(Vue.moment()).format("YYYY-MM-DD HH:mm:ss"), this.type)
            enfant.style.backgroundColor = equipeDetails.color;
            enfant.dataset.id = response.data.id;
          })
        }
      }
    },
    equipe(date, agent_equipe, value, created_at, type_horaire) {
      var equipe = {
        number: 2,
        color: 'yellow'
      }
      var hourCreated = parseInt(created_at.split(' ')[1].split(':')[0]);
      var difference = Vue.moment(date + ' ' + value + ':00:00',"YYYY-MM-DD HH:mm:ss").diff(Vue.moment("2018-06-08 18:00:00","YYYY-MM-DD HH:mm:ss"), 'weeks')
      
      if(difference % 2 === 1) {
        equipe.number = 1
      }
      if(parseInt(equipe.number) === parseInt(agent_equipe)) {
        equipe.color = 'blue'
      }
      if(Vue.moment(date,"YYYY-MM-DD").diff(Vue.moment(created_at,"YYYY-MM-DD"), 'days') === 0 && (hourCreated < 12 || hourCreated >= 12) && value < 18) {
        equipe.color = 'yellow';
      }
      if(Vue.moment(date,"YYYY-MM-DD").diff(Vue.moment(created_at,"YYYY-MM-DD"), 'days') === 1 && hourCreated >= 12 && value < 18) {
        equipe.color = 'yellow';
      }
      if(Vue.moment(date,"YYYY-MM-DD").diff(Vue.moment(created_at,"YYYY-MM-DD"), 'days') === 0 && hourCreated >= 12 && value >= 18) {
        equipe.color = 'yellow';
      }
      if(type_horaire === 'garde') {
        equipe.color = 'blue'
      }
      return equipe
    }, 
    clearCells() {
      const parent = document.querySelectorAll('td')
      parent.forEach(function(child) {
        child.style.backgroundColor = 'white';
      });
    }
  },
  computed: { ...mapGetters(['agents','horairesByDate']) },
  components: {  },
  created() {
    this.$store.dispatch('fetchHorairesByDate', this.date)
    this.href = 'http://localhost:8001/api/astreintes?from=' + this.date + '&to=' + Vue.moment(this.date).add(1, 'days').format("YYYY-MM-DD")
  }
}
</script>

<style lang="scss" src="./horaires.scss"></style>