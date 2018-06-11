import Vue from 'vue'
import Router from 'vue-router'
import App from './../components/App'
import Login from './../components/login/Login';
import Parameters from './../components/parameters/Parameters';
import Agents from './../components/parameters/agents/agents';
import Horaires from './../components/horaires/horaires';
import Vehicules from './../components/parameters/vehicules/vehicules';
import Dashboard from './../components/dashboard/dashboard';
import Header from './../components/layout/header/Header';




Vue.use(Router)

export default new Router({
  
  routes: [
    {
      path: '/',
      name: 'header',
      component: Header,
      children: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: { requiresAuth: true }
        },
        {
          path: '/horaires',
          name: 'Horaires',
          component: Horaires
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/parameters',
      name: 'Parameters',
      component: Parameters
    },
    {
      path: '/parameters/agents',
      name: 'Parameters-agents',
      component: Agents
    },
    {
      path: '/parameters/vehicules',
      name: 'Parameters-vehicules',
      component: Vehicules
    }
  ]
})