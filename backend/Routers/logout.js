import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // 🔥 important change
    path: "/",
  });

  res.status(200).json({ message: "Logged out" });
});

export default router;