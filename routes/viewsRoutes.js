const express = require('express');
const actionRouter = express.Router(); 
const viewController = require ('../controllers/viewControllers');

actionRouter.get('/', viewController.homeSearch);
actionRouter.get('/users/profile', viewController.userProfile);
actionRouter.get('/user/favorites', viewController.userFavorites);
actionRouter.get('/search-results', viewController.searchResult);
actionRouter.post('/search-results', viewController.searchOffers);
actionRouter.get('/user-login', viewController.userLogin);
actionRouter.get('/create-account', viewController.userSignUp);


module.exports = actionRouter;
