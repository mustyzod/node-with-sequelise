const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');


//  @route GET api/v1/users
router.get('/', UserController.getUsers);
//  @route GET api/v1/users
router.get('/:id', UserController.getSingleUser);
//  @route POST api/v1/users/register
router.post('/register', UserController.registerUser);
//  @route PUT api/v1/users/:id
router.put('/:id', UserController.updateUser);
// @route DELETE api/v1/users/:id
router.delete('/:id', UserController.deleteUser);

module.exports = router;