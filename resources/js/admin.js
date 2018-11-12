import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './admin/App.vue'
import router from './admin/router'
import store from './admin/store/store'
import {
    response,
    request
} from './admin/helpers/general'
require('./bootstrap')
Vue.use(BootstrapVue)


response(router, store)
request(store)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
