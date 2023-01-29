import { red, bgWhiteBright } from "console-log-colors";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(red.bgWhiteBright.bold(err.message));
    // * 使用一个 defaultError obj 来记录本次故障应该返回的 status code 以及 error message
    const defaultError = {
        statusCode: err.statusCode || 500,
        msg: err.message || "Something went wrong, try again later!",
    };

    if (err.name === "ValidationError") {
        defaultError.statusCode = 400;
        let msgStr = Object.values(err.errors)
            .map((item) => {
                return item.message;
            })
            .join(", ");
        defaultError.msg = msgStr + "- from mongoose check";
    }

    if (err.code === 11000) {
        defaultError.statusCode = 400;
        let msgStr = Object.keys(err.keyValue).join(", ");
        defaultError.msg = `${msgStr} has to be unique - from mongoose check`;
    }

    res.status(defaultError.statusCode).json({
        msg: defaultError.msg,
    });
};

export default errorHandlerMiddleware;
