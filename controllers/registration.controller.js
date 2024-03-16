const registrationService = require('../services/registration.service');

exports.createRegistration = async (req, res) => {
    const result = await registrationService.createRegistration(req, res);
    return res.status(result.status).json(result);
}