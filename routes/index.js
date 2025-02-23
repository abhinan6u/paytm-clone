const express = require('express');
const userRoutes = require('./user.routes');
const accountRoutes = require('./account.routes');

const router = express.Router();

router.use("/user", userRoutes);
router.use("/account", accountRoutes);

module.exports = router;
