require("./utils/db_mongo");
const express = require('express');
require('dotenv').config();
const morgan = require('./utils/morgan');
const error404 = require('./middlewares/error404')
const cookieParser = require("cookie-parser");



// const bodyParser = require('body-parser');

const app = express();
const port = "3000";

app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); //Better access to cookies

// llamadas a carpeta ROUTES
const apiSearchRouter = require('./routes/apiSearchRoutes')
const offersRoutes = require("./routes/offersRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes")
const favsRoutes = require("./routes/favoritesRoutes");
const viewsRoutes = require("./routes/viewsRoutes");

// Rutas
app.use("/users", userRoutes);
// app.use("/admin", adminRoutes)
app.use("/favorites", favsRoutes);
app.use("/api", offersRoutes);


//   -----   PUG  ------------
app.set("view engine", "pug"); // Template engine PUG
app.set("views", "./views");

//Rutas view PUG
app.use("/", viewsRoutes);

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

//Public folder
app.use(express.static("public"));

//  ------   Middlewares   --------
// app.use(bodyParser.urlencoded({ extended: true })); // Configuración del middleware body-parser
// app.use(bodyParser.json());
app.use(error404); // Para ruta no encontrada (404)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
