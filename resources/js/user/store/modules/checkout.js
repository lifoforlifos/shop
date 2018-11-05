import axios from "axios"
import router from '../../router/index'
export default {
    state: {
        coupon_value: localStorage.getItem("coupon_value") || "",
        coupon_code: localStorage.getItem("coupon_code") || "",
        loading: false,
        error_coupon: "",
        errors: ""
    },
    getters: {
        couponCode(state) {
            return state.coupon_code
        },
        couponValue(state) {
            return state.coupon_value
        },
        loading(state) {
            return state.loading
        },
        errorCoupon(state) {
            return state.error_coupon
        },
        errorsCheckout(state) {
            return state.errors
        }
    },
    mutations: {
        loadingState(state, payload) {
            state.loading = true
        },
        couponSuccess(state, payload) {
            state.loading = false
            state.error_coupon = ""
            state.coupon_value = payload.data.coupon.value
            state.coupon_code = payload.data.coupon.coupon
            localStorage.setItem("coupon_value", state.coupon_value)
            localStorage.setItem("coupon_code", state.coupon_code)
        },
        couponFaild(state, payload) {
            state.loading = false
            state.error_coupon = payload.response.data.errors
        },
        orderSuccess(state) {
            state.loading = false
            state.errors = ""
            localStorage.removeItem("shoppingCart")
            router.push('/thankyou')
        },
        orderFailed(state, payload) {
            state.loading = false
            state.errors = payload.response.data.errors
        }

    },
    actions: {
        loadingState({
            commit
        }, name) {
            commit('loadingState', name)
        },
        checkCoupon({
            commit
        }, coupon) {
            axios.get("/api/coupon/check", {
                params: {
                    coupon
                }
            }).then((response) => {
                commit("couponSuccess", response)
            }).catch((error) => {
                commit("couponFaild", error)
            })
        },
        submitOrder({
            commit,
            rootState
        }, payload) {
            axios
                .post("/api/orders", payload)
                .then(response => {
                    rootState.cart.cart = []
                    commit("orderSuccess");
                })
                .catch(error => {
                    commit("orderFailed", error)
                });
        }

    }
}
