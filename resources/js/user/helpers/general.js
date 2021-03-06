    const getLocalUser = () => {
        const userStr = localStorage.getItem('user')
        if (!userStr) {
            return null
        }
        return JSON.parse(userStr)
    }
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
            config => {
                let currentUser = store.getters.currentUser
                if (currentUser) {
                    config.headers['Authorization'] = `Bearer ${currentUser.token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    export {
        getLocalUser,
        response,
        request
    }
