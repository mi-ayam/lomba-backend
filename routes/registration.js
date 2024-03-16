var express = require('express');
var router = express.Router();
const registrationController = require('../controllers/registration.controller');
const { auth } = require('../middleware/auth.middleware');

router.post('/',auth,registrationController.createRegistration)

module.exports = router;
