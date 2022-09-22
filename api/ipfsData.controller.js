const ipfsDAO = require("../dao/ipfsDAO");

class ipfsController { 

    static async apiGetTokenURI(req, res, next) {
        try {
            let tokenuri = await ipfsDAO.getTokenURI()
            res.json({
                status: 'OK',
                data: tokenuri
              });
        } catch (err) {
            res.status(500).json({error:err})
        }
    }
    //if mint failed then return the tokenURI aka random_idx into the pool
    static async apiReturnInternalTokenId(req, res, next) {
        try {  
            await ipfsDAO.returnInternalTokenId(req.body)
            res.status(200)
        } catch (err) {
            res.status(500).json({error:err})
        }
    }

}

module.exports = ipfsController;
