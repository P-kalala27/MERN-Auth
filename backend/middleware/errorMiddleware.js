// modification des erreurs en format json au lieu du web par defaut
// cas d'un requete inconnue ou not found l'erreur 404
const notFound = (res, req, next) => {
    const error = new Error(`page not found ${req.originalUrl}`);
    res.status(404);
    next(error);
}

//changement du type d'errueur de page 
const errorHandler = (err, req, res, next) => {
    //variable contenant le code de l'erreur
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    // initialisation du message 
    let message = err.message;

    if(err.name === 'CastError' && err.kind ==='ObjectId'){
        statusCode = 404;
        message = 'Resource not found';
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export {
    errorHandler, notFound
};
