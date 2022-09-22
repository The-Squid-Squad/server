const { MersenneTwister19937, Random } = require('random-js');
const random = new Random(MersenneTwister19937.autoSeed());
const fs = require('fs');
const { NFTStorage, File} = require('nft.storage');
const NFT_STORAGE_TOKEN = `${process.env.NFT_STORAGE}`;
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

let tokenURIS = [];
let currentToken = 0;

//const imageFile = new File([ image ], 'nft.png', { type: 'image/png' })
const generateMetadata = async () => {
    // testing NFTstorage api

    let randomValue1to100 = [];
    for(let i = 0; i < 5; i++) {
        randomValue1to100.push( random.integer(0, 100));
    }
    const namestring = require('../helpers/names');
    let home_lands = ["Sunnyvale", "Oceaana", "Frostland", "Clear Water", "Deep Deep Down Land" ];
    let zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];


    const pickName = () => {
        let name = namestring[random.integer(0, namestring.length-1)];
        return name;
    }

    const pickHomeLand = () => {
        let home = home_lands[random.integer(0, home_lands.length-1)];
        return home;
    }

    const pickZodiac = () => {
        let zodiac = zodiacs[random.integer(0, zodiacs.length-1)];
        return zodiac;
    }
  
    const MetaData = 
    {
        "name": pickName(),
        "image": '',
        "description": "Squid Squad Genesis Series",
        "attributes": [
        {
            "trait_type": "Home Land",
            "value": pickHomeLand()
        },
        {
            "trait_type": "Zodiac",
            "value": pickZodiac()
        },
        {
            "trait_type": "Beauty",
            "value": randomValue1to100[0]
        },
        {
            "trait_type": "Charm",
            "value": randomValue1to100[1]
        },
        {
            "trait_type": "Intellect",
            "value": randomValue1to100[2]
        },
        {
            "trait_type": "Wisdom",
            "value": randomValue1to100[3]
        },
        {
            "trait_type": "Strength",
            "value": randomValue1to100[4]
        },

        ]
    }

    // preconstruct our 888 metadata urls and internal ids and return them  in an array.
    // we will perform management in the same fashion
    for(let i = 0; i < 11; i++) {
        const file = fs.readFileSync(`C:/source/squid-squad/server/genesis-launch-images/${i}.png`);
        MetaData.image = new File([ file ], MetaData.name, { type: 'image/png' });
        let tokenURI = await client.store(MetaData);
        tokenURIS. push([i, tokenURI]);
        console.log("generated #" + i)
    }

    return tokenURIS;
}
let internalIdWithUri = generateMetadata();
module.exports = internalIdWithUri;