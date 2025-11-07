const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getAllUsers,
  getStats,
} = require("../controllers/postController");
const {
  postValidation,
  idValidation,
  validate,
} = require("../utils/validators");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roleCheck");

// Public routes
router.get("/", getPosts);
router.get("/:id", idValidation, validate, getPost);

// Protected routes (authenticated users)
router.use(protect); // All routes below require authentication

router.get("/user/me", getMyPosts);
router.post("/", postValidation, validate, createPost);
router.put("/:id", idValidation, postValidation, validate, updatePost);
router.delete("/:id", idValidation, validate, deletePost);

// Admin routes
router.get("/admin/all", authorize("admin"), getAllPosts);
router.get("/admin/users", authorize("admin"), getAllUsers);
router.get("/admin/stats", authorize("admin"), getStats);

module.exports = router;
