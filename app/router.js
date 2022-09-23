const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const apiRouter = express.Router();

// configure and initialization swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');

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

apiRouter.put("/api/admins/update-booking/:bookingId",
  middlewares.adminAuthorization.authorize,
  controllers.api.admins.updateBookingPatient
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
 * @Queue Resources 
 */

apiRouter.post("/api/patients/booking",
  middlewares.patientAuthorization.authorize,
  controllers.api.queue.createQueue
);

apiRouter.delete("/api/patients/booking",
  middlewares.adminAuthorization.authorize,
  controllers.api.queue.deleteAllQueue
);

apiRouter.get("/api/booking/:id",
  middlewares.adminAuthorization.authorize,
  controllers.api.queue.getQueue
);

apiRouter.get("/api/all/booking",
  middlewares.adminAuthorization.authorize,
  controllers.api.queue.getAllQueues
);
/**
 * @Doctors Resources 
 */

apiRouter.get("/api/doctors/:id",
  middlewares.adminAuthorization.authorize,
  controllers.api.doctors.getDoctor
);

apiRouter.get("/api/doctors",
  middlewares.adminAuthorization.authorize,
  controllers.api.doctors.getAllDoctors
);

/**
 * @Examinations Resources 
 */

apiRouter.get("/api/examinations",
  middlewares.adminAuthorization.authorize,
  controllers.api.examinations.getAllExamination
);

/**
 * @API Documentation
 */

apiRouter.get('/documentation.json', (req, res) => res.send(swaggerDocument));
apiRouter.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;