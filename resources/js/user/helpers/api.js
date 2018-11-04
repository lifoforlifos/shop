import axios from 'axios'
export function login(credentials) {
    return new Promise((res, rej) => {
        axios.post('/api/auth/login', credentials)
            .then((response) => {
                res(response.data)
            })
            .catch((err) => {
                rej('something went wrong')
            })
    })
}

export function register(credentials) {
    return new Promise((res, rej) => {
        axios.post('api/auth/register', credentials)
            .then((response) => {
                res(response.data)
            })
            .catch((error) => {
                rej(error)
            })
    })
}

export function getLocalUser() {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
        return null
    }
    return JSON.parse(userStr)
}
