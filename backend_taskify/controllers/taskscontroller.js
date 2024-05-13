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
    const userId = decoded.id; // Assuming the id is stored in the token payload

    const sql = "INSERT INTO tasks (title, description, date, status, userid) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, description, date, status, userId], (insertErr, result) => {
      if (insertErr) {
        console.error("MYSQL Error: ", insertErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.json({ message: "Task is Added" });
    });
  });
};



exports.seetasks = (req, res) => {
  const { title, description, date, status } = req.body;

  const token = req.headers['authorization']; // Assuming token is sent in the Authorization header

  let sql = "SELECT title, description, date, status FROM tasks";

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.id;

    // Filter tasks by user ID directly in the SQL query
    sql += ` WHERE userid = '${userId}'`;

    if (title || description || date || status) {
      sql += " AND";

      if (title) sql += ` title = '${title}'`;
      if (description) sql += ` description = '${description}'`;
      if (date) sql += ` date = '${date}'`;
      if (status) sql += ` status = '${status}'`;
    }

    db.query(sql, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.json({ tasks: result });
    });
  });
};
