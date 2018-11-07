import {
    getLocalUser
} from '../../helpers/api'

import router from "../../router/index"
const user = getLocalUser()

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: '',
        register_error: '',
        active: false,
    },
    getters: {
        token(state) {
            if (state.currentUser) {
                return state.currentUser.token
            }
            return
        },
        authError(state) {
            return state.auth_error
        },
        registerError(state) {
            return state.register_error
        },
        currentUser(state) {
            return state.currentUser
        },
        activeMega(state) {
            return state.active
        }
    },
    mutations: {
        init(state) {
            state.loading = true
        },
        RegisterFailed(state, payload) {
            state.loading = false
            state.register_error = payload.response.data.errors
        },
        login_register_Success(state, payload) {
            state.currentUser = Object.assign({}, payload.user, {
                token: payload.access_token
            })
            localStorage.setItem('user', JSON.stringify(state.currentUser))
            router.push('/')
        },
        logout(state, payload) {
            state.currentUser = ''
            localStorage.removeItem("user")
        },
        loginFailed(state, payload) {
            state.loading = false
            state.auth_error = "Incorrect information! please try again"
        },
        activeMega(state) {
            state.active = !state.active
        }
    },
    actions: {
        init({
            commit
        }) {
            commit('init')
        },
        login({
            commit
        }, payload) {
            axios.post('/api/auth/login', payload)
                .then((response) => {
                    commit("login_register_Success", response.data);
                })
                .catch((error) => {
                    commit("loginFailed", error);
                })
        },
        register({
            commit
        }, payload) {
            axios.post('api/auth/register', payload)
                .then((response) => {
                    commit("login_register_Success", response.data)
                })
                .catch((error) => {
                    commit("RegisterFailed", error)
                })
        },
    }
}
