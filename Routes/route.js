const express = require('express');
const router = express.Router();
const members = require('../API/members');

router.get('/', (req, res) => res.json(members))

module.exports = router;