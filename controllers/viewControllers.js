const scraperInsertia = require('../utils/scraperInsertia')
const scraperJobatus = require('../utils/scraperJobatus')
const Offer = require("../models/offers");
const users = require("../models/usersModels");
const favs = require("../models/favoritesModels");

const homeSearch =  (req, res) => {
    if(req.decoded == null) {
        res.status(200).render("home_out.pug")
    } else {
        res.status(200).render("home_in.pug")
    }
}
const userProfile = (req, res) => {
    const { name, surname, email, city } = req.decoded;
    console.log(req.decoded);
    res.status(200).render("profile.pug", {
        name: name,
        surname:surname,
        email: email,
        city: city
    });
}
const userFavorites = async (req, res) => {
    console.log("FAVORITOS!");
  
    console.log(req.decoded.email);
    // console.log(searchedUser[0].user_id);
    const searchedUser = await users.getUserByEmail(req.decoded.email);
    console.log(searchedUser[0].email);
    const favoritesList = await favs.getAllFavorites(searchedUser[0].email);
  
    console.log(favoritesList);
  
    res.status(200).render("userFavorites", {
      scrap: favoritesList,
    });
  };

const searchResult = async (req, res) => {
  console.log("USER BUSCA");

  let locationRegex = new RegExp(`${req.query.location}`);
  let titleRegex = new RegExp(`${req.query.position}`);

  let insertiaResults = await scraperInsertia
    .scrapOfferData(
      `https://www.insertia.net/trabajo-de-${req.query.position.toLowerCase()}/${req.query.location.toLowerCase()}-${req.query.location.toLowerCase()}`
    )
    .then((insertia) => insertia);

  let jobatusResults = await scraperJobatus
    .scrapOfferData(
      `https://www.jobatus.es/trabajo?q=${req.query.position}&l=${req.query.location}&jb=all&sort=&d=&page=1`
    )
    .then((jobatus) => jobatus);

  let databaseResults = await Offer.find(
    {
      title: { $regex: titleRegex, $options: "i" },
      location: { $regex: locationRegex, $options: "i" },
    },
    "-_id -__v"
  );

  console.log(databaseResults);

  const result = [];

  if (insertiaResults != null) {
    result.push(...insertiaResults);
  }

  if (jobatusResults != null) {
    result.push(...jobatusResults);
  }

  if (databaseResults.length > 0) {
    result.push(...databaseResults);
  }

  if (result.length < 1) {
    res.status(200).render("search_results", {
      scrap: [{ error: "NOT FOUND" }],
      position: req.query.position,
      location: req.query.location,
    });
  } else {
    if (req.decoded == null) {
      res.status(200).render("search_results", {
        scrap: result,
        position: req.query.position,
        location: req.query.location,
      });
    } else {
      res.status(200).render("search_results_logged", {
        scrap: result,
        position: req.query.position,
        location: req.query.location,
      });
    }
  }
};

const adminHome = async (req,res) => {
    try{
        let adminOffers = await offersControllers.getOffers();
        res.status(200).render("admin_home.pug", {
            "Offers": adminOffers
        })
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const searchOffers = async (req, res) => {
  try {
    await res.redirect(
      `/search-results?position=${req.body.position}&location=${req.body.location}`
    );
  } catch (err) {
    console.log(err);
  }
};

const userLogin = (req, res) => {
  res.status(200).render("loginUser.pug");
};
const userSignUp = (req, res) => {
  res.status(200).render("createAccount.pug");
};



module.exports = {
    homeSearch,
    userProfile,
    userFavorites,
    searchResult,
    userSignUp,
    searchOffers,
    adminHome,
    userLogin
}