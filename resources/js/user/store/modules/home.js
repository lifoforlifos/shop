import axios from "axios";

export default {
    state: {
        sliders: "",
        popular_products: ""
    },
    getters: {
        sliders(state) {
            return state.sliders
        },
        popular_products(state) {
            return state.popular_products
        }
    },
    mutations: {
        getContent(state, payload) {
            state.sliders = payload.data.sliders
            state.popular_products = payload.data.popular_products
        }
    },
    actions: {
        Content({
            commit
        }) {
            axios.get("/api/product/landingpage")
                .then(response => {
                    commit("getContent", response)
                })
        }
    }
}
