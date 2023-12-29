const config = require("./config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose
    .connect(mongoUrl, {})
    .then(() => {
        console.log("MongoDB is Connected!");
    })
    .catch((err) => {
        throw err;
    });

const app = express();
app.use(cors());

app.listen(config.app.port, () => {
    console.log(`Express server is running on port: ${config.app.port}`);
});
