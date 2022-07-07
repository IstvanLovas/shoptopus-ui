const ST_CART = 'st_cart'

export function setCart(cart) {
    localStorage.setItem(ST_CART, JSON.stringify(cart))
}

export function getCart() {
    return JSON.parse(localStorage.getItem(ST_CART))
}

export function clearCart() {
    localStorage.removeItem(ST_CART)
}
