require('dotenv').config();
const NodeRSA = require('node-rsa');
const { MersenneTwister19937, Random } = require('random-js');
const random = new Random(MersenneTwister19937.autoSeed());
const baseURL = `${process.env.BASE_URL}` 
let nft_indexes = [...Array(10000).keys()]
const keys = new NodeRSA(`-----BEGIN RSA PRIVATE KEY-----${process.env.RSA_PRIVATE}-----END RSA PRIVATE KEY-----`);

class ipfsDAO {

    static async getTokenURI(req, res, next) {
        if(nft_indexes.length >= 1) {
            try {
                let random_idx = random.integer(0, nft_indexes.length);
                let i = nft_indexes.length > 1? nft_indexes[random_idx] : nft_indexes[0]
                console.log("NFT #"+ random_idx)
                const encrypted_uri = keys.encrypt(`${baseURL}${i}.json?filename=${i}.json`, 'base64');
                nft_indexes[random_idx] = nft_indexes[nft_indexes.length-1];
                nft_indexes.pop();
                console.log("reamaining NFTs #"+ nft_indexes.length)
                return encrypted_uri
            } catch (err) {
                console.log("(SERVER) getTokenURI ERROR: " + err);
            }      
        }    
    }   

    static async returnTokenURI(req, res, next) {
        if(nft_indexes.length >= 1) {
            try {
               
            } catch (err) {
                console.log("(SERVER) returnTokenURI ERROR: " + err);
            }      
        }    
    } 

}
module.exports = ipfsDAO