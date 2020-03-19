const express = require('express');
const app = express();

app.use(express.json());

const sequelize = require('./util/database');
const ProductModel = require('./model/product');
const UserModel = require('./model/user');
const CartModel = require('./model/Cart');
const CartItemModel = require('./model/CartItem');
const OrderModel = require('./model/Order');
const OrderItemModel = require('./model/OrderItem');


const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const shopRoute = require('./routes/shop');


//  Relationships
//  One to Many
ProductModel.belongsTo(UserModel, {
    constraint: true,
    onDelete: 'CASCADE'
});
UserModel.hasMany(ProductModel);
// One to One
CartModel.belongsTo(UserModel, {
    constraints: true,
    onDelete: 'CASCADE'
});
UserModel.hasOne(CartModel);
//  Many to Many
CartModel.belongsToMany(ProductModel, {
    through: CartItemModel
});
ProductModel.belongsToMany(CartModel, {
    through: CartItemModel
});

//  Order
OrderModel.belongsTo(UserModel);
UserModel.hasMany(OrderModel);
OrderModel.belongsToMany(ProductModel, {
    through: OrderItemModel
})

// Assumed loggedin user
app.use((req, res, next) => {
    UserModel.findByPk(1)
        .then(user => {
            if (!user) {
                return UserModel.create({
                    name: 'Sodruldeen Mustapha',
                    email: 'mustyzod@gmail.com'
                });
            }
            return user;
        })
        .then(user => {
            req.user = user;
            next();
            // return req.user;
        })
        // .then(() => {
        //     req.user.createCart();
        //     next();
        // })
        .catch(err => console.log(err))
});

app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/shop', shopRoute);

const PORT = process.env.PORT || 5000;


sequelize
    // .sync({
    //     force: true
    // })
    .sync()
    .then(result => {
        app.listen(PORT, () => `Server running on port ${PORT}`);
    })
    .catch(err => console.log('error:' +
        err));