const express = require('express');

const usersControllers = require("../controllers/usersControllers");
const usersRouter = express.Router();

usersRouter.get('/profile/:email', usersControllers.getUserByEmail);
usersRouter.get('/', usersControllers.getAllUsers);
usersRouter.post('/profile', usersControllers.createUser);

module.exports = usersRouter;


