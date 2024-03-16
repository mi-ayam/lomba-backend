const authService = require('../services/auth.service');

exports.authControllerLogin = async (req, res) => {
    const result = await authService.authLogin(req, res);
    return res.status(result.status).json(result);
}