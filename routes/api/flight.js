const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: 'flight works'}));

module.exports = router;