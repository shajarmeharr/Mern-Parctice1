const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
// maxAge: a number representing the milliseconds from Date.now() for expiry
// expires: a Date object indicating the cookie’s expiration date (expires at the end of session by default).
// path: a string indicating the path of the cookie (/ by default).
// domain: a string indicating the domain of the cookie (no default).
// sameSite: a boolean or string indicating whether the cookie is a “same site” cookie (false by default). This can be set to 'strict', 'lax', 'none', or true (which maps to 'strict').
// secure: a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS). If this is set to true and Node.js is not directly over a TLS connection, be sure to read how to setup Express behind proxies or the cookie may not ever set correctly.
// httpOnly: a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (true by default).
// signed: a boolean indicating whether the cookie is to be signed (true by default).
// overwrite: a boolean indicating whether to overwrite previously set cookies of the same name (true by default).
const signTokenSend = (user, id, status, res) => {
  const token = jwt.sign({ id, iat: Date.now() }, process.env.SECRET_KEY, {
    expiresIn: 90 * 24 * 60 * 60 * 1000,
    // expiresIn: 5000,
  });
  // console.log(token, "login token");

  const options = {
    maxAge: 7776000000,
    httpOnly: true,
    sameSite: "none",
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.cookie("jwt", token, options);
  user.password = undefined;
  res.status(status).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
module.exports.signUp = catchAsync(async (req, res, next) => {
  // console.log("this function is running");

  const user = await User.create(req.body);
  // console.log(user);

  signTokenSend(user, user._id, 201, res);
});

module.exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(req.cookies);

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Please provide valid credentials", 400));
  }

  const compare = await user.comparePassword(password, user.password);
  if (!compare) {
    return next(new AppError("Please provide valid email and password", 401));
  }

  signTokenSend(user, user._id, 200, res);
});

module.exports.forgetPassowrd = catchAsync(async (req, res, next) => {
  // console.log(req.body.email);

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError("There is no user found with these credentials", 401)
    );
  }
  // console.log(user, "thisis a user");

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`;
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token valid for 10 minutes",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Reset token sent to your email",
    });
  } catch (err) {
    console.log(err);

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was error sending email please try again later"),
      500
    );
  }
});

module.exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // console.log(token, "this is a token form protect");
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ1ZTZjNWIxNmE4ZWQyMGY5YTUyYiIsImlhdCI6MTcxMTExMTMxMTQ4OCwiZXhwIjoxNzE4ODg3MzExNDg4fQ.iquNBTfJDpluvJpXs8RTaugm7UCo3eQcn-mIF6UCARk

  if (!token) {
    return next(new AppError("Please log inn beforre", 401));
  }
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return next(
        new AppError("Invalid token Please login again to get token", 401)
      );
    }
    return next(new AppError(err.message, 401));
  }

  if (Date.now() > decoded.exp) {
    return next(
      new AppError("Your Toekn has expired please log in again", 401)
    );
  }

  const user = await User.findById(decoded.id);
  // console.log(user);

  if (!user) {
    return next(
      new AppError(
        "THERE IS no user ofund with these  ctredentials pleqase login with good credentials",
        401
      )
    );
  }
  // 4) Check if user changed password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = user;

  next();
});

// console.log(90 * 24 * 60 * 60 * 1000);

module.exports.resetPassword = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);

  const hashedToken = crypto.createHash("sha256").update(id).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Invalid Token or Token has expired", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  signTokenSend(user, user._id, 200, res);
});

// const user = User.find().then((doc) => console.log(doc));

module.exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You dont have permissoion to perform thsi action", 401)
      );
    }
    next();
  };
};

module.exports.updatePassword = catchAsync(async (req, res, next) => {
  console.log(req.user, "brfore update user");

  if (!(await req.user.comparePassword(req.body.password, req.user.password))) {
    return next(new AppError("Please provide a valid password", 401));
  }
  const { user } = req;
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPassword;
  const newuser = await user.save();
  // console.log(newuser, "after update useer");

  signTokenSend(newuser, newuser._id, 200, res);
});

// console.log(User.deleteMany().then((doc) => console.log(doc)));

module.exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  req.body.role = "admin";
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for passowrd update please use this route. /updatePassword",
        400
      )
    );
  }

  const filterBody = filterObject(req.body, "email", "name");

  const newuser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    filterBody,
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(newuser, "this user is after update");
  res.status(200).json({
    status: "success",
  });
});
function filterObject(obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes[el]) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
}
