const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware")

const {registerUser, loginUser} = require("../controllers/authController");

router.post("/register",registerUser);
router.post("/login", loginUser)
router.get("/profile", middleware, (req, res) => {
    res.json({
        message:"This is a protected route",
        user:req.user
    });
});

module.exports = router;