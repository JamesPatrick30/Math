 import { createRouter, createWebHistory} from 'vue-router'
//import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import Help  from '@/views/Help.vue'
import lobbylist from '@/views/lobbies/lobbylist.vue'
import hostpage from '@/views/lobbies/hostpage.vue'
import notfound  from '@/views/notfound.vue'

// const router = new VueRouter({
//   mode:'hash',
//   routes
// });


const router = createRouter({
  history: createWebHistory(),
  //history: createWebHistory(process.env.BASE_URL),
  routes : [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path:'/help',
      name :'help',
      component: Help
    },
    {
      path:'/lobbies',
      name : 'lobby',
      component: lobbylist,
     
    },
    {
      path:'/home/hosting',
      name : 'hostpage',
      component: hostpage,
    },
    {
      path:'/:catchall(.*)',
      name : 'notfound',
      component: notfound
    },
    
  ]
})

export default router
