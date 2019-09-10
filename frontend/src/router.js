import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      component: Login
    },
    {
      path: '/signup',
      component: Register
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/signin', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = (localStorage.getItem('user') == 'true');

  if (authRequired && !loggedIn) {
    return next('/signin');
  }else if(!authRequired && loggedIn){
    return next('/');
  }

  next();
});

export default router;