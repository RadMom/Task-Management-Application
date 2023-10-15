const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log("Err is :" + err);
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode,
        },
    });
};

module.exports = errorHandler;
