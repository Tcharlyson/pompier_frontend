<template src="./login.html"></template>

<script>
import { mapGetters } from 'vuex'
import { find } from 'lodash'
export default {
  name: 'login',
  data () {
    return {
      selected: '',
      password: '',
      error: '',
    }
  },
  computed: { ...mapGetters(['agents', 'currentUser']) },
  created() {
    if(this.currentUser) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    
    login() {
      var agent = find(this.agents, (agent) => agent.id === this.selected) // Récupére l'agent sélectionné
      if(!agent) return this.error = 'Une erreur est survenue' // Si il n'existe pas
      if(agent && this.password === '5656' && agent.est_admin) return this.error = "Veuillez vérifier votre mot de passe" // Si il est admin et qu'il essaye de se connecter en tant que user normal
      if(agent && this.password === 'cis56' && !agent.est_admin) return this.error = "Vous n'avez pas les droits" // Si il est user normal et qu'il essaye de se connecter en tant qu'admin
      if(agent && this.password === 'cis56' || this.password === '5656') { // Si le mot de passe est bon
        this.$store.dispatch('addUser', agent).then(() => {
          this.$router.push('/dashboard')
        })
      } else {
        this.error = "Identifiant ou mot de passe invalide"
      }
    }
  },
}
</script>

<style lang="scss" src="./login.scss"></style>