const Offer = require("../models/offers");

// GET -> http://localhost:3000/api/dashboard
// Obtiene todas las ofertas de trabajo de la BBDD
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({}, "-__v");
    return offers
    // res.json({'offers': offers})
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

// POST -> http://localhost:3000/api/offers
// Crea una nueva oferta de trabajo
const createOffer = async (req, res) => {
  const {
    title,
    companyName,
    location,
    experience,
    contract_type,
    work_schedule,
    salary,
    description,
  } = req.body;
  if (!title || !companyName) {
    return res
      .status(400)
      .json({ error: "Title and companyName are required" });
  }

  try {
    const newOffer = await Offer.create({
      title,
      companyName,
      location,
      experience,
      contract_type,
      work_schedule,
      salary,
      description,
    });
    // res.status(201).json(newOffer);
    res.redirect('/admin')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT -> http://localhost:3000/api/offers/FullStack_The_bridge

const updateOffer = async (req, res) => {
  try {
    const { title } = req.params;
    const updateOfferValues = req.body;
    fixTitle = title.replaceAll("_", " ");
    const objeto = await Offer.findOne({ title: fixTitle });

    if (objeto) {
      // Actualizar los campos del objeto con los valores proporcionados
      Object.assign(objeto, updateOfferValues);
      await objeto.save();

      res.status(200).json({
        message: "Offer updated",
        offer: updateOfferValues,
      });
    } else {
      res.status(404).json({
        message: "Offer not found",
      });
    }
  } catch (error) {
    console.error("Error al modificar el objeto:", error);
    res.status(500).json({
      message: "Error al modificar el objeto",
    });
  }
};
// DELETE -> http://localhost:3000/api/offers/:id
// Elimina una oferta de trabajo
const deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOffer = await Offer.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res.status(404).json({ error: "Offer not found" });
    }else{
      Offer.deleteOne({id})
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  console.log("Your Offer Got Deleted:(");
};

module.exports = {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
};
