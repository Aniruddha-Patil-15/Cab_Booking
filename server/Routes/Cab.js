const express = require('express');
const router = express.Router();
const createCab = require('./Cab/createCab');
const getAllCabStatus = require('./Cab/getAllCabStatus');
const getShortestRoute = require('./Cab/getShortestRoute');
const bookCab = require('./Cab/bookCab');

router.post("/createCab", createCab);

router.get("/getAllCabStatus",getAllCabStatus);

router.get("/getShortestRoute", getShortestRoute);

router.post("/bookCab", bookCab);

module.exports = router;