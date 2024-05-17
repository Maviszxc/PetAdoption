const Pet = require("../models/petSchema");

const mongoose = require("mongoose");

module.exports.pets = (req, res) => {
  Pet.find({ isAdopted: false })
    .then((pets) => res.send(pets))
    .catch((error) => res.send(error));
};

module.exports.petsByBreed = (req, res) => {
  const breed = req.params.breed;
  console.log(`Searching pets by breed: ${breed}`);
  Pet.find({ isAdopted: false, breed: breed })
    .then((pets) => {
      console.log("Pets found by breed:", pets);
      if (!pets || pets.length === 0) {
        return res
          .status(404)
          .json({ message: "Pets not found for this breed" });
      }
      res.status(200).json(pets);
    })
    .catch((error) => {
      console.error("Error fetching pets by breed:", error);
      res.status(500).json({ error: error.message });
    });
};

module.exports.createPet = async (req, res) => {
  const { breed, gender, age, description, isAdopted } = req.body;

  // Create a new pet instance
  const newPet = new Pet({
    breed,
    gender,
    age,
    description,
    isAdopted,
  });

  try {
    // Save the new pet to the database
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


