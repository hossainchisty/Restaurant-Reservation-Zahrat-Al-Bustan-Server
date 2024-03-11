// Basic Lib Imports
const express = require('express');
const router = express.Router();

const { dashboard } = require('../controllers/analyticsController');

// Routing Implement

router.get('/', dashboard);

module.exports = router;
