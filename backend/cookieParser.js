// The order in which you use middleware in Express matters: middleware declared earlier will get called first, and if it can handle a request, any middleware declared later will not get called.

// If express.static is handling the request, you need to move your middleware up:

// // need cookieParser middleware before we can do anything with cookies
// app.use(express.cookieParser());

// // set a cookie
// app.use(function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies.cookieName;
//   if (cookie === undefined) {
//     // no: set a new cookie
//     var randomNumber=Math.random().toString();
//     randomNumber=randomNumber.substring(2,randomNumber.length);
//     res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
//     console.log('cookie created successfully');
//   } else {
//     // yes, cookie was already present
//     console.log('cookie exists', cookie);
//   }
//   next(); // <-- important!
// });

// // let static middleware do its job
// app.use(express.static(__dirname + '/public'));
// Also, middleware needs to either end a request (by sending back a response), or pass the request to the next middleware. In this case, I've done the latter by calling next() when the cookie has been set.

// Update

// As of now the cookie parser is a seperate npm package, so instead of using

// app.use(express.cookieParser());
// you need to install it separately using npm i cookie-parser and then use it as:

// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
