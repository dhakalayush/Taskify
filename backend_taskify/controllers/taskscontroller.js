const jwt = require("jsonwebtoken");
const db = require("../database/database");

exports.addtasks = (req, res) => {
  const { title, description, date, status } = req.body;
  const token = req.headers['authorization']; // Assuming token is sent in the Authorization header

  if (!token) {
    return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token is valid, proceed with adding task to the database
    const userId = decoded.username; // Assuming the username is stored in the token payload

    const sql = "INSERT INTO tasks (title, description, date, status, user_id) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, description, date, status, userId], (insertErr, result) => {
      if (insertErr) {
        console.error("MYSQL Error: ", insertErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.json({ message: "Task is Added" });
    });
  });
};


exports.seetasks = (req,res) => {
    const {title, description, date, status} = req.body;
    const sql = "SELECT * FROM tasks WHERE title = ?, description = ?, date = ?, status = ?";
};