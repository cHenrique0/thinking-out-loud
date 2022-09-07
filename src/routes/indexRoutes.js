const { Router } = require("express");
const IndexController = require("../controllers/IndexController");
const ThoughtController = require("../controllers/ThoughtController");

const indexRouter = Router();

indexRouter.get("/home", IndexController.getHomePage);
indexRouter.get("/", IndexController.redirectToHomePage);

module.exports = indexRouter;
