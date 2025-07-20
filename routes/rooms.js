const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");
const auth = require("../middleware/auth");
const accessControl = require("../middleware/accessControl");

// TODO : Ajouter middleware d'authentification auth et de contrôle d'accès accessControl aux routes
router.get("/:id", auth, accessControl, roomsController.getRoom);
// TODO : Ajouter middleware d'authentification auth et de contrôle d'accès accessControl à la route pour soumettre une réponse
router.post("/:id/answer", auth, accessControl, roomsController.submitAnswer);

module.exports = router;