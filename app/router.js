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
  middlewares.adminAuthorization.authorize,
  controllers.api.admins.whoAmI
);

apiRouter.put("/api/admins/:id/detail",
  middlewares.adminAuthorization.authorize,
  controllers.api.admins.updateDetail
);

apiRouter.get("/api/admins/:id",
  controllers.api.admins.getAdmin
);

apiRouter.get("/api/admins",
  middlewares.adminAuthorization.authorize,
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
  middlewares.patientAuthorization.authorize,
  controllers.api.patients.whoAmI
);

apiRouter.put("/api/patients/:id/detail",
  middlewares.patientAuthorization.authorize,
  controllers.api.patients.updateDetail
);

apiRouter.get("/api/patients/:id",
  middlewares.adminAuthorization.authorize,
  controllers.api.patients.getPatient
);

apiRouter.get("/api/patients",
  middlewares.adminAuthorization.authorize,
  controllers.api.patients.getAllPatients
);

/**
 * @Doctors Resources 
 */

 apiRouter.get("/api/doctor/:id",
 middlewares.adminAuthorization.authorize,
 middlewares.patientAuthorization.authorize,
 controllers.api.doctors.getDoctors
);

  apiRouter.get("/api/doctors",
  middlewares.adminAuthorization.authorize,
  middlewares.patientAuthorization.authorize,
  controllers.api.doctors.getAllDoctors
);

/**
 * @Examinations Resources 
 */

 apiRouter.get("/api/examination/:id",
 middlewares.adminAuthorization.authorize,
 middlewares.patientAuthorization.authorize,
 controllers.api.examinations.getExaminations
);

  apiRouter.get("/api/examinations",
  middlewares.adminAuthorization.authorize,
  middlewares.patientAuthorization.authorize,
  controllers.api.examinations.getAllExamination
);

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;