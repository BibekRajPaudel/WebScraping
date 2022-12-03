const notFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl}-Not Found`);
    res.status(404);
    next(error);
};

// eslint-disable-next-line no-unused-vars
// const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode).json({
//         statusCode,
//         message: typeof err === 'string' ? err : err.message || 'oh no',
//         ...(err.data && { data: err.data }),
//         stack: process.env.NODE_ENV === 'production' ? 'oh no' : err.stack,
//     });
// };


class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor)
    }
}







module.exports = { notFound, ErrorHandler };
