const express = require("express");
const router = express.Router();
const {
  getAllUser,
  store,
  getById,
  update,
  destroy,
  login,
  profile,
} = require("../controller/user-controller");

const {
    storeSong,
    getAllSong,
    getSongById,
    updateSong,
    destroySong
} = require("../controller/song-controller");

const {
    getAllCategory,
    getCategoryById,
    storeCategory,
    updateCategory,
    destroyCategory
} = require("../controller/category-controller");

const UserVerification = require("../verification/user-verification");
const LoginVerification = require("../verification/login-verification");
const catchValidationError = require("../handler/validation-error-handler");
const verifyToken = require("../middleware/auth");

router.post("/login", LoginVerification, catchValidationError(login));
//get all users,songs, categories Request Method: Get
router.get("/users", verifyToken, [getAllUser, getAllSong,getAllCategory]);

// create new user, Request Method: Post
router.post("/register", UserVerification, catchValidationError[store, storeSong, storeCategory] );

// get user profile, Request Method: Get
router.get("/profile", verifyToken, profile);

// get user by id, Request Method: Get
router.get("/users/:id", verifyToken, [getById, getSongById, getCategoryById]);

// update user by id, Request Method: Put
router.put(
  "/users/:id",
  [verifyToken, UserVerification],
  catchValidationError[update, updateCategory, updateSong]
);

// delete user by id, Request Method: Delete
router.delete("/users/:id", verifyToken, [destroy, destroyCategory, destroySong]);

module.exports = router;