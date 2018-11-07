import Vue from 'vue'
import App from './user/App'
import router from './user/router'
import Toaster from 'v-toaster'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import BootstrapVue from 'bootstrap-vue'
import store from './user/store/store'
import {
    response, request
} from './user/helpers/general'
// require styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'v-toaster/dist/v-toaster.css'
import 'swiper/dist/css/swiper.css'
//auth
require('./bootstrap')

Vue.use(BootstrapVue);
Vue.use(VueAwesomeSwiper)
Vue.use(Toaster)

response(router, store)
request(store)

new Vue({
    el: '#user',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});
