const { Long } = require('mongodb');
const favs = require ('../models/favoritesModels')



/** 
  * <pre>
  * GET ALL FAVORITES
  * GET http://localhost:3000/api  -->  Conseguir todas las ofertas seleccionadas por usuario
  * GET http://localhost:3000/api/dashboard --> Ver los favoritos renderizados en vista pug
  * </pre>
  * @memberof controllers 
  * @method getAllFavorites 
  * @async 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @return {json} objeto con todas las ofertas encontradas
  * @throws {error} 
  */
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


/** 
  * <pre>
  * CREATE AN OFFER FAVORITE AT ELEPHANTSQL DATABASE
  * POST http://localhost:3000/ --> Crear oferta en base de datos
  * POST http://localhost:3000/search-results  --> Crear oferta desde vista user en base de datos
  * </pre>
  * @memberof controllers 
  * @method createFavorite 
  * @async 
  * @param {Object} req objeto de petición HTTP  body = { email, company_name, title, location, work_schedule, experience, contract_type, salary, description }
  * @param {Object} res objeto de respuesta HTTP
  * @return {json} objeto con todas las ofertas encontradas
  * @throws {error} 
  */
const createFavorite = async (req, res) => {
  const offer_data = req.body; // body = { email, title, company_name, location, work_schedule, experience, contract_type, salary, description }
  const email = req.decoded.email;
  // console.log(req.body);
  const data = { email, ...offer_data };
  // console.log(data);
  const response = await favs.createFavorites(data);
  res.status(201).json({
    "Oferta favorita creada:": response,
    data: offer_data,
  });
};

/** 
  * <pre>
  * CREATE AN OFFER FAVORITE AT ELEPHANTSQL DATABASE
  * DELETE http://localhost:3000/ --> Eliminar oferta en base de datos
  * DELETE http://localhost:3000/user/favorites  --> Borrar oferta de la base de datos desde vista favoritos de user 
  * </pre>
  * @memberof controllers 
  * @method deleteFavorite  
  * @async 
  * @param {Object} req objeto de petición HTTP  body = { title }
  * @param {Object} res objeto de respuesta HTTP
  * @throws {error} 
  */
const deleteFavorite = async (req, res) => {
  const offer_data = req.body; // body = {title}
  const response = await favs.deleteFavorite(offer_data);
  // console.log(offer_data);
  if (offer_data) {
    res.status(200).json({
      "Se ha borrado la oferta de favoritos": response,
      data: offer_data,
    });
  } else {
    res.status(404).json({
      "Oferta de empleo no encontrada": response,
      data: offer_data,
    });
  }
};

module.exports = {
  getAllFavorites,
  createFavorite,
  deleteFavorite,
};
