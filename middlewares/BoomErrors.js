function logErrors(err){
    console.error(err)
}

function errorHandler(err, res){
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

function boomErrorHandler(err, res, next){
    if(err.isBoom){
        const { output } = err
        res.status(output.statusCode).json(output.payload);
    }else{
        next(err)
    }
}

module.exports = { logErrors, errorHandler, boomErrorHandler }