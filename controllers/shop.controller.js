// const CartModel = require('../model/Cart');
// const UserModel = require('../model/user');
const ProductModel = require('../model/product');
const OrderModel = require('../model/Order');

/**
 *  Get User Cart
 */
exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    return res.json({
                        products
                    });
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
};
/**
 *  Post product to cart
 */
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({
                    where: {
                        id: prodId
                    }
                })
                .then(products => {
                    let product;
                    if (products.length > 0) {
                        product = products[0];
                    }
                    if (product) {
                        const oldQuantity = product.cartItem.quantity;
                        newQuantity = oldQuantity + 1;
                        // return product;
                        return fetchedCart.addProduct(product, {
                            through: {
                                quantity: newQuantity
                            }
                        })
                    }
                    return ProductModel.findByPk(prodId)
                        .then(product => {
                            return fetchedCart.addProduct(product, {
                                through: {
                                    quantity: newQuantity
                                }
                            });
                        })
                        .catch(err => console.log(err))
                })
        })
        .then(result => {
            return res.json({
                result
            });
        })
        .catch(err => console.log(err))
}

/**
 *  Delete Cart Item
 */
exports.deleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: prodId
                }
            })
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            return res.json({
                result
            });
        })
        .catch(err => console.log(err))
}

/**
 * Get Order
 */

exports.getOrder = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            return res.json({
                orders
            })
        })
        .catch(err => console.log(err));
}
/**
 * Post Order
 */
exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.orderItem
                        };
                        return product;
                    }))
                })
                .then(result => {
                    return fetchedCart.setProducts(null)
                })
                .then(result => {
                    return res.json({
                        result
                    });
                })
                .catch(err => console.log(err))
            console.log(products);
        })
        .catch(err => console.log(err));
}