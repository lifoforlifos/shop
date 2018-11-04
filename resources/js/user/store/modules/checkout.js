import axios from "axios"
import router from '../../router/index'
export default {
    state: {
        coupon_value: localStorage.getItem("coupon_value") || "",
        coupon_code: localStorage.getItem("coupon_code") || "",
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
        errors(state) {
            return state.errors
        }
    },
    mutations: {
        couponSuccess(state, payload) {
            state.error_coupon = ""
            state.coupon_value = payload.data.coupon.value
            state.coupon_code = payload.data.coupon.coupon
            localStorage.setItem("coupon_value", state.coupon_value)
            localStorage.setItem("coupon_code", state.coupon_code)
        },
        couponFaild(state, payload) {
            state.error_coupon = payload
        },
        orderSuccess(state) {
            state.errors = ""
            localStorage.removeItem("shoppingCart")
            router.push('/thankyou')
        },
        orderFailed(state, payload) {
            state.errors = payload.response.data.errors
        }

    },
    actions: {
        checkCoupon({
            commit
        }, coupon) {
            axios.get("/api/coupon/check", {
                params: {
                    coupon
                }
            }).then((response) => {
                console.log("success")
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
