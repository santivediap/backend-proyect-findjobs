const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: String,
  experience: String,
  contract_type: String,
  work_schedule: String,
  salary: String,
  description: String,
});
const offer = new mongoose.model("offers", offerSchema);

module.exports = offer;
