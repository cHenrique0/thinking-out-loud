const { Router } = require("express");
const IndexController = require("../controllers/IndexController");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");

const indexRouter = Router();

indexRouter.get("/home", checkUserLogged, IndexController.getHomePage);

indexRouter.get("/", checkUserLogged, IndexController.redirectToHomePage);

module.exports = indexRouter;
