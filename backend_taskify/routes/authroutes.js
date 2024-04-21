const express = require("express");
const router = express.Router();
const controller = require("../controllers/authcontroller");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";
const taskcontroller = require("../controllers/taskscontroller");

// JWT middleware function
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

router.post("/login", controller.login);
router.post("/signup", controller.signup);

// Example of protected route using JWT middleware
router.get("/protected-route", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully", user: req.user });
});

router.post("/add_tasks", taskcontroller.addtasks);

module.exports = router;
