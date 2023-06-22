const express = require('express');
// const morgan = require('./utils/morgan');
const error404 = require('./middlewares/error404')

const app = express();
const port = '3000';


app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true })); 

const userRoutes = require('./routes/userRoutes');
const favsRoutes = require('./routes/favoritesRoutes');
// Rutas
app.use('/users',userRoutes); 
app.use('/favorites',favsRoutes);

//   -----  PUG  ------------
app.set('view engine', 'pug'); // Template engine PUG
app.set('views', './views');
//Pug pages
app.get("/", (req, res) => {
    res.status(200).render("home_out.pug")
})


//Public folder
app.use(express.static('public'))


app.use(error404); // Para ruta no encontrada (404)



//  ------   Middlewares   --------
app.use(error404); // Para ruta no encontrada (404)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})