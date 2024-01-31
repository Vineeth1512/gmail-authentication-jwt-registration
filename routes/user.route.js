const express = require("express");
const router =express.Router();
const userController =require("../controllers/user.controller");
const userAuthorization = require("../middlewares/auth.middleware")

//Route Level Middleware - To Protect Route
router.use('/changepassword', userAuthorization.checkUserAuth);
router.use('/details',userAuthorization.checkUserAuth);

router.post("/register",userController.userRegistration);
router.post("/login",userController.userLogin);
router.post('/send-reset-password-email', userController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token',userController.userResetPassword);

router.get("/details",userController.loggedUserDetails);


module.exports =router;