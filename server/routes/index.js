const express  = require("express")
      router   = express.Router()
authController = require("../controllers/authController");     

// route post user signup
router.post(
   "/api/auth/signup", 
   authController.validateSignup,
   authController.signup
)

module.exports = router