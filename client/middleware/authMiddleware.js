const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token, process.env.jwttokensecret, (err, decode) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: 'Auth is failed'
                })
            } 
            else {
                req.body.userId = decode.id
                next()
            }
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = requireAuth