const jwt = require("jsonwebtoken");
const db = require("../database/database");

exports.addtasks = (req, res) => {
  const { title, description, date, status } = req.body;
  
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

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
  const { id, title, description, date, status } = req.body;

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.id;
    let sql = "SELECT id, title, description, date, status FROM tasks WHERE userid = ?";

    const queryParams = [userId];

    if (title || description || date || status) {
      if (id) {
        sql += " AND id = ?";
        queryParams.push(id);
      }
      if (title) {
        sql += " AND title = ?";
        queryParams.push(title);
      }
      if (description) {
        sql += " AND description = ?";
        queryParams.push(description);
      }
      if (date) {
        sql += " AND date = ?";
        queryParams.push(date);
      }
      if (status) {
        sql += " AND status = ?";
        queryParams.push(status);
      }
    }

    db.query(sql, queryParams, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.json({ tasks: result });
    });
  });
};

exports.deleteTasks = (req, res) => {
  console.log("Received DELETE request with body:", req.body);
  console.log("Authorization header:", req.headers['authorization']);

  const { tasks_id } = req.body;
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decoded.id;
    const sqlCheck = "SELECT * FROM tasks WHERE userid = ? AND id = ?";
    db.query(sqlCheck, [userId, tasks_id], (selectErr, selectResult) => {
      if (selectErr) {
        console.error("MySQL Error: ", selectErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!selectResult || selectResult.length === 0) {
        return res.status(404).json({ error: "Not Found", message: "No tasks found to delete" });
      }

      const sqlDelete = "DELETE FROM tasks WHERE userid = ? AND id = ?";
      db.query(sqlDelete, [userId, tasks_id], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error("MySQL Error: ", deleteErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json({ message: "Task Deleted Successfully" });
      });
    });
  });
};


exports.updatetasks = (req, res) => {
  const { tasks_id, status } = req.body;

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const userId = decoded.id;

    const sqlCheck = "SELECT * FROM tasks WHERE userid = ? AND id = ?";
    db.query(sqlCheck, [userId, tasks_id], (selectErr, selectResult1) => {
      if (selectErr) {
        console.error("MySQL Error: ", selectErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!selectResult1 || selectResult1.length === 0) {
        return res.status(404).json({ error: "Not Found", message: "No tasks found to update" });
      }

      const sqlUpdate = "UPDATE tasks SET status = ? WHERE userid = ? AND id = ?";
      db.query(sqlUpdate, [status, userId, tasks_id], (updateErr, updateResult) => {
        if (updateErr) {
          console.error("MySQL Error: ", updateErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json({ message: "Status Updated Successfully" });
      });
    });
  });
}

