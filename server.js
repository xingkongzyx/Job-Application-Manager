import express from "express";

const app = express();

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
// not found: will be looking for requests that do not match any of our current route. error handler: it's actually looking for errors that are happening in our existing world.
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
    // 确保只有在 mongodb 数据库成功设置的情况下才会启动 server
    try {
        await connectDB(process.env.MONGO_URL);
        const port = process.env.PORT || 5000;
        console.log("DB connected");
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.error(error);
    }
};
startServer();
