const express = require('express');
const ctrl = require('./user.ctrl');
const router = express.Router();

router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
router.post('/', ctrl.join);

module.exports = router;