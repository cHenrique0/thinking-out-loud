const { Router } = require("express");
const ThoughtController = require("../controllers/ThoughtController");

const thoughtRouter = Router();

thoughtRouter.get("/", ThoughtController.getAllThoughts);

module.exports = thoughtRouter;
