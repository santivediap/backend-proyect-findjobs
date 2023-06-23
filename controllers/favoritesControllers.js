const { Long } = require('mongodb');
const favs = require ('../models/favoritesModels')

const getAllFavorites = async (req, res) => {
    let userFavorites;
    if (req.query) {
        userFavorites = await favs.getAllFavorites(req.query);
    }
    else {
        userFavorites = await favs.getAllFavorites();
    }
    res.status(200).json(userFavorites); 
}

const createFavorite = async (req, res) => {
    const offer_data = req.body;// body = { email, company_name, title, location, work_schedule, experience, contract_type, salary, description }
    const response = await favs.createFavorites(offer_data);
    res.status(201).json({
        "Oferta favorita creada:": response,
        data: offer_data
    });
}

const deleteFavorite = async (req, res) => {
    const offer_data = req.body; // body = {title}
    const response = await favs.deleteFavorite(offer_data);
    console.log(offer_data);
    if (offer_data){
        res.status(200).json({
            "Se ha borrado la oferta de favoritos": response,
            data: offer_data
        });
    }else{
        res.status(404).json({
            "Oferta de empleo no encontrada": response,
            data: offer_data
        });
    }
}

module.exports = {
    getAllFavorites,
    createFavorite,
    deleteFavorite
}