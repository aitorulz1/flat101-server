const mongoose = require("mongoose");
const Flats = require("./flat");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 3,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

UserSchema.virtual("flats", {
  ref: Flats.modelName,
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

module.exports = mongoose.model("User", UserSchema);
