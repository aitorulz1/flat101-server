const mongoose = require("mongoose");

const FlatSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40,
    minlength: 3,
    default: "Flat 101",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
    default: 0,
  },
  flatPicture: {
    type: String,
    default: null,
    // "https://media-exp1.licdn.com/dms/image/C4E0BAQGM_4MQY1HgdA/company-logo_200_200/0/1603130780338?e=2159024400&v=beta&t=ydiaRXuOJ7OHdlTIp68jMjDTO_eQzvXXFidHlyJZTYA",
  },
  type: {
    type: Array,
    required: false,
    default: null,
  },
  created: {
    type: Date,
    max: Date.now,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Flat", FlatSchema);
