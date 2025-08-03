const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getUserFeedbacks,
  getAllFeedbacks,
  getFeedbackMetrics,
} = require("../services/feedbackService");
const authMiddleware = require("../middleware/auth");

// Validation middleware
const validateFeedback = (req, res, next) => {
  const { receiverId, message, type, isAnonymous } = req.body;
  
  if (!receiverId || !message || !type) {
    return res.status(400).json({ 
      error: "Missing required fields: receiverId, message, type" 
    });
  }
  
  if (!["positive", "constructive"].includes(type)) {
    return res.status(400).json({ 
      error: "Type must be 'positive' or 'constructive'" 
    });
  }
  
  if (typeof isAnonymous !== "boolean") {
    return res.status(400).json({ 
      error: "isAnonymous must be a boolean" 
    });
  }
  
  next();
};

router.post("/", authMiddleware, validateFeedback, async (req, res) => {
  const { receiverId, message, type, isAnonymous } = req.body;
  
  try {
    // Prevent self-feedback
    if (req.user.id === receiverId) {
      return res.status(400).json({ 
        error: "Cannot send feedback to yourself" 
      });
    }
    
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

router.get("/all-feedbacks", authMiddleware, async (req, res) => {
  // Check if user has admin role
  if (!req.user.user_metadata?.role || req.user.user_metadata.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  
  try {
    const feedbacks = await getAllFeedbacks();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/metrics", authMiddleware, async (req, res) => {
  // Check if user has admin role (you might need to adjust this based on your user structure)
  if (!req.user.user_metadata?.role || req.user.user_metadata.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  
  try {
    const metrics = await getFeedbackMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
