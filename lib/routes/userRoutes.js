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
} = require("../handlers/userHandler.js");

const userRouter = express.Router();
const upload = multer({ storage: userStorage });

// Opret ny bruger
userRouter.post("/", upload.single("image"), async (req, res) => {
  const { name, email, role, password } = req.body;
  if (!name || !email || !role || !password)
    return res.status(400).json({ message: "Alle felter er påkrævet" });

  // Standardbillede
  let image =
    process.env.SERVER_HOST +
    "../../sites/www/legekrogen/src/assets/img/users/no-user.jpg";
  if (req.file)
    image =
      process.env.SERVER_HOST +
      "../../sites/www/legekrogen/src/assets/img/users/" +
      req.file.filename;

  const result = await createUser({ name, email, role, password, image });
  res.status(result.status === "ok" ? 201 : 500).json(result);
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.status(result.status === "ok" ? 200 : 401).json(result);
});

userRouter.get("/", async (req, res) => {
  const result = await getUsers();
  res.status(result.status === "ok" ? 200 : 500).json(result);
});

userRouter.get("/:id", async (req, res) => {
  const result = await getUserById(req.params.id);
  res.status(result.status === "ok" ? 200 : 404).json(result);
});

userRouter.put("/", upload.single("image"), async (req, res) => {
  const result = await updateUser(req.body);
  res.status(result.status === "ok" ? 200 : 404).json(result);
});

userRouter.delete("/:id", async (req, res) => {
  const result = await deleteUser(req.params.id);
  res.status(result.status === "ok" ? 200 : 404).json(result);
});

module.exports = userRouter;
