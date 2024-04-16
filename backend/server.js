const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");
process.on("uncaughtException", () => {
  console.log("Uncaught exception shutting down");
  console.log(err.message, err.name);
  process.exit(1);
});
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("conection succesfull"))
  .catch((err) => console.log(err.name));
const server = app.listen(3000, "127.0.0.1", () => {
  console.log("server has started listening");
});
process.on("unhandledRejection", (err) => {
  console.log("Unhanlded Rejection shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Here is how I have been doing it.

// Let's say you have the field age which is a number.

// This is what the urls would look like
// Equals: /filter/age=5
// Greater Than: /filter/age[gt]=5
// Greater Than Equals: /filter/age[gte]=5
// Less Than: /filter/age[lt]=5
// Less Than Equals: /filter/age[lte]=5
// Not Equals: /filter/age[ne]=5

// Then when I pass these arguments to the back-end I have a script that just parses the key out and converts it to the correct filter based on the age[INSERT_OPERATOR_HERE]

// Pagination, greaterthan and lessthan, sound like query parameter to me, since you are queries your resource with these parameters. So you should do something like:

// /customers?page=1, or
// /customers?page=1&gt=716, or
// /customers?page=1&gt=716&lt=819

// You can even limit size of page:

// /customers?page=1&gt=716&lt=819&maxpagesize=100

// where gt stands for greater than (same as in xml-escaping) and lt stands for less than.
