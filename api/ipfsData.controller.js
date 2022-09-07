const ipfsDAO = require("../dao/ipfsDAO");

class ipfsController {

    static async apiGetTokenURI(req, res, next) {
        try {
            await ipfsDAO.getTokenURI(req)
        } catch (err) {
            res.status(500).json({error:err})
        }
    }

}

module.exports = ipfsController;