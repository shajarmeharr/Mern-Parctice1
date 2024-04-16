const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pleas provide your name "],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLenght: [8, "Password should be at least 8 characters long"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide your password"],
      minLenght: [8, "Password should be at least 8 characters long"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message:
          "Please provide the password and password confirm in correct way",
      },
    },
    email: {
      type: String,
      required: [true, "please provide your email"],
    },
    role: {
      type: String,
      enum: ["user", "guide", "lead-guide", "admin"],
      default: "user",
    },
    photo: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (plain, cipher) {
  const compare = await bcrypt.compare(plain, cipher);

  return compare;
};

userSchema.methods.changedPasswordAfter = function (iat) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.virtual("firstName").get(function () {
  return this.name.split(" ")[0];
});
userSchema.methods.createPasswordResetToken = function () {
  const randomBytes = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(randomBytes)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return randomBytes;
  // const resetToken = crypto.randomBytes(32).toString('hex');
  // this.passwordResetToken = crypto
  //   .createHash('sha256')
  //   .update(resetToken)
  //   .digest('hex');
  // // console.log({ resetToken }, this.passwordResetToken);
  // this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  // return resetToken;
};

const User = mongoose.model("User", userSchema);

// User.deleteMany().then((reseult) => console.log(reseult));
// User.find().then((docs) => console.log(docs));
module.exports = User;
