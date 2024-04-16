const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
router.patch("/resetPassword/:id", userControllers.resetPassword);
router.post("/signup", userControllers.signUp);
router.post("/login", userControllers.logIn);
router.post("/forgetPassword", userControllers.forgetPassowrd);
router.post(
  "/updatePassword",
  userControllers.protect,
  userControllers.updatePassword
);
router.patch("/updateMe", userControllers.protect, userControllers.updateMe);
module.exports = router;
