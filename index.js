require('dotenv').config(); // Load environment variables
const express = require("express");
const connectDB = require("./db/db.js");
const rootRouter = require("./routes/index");

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
