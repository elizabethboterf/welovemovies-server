const router= require("express").Router();
const controller=require("./movies.controller");
const methodNotAllowed= require("../errors/methodNotAllowed");
//const theatersRouter = require("..theaters/theaters.router");

// - `GET /movies`
// - `GET /movies?is_showing=true`
// - `GET /movies/:movieId`
// - `GET /movies/:movieId` (incorrect ID)
// - `GET /movies/:movieId/theaters`// nested router
// - `GET /movies/:movieId/reviews`

//router.route("/:movieId/theaters", theatersRouter);

//router.route("/:movieId/reviews").get(controller.listReviews).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

//router.route("?is_showing_true").get(controller.listIsShowing).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;