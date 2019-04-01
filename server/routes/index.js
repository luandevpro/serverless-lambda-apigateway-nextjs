const express  = require("express")
      router   = express.Router()
authController = require("../controllers/authController");     
userController = require("../controllers/userController");     

router
   .route("/api/auth/signup")
   .post(authController.validateSignup,authController.signup)   

router
   .route("/api/auth/signin")
   .post(authController.signin)

router
   .route("/api/auth/signout")
   .get(authController.signout)

router
   .route("/api/users")
   .get(userController.getUser)

router.param("userId" , userController.getUserById)

router
   .route("/api/users/:userId")
   .get(userController.getUserCurrent)
   .delete(userController.checkAuth,userController.deleteUser)

router
   .route("/api/users/follow")
   .put(
      userController.checkAuth, 
      userController.addFollowing, 
      userController.addFollowers
   )

router
   .route("/api/users/unfollow")
   .put(
      userController.checkAuth, 
      userController.deleteFollowing, 
      userController.deleteFollowers
   )

router
   .route("/api/users/profile/:userId")
   .get(userController.getUserProfile)

module.exports = router