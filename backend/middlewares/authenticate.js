const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.stertsWith('Bearer ')) {
        return res.status(401).json({error:"Accès refusé. Token manquant ou invalide."})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token. process.env.JWT_SECRET)

        req.user = decoded
        next()
    }catch (error) {
        return res.status(401).json({error:"Token invalide ou expiré."})
    }
}

module.exports = authenticate