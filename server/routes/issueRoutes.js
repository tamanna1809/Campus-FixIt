import express from "express";
import Issue from "../models/Issue.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all issues (Admin or Dashboard)
// Get all issues (Admin or Dashboard)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const issues = await Issue.find().populate("userId", "name email");
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get my issues (Student)
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const issues = await Issue.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create an issue
router.post("/create", authMiddleware, async (req, res) => {
  const { title, description, category, location, image } = req.body;

  try {
    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      image,
      userId: req.user.id,
    });

    await newIssue.save();
    res.json(newIssue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update issue status (Admin)
router.put("/:id/status", authMiddleware, async (req, res) => {
  const { status, remarks } = req.body;
  try {
    const updateData = { status };
    if (remarks) updateData.remarks = remarks;

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
