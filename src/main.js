import Vue from 'vue'
import App from './components/App.vue'
import Header from './components/layout/header/Header.vue'
import VeeValidate from 'vee-validate';
import VuejsDialog from "vuejs-dialog"
import router from './router'
import store from './store'


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.currentUser && store.getters.currentUser.isLogged) { 
      next() 
    } else {
      // this.$router.push('/')
    }
  } else {
    next()
  }
})

Vue.filter('ucFirst', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.use(VeeValidate);
Vue.use(require('vue-moment'));
Vue.use(VuejsDialog);


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, Header }
})
