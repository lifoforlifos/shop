import {
    getLocalUser
} from '../../helpers/api'

const user = getLocalUser()

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: '',
        active: false
    },
    getters: {
        authError(state) {
            return state.auth_error
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
            state.auth_error = null
        },
        RegisterFailed(state, payload) {
            state.loading = false
            state.auth_error = payload
        },
        loginSuccess(state, payload) {
            state.currentUser = Object.assign({}, payload.user, {
                token: payload.access_token
            })
            localStorage.setItem('user', JSON.stringify(state.currentUser))
        },
        loginFailed(state, payload) {
            state.loading = false
            state.auth_error = payload.response.data.error
        },
        activeMega(state) {
            state.active = !state.active
        }
    },
    actions: {
        init(context) {
            context.commit('init')
        },
    }
}
