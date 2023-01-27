const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("Server error", err);
    res.status(500).json({ msg: "server error" });
};

export default errorHandlerMiddleware;
