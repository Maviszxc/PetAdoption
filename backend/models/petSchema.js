const { Int32, Long } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const petDocument = new Schema({
  breed: {
    type: String,
    required: [true, "Breed is needed"],
  },

  gender: {
    type: String,
    required: [true, "Gender is needed"],
  },

  age: {
    type: String,
    required: [true, "age is required"],
  },

  description: {
    type: String,
    required: [true, "Description is needed"],
  },

  quantity: {
    type: Number,
    required: [true, "Quantity is needed"],
  },

  isAdopted: { // active
    type: Boolean,
    default: true,
  }
});

const Pet = mongoose.model("Pet", petDocument);
module.exports = Pet;
