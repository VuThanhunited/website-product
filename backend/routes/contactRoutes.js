const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// POST route - submit contact form
router.post("/", contactController.submitContact);

// GET route - get all messages (admin)
router.get("/", contactController.getAllMessages);

// PUT route - mark as read
router.put("/:id/read", contactController.markAsRead);

// DELETE route - delete message
router.delete("/:id", contactController.deleteMessage);

module.exports = router;
