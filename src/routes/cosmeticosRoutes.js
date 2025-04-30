const express = require("express");
const router = express.Router();
const cosmeticosController = require("../controllers/cosmeticosController");
const apiKeyMiddleware = require("../config/apiKey");
const upload = require("../config/upload");

router.use(apiKeyMiddleware); 

router.get("/produtos", cosmeticosController.getAllProdutos);
router.get("/produtos/:id", cosmeticosController.getProdutos);
router.post("/produtos", cosmeticosController.createProdutos);
router.delete("/produtos/:id", cosmeticosController.deleteProdutos);
router.put("/produtos/:id", upload.single("foto"), cosmeticosController.updateProdutos);



module.exports = router;