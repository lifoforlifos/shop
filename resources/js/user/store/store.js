import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import home from './modules/home'
import shop from './modules/shop'
import category from './modules/category'
import cart from './modules/cart'
import checkout from './modules/checkout'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        auth,
        shop,
        category,
        cart,
        checkout
    }
})
