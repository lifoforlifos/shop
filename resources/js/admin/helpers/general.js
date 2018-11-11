const response = (router, store) => {
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status === 401) {
            store.commit('logout')
            router.push('/login')
        }
        return Promise.reject(error)
    })
}

const request = store => {
    axios.interceptors.request.use(
        (config) => {
            const currentAdmin = JSON.parse(store.getters.currentAdmin)
            if (currentAdmin) {
                config.headers['Authorization'] = `Bearer ${currentAdmin.token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}

export {
    response,
    request
}
