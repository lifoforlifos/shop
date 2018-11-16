import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'

// views
import Home from '../components/home/Home'
import ConstactUs from '../components/ContactUs'
import Blog from '../components/blog/Blog'
import Shop from '../components/store/Shop'
import Single from '../components/store/Single'
import Checkout from "../components/checkout/Checkout"
// User
import Profile from '../components/auth/Profile'
import Wishlist from '../components/auth/WishList'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

Vue.use(VueRouter)
Vue.use(store)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: 'Home'
            }
        },
        {
            path: '/shop/:category_slug',
            name: 'Shop',
            component: Shop,
            meta: {
                title: 'Shop'
            }
        },
        {
            path: '/shop/single-product/:id',
            name: 'Single',
            component: Single,
            meta: {
                title: 'Single Product'
            }
        },
        {
            path: '/checkout',
            name: 'Checkout',
            component: Checkout,
            meta: {
                forCart: true,
                title: 'checkout'
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                forUser: true,
                title: 'Profile'
            }
        },
        {
            path: '/wishlist',
            name: 'Wishlist',
            component: Wishlist,
            meta: {
                forUser: true,
                title: 'Wishlist'
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                forVisitros: true,
                title: 'Login'
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                forVisitros: true,
                title: 'Register'
            }
        },
        {
            path: '/contactus',
            name: 'ConstactUs',
            component: ConstactUs
        }, {
            path: '/blog',
            name: 'Blog',
            component: Blog
        }
    ]
})
// middleware router

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitros)) {
        if (store.state.auth.currentUser) {
            next({
                path: '/'
            })
        } else next()
    } else if (to.matched.some(record => record.meta.forCart) || to.matched.some(record => record.meta.forUser)) {
        if (!store.state.auth.currentUser) {
            next({
                path: '/login'
            })
        } else if (!store.getters.CountCart) {
            next({
                path: '/'
            })
        } else
            next()
    } else
        document.title = to.meta.title
    next()
})


export default router
