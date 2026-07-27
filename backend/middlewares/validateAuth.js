const validateRegister = (req, res, next) => {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
        return res.status(400).json({error:"Tous les champs sont requis."})
    }
    if (password.length < 6) {
        return res.status(400).json({error: "Le mot de passe doit contenir au moins 6 caractères."})
    }
    next()
}

const validateLogin = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({error:"Email et mot de passe requis."})
    }
    next()
}
module.exports = { validateRegister, validateLogin }