const express = require("express");
const morgan = require("./utils/morgan");
const error404 = require("./middlewares/error404");
require("./utils/db_mongo");

const app = express();
const port = "3000";

app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));
// llamadas a carpeta ROUTES
const offersRoutes = require("./routes/offersRoutes");
const userRoutes = require("./routes/userRoutes");
const favsRoutes = require("./routes/favoritesRoutes");
const viewsRoutes = require("./routes/viewsRoutes");

// Rutas
app.use("/users", userRoutes);
app.use("/favorites", favsRoutes);
app.use("/api", offersRoutes);

//   -----   PUG  ------------
app.set("view engine", "pug"); // Template engine PUG
app.set("views", "./views");

//Rutas view PUG
app.use("/", viewsRoutes);
app.use("/users/profile", viewsRoutes);
app.use("/favorites", viewsRoutes);

//Public folder
app.use(express.static("public"));

//  ------   Middlewares   --------
app.use(error404); // Para ruta no encontrada (404)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
