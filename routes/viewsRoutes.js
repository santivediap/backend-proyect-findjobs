const express = require("express");
const actionRouter = express.Router();
const viewController = require("../controllers/viewControllers");
const protectedRoutes = require("../middlewares/verifiedToken");

actionRouter.get('/', protectedRoutes, viewController.homeSearch);
actionRouter.get("/users/profile", protectedRoutes, viewController.userProfile);
actionRouter.get("/user/favorites", protectedRoutes, viewController.userFavorites);
actionRouter.get("/search-results", protectedRoutes, viewController.searchResult);
actionRouter.post("/search-results", viewController.searchOffers);
actionRouter.get("/user-login", viewController.userLogin);
actionRouter.get("/create-account", viewController.userSignUp);
actionRouter.get('/admin', viewController.adminHome);

module.exports = actionRouter;
