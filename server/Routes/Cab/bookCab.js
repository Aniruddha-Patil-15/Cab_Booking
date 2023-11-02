const Cab = require('../../Models/Cab');

const bookCab = async (req, res) => {
    try {
        console.log(req.body);
        const {vehicleNumber, timeTaken} = req.body;
        let cab = await Cab.findOne({vehicleNumber});
        if(!cab){
            errCode = 404;
            throw new Error("No cab found with this vehichleNumber");
        }
        cab.busyUpto = new Date(Date.now() + (timeTaken+5)*60*1000);
        await cab.save();
        res.status(200).json({success:true});


    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}
module.exports = bookCab;
