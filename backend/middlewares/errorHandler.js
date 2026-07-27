const errorHandler = (err, req, res, next) => {

    console.error("Erreur serveur :", err)
    res.status(500).json({error: err.message || "Une erreur interne est survenue."})

}
module.exports= errorHandler