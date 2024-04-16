const mongoose = require("mongoose");
const User = require("./userModel");
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, " Please provide the name of tour "],
  },
  numOfTourists: {
    type: Number,
    required: [
      true,
      "Please provide the number of tours which are seleted for tours",
    ],
  },
  price: {
    type: String,
    required: [true, "olease provide the price"],
  },
  description: {
    type: String,
    required: [true, "please provide the description of tour"],
  },
  Braekfast: {
    type: Boolean,
    required: [
      true,
      "please give thsi vakue to tell users that allow breakfast or not",
    ],
  },
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

// tourSchema.pre("save", async function (next) {
//   const promises = await this.guides.map(async (el) => await User.findById(el));
//   this.guides = await Promise.all(promises);
//   console.log(this, "this is a original doss");
//   next();
// });

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-passwordResetExpires -passwordResetToken -id -__v -password -_id",
  });
  next();
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
// Tour.deleteMany().then((doc) => console.log(doc));
