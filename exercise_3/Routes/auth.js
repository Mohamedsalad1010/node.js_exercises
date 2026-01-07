import express from "express";
import {
  logInUser,
  protectedRoute,
  regesterUser,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/register", regesterUser);
router.post("/login", logInUser);

// protected route
router.get("/profile", protectedRoute, (req, res) => {
  const user = req.user;

  res.json({
    userInfo: { name: user.name, emai: user.email, role: user.role },
  });
});

export default router;
