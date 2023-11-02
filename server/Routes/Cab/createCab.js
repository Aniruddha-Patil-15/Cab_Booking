const Cab = require('../../Models/Cab');

const createCab = async (req, res) => {
    try {
        const { name, rate, vehicleNumber, driverName } = req.body;
        const busyUpto = new Date();
        const cab = new Cab({ name, rate, vehicleNumber, driverName,busyUpto });
        const savedCab = await cab.save();
        res.json({ success: true, cab: savedCab });

    } catch (err) {
        res.status(statusCode || 500).json({ success: false, error: err.message })
    }
}

module.exports = createCab;