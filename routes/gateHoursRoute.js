const router = require('express').Router();

const { getGateHour } = require('../controller/gateHoursController');

const { postGateHour } = require('../controller/gateHoursController');

router.post('/postGateHour', postGateHour);
router.get('/gate', getGateHour);

module.exports = router;
