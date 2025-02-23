const express = require('express');
const { signup, signin, updateUser } = require('../controllers/user.controllers.js');
const authMiddleware = require('../middlewares/auth.middlewares');

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/", authMiddleware, updateUser);

module.exports = router;
