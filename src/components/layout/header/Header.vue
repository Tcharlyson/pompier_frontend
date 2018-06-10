<template src="./header.html"></template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'header',
  data () {
    return {
    }
  },
  computed: { ...mapGetters(['currentUser']) },
  methods: {
    logout() {
      this.$store.dispatch('clearAll')
      this.$router.go('/')
    }
  },
}
</script>

<style lang="scss" src="./header.scss"></style>