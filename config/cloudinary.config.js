const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const multer = require("multer");
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "portfolio", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png", "pdf", "gif"],
  filename: function (req, file, cb) {
    cb(null, file.originalname, save_url); // The file on cloudinary would have the same name as the original file name
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
