<template>
    <div class="agents-actions">
      <span @click="itemAction('edit', rowData, rowIndex)">Éditer</span>
      <span v-if="currentUser.id !== rowData.id" @click="itemAction('delete', rowData, rowIndex)">Supprimer</span>
    </div>
  </template>

  <script>
  import { mapGetters } from 'vuex';
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
          const params = {
            id: data.id,
            nom: data.nom,
            prenom: data.prenom,
            id_grade: data.grade.id,
            equipe: data.equipe,
            id_uv: data.uv.id,
            specialite: data.specialite,
            carence: data.carence,
            conduite: data.conduite,
            id_nomination: data.nomination.id,
            est_stagiaire: data.est_stagiaire,
            telephone: data.telephone,
            num: data.num,
            est_admin: data.est_admin,
          }
          this.$store.commit('editAgent', params)
        } else if(action === 'delete') {
          this.$store.dispatch('deleteAgent', data.id)
        }
      },
    },
    computed: { ...mapGetters(['currentUser']) }
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