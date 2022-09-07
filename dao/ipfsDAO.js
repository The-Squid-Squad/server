class ipfsDAO {

    static async getTokenURI() {
        try {
            console.log("Your Token URI = ipfs://uygv... ")
        } catch (err) {
            console.log("(SERVER) getTokenURI ERROR: " + err);
        }
    }   

}
module.exports = ipfsDAO