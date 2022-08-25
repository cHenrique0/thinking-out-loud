const { Router } = require("express");
const ThoughtController = require("../controllers/ThoughtController");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");

const thoughtRouter = Router();

thoughtRouter.get("/dashboard", checkUserLogged, ThoughtController.dashboard);
thoughtRouter.get(
  "/create",
  checkUserLogged,
  ThoughtController.createThoughtView
);
thoughtRouter.post("/create", checkUserLogged, ThoughtController.createThought);
thoughtRouter.post(
  "/delete/:uuid",
  checkUserLogged,
  ThoughtController.deleteThought
);
thoughtRouter.get("/", checkUserLogged, ThoughtController.getAllThoughts);

module.exports = thoughtRouter;
