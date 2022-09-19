const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const apiRouter = express.Router();

// configure and initialization swagger
// const swaggerUI = require('swagger-ui-express');
// const swaggerDocument = require('../config/swagger.json');

apiRouter.get("/", controllers.api.application.getRoot);

/**
 * @Authentication Resources 
 */
 apiRouter.post("/api/login",
 controllers.api.authentication.login
);

apiRouter.post("/api/register",
 middlewares.checkCondition.checkCondition,
 controllers.api.authentication.register
);

apiRouter.get("/api/who-am-i",
  middlewares.authorization.authorize,
  controllers.api.authentication.whoAmI,
);

apiRouter.get("/api/patient/:id",
  controllers.api.authentication.getPatient,
);

apiRouter.get("/api/patient",
  middlewares.authorization.authorize,
  controllers.api.authentication.getAllPatient,
);

apiRouter.put("/api/patient/:id/detail",
  middlewares.authorization.authorize,
  controllers.api.authentication.updateDetail,
);

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;