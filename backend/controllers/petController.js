const Pet = require("../models/petSchema");

const mongoose = require("mongoose");

module.exports.pets = (req, res) => {
  Pet.find({ active: true })
    .then((pets) => res.send(pets))
    .catch((error) => res.send(error));
};
