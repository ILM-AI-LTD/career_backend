const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const UserService = require('../services/userService');
const UserDao = require('../dao/user/userDao');
const MongoUserDao = require('../dao/user/mongoUserDao');

// Initialize DAOs and services
const userDao = new UserDao();
const mongoUserDao = new MongoUserDao();
const userService = new UserService(userDao, mongoUserDao);
const userController = new UserController(userService);

// Routes
router.get('/profile', (req, res) => userController.getUserProfile(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.get('/email/:email', (req, res) => userController.getUserByEmail(req, res));
router.patch('/:id/password', (req, res) => userController.updatePassword(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;