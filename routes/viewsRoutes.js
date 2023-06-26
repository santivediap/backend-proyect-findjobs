const express = require('express');
const actionRouter = express.Router(); 
const viewController = require ('../controllers/viewControllers');
const protectedRoutes = require ('../middlewares/verifiedToken');

actionRouter.get('/', protectedRoutes, viewController.homeSearch);
actionRouter.get('/users/profile', protectedRoutes, viewController.userProfile);
actionRouter.get('/user/favorites', viewController.userFavorites);
actionRouter.get('/search-results', viewController.searchResult);
actionRouter.post('/search-results', viewController.searchOffers);
actionRouter.get('/user-login', viewController.userLogin);
actionRouter.get('/create-account', viewController.userSignUp);
actionRouter.get('/home', viewController.adminHome);


module.exports = actionRouter;
