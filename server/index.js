require('dotenv').config()
const express = require('express')
const cors = require('cors');
const connectToMongo = require('./DataBase/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


connectToMongo();
const PORT = process.env.PORT || 5000;

app.use("/api/cab", require('./Routes/Cab.js'));

app.use("/", (req, res) => {
    res.json({ success: true, endpoint: "home" })
})
app.listen(PORT, () => {
    console.log(`Backend is listening on http://localhost:${PORT}`);

})

