const express = require('express');
const ctrl = require('./event.ctrl');
const router = express.Router();

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.put('/', ctrl.update);
router.delete('/', ctrl.remove);

module.exports = router;