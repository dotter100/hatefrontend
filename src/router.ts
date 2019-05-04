import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Registratie from './views/Registratie.vue'
import Portfolio from   './views/Portfolio.vue'
import Stocks from   './views/Stocks.vue'
import Addportfolio from   './views/AddPortfolio.vue'
import AddBuyStock from   './views/AddBuyStock.vue'

Vue.use(Router)



export const router = new Router({

    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Stocks
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/Registratie',
            name: 'Registratie',
            component: Registratie
        },
        {
            path: '/Portfolio',
            name: 'Portfolio',
            component: Portfolio
        },
        {
            path: '/',
            name: 'Stocks',
            component: Stocks
        },
        {
            path: '/AddPortfolio',
            name: 'AddPortfolio',
            component: Addportfolio
        },
        {
            path: '/AddBuyStock',
            name: 'AddBuyStock',
            component: AddBuyStock
        },

        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
})
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/Registratie', '/Stocks'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})


export default router;

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     },
//      {
//       path: '/login',
//       name: 'login',
//       component: Login
//     },
//       {
//           path: '/registratie',
//           name: 'Registratie',
//           component: Registratie
//       }
//   ]
// })
