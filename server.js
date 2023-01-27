import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.get("/", (req, res) => {
    throw new Error("asda");
    res.send("Welcome!");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);

// not found: will be looking for requests that do not match any of our current route. error handler: it's actually looking for errors that are happening in our existing world.
