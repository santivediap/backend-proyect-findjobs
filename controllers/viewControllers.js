const homeSearch =  (req, res) => {
    res.status(200).render("home_out.pug")
}
const userProfile = (req, res) => {
    res.status(200).render("profile.pug")
}
const UserFavorites = (req, res) => {
    res.status(200).render("userFavorites.pug")
}
const searchResult = (req, res) => {
    res.status(200).render("search_results.pug")
}

module.exports = {
    homeSearch,
    userProfile,
    UserFavorites,
    searchResult

}