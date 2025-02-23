require('dotenv').config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/paytm-clone",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key"
};
