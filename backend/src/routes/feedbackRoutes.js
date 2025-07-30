const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getUserFeedbacks,
  getFeedbackMetrics,
} = require("../services/feedbackService");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  const { receiverId, message, type, isAnonymous } = req.body;
  try {
    const feedback = await createFeedback(
      req.user.id,
      receiverId,
      message,
      type,
      isAnonymous
    );
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/my-feedbacks", authMiddleware, async (req, res) => {
  try {
    const feedbacks = await getUserFeedbacks(req.user.id);
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/metrics", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Admin only" });
  try {
    const metrics = await getFeedbackMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
