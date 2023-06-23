const express = require('express');
const actionRouter = express.Router(); 
const viewController = require ('../controllers/viewControllers');

actionRouter.get('/', viewController.homeSearch);
actionRouter.get('/users/profile', viewController.userProfile);
actionRouter.get('/favorites', viewController.UserFavorites);
actionRouter.get('/search-result', viewController.searchResult);


module.exports = actionRouter;