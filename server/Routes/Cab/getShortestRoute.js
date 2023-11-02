const ShortestRoute = require("../../controller/ShortestRoute");

const getShortestRoute = async (req, res) => {
    console.log(req.query);
    try {
       const {src, dst} = req.query;
       const shortestRoute = ShortestRoute(src, dst);
       res.status(200).json({success:true, shortestRoute});

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

module.exports = getShortestRoute;