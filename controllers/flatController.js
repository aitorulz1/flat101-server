const Flat = require("../models/flat");
const { validationResult } = require("express-validator");

// Create Flat

exports.createFlat = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name, flat, price } = req.body;

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
