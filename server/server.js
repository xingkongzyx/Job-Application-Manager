import "express-async-errors";
import express from "express";
import { bgGreen, bgMagentaBright } from "console-log-colors";
import dotenv from "dotenv";
// * 将 .env 中定义的变量进行 register
dotenv.config(".env");

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import morgan from "morgan";

// deploy 时需要使用到的 security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import rateLimiter from "express-rate-limit";

const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

app.use(express.json());
// only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// const apiLimiter = rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     message:
//         "Too many requests from this IP, please try again after 15 minutes",
// });

// // Apply the rate limiting middleware to all requests
// app.use(apiLimiter);

// * 只在 dev 环境下使用 morgan middleware
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRouter);

// 对于所有的 job route, 使用 authenticateUser middleware 确保只有在用户得到验证的情况下才能访问这个 route
app.use("/api/v1/jobs", authenticateUser, jobRouter);

// only when ready to deploy
app.get("*", function (request, response) {
    response.sendFile(
        path.resolve(__dirname, "../client/build", "index.html")
    );
});

// * notFoundMiddleware: will be looking for requests that do not match any of our current route.
// * errorHandlerMiddleware: it's actually looking for errors that are happening in our existing world.
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
    // * 确保只有在 mongodb 数据库成功设置的情况下才会启动 server
    try {
        console.log("url: ", process.env.MONGO_URL);
        await connectDB(process.env.MONGO_URL);
        const port = process.env.PORT || 5000;
        console.log("DB connected");
        app.listen(port, () =>
            console.log(
                bgGreen.black.bold(
                    `Server is listening on port ${port}...`
                )
            )
        );
    } catch (error) {
        console.error(error);
    }
};

startServer();
