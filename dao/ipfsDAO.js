require('dotenv').config();
const { NFTStorage, File, Blob } = require('nft.storage');
const NodeRSA = require('node-rsa');
const { MersenneTwister19937, Random } = require('random-js');
const random = new Random(MersenneTwister19937.autoSeed());
const baseURL = `${process.env.BASE_URL}` ;
let nft_indexes = [...Array(10).keys()]; // will be 10000. Using 10 for some test
const generateMetadata = require('../services/squidverse-meta-gen-v1');

const NFT_STORAGE_TOKEN = `${process.env.NFT_STORAGE}`
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

// generate keypair
// const key = new NodeRSA({b: 512});
// console.log('\nPUBLIC:');
// console.log(key.exportKey('pkcs8-public-pem'));
// console.log('\nPRIVATE:');
// console.log(key.exportKey('pkcs1-pem'));

//console.log(`${process.env.RSA_PUBLIC}`)
let keypub = new NodeRSA(`${process.env.RSA_PUBLIC}`);
let keypriv = new NodeRSA(`${process.env.RSA_PRIVATE}`);

// *note* I think I should move token removal to confirmation aka returnTokenURI()
//  so temp remove and confirm removal after successful mint else return to nft_indexes ??
//
// *note* we should handle ifps upload of token uri here. We can pre-upload images.
// we will construct our metadata with pre-uploaded images and generate the meta data here.
//
// *issue* I want to use meta data from the generated peices like clothing articles, etc
//  and append it to our generated data.

class ipfsDAO {

    // returns an encrypted tokenURI to the client
    // with generated metadata to be minted.
    static async getTokenURI(req, res, next) {
        if(nft_indexes.length >= 1) {
            try {
                let random_idx = random.integer(0, nft_indexes.length);
                let i = nft_indexes.length > 1 ? nft_indexes[random_idx] : nft_indexes[0];
                console.log("NFT # "+ random_idx);
                //const encrypted_uri = `${baseURL}${i}.json?filename=${i}.json`;//keypub.encrypt(`${baseURL}${i}.json?filename=${i}.json`, 'base64', 'utf8');
                nft_indexes[random_idx] = nft_indexes[nft_indexes.length-1];
                nft_indexes.pop();
                console.log("reamaining NFTs # "+ nft_indexes);
                //let decrypted = keypriv.decrypt(encrypted_uri, 'utf8');
                // console.log("encrypted  "+ encrypted_uri);
                // console.log("decryte3d  "+ decrypted);
                console.log(await generateMetadata());
                return await generateMetadata();
            } catch (err) {
                console.log("No more tokens or there was an error:  " + err);
            }      
        }    
    } 

    // returns an index to nft_indexes in the event minting fails on the client.
    static async returnTokenURI(req, res, next) {
        if(nft_indexes.length >= 1) {
            try {
               console.log("succesfull return to indexes" + req)
               return 1
            } catch (err) {
                console.log("(SERVER) returnTokenURI ERROR: " + err);
            }      
        }    
    } 

}
module.exports = ipfsDAO