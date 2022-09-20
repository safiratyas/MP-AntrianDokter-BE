const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const apiRouter = express.Router();

apiRouter.get("/", controllers.api.application.getRoot);

/**
 * @Patient Resources 
 */

apiRouter.post("/api/patients/register",
 middlewares.patientCondition.checkCondition,
 controllers.api.patients.register
);

apiRouter.post("/api/patients/login",
 controllers.api.patients.login
);

// apiRouter.get("/api/who-am-i",
//   middlewares.authorization.authorize,
//   controllers.api.authentication.whoAmI,
// );

// apiRouter.get("/api/patient/:id",
//   controllers.api.authentication.getPatient,
// );

// apiRouter.get("/api/patient",
//   middlewares.authorization.authorize,
//   controllers.api.authentication.getAllPatient,
// );

// apiRouter.put("/api/patient/:id/detail",
//   middlewares.authorization.authorize,
//   controllers.api.authentication.updateDetail,
// );

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;