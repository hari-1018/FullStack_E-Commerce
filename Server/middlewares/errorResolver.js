const customError = require('../utils/customErrors')
const errorResolver = (err,req,res,next) =>{
    console.error(err.stack);

    const statusCode = err.status || 500;
    const message = err.message || 'Something Unexpected Occured';

    res.status(statusCode).json({
        status: 'failed',
        message: message,
    });
}

module.exports = errorResolver;