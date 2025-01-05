const express = require("express");
const {
  saveUserDetails,
  findMutualFriends,
  searchUsers,
  softDeleteUser,
  updateUser,
  listUsersSorted,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users/:username", saveUserDetails);
router.get("/users/:username/mutual-friends", findMutualFriends);
router.get("/search", searchUsers);
router.put("/users/:username", updateUser);
router.delete("/users/:username", softDeleteUser);
router.get("/users", listUsersSorted);

module.exports = router;
