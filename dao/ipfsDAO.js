require('dotenv').config();
const { MersenneTwister19937, Random } = require('random-js');
const random = new Random(MersenneTwister19937.autoSeed());
let internalIdWithUri;
let tknHolder = new Map();
require('../services/squidverse-meta-gen-v1')
    .then( res => {
        internalIdWithUri = res;
    })

//  I want to use meta data from the generated peices like clothing articles, color, etc
//  and append it to our generated data. Im thinking we put all these additional attributes in an array 
//  called properties which will be distinguied from attributes on the nft and append it to the metadata. 
 
class ipfsDAO {     

    // First change the management of tokens to use the new array of {id: int, uri: str} were pulling
    // in from generateMetadata. 
    // then lets consider moving this logic over to a node worker?
    // note** make a worker pool ready to handle request. say 4 workers. This will help as we add db calls.
    // note** our current dev server has a single cpu if we want the benefits we need to upgrade, 
    static async getTokenURI(req, res, next) {
        if(nft_indexes.length >= 1) {
            try {
                let random_idx = random.integer(0, internalIdWithUri.length-1);
                let nft = internalIdWithUri[random_idx][1].url
                let id =  internalIdWithUri[random_idx][0]  
                let internal_tknId = internalIdWithUri.length > 1 ? internalIdWithUri[random_idx][0] : internalIdWithUri[0][0];
                tknHolder.set(id, nft);
                internalIdWithUri[random_idx] = internalIdWithUri[internalIdWithUri.length-1];
                internalIdWithUri.pop();
                console.log("reamaining " + internalIdWithUri);

                return [internal_tknId, nft]
            } catch (err) {
                console.log("No more tokens or there was an error:  " + err);
            }       
        }    
    } 
 
    // returns the internal_id in the event minting fails on the client.
    static async returnInternalTokenId(req, res, next) {
        if(nft_indexes.length >= 1) {
            try {
               if(req.value === 'success'){
                tknHolder.delete(req.id);
                console.log("Was succesfull, removed " + req.id + " from holding.." )
               } else {
                let url = tknHolder.get(req.id);
                internalIdWithUri.push([req.id, {url}]);
                tknHolder.delete(req.id);
                console.log("Token " + req.id + " was not minted and return to token pool")
                //console.log(internalIdWithUri)
               }
               
               return 
            } catch (err) {
                console.log("(SERVER) returnInternalTokenId ERROR: " + err);
            }      
        }    
    } 

}
module.exports = ipfsDAO