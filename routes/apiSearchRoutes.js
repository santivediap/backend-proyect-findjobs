const express = require('express');
const apiSearchRouter = express.Router();
const apiSearchControllers = require('../controllers/apiSearchControllers');

apiSearchRouter.get('/', apiSearchControllers.getOffers);
apiSearchRouter.post('/', apiSearchControllers.searchOffers);

module.exports = apiSearchRouter;