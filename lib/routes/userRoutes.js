// lib/routes/userRoutes.js
const express = require("express");
const multer = require("multer");
const { userStorage } = require("../misc/mStorage.js");
const auth = require("../middleware/authMiddleware.js");

const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  seedUsers,
} = require("../handlers/userHandler.js");

const router = express.Router();
const upload = multer({ storage: userStorage });

/* DEV: seed users (NU lăsa în producție) */
router.get("/seed/dev", async (_req, res) => {
  try {
    const result = await seedUsers();
    res.status(result.status === "ok" ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

/* LOGIN (public) */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const result = await loginUser(email, password);
    res.status(result.status === "ok" ? 200 : 401).json(result);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

/* CREATE (admin) */
router.post("/", auth(["admin"]), upload.single("image"), async (req, res) => {
  try {
    const { name, email, role, password } = req.body || {};
    const image = req.file
      ? `/users/${req.file.filename}`
      : "/users/no-user.jpg";
    const result = await createUser({ name, email, role, password, image });
    res.status(result.status === "ok" ? 201 : 400).json(result);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

/* READ ALL (admin) */
router.get("/", auth(["admin"]), async (_req, res) => {
  try {
    const result = await getUsers();
    res.status(result.status === "ok" ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

/* READ ONE (admin) */
router.get("/:id", auth(["admin"]), async (req, res) => {
  try {
    const result = await getUserById(req.params.id);
    res.status(result.status === "ok" ? 200 : 404).json(result);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

/* UPDATE (admin) */
router.put("/", auth(["admin"]), upload.single("image"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.picture = `/users/${req.file.filename}`;
    const result = await updateUser(data);
    res.status(result.status === "ok" ? 200 : 400).json(result);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

/* DELETE (admin) */
router.delete("/:id", auth(["admin"]), async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(result.status === "ok" ? 200 : 404).json(result);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;
