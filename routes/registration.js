var express = require('express');
var router = express.Router();
const registrationController = require('../controllers/registration.controller');
const { auth } = require('../middleware/auth.middleware');

router.post('/',auth,registrationController.createRegistration)
router.post('/notification',registrationController.notification)
module.exports = router;
