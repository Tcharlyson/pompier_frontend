<template>
    <div class="vehicules-actions">
      <span @click="itemAction('edit', rowData, rowIndex)">Éditer</span>
      <span @click="itemAction('delete', rowData, rowIndex)">Supprimer</span>
    </div>
  </template>

  <script>
  export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    methods: {
      itemAction (action, data, index) {
        if(action === 'edit') {
          this.$store.commit('editVehicule', data)
        } else if(action === 'delete') {
          this.$store.dispatch('deleteVehicule', data.id)
        }
      },
    },
    computed: { }
  }
  </script>

  <style>
    .custom-actions button.ui.button {
      padding: 8px 8px;
    }
    .custom-actions button.ui.button > i.icon {
      margin: auto !important;
    }
  </style>