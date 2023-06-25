const express = require('express');
const actionRouter = express.Router(); 
const viewController = require ('../controllers/viewControllers');
// const verifyUser = require ('../middlewares/verifiedToken');

actionRouter.get('/', viewController.homeSearch);
actionRouter.get('/users/profile', viewController.userProfile);
actionRouter.get('/user/favorites', viewController.userFavorites);
actionRouter.get('/search-results', viewController.searchResult);
actionRouter.get('/user-login', viewController.userLogin);
actionRouter.get('/create-account', viewController.userSignUp);


module.exports = actionRouter;
