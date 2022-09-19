require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const metaData = require("./api/metaData.route");
const ipfsData = require("./api/ipfsData.route")


const app = express()

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cors());

app.use("/meta", metaData)
app.use("/ipfs", ipfsData)

app.use("*", (req, res) => res.status(404).json({ error: "nothing found. This route does not exist." }))



module.exports = app