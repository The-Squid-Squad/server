const {Router} = require("express");
const ipfsController = require("./ipfsData.controller");

const router = new Router();

router.route("/getTokenUri").get(ipfsController.apiGetTokenURI) 

router.route("/fallback-mint").put(ipfsController.apiReturnTokenURI) 

module.exports = router;