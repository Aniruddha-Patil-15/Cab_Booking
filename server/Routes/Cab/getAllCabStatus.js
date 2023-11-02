const Cab = require('../../Models/Cab');


const getAllCabStatus = async (req, res) => {
    try {
        const allCabs = await Cab.find();
        let CabStatus = [];
        const date = new Date();
        for (let i = 0; i < allCabs.length; i++) {
            if (allCabs[i].busyUpto < date) {
                CabStatus.push({ name: allCabs[i].name, status: "Available", rate:allCabs[i].rate, vehicleNumber:allCabs[i].vehicleNumber })
            }
        }
        res.status(200).json({success:true, CabStatus, totalCab:CabStatus.length});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

module.exports = getAllCabStatus;