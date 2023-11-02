const mongoose = require("mongoose");
const { Schema } = mongoose;
const cabSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    vehicleNumber:{
        type: String,
        required: true,
        unique: true
    },
    driverName:{
        type: String,
        required: true
    },
    busyUpto: {
        type: Date,
        required: true
    },
    rate:{
        type: Number,
        required: true
    },
});
const Cab = mongoose.model("User", cabSchema);
module.exports = Cab;