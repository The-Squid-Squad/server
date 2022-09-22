const {Router} = require("express");
const ipfsController = require("./ipfsData.controller");

const router = new Router();

router.route("/getTokenUri").get(ipfsController.apiGetTokenURI) 

router.route("/fallback").post(ipfsController.apiReturnInternalTokenId) 

module.exports = router; 