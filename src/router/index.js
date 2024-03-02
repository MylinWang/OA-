import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    beforeEnter(to,from,next){
      const isLogin=localStorage.isLogin;
      isLogin?next({name:'Home'}):next();
    }
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }

]





const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.isLogin;
  
  //next()往下执行
  (isLogin || to.name==="Login")? next() : next({name:'Login'});
})
export default router
