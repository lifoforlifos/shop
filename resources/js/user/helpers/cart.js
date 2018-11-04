var cart = [];

var Item = function (name, price, img, id, count) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.id = id;
    this.count = count;
};

export function addItemToCart(name, price, img, id, count) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count += count;
            saveCart();
            return;
        }
    }

    var item = new Item(name, price, img, id, count);
    cart.push(item);
    saveCart();
}

export function removeItemFromCart(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
}

export function removeAllItem(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }
    saveCart();
}

export function clearCart() {
    cart = [];
    saveCart();
}

export function countCart() {
    var totalCount = 0;
    for (var i in cart) {
        totalCount += cart[i].count;
    }
    return totalCount;
}

export function totalCost() {
    var totalCost = 0;
    for (var i in cart) {
        totalCost += cart[i].price * cart[i].count;
    }
    return totalCost;
}

export function listCart() {
    var cartCopy = [];
    for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}

export function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

export function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (cart === null) {
        cart = [];
    }
    return cart;
}

loadCart();
