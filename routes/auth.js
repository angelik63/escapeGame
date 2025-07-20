const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const auth = require("../middleware/auth");


router.post("/register", authController.register);
// TODO : Ajouter la route POST /login qui pointe vers la méthode login du contrôleur authController
router.post("/login", authController.login);
// TODO : Ajouter le authMiddleware pour protéger la route et indexer la route sur la méthode me du contrôleur authController
router.get("/me" , authMiddleware, authController.me);

module.exports = router;
