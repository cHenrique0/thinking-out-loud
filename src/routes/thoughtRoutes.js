const { Router } = require("express");
const ThoughtController = require("../controllers/ThoughtController");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");

const thoughtRouter = Router();

thoughtRouter.get("/dashboard", checkUserLogged, ThoughtController.dashboard);
thoughtRouter.get("/", checkUserLogged, ThoughtController.getAllThoughts);

module.exports = thoughtRouter;
