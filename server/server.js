import "express-async-errors";
import express from "express";
import { bgGreen, bgMagentaBright } from "console-log-colors";
import dotenv from "dotenv";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import morgan from "morgan";

const app = express();
app.use(express.json());
// * 将 .env 中定义的变量进行 register
dotenv.config();

// * 只在 dev 环境下使用 morgan middleware
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRouter);

// 对于所有的 job route, 使用 authenticateUser middleware 确保只有在用户得到验证的情况下才能访问这个 route
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.get("/", (req, res) => {
    res.send("Welcome!");
});

// * notFoundMiddleware: will be looking for requests that do not match any of our current route.
// * errorHandlerMiddleware: it's actually looking for errors that are happening in our existing world.
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
    // * 确保只有在 mongodb 数据库成功设置的情况下才会启动 server
    try {
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
