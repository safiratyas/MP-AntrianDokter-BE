const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
// const uploadOnMemory = require("../config/uploadOnMemory");
const apiRouter = express.Router();

// // configure and initialization swagger
// const swaggerUI = require('swagger-ui-express');
// const swaggerDocument = require('../config/swagger.json');


apiRouter.get("/", controllers.api.application.getRoot);


/**
 * @Authentication Resources 
 */
//  apiRouter.post("/api/login",
//  controllers.api.authentication.login
// );

apiRouter.post("/api/register",
 middlewares.checkCondition.checkCondition,
 controllers.api.authentication.register
);

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;