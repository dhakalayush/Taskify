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

    const userId = decoded.id;

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
};

exports.putdata = (req, res) => {
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
      const sql = "SELECT status FROM tasks WHERE userid = ?";
      db.query(sql, [userId], (selectErr, selectResults) => {
          if (selectErr) {
              console.error("MySQL Error: ", selectErr);
              return res.status(500).json({ error: "Internal Server Error" });
          }

          const todoTasks = selectResults.filter(task => task.status === "To Do");
          const inProgressTasks = selectResults.filter(task => task.status === "In Progress");
          const completedTasks = selectResults.filter(task => task.status === "Completed");

          const numOfTodoTasks = todoTasks.length;
          const numOfInProgressTasks = inProgressTasks.length;
          const numOfCompletedTasks = completedTasks.length;

          const today = new Date().toISOString().slice(0, 10);

          // Check if the date already exists for the user
          const checkSql = "SELECT * FROM numberoftask WHERE date = ? AND userId = ?";
          db.query(checkSql, [today, userId], (checkErr, checkResults) => {
              if (checkErr) {
                  console.error("MySQL Error: ", checkErr);
                  return res.status(500).json({ error: "Internal Server Error" });
              }

              if (checkResults.length > 0) {
                  // Update the existing record
                  const updateSql = `
                      UPDATE numberoftask
                      SET numberoftodo = ?, numberofinprogress = ?, numberofcompleted = ?
                      WHERE date = ? AND userId = ?
                  `;
                  const updateParams = [numOfTodoTasks, numOfInProgressTasks, numOfCompletedTasks, today, userId];
                  db.query(updateSql, updateParams, (updateErr, updateResult) => {
                      if (updateErr) {
                          console.error("MySQL Error: ", updateErr);
                          return res.status(500).json({ error: "Internal Server Error" });
                      }

                      return res.json({ message: "Task counts updated", counts: { numOfTodoTasks, numOfInProgressTasks, numOfCompletedTasks } });
                  });
              } else {
                  // Insert a new record
                  const insertSql = `
                      INSERT INTO numberoftask (date, numberoftodo, numberofinprogress, numberofcompleted, userId)
                      VALUES (?, ?, ?, ?, ?)
                  `;
                  const insertParams = [today, numOfTodoTasks, numOfInProgressTasks, numOfCompletedTasks, userId];
                  db.query(insertSql, insertParams, (insertErr, insertResult) => {
                      if (insertErr) {
                          console.error("MySQL Error: ", insertErr);
                          return res.status(500).json({ error: "Internal Server Error" });
                      }

                      return res.json({ message: "Task counts inserted", counts: { numOfTodoTasks, numOfInProgressTasks, numOfCompletedTasks } });
                  });
              }
          });
      });
  });
};
exports.seedata = (req,res) => {
  const {id, date, numberoftodo, numberofInProgress, numberofCompleted} = req.body;
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
    const sql = "SELECT * FROM numberoftask WHERE userId = ?";
    const queryParams = [userId];

    if (date || numberoftodo || numberofInProgress || numberofCompleted) {
      if (id) {
        sql += " AND id = ?";
        queryParams.push(id);
      }
      if (date) {
        sql += " AND date = ?";
        queryParams.push(date);
      }
      if (numberoftodo) {
        sql += " AND numberoftodo = ?";
        queryParams.push(numberoftodo);
      }
      if (numberofInProgress) {
        sql += " AND numberofinprogress = ?";
        queryParams.push(numberofInProgress);
      }
      if (numberofCompleted) {
        sql += " AND numberofcompleted = ?";
        queryParams.push(numberofInProgress);
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

