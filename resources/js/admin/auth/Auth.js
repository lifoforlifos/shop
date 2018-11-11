export default function (Vue) {
    Vue.auth = {
        //set token

        setToken(token_admin, admin_id) {
            localStorage.setItem('token_admin', token_admin)
            localStorage.setItem('admin_id', admin_id)
        },
        //get token

        getToken() {
            var token_admin = localStorage.getItem('token_admin')
            var admin_id = localStorage.getItem('admin_id')
            if (!token_admin || !admin_id)
                return null
            else
                return token_admin
        },
        //destroy token

        destroyToken() {
            localStorage.removeItem('token_admin')
            localStorage.removeItem('admin_id')
        },
        //isAuthenticated

        isAuthenticated() {
            if (this.getToken())
                return true
            else
                return false
        }

    }

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: () => {
                return Vue.auth
            }
        }
    })
}
