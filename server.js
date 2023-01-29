import "express-async-errors";
import express from "express";
import { bgGreen, bgMagentaBright } from "console-log-colors";
import dotenv from "dotenv";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";

// * 将 .env 中定义的变量进行 register
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

app.get("/api/v1", (req, res) => {
    res.json({ msg: "hello from server" });
});
// app.get("/", (req, res) => {
//     res.send("Welcome!");
// });

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
