var Item = function (name, price, img, id, count) {
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
            for (var i in state.cart) {
                state.countCart += state.cart[i].count
            }
            return state.countCart
        },
        totalCost(state) {
            state.totalCost = 0;
            for (var i in state.cart) {
                state.totalCost += state.cart[i].price * state.cart[i].count;
            }
            return state.totalCost;
        },
        carts(state) {
            return state.cart
        }
    },
    mutations: {
        addToCart(state, payload) {
            var cart = state.cart
            for (var i in cart) {
                if (cart[i].name === payload.name) {
                    cart[i].count += payload.count;
                    localStorage.setItem("shoppingCart", JSON.stringify(cart))
                    return;
                }
            }
            var item = new Item(payload.name, payload.price, payload.img, payload.id, payload.count)
            cart.push(item)
            localStorage.setItem("shoppingCart", JSON.stringify(cart))
        },
        removeItemFromCart(state, payload) {
            const cart = state.cart
            for (var i in cart) {
                if (cart[i].name === payload) {
                    state.countCart -= cart[i].count
                    cart.splice(i, 1)
                    break;
                }
            }
            localStorage.setItem("shoppingCart", JSON.stringify(cart))
            localStorage.setItem("shoppingCount", JSON.stringify(state.countCart))
        },
        countCart(state) {
            for (var i in state.cart) {
                state.totalCount += state.cart[i].count
            }
        },
        clearAll(state) {
            state.cart = []
            state.countCart = 0
            localStorage.removeItem("shoppingCart")
            localStorage.removeItem("shoppingCount")
        }
    },
    actions: {

    }
}
