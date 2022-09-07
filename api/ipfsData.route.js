const {Router} = require("express");
const ipfsController = require("./ipfsData.controller");

const router = new Router();

router.route("/getTokenUri").get(ipfsController.apiGetTokenURI) 

module.exports = router;