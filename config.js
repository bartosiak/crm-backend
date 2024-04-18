require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
    app: {
        port: PORT,
    },

    db: {
        uri: MONGODB_URI,
    },
};
