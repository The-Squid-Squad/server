require('dotenv').config();
const { MersenneTwister19937, Random } = require('random-js');
const random = new Random(MersenneTwister19937.autoSeed());
let nft_indexes = [...Array(10).keys()]; // will be 10000. Using 10 for some test
const generateMetadata = require('../services/squidverse-meta-gen-v1');

// *issue* I want to use meta data from the generated peices like clothing articles, etc
//  and append it to our generated data.
 
class ipfsDAO { 

    // returns a tokenURI of generated metadata
    // to be minted on the client.
    static async getTokenURI(req, res, next) {
        if(nft_indexes.length >= 1) {
            try {
                let random_idx = random.integer(0, nft_indexes.length-1);
                let internal_tknId = nft_indexes.length > 1 ? nft_indexes[random_idx] : nft_indexes[0];
                console.log("NFT # "+ internal_tknId);
               
                nft_indexes[random_idx] = nft_indexes[nft_indexes.length-1];
                nft_indexes.pop();
                console.log("reamaining NFTs # "+ nft_indexes);
                let metadata = await generateMetadata();
                return {internal_tknId, metadata}
            } catch (err) {
                console.log("No more tokens or there was an error:  " + err);
            }       
        }    
    } 
 
    // returns an index to nft_indexes in the event minting fails on the client.
    static async returnTokenURI(req, res, next) {
        if(nft_indexes.length >= 1) {
            try {
               console.log("succesfully returned token_dist#" + req.value)
               let check = nft_indexes.find(element => element == req.value)
               if(req.value != undefined && check != req.value){
                nft_indexes.push(req.value)
                console.log("reamaining NFTs # " + nft_indexes)
               } else {
                console.log('value undefined')
               }
               
               return 1
            } catch (err) {
                console.log("(SERVER) returnTokenURI ERROR: " + err);
            }      
        }    
    } 

}
module.exports = ipfsDAO