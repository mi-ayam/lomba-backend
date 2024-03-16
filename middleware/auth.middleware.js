const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT)
            req.user_data = decoded
            next()
        }else{
            return res.status(403).json({
                status : 403,
                message : "Unauthorized access"
            })
        }
    } catch (error) {
        return res.status(403).json({
            status : 403,
            message : "Unauthorized access"
        })
    }
}