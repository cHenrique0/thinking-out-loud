const { Router } = require("express");
const ThoughtController = require("../controllers/ThoughtController");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");

const thoughtRouter = Router();

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
thoughtRouter.get(
  "/edit/:uuid",
  checkUserLogged,
  ThoughtController.updateThoughtView
);
thoughtRouter.post(
  "/edit/:uuid",
  checkUserLogged,
  ThoughtController.updateThought
);
thoughtRouter.get("/home", ThoughtController.getAllThoughts);
thoughtRouter.get("/", ThoughtController.getAllThoughts);

module.exports = thoughtRouter;
