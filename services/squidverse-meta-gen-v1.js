const { MersenneTwister19937, Random } = require('random-js');
const random = new Random(MersenneTwister19937.autoSeed());

const generateMetadata = ipfsImageLink => {
    let randomValue1to100 = []
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
        "image": ipfsImageLink,
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
    return MetaData;
}

module.exports = generateMetadata;