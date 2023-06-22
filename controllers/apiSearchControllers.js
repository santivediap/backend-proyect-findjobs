const { query } = require('express');
const scraperInsertia = require('../utils/scraperInsertia')
const scraperTecnoempleo = require('../utils/scraperTecnoempleo')

const searchOffers = async (req, res) => {

    try {
        await res.redirect(`http://localhost:3000/api/search?position=${req.body.position}&location=${req.body.location}`)
    
        console.log("HECHO");
        console.log(req.body);

    } catch (err) {
        console.log(err);
    }

}

const getOffers = async (req, res) => {

    res.status(200).json({
        "position": req.query.position,
        "location": req.query.location
    })

    console.log(req.query);

}

module.exports = {
    searchOffers,
    getOffers
}