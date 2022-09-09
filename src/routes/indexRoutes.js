const { Router } = require("express");
const IndexController = require("../controllers/IndexController");

const indexRouter = Router();

indexRouter.get("/home", IndexController.getHomePage);

indexRouter.get("/", IndexController.redirectToHomePage);

module.exports = indexRouter;
