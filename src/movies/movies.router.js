const router= require("express").Router();
const controller=require("./movies.controller");
const methodNotAllowed= require("../errors/methodNotAllowed");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

// - `GET /movies`
// - `GET /movies?is_showing=true`
// - `GET /movies/:movieId`
// - `GET /movies/:movieId` (incorrect ID)
// - `GET /movies/:movieId/theaters`// nested router
// - `GET /movies/:movieId/reviews`

router.use("/:movieId/theaters", controller.ifExists, theatersRouter);

router.use("/:movieId/reviews", controller.ifExists, reviewsRouter);

// router.route("?is_showing_true").get(controller.listIsShowing).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;