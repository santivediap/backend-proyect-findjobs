const express = require("express");
const protectedRoutes = require("../middlewares/verifiedToken");

const favControllers = require("../controllers/favoritesControllers");
const favRouter = express.Router();

favRouter.get("/", favControllers.getAllFavorites);
favRouter.post("/", protectedRoutes, favControllers.createFavorite);
favRouter.delete("/", favControllers.deleteFavorite);

module.exports = favRouter;
