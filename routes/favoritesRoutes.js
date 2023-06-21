const express = require('express');

const favControllers = require("../controllers/favoritesControllers");
const favRouter = express.Router();

favRouter.get ('/', favControllers.getAllFavorites);
favRouter.post ('/', favControllers.createFavorite);
favRouter.delete ('/', favControllers.deleteFavorite);



module.exports = favRouter
