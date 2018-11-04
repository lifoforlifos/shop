import Vue from 'vue'
import App from './user/App'
import router from './user/router'

// require styles
import VueAwesomeSwiper from 'vue-awesome-swiper'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './user/store/store'
import 'swiper/dist/css/swiper.css'
//auth

Vue.use(BootstrapVue);
Vue.use(VueAwesomeSwiper)

new Vue({
    el: '#user',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});
