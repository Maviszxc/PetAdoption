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

module.exports.createPet = (req, res) => {
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
    const savedPet = newPet.save();
    res.status(201).json({ "new pet": newPet });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.updatePet = async (req, res) => {
  const petId = req.params.id;
  const updatedData = req.body;

  console.log("Received Update Data:", updatedData); // Log received data

  try {
    const updatedPet = await Pet.findByIdAndUpdate(petId, updatedData, {
      new: true,
    });
    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.deletePet = async (req, res) => {
  const petId = req.params.id;

  try {
    const deletedPet = await Pet.findByIdAndDelete(petId);
    if (!deletedPet) {
      return res
        .status(404)
        .json({ message: "Pet not found or already deleted" });
    }
    res.status(200).json({ message: "Pet deleted successfully", deletedPet });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
