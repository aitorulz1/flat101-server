const Flat = require("../models/flat");
const { validationResult } = require("express-validator");
const Types = require("../data/categories");

// Create Flat

exports.createFlat = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name, flat, price, type } = req.body;

  try {
    const newFlat = new Flat(req.body);
    newFlat.save();
    res.json(newFlat);
    console.log(newFlat);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Get ALl Flats

exports.getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    if (!flats) {
      res.status(400).json("No se encuentra ningún Flat");
    } else {
      res.json(flats);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error trayendo todos los flats");
  }
};

// Get all types

exports.getTypes = (req, res) => {
  try {
    const types = Types.find();
    res.json(types);
  } catch (error) {
    console.log(error);
    res.status(400).send("No types");
  }
};

exports.getTypes = (req, res) => {
  res.json(types);
};

// Get by Type

exports.findTypes = async (req, res) => {
  const type = req.body.type;
  try {
    const types = await Flat.find({ type });
    if (!types) {
      res.status(400).json("No hay types");
    } else {
      res.json(types);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error trayendo todos los types");
  }
};
