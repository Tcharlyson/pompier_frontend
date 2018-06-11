<template src="./horaires.html"></template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex';
export default {
  name: 'horaires',
  data () {
    return {
      timetable: {
        start: {
          value: null,
          date: null,
          target: null,
          id: null,
        },
        end: {
          value: null,
          date: null,
          target: null,
          id: null,
        }
      },
      date: {
        start: Vue.moment(new Date()).format("YYYY-MM-DD"),
        end: Vue.moment(new Date()).add(1, "days").format("YYYY-MM-DD")
      }
    }
  },
  methods: {
    mouseDown(e) {
      this.timetable.start.value = parseInt(e.target.attributes[0].nodeValue,10)
      this.timetable.start.date = e.target.attributes[1].nodeValue
      this.timetable.start.id = e.target.parentElement.dataset.id
      this.timetable.start.target = e.target
    },
    mouseUp(e) {
      this.timetable.end.value = parseInt(e.target.attributes[0].nodeValue,10)
      this.timetable.end.date = e.target.attributes[1].nodeValue
      this.timetable.end.id = e.target.parentElement.dataset.id
      this.timetable.end.target = e.target
      this.logic()
    },
    logic() {
      if(this.timetable.start.value > this.timetable.end.value && this.timetable.start.value === 24) {
        this.timetable.start.value = 0;
        this.timetable.start.date = this.date.end
      }
      if(this.timetable.end.date == this.timetable.start.date 
      && this.timetable.end.value > this.timetable.start.value
      && this.timetable.start.id == this.timetable.end.id)
      {
        Vue.dialog.confirm('Êtes vous-sûr de vouloir vous ajouter le ' + this.timetable.start.date + ' de ' + this.timetable.start.value + 'h' + ' à ' + this.timetable.end.value + 'h', { okText: 'Oui', cancelText: 'Annuler'})
        .then(() => {
          // SAVE HORAIRES
          this.saveHoraire()
        })
      } else {
        Vue.dialog.confirm('Votre tranche horaire doit-être sélectionné jour par jour', { okText: 'J\'ai compris', cancelText: 'Annuler' })
      }
    },
    // loopToAction() {
    //   const parent = document.querySelectorAll('[data-id="'+this.timetable.start.id+'"]')[0]

    //   for (let index = this.timetable.start.value; index < this.timetable.end.value; index++) {
    //     if(this.timetable.start.value === 0) {
    //       // HACK
    //       var tempIndex = index
    //       this.timetable.start.date = this.date.start
    //       index = 24
    //     }

    //     parent.querySelector('[value="'+index+'"][data-date="'+this.timetable.start.date+'"]').style.backgroundColor = "yellow";

    //     if(this.timetable.start.value === 0) { 
    //       index = 0
    //       this.timetable.start.value = 24
    //       this.timetable.start.date = this.date.end
    //     }
    //   }
    // },
    fillFromDatabase(id, date, value) {
      this.horairesByDate.map((horaire) => {
        // VARIABLES SET
        var start_time = parseInt(horaire.horaire_debut.split(' ')[1].split(':')[0])
        const end_time = parseInt(horaire.horaire_fin.split(' ')[1].split(':')[0])
        value = parseInt(value)

        // CONDITION
        if(id === horaire.id_agent 
        && Vue.moment(horaire.horaire_debut).format("YYYY-MM-DD") === date 
        && Vue.moment(horaire.horaire_fin).format("YYYY-MM-DD") === date 
        && start_time <= value && value <= end_time){
          const parent = document.querySelectorAll('[data-id="'+id+'"]')[0]
          if(parent) {
            // if(start_time === 0) {
            //   value = 24
            //   date = this.date.start
            // }
            parent.querySelector('[value="'+value+'"][data-date="'+date+'"]').style.backgroundColor = "yellow";
          }
        }
      })
    },
    saveHoraire() {
      var isExist = false;
      var deleted = false;
      this.horairesByDate.map((horaire) => {

        const start_time = parseInt(horaire.horaire_debut.split(' ')[1].split(':')[0])
        const end_time = parseInt(horaire.horaire_fin.split(' ')[1].split(':')[0])
        this.timetable.start.value = parseInt(this.timetable.start.value)
        this.timetable.end.value = parseInt(this.timetable.end.value)
        
        if(Vue.moment(horaire.horaire_debut).format("YYYY-MM-DD") === this.timetable.start.date && horaire.id_agent == this.timetable.start.id) {
          isExist = true
          console.log('START')
          console.log(this.timetable.start.value)
          console.log(this.timetable.end.value)
          console.log(start_time)
          console.log(end_time)
          console.log('END')

          
          if(this.timetable.start.value < start_time && this.timetable.end.value < end_time && (this.timetable.end.value >= start_time || this.timetable.end.value == start_time - 1)) {
            console.log('Update horaire de début')
            const params = {
              id: horaire.id, 
              update: {
                horaire_debut: horaire.horaire_debut.replace(start_time + ':00:00', this.timetable.start.value + ':00:00'),
              },
              params: this.date
            } 
            this.$store.dispatch('putHoraire', params)
          } else if(this.timetable.start.value > start_time && this.timetable.end.value == end_time) {
            console.log('Delete / Update horaire de début')
            const params = {
              id: horaire.id, 
              update: {
                horaire_fin: horaire.horaire_debut.replace(start_time + ':00:00', this.timetable.start.value + ':00:00'),
              },
              params: this.date
            } 
            this.$store.dispatch('putHoraire', params).then(() => {
              const parent = document.querySelectorAll('[data-id="'+this.timetable.start.id+'"]')[0]
              if(parent) {
                for(let index = this.timetable.end.value; index >= this.timetable.start.value; index--) {
                  parent.querySelector('[value="'+index+'"][data-date="'+this.timetable.start.date+'"]').style.backgroundColor = "white";
                }
              }
            })
          } else if(this.timetable.start.value > start_time && this.timetable.end.value < end_time) {
            console.log('Delete / Update horaire de début + fin')
            const params = {
              id: horaire.id, 
              update: {
                horaire_fin: horaire.horaire_debut.replace(start_time + ':00:00', this.timetable.start.value + ':00:00'),
              },
              params: this.date
            } 
            this.$store.dispatch('putHoraire', params).then(() => {
              const params = {
                post: {
                  id_agent: this.timetable.start.id,
                  horaire_debut: this.timetable.end.date + ' ' + this.timetable.end.value + ':00:00',
                  horaire_fin: this.timetable.end.date + ' ' + end_time + ':00:00',
                  type: 'astreinte'
                },
                params: this.date
              }
              this.$store.dispatch('postHoraire', params).then(() => {
                const parent = document.querySelectorAll('[data-id="'+this.timetable.start.id+'"]')[0]
                if(parent) {
                  for(let index = this.timetable.end.value; index >= this.timetable.start.value; index--) {
                    parent.querySelector('[value="'+index+'"][data-date="'+this.timetable.start.date+'"]').style.backgroundColor = "white";
                  }
                }
              })
            })
          } else if(this.timetable.start.value == start_time && this.timetable.end.value < end_time) {
            console.log('Delete / Update horaire de fin')
            const params = {
              id: horaire.id, 
              update: {
                horaire_debut: horaire.horaire_fin.replace(end_time + ':00:00', this.timetable.end.value + ':00:00'),
              },
              params: this.date
            } 
            this.$store.dispatch('putHoraire', params).then(() => {
              const parent = document.querySelectorAll('[data-id="'+this.timetable.start.id+'"]')[0]
              if(parent) {
                for(let index = this.timetable.end.value; index >= this.timetable.start.value; index--) {
                  parent.querySelector('[value="'+index+'"][data-date="'+this.timetable.start.date+'"]').style.backgroundColor = "white";
                }
              }
            })
          } else if((this.timetable.start.value <= end_time || this.timetable.start.value == end_time + 1) && this.timetable.end.value > end_time && this.timetable.start.value > start_time) {
            console.log('Update horaire de fin')
            const params = {
              id: horaire.id, 
              update: {
                horaire_fin: horaire.horaire_fin.replace(end_time + ':00:00', this.timetable.end.value + ':00:00'),
              },
              params: this.date
            }
            this.$store.dispatch('putHoraire', params)
          } else if(this.timetable.start.value == start_time && this.timetable.end.value == end_time) {
            console.log('Delete horaire')
            const params = {
              id: horaire.id, 
              params: this.date
            }
            this.$store.dispatch('deleteHoraire', params).then(() => {
              // CLEAR CASES
              const parent = document.querySelectorAll('[data-id="'+this.timetable.start.id+'"]')[0]
              if(parent) {
                for(let index = this.timetable.end.value; index >= this.timetable.start.value; index--) {
                  parent.querySelector('[value="'+index+'"][data-date="'+this.timetable.start.date+'"]').style.backgroundColor = "white";
                }
              }
            })

          } else if(this.timetable.start.value < start_time && this.timetable.end.value > end_time) {
            console.log('Update horaire de début et horaire de fin')
            const params = {
              id: horaire.id, 
              update: {
                horaire_debut: horaire.horaire_debut.replace(start_time + ':00:00', this.timetable.start.value + ':00:00'),
                horaire_fin: horaire.horaire_fin.replace(end_time + ':00:00', this.timetable.end.value + ':00:00'),
              },
              params: this.date
            }
            this.$store.dispatch('putHoraire', params)
          } else if(this.timetable.start.value > start_time && this.timetable.end.value > end_time) {
            console.log('Ajouter un horaire')
            const params = {
              post: {
                id_agent: this.timetable.start.id,
                horaire_debut: this.timetable.start.date + ' ' + this.timetable.start.value + ':00:00',
                horaire_fin: this.timetable.end.date + ' ' + this.timetable.end.value + ':00:00',
                type: 'astreinte'
              },
              params: this.date
            }
            this.$store.dispatch('postHoraire', params)
          }
        }
        return isExist;
      })

      if(!isExist) {
        const params = {
          post: {
            id_agent: this.timetable.start.id,
            horaire_debut: this.timetable.start.date + ' ' + this.timetable.start.value + ':00:00',
            horaire_fin: this.timetable.end.date + ' ' + this.timetable.end.value + ':00:00',
            type: 'astreinte'
          },
          params: this.date
        }
        this.$store.dispatch('postHoraire', params)
      }
    } 
  },
  computed: { ...mapGetters(['agents','horairesByDate']) },
  components: {  },
  created() {
    this.$store.dispatch('fetchHorairesByDate', this.date)
  }
}
</script>

<style lang="scss" src="./horaires.scss"></style>