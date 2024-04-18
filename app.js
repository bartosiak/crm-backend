const config = require("./config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoUrl = config.db.uri;
const cookieParser = require("cookie-parser");

mongoose
    .connect(mongoUrl, {})
    .then(() => {
        console.log("MongoDB is Connected!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const authApiMiddleware = require("./app/middlewares/authApiMiddleware");

const customerRouter = require("./app/router/customerRouter");
const actionRouter = require("./app/router/actionRouter");
const userRouter = require("./app/router/userRouter");

app.use("/customers", authApiMiddleware, customerRouter);
app.use("/actions", authApiMiddleware, actionRouter);
app.use("/", userRouter);

app.listen(config.app.port, () => {
    console.log(`Express server is running on port: ${config.app.port}`);
});
