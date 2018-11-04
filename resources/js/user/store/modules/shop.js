import axios from "axios"
import router from '../../router'
export default {
    state: {
        products: [],
        categories: [],
        brands: [],
        pagination: "",
        selected: "",
        brand_name: "",
        pagi: ""
    },
    getters: {
        products(state) {
            return state.products
        },
        categories(state) {
            return state.categories
        },
        brands(state) {
            return state.brands
        },
        pagination(state) {
            return state.pagination
        }
    },
    mutations: {
        brandName(state, payload) {
            state.brand_name = payload
        },
        selected(state, payload) {
            state.selected = payload
        },
        getProducts(state, payload) {
            state.categories = payload.data.categories
            state.brands = payload.data.brands
            state.products = payload.data.products.data
            state.pagination = {
                current_page: payload.data.products.current_page,
                last_page: payload.data.products.last_page,
                from_page: payload.data.products.from,
                to_page: payload.data.products.to,
                total_page: payload.data.products.total,
                path_page: payload.data.products.path + "?page=",
                first_link: payload.data.products.first_page_url,
                last_link: payload.data.products.last_page_url,
                prev_link: payload.data.products.prev_page_url,
                next_link: payload.data.products.next_page_url,
                total: payload.data.products.total
            }
        },
    },
    actions: {
        getProducts({
            commit,
            state
        }, payload) {
            const pagi = payload || "/api/product/get/" + router.currentRoute.params.category_slug
            axios.get(pagi, {
                    params: {
                        brand_name: state.brand_name || null,
                        selected: state.selected || null
                    }

                })
                .then((response) => {
                    commit("getProducts", response)
                })
        }
    }
}
