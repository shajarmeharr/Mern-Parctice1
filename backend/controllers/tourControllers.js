const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Tour = require("../models/tourModel");
const ApiFeatures = require("../utils/apiFeatures");

module.exports.createTour = catchAsync(async (req, res, next) => {
  console.log(req.body);

  req.body.guides = req.body.guides.split(" ");
  // console.log(req.body.guides, "thse are guides");

  const tour = await Tour.create(req.body);

  res.status(200).json({
    status: "success",
    tour,
  });
});

module.exports.getAllTours = catchAsync(async (req, res, next) => {
  // const queryObj = { ...req.query };
  // const excludedFields = ["sort", "fields", "page", "limit"];
  // excludedFields.forEach((el) => delete queryObj[el]);

  // let queryStr = JSON.stringify(queryObj);

  // queryStr = queryStr
  //   .replace(/\bgte\b/g, "$gte")
  //   .replace(/\blte\b/g, "$lte")
  //   .replace(/\blt\b/g, "$lt")
  //   .replace(/\bgt\b/g, "$gt");

  // let query = Tour.find(JSON.parse(queryStr)).select(
  //   "name description price numOfTourists -_id"
  // );
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");

  //   query = query.sort(sortBy);
  // }

  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   query = query.select(fields);
  // }

  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;
  // query = query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const docs = await Tour.countDocuments();
  //   if (skip > docs) {
  //     return next(new AppError("This page does not exists", 400));
  //   }
  // }
  const features = new ApiFeatures(Tour.find(), req.query)
    .filtering()
    .sorting()
    .fielding()
    .limiting();

  const tours = await features.query;

  console.log(tours, "thes erea all tours");

  res.status(200).json({
    status: "success",
    result: tours.length,
    tours,
  });
});

module.exports.cheapFiveTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "numOfTourists";
  req.query.fields = "name,price,numOfTourists,description";
  next();
};
