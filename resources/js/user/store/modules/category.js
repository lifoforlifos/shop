import axios from 'axios'

const state = {
    Allcategories: []
}

const getters = {
    Allcategories(state) {
        return state.Allcategories
    }
}

const mutations = {
    getCategories(state, payload) {
        state.Allcategories = payload
    }
}
const actions = {
    getCategories({
        commit
    }) {
        axios.get('/api/categories')
            .then((response) => {
                commit('getCategories', response.data.categories)
            })
    }
}


export default {
    state,
    mutations,
    getters,
    actions
}
