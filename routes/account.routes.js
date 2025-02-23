const express = require('express');
const { getBalance, transferFunds } = require('../controllers/account.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferFunds);

module.exports = router;
