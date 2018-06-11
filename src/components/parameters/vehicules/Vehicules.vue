<template src="./vehicules.html"></template>

<script>
import Vue from 'vue'
import VueTable from 'vuetable-2/src/components/Vuetable.vue';
import { mapGetters } from 'vuex';
import VehiculesActions from './../../customs/VehiculesActions.vue'
Vue.component('vehicules-actions', VehiculesActions)
import VehiculesJSON from './../../../json/vehicules.json'

export default {
  name: 'parameters-vehicules',
  data () {
    return {
      css: {
        tableClass: 'table table-striped table-bordered'
      },
      fields: VehiculesJSON,
    }
  },
  methods: {
    transform (value) {
      return value ? 'Oui' : 'Non'
    },
    perform() {
      if(this.editVehicule && this.editVehicule.id) {
        this.$store.dispatch('putVehicule', this.editVehicule)
      } else {
        this.$store.dispatch('postVehicule', this.editVehicule)
      }
    },
    clean() {
      this.$store.commit('resetVehiculeState')
    }
  },
  computed: { ...mapGetters(['vehicules','editVehicule']) },
  components: { vuetable: VueTable },
  created() {
    this.clean() // REMETTRE LES CHAMPS À NULL/VIDES
  }
}
</script>

<style lang="scss" src="./vehicules.scss"></style>