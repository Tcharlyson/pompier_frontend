<template src="./parameters.html"></template>

<script>
export default {
  name: 'parameters',
  data () {
    return {
    }
  },
  methods: {
    transform (value) {
      return value ? 'Oui' : 'Non'
    }
  },
  computed: { },
  components: { },
  created() {
    this.$store.dispatch('fetchGrades')
    this.$store.dispatch('fetchNominations')
    this.$store.dispatch('fetchUvs')
  }
}
</script>

<style lang="scss" src="./parameters.scss"></style>