const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongooseSanitize = require("express-mongo-sanitize");
const { default: helmet } = require("helmet");
const hpp = require("hpp");
const path = require("path");
const userRouter = require("./Routers/userRoutes");
const tourRouter = require("./Routers/tourRoutes");
const AppError = require("./utils/appError");
// const globalErrorHnadler = require("./utils/globalErrorHandler");
const globalErrorHandler = require("./utils/globalErrorHandler");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join((__dirname, "public/dist"))));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  window: 60 * 60 * 1000,
  message: "Too manyrequiests please try again later",
});
app.use(limiter);
app.use(xss());
app.use(hpp());
app.use(mongooseSanitize());
app.use(express.static(`${__dirname}//public`));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

app.get("/forgetPassword", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/dist", "index.html"));
});
app.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/dist", "index.html"));
});
app.get("/signup", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/dist", "index.html"));
});
app.get("/resetPassword/:id", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/dist", "index.html"));
});
app.all("*", (req, res, next) => {
  const error = new AppError("No route found with this url", 400);
  next(error);
});

// app.use(globalErrorHandler);
app.use((err, req, res, next) => {
  console.log(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;

// For the browser to accept cookies with samesite=none, then they must also have the secure attribute set and you must use HTTPS.

// Like

// Set-Cookie:SessionCookie=xxxxxxxxxx; SameSite=None; Secure;
// To complement this answer, I wrote a blog post that goes into more detail about this topic:Debugging cookie problems
