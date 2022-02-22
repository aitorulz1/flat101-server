const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Crear User

exports.crearUser = async (req, res) => {
  const errores = validationResult(req); // req -> request para retornar si hay algún error y lo genera como un array
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    } else {
      user = new User(req.body);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        if (error) {
          throw error;
        } else {
          res.json({ token });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
