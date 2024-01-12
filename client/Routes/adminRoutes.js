const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController
} = require("../Controller/adminControler");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", requireAuth, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", requireAuth, getAllDoctorsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  requireAuth,
  changeAccountStatusController
);

module.exports = router;