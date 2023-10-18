const errorHandler = (err, req, res, next) => {
    const stack = process.env.NODE_ENV === "production" ? null : err.stack;

    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log("Err is :" + err);
    res.status(statusCode).json({
        error: {
            message: err.message,
            stack,
        },
    });
};

module.exports = errorHandler;
