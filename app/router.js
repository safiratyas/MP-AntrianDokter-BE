const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const apiRouter = express.Router();

apiRouter.get("/", controllers.api.application.getRoot);

/**
 * @Admin Resources 
 */

 apiRouter.post("/api/admins/register",
 middlewares.adminCondition.checkCondition,
 controllers.api.admins.register
);

apiRouter.post("/api/admins/login",
 controllers.api.admins.login
);

apiRouter.get("/api/admins/who-am-i",
  middlewares.authorization.authorize,
  controllers.api.admins.whoAmI
);

apiRouter.put("/api/admins/:id/detail",
  middlewares.authorization.authorize,
  controllers.api.admins.updateDetail
);

apiRouter.get("/api/admins/:id",
  controllers.api.admins.getAdmin
);

apiRouter.get("/api/admins",
  middlewares.authorization.authorize,
  controllers.api.admins.getAllAdmins
);

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

apiRouter.get("/api/patients/who-am-i",
  middlewares.authorization.authorize,
  controllers.api.patients.whoAmI
);

apiRouter.put("/api/patients/:id/detail",
  middlewares.authorization.authorize,
  controllers.api.patients.updateDetail
);

apiRouter.get("/api/patients/:id",
  controllers.api.patients.getPatient
);

apiRouter.get("/api/patients",
  middlewares.authorization.authorize,
  controllers.api.patients.getAllPatients
);

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;