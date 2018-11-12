import axios from "axios"
import router from '../../router/index'
export default {
    state: {
        currentAdmin: JSON.parse(localStorage.getItem("currentAdmin")) || "",
        error_admin: "",
    },
    getters: {
        currentAdmin(state) {
            return state.currentAdmin
        },
        errorAdmin(state) {
            return state.error_admin
        }
    },
    mutations: {
        loginSuccess(state, payload) {
            state.currentAdmin = Object.assign({}, payload.data.admin, {
                token: payload.data.access_token
            })
            localStorage.setItem('currentAdmin', JSON.stringify(state.currentAdmin))
            router.push('/')
        },
        loginFailed(state, payload) {
            state.error_admin = payload
        },
        logout() {
            localStorage.removeItem("currentAdmin")
        },
    },
    actions: {
        login({
            commit
        }, payload) {
            axios
                .post("/api/admin/login", payload)
                .then(res => {
                    commit("loginSuccess", res)
                })
                .catch(error => {
                    commit("loginFailed", error)
                });
        }
    }
}
