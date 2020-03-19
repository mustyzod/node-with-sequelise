const ProductModel = require('../model/product');
const UserModel = require('../model/user');

/**
 * Get all products
 */
exports.getProducts = (req, res, next) => {
    const prodId = req.params.id;
    req.user
        .getProducts()
        // ProductModel.findAll()
        .then(products => {
            return res.json({
                'products': products
            })
        })
        .catch(err => console.log(err))
};
/**
 * Get single products
 */
exports.getSingleProduct = (req, res, next) => {
    const prodId = req.params.id;
    req.user
        .getProducts({
            where: {
                id: prodId
            }
        })
        // ProductModel.findByPk(req.params.id)
        .then(product => {
            return res.json({
                'product': product
            })
        })
        .catch(err => console.log(err))
};

/**
 * Add new product
 */
exports.addProduct = (req, res, next) => {
    req.user
        .createProduct({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
        })
        .then(product => {
            return res.status(200).json({
                'product': product
            })
        })
        .catch(err => console.log(err));
};

/**
 * Update Product
 */
exports.updateProduct = (req, res, next) => {
    ProductModel.findByPk(req.params.id)
        .then(product => {
            product.title = req.body.title;
            product.price = req.body.price;
            product.description = req.body.description;
            return product.save();
        })
        .then(result => {
            return res.json({
                'product': result
            })
        })
        .catch(err => console.log(err))
}
/**
 * Delete Product
 */
exports.deleteProduct = (req, res, next) => {
    ProductModel.findByPk(req.params.id)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            return res.json({
                msg: "Product Deleted",
                result
            })
        })
        .catch(err => console.log(err))
}