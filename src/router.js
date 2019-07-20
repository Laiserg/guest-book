import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/view/HomePage.vue';
import Signup from '@/view/SignupPage.vue';
import Login from '@/view/LoginPage.vue';
import GuestBook from '@/view/GuestBookPage.vue';

import firebase from 'firebase';

Vue.use(Router);

let router = new Router({

    routes: [
    {
        path: '/',
        name: 'Home page',
        component: Home,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/guest-book',
        name: 'Guest book page',
        component: GuestBook,
        meta: {
            requiresAuth: true
        }
    },

    ],
    mode: 'history'


});

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!firebase.auth().currentUser) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (firebase.auth().currentUser) {
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }

});

export default router;