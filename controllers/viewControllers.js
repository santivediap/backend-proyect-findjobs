const homeSearch =  (req, res) => {
    res.status(200).render("home_out.pug")
}
const userProfile = (req, res) => {
    res.status(200).render("profile.pug")
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