import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check-auth", authMiddleware, (req, res) => {
  res.json({
    message: "Authenticated",
    user: req.user,
  });
});

export default router;