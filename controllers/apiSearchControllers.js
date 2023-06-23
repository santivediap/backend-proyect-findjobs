const { query } = require('express');
const scraperInsertia = require('../utils/scraperInsertia')
const scraperJobatus = require('../utils/scraperJobatus')

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

    let insertiaResults = await scraperInsertia.scrapOfferData(`https://www.insertia.net/trabajo-de-${req.query.position.toLowerCase()}/${req.query.location.toLowerCase()}-${req.query.location.toLowerCase()}`)
                .then(insertia => insertia)

    let jobatusResults = await scraperJobatus.scrapOfferData(`https://www.jobatus.es/trabajo?q=${req.query.position}&l=${req.query.location}&jb=all&sort=&d=&page=1`)
                .then(jobatus => jobatus)
                
    const result = [];

    if(insertiaResults != null) {
        result.push(...insertiaResults)
    }

    if(jobatusResults != null) {
        result.push(...jobatusResults)
    }

    if(result.length < 1) {
        res.status(200).render("search_results", {
            "scrap": [{"response": "NOT FOUND"}]
        })
    } else {
        res.status(200).render("search_results", {
            "scrap": result
        })
    }

}

module.exports = {
    searchOffers,
    getOffers
}