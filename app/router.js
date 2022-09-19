const express = require('express');
const controllers = require('./controllers');
apiRouter = express.Router();

apiRouter.get('/', controllers.api.application.getRoot);
apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;