const express = require("express");
const router = express.Router();
const {createPortfolio, getMyPortfolios, deletePortfolio, updatePortfolio, getPortfolioById, getPortfolioByUsername} = require("../controllers/portfolioController");
const upload = require("../middleware/upload");

const authMiddleware = require("../middleware/authMiddleware");
router.post("/create", authMiddleware, upload.single("image"), createPortfolio);
router.get("/my-portfolio", authMiddleware, getMyPortfolios);
router.delete("/delete/:id", authMiddleware, deletePortfolio);
router.put("/update/:id", authMiddleware, updatePortfolio);
router.get("/:id", getPortfolioById);
router.get("/portfolio/:username", getPortfolioByUsername);
module.exports = router;