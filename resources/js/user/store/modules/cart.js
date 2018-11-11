let Item = function (name, price, img, id, count) {
    this.name = name
    this.price = price
    this.img = img
    this.id = id
    this.count = count
};
export default {
    state: {
        cart: JSON.parse(localStorage.getItem("shoppingCart")) || [],
        countCart: 0,
        totalCost: 0
    },
    getters: {
        CountCart(state) {
            state.countCart = 0;
            state.cart.forEach((cart) => {
                state.countCart += cart.count
            })
            return state.countCart
        },
        totalCost(state) {
            state.totalCost = 0;
            state.cart.forEach((cart) => {
                state.totalCost += cart.price * cart.count;
            })
            return state.totalCost;
        },
        carts(state) {
            return state.cart
        }
    },
    mutations: {
        addToCart(state, payload) {
            const carts = state.cart
            for (var i in carts) {
                if (carts[i].name === payload.name) {
                    carts[i].count += payload.count;
                    localStorage.setItem("shoppingCart", JSON.stringify(carts))
                    return;
                }
            }
            const item = new Item(payload.name, payload.price, payload.img, payload.id, payload.count)
            carts.push(item)
            localStorage.setItem("shoppingCart", JSON.stringify(carts))
        },
        removeItemFromCart(state, payload) {
            const carts = state.cart
            carts.forEach((cart, index) => {
                if (cart.name === payload) {
                    state.countCart -= cart.count
                    carts.splice(index, 1)
                }
            })
            localStorage.setItem("shoppingCart", JSON.stringify(carts))
            localStorage.setItem("shoppingCount", JSON.stringify(state.countCart))
        },

        clearAll(state) {
            state.cart = []
            localStorage.removeItem("shoppingCart")
        }
    }

}
