const express = require('express');
// const morgan = require('./utils/morgan');
const error404 = require('./middlewares/error404')

const app = express();
const port = '3000';

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Template engine PUG
app.set('view engine', 'pug');
app.set('views', './views');

//Public folder
app.use(express.static('public'))

//Pug pages
app.get("/", (req, res) => {
    res.status(200).render("home_out.pug")
})

app.use(error404); // Middleware Para ruta no encontrada (404)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})