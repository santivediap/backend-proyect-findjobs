const express = require("express");

const usersControllers = require("../controllers/usersControllers");
const usersRouter = express.Router();

usersRouter.get("/profile/:email", usersControllers.getUserByEmail);
usersRouter.get("/", usersControllers.getAllUsers);
usersRouter.post("/profile", usersControllers.createUser);
usersRouter.post('/signup', usersControllers.signUpUser);
console.log('He pasado las rutas de users');
// usersRouter.post('/login', usersControllers.loginUser);
// usersRouter.get('/logout/:email', usersControllers.logout)
// usersRouter.get('/recoverpassword/:email', usersControllers.recoverPassword); // envía email con token para acceder al put en una vista
// usersRouter.put('/resetpassword/:recoverToken', usersControllers.resetPassword);

module.exports = usersRouter;
