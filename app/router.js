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

apiRouter.post("/api/admins/login",
  controllers.api.admins.login
);

apiRouter.get("/api/admins/who-am-i",
  middlewares.adminAuthorization.authorize,
  controllers.api.admins.whoAmI
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

apiRouter.delete("/api/patients/:id/destroy",
  middlewares.patientAuthorization.authorize,
  controllers.api.patients.deletePatient
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
  middlewares.queueCondition.checkCondition,
  controllers.api.queues.createQueue
);

apiRouter.get("/api/bookings/:id",
  middlewares.patientAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.queues.getQueue
);

apiRouter.get("/api/bookings",
  middlewares.patientAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.queues.getAllQueues
);

apiRouter.delete("/api/destroys/booking",
  middlewares.adminAuthorization.authorize,
  controllers.api.queues.deleteAllQueue
);

/**
 * @Booking History 
 */

apiRouter.put("/api/admins/update-booking/:id",
  middlewares.adminAuthorization.authorize,
  controllers.api.bookings.updateBookingPatient
);

apiRouter.get("/api/bookings/history/:id",
  middlewares.patientAuthorization.authorize,
  controllers.api.bookings.historyBookings
);

apiRouter.get("/api/current-queues", 
  middlewares.patientAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.bookings.getCurrentQueue
);

/**
 * @Examinations Resources 
 */

apiRouter.get("/api/examinations",
  middlewares.patientAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.examinations.getAllExamination
);

apiRouter.get("/api/examinations/:id",
  middlewares.patientAuthorization.authorize || middlewares.adminAuthorization.authorize,
  controllers.api.examinations.getExaminations
);

/**
 * @Notifications Resources 
 */

apiRouter.get("/api/notifications",
middlewares.adminAuthorization.authorize,
controllers.api.notifications.getAllNotification
);

/**
 * @API Documentation
 */

apiRouter.get('/documentation.json', (req, res) => res.send(swaggerDocument));
apiRouter.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;