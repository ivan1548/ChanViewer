import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: "/board/:id/:page",
      name: "board",
      component: require("@/components/Board.vue").default
    },
    {
      path: "/thread/:board/:id",
      name: "thread",
      component: require("@/components/Thread.vue").default
    },
    {
      path: "/settings",
      name: "settings",
      component: require("@/components/Settings.vue").default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})