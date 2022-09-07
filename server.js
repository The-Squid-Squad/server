require('dotenv').config();
const express = require("express");
const cors = require('cors');
const metaData = require("./api/metaData.route");
const ipfsData = require("./api/ipfsData.route")


const app = express()

app.use(cors({origin: process.env.CLIENT_URL}));

app.use("/meta", metaData)
app.use("/ipfs", ipfsData)

app.use("*", (req, res) => res.status(404).json({ error: "nothing found. This route does not exist." }))

module.exports = app