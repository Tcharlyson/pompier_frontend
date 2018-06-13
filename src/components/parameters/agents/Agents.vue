<template src="./agents.html"></template>

<script>
import Vue from 'vue'
import VueTable from 'vuetable-2/src/components/Vuetable.vue';
import { mapGetters } from 'vuex';
import AgentsActions from './../../customs/AgentsActions.vue'
Vue.component('agents-actions', AgentsActions)
import AgentsJSON from './../../../json/agents.json'

export default {
  name: 'parameters-agents',
  data () {
    return {
      css: {
        tableClass: 'table table-striped table-bordered'
      },
      fields: AgentsJSON,
    }
  },
  methods: {
    transform (value) {
      return value ? 'Oui' : 'Non'
    },
    perform() {
      if(this.editAgent && this.editAgent.id) {
        this.$store.dispatch('putAgent', this.editAgent)
      } else {
        this.$store.dispatch('postAgent', this.editAgent)
      }
    },
    clean() {
      this.$store.commit('resetAgentState')
    }
  },
  computed: { ...mapGetters(['agents', 'grades', 'nominations', 'uvs', 'equipes', 'editAgent']) },
  components: { vuetable: VueTable },
  created() {
    this.clean() // REMETTRE LES CHAMPS À NULL/VIDES
  }
}
</script>

<style lang="scss" src="./agents.scss"></style>