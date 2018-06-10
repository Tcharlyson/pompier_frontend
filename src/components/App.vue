<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  created() {
    this.$store.dispatch('fetchAgents').then(() => {
      this.$router.push('/login')
    }) 
  }
}
</script>

<style lang="scss">
  @import './../../node_modules/bootstrap/scss/bootstrap.scss';
  .error {
    color: red;
  }
</style>