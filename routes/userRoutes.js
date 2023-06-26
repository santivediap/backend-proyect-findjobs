const express = require("express");

const usersControllers = require("../controllers/usersControllers");
const usersRouter = express.Router();
const protectedRoutes = require('../middlewares/verifiedToken');

usersRouter.get("/profile/:email", usersControllers.getUserByEmail);
usersRouter.get("/", usersControllers.getAllUsers);
usersRouter.post("/profile", usersControllers.createUser);
usersRouter.post('/auth/signup', usersControllers.signUpUser);
usersRouter.post('/auth/login', usersControllers.loginUser);
usersRouter.get('/logout', protectedRoutes, usersControllers.logout);

// usersRouter.get('/recoverpassword/:email', usersControllers.recoverPassword); // envía email con token para acceder al put en una vista
// usersRouter.put('/resetpassword/:recoverToken', usersControllers.resetPassword);

module.exports = usersRouter;
