const { loginUser } = require("./usersControllers");

const homeSearch =  (req, res) => {
    res.status(200).render("home_out.pug")
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
const userFavorites = (req, res) => {
    res.status(200).render("userFavorites.pug")
}
const searchResult = (req, res) => {
    res.status(200).render("search_results.pug")
}
const userLogin  = (req, res) => {
    res.status(200).render("loginUser.pug")
}
const userSignUp  = (req, res) => {
    res.status(200).render("createAccount.pug")
}

module.exports = {
    homeSearch,
    userProfile,
    userFavorites,
    searchResult,
    userLogin,
    userSignUp

}