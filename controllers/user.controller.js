const UserModel = require('../model/user');


/**
 * Get all user
 */
exports.getUsers = (req, res, next) => {
    UserModel.findAll()
        .then(users => {
            return res.json({
                'users': users
            });
        })
        .catch(err => console.log(err));
}
/**
 * Get Single User
 */
exports.getSingleUser = (req, res, next) => {
    UserModel.findByPk(req.params.id)
        .then(user => {
            return res.json({
                'user': user
            })
        })
        .catch(err => console.log(err))
}
/**
 * Create new user
 */
exports.registerUser = (req, res, next) => {
    UserModel.create({
            name: req.body.name,
            email: req.body.email
        })
        .then(user => {
            return res.json({
                'user': user
            })
        })
        .catch(err => console.log(err));
}
/**
 * Update User
 */
exports.updateUser = (req, res, next) => {
    UserModel.findByPk(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            return user.save();
        })
        .then(result => {
            return res.json({
                'user': result
            });
        })
        .catch(err => console.log())
}
/**
 * Delete User
 */
exports.deleteUser = (req, res, next) => {
    UserModel.findByPk(req.params.id)
        .then(user => {
            return user.destroy();
        })
        .then(result => {
            return res.json({
                'user': result
            })
        })
        .catch(err => console.log())
}