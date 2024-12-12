import ErrorHandler from "../utils/errorHandler.js";

export default(err, req, res, next) => {
    let error = {
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error",
    }

    //  // Handle Mongoose validation errors
    //  if (err.name === "ValidationError") {
    //     error.statusCode = 400; // Bad request
    //     error.message = Object.values(err.errors).map(val => val.message).join(", ");
    // }

    if(err.name === "CastError"){
        const message = `Resource not found. Invalid ${err?.path}`
        error = new ErrorHandler(message, 404);
    }

    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map((value) => value.message)
        error = new ErrorHandler(message, 400);
    }

    if(process.env.NODE_ENV == "DEVELOPMENT"){
        return res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err?.stack
        })
    }

    if(process.env.NODE_ENV == "PRODUCTION"){
        return res.status(error.statusCode).json({
            message: error.message,
        })
    }

    res.status(error.statusCode).json({
        message: error.message
    })
}

