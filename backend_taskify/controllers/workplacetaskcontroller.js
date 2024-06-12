const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { deleteTasks } = require("./taskscontroller");

exports.addwtasks = (req, res) => {
    const { title, description, status, date, workplace_id } = req.body;
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

        const sqlCheckAdmin = "SELECT is_admin FROM workplace_info WHERE id = ? AND team_members=?";
        db.query(sqlCheckAdmin, [workplace_id, userId], (selectErr, selectResult) => {
            if (selectErr) {
                console.error("MySQL Error: ", selectErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (selectResult.length === 0 || parseInt(selectResult[0].is_admin) !== 1 && selectResult[0].team_members !== userId) {
                return res.status(403).json({ error: "Forbidden", message: "Only admin can add the tasks" });
            }

            const sqlAddTasks = "INSERT INTO workplace_tasks (title, description, status, date, workplace_id) VALUES (?, ?, ?, ?, ?)";
            db.query(sqlAddTasks, [title, description, status, date, workplace_id], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error("MySQL Error: ", inis_adminsertErr);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                return res.json({ message: "Task added successfully in workplace" });
            });
        });
    });
};

exports.seewtasks = (req, res) => {
    const { title, description, status, date} = req.body;
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

        const sql1 = "SELECT differentiate FROM workplace_info WHERE id = ?";
        db.query(sql1, [20], (selectErr1, selectResult1) => {
            if (selectErr1) {
                console.error("MySQL Error: ", selectErr1);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (selectResult1.length === 0) {
                return res.status(404).json({ error: "Not Found", message: "Workplace not found" });
            }

            const differentiate = selectResult1[0].differentiate;

            const sql2 = "SELECT team_members FROM workplace_info WHERE differentiate = ?";
            db.query(sql2, [differentiate], (selectErr2, selectResult2) => {
                if (selectErr2) {
                    console.error("MySQL Error: ", selectErr2);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                // Assuming team_members is stored as a comma-separated string of user IDs
                const teamMembers = selectResult2.map(row => row.team_members).join(',').split(',').map(id => parseInt(id));

                console.log('teamMembers:', teamMembers); // Debugging line
                console.log('userId:', userId); // Debugging line

                if (!teamMembers.includes(userId)) {
                    return res.status(403).json({ error: "Forbidden", message: "You are not a member of this workplace" });
                }

                let sql = "SELECT title, description, status, date FROM workplace_tasks WHERE workplace_id = ?";
                const params = [20];

                if (title) {
                    sql += " AND title = ?";
                    params.push(title);
                }
                if (description) {
                    sql += " AND description = ?";
                    params.push(description);
                }
                if (status) {
                    sql += " AND status = ?";is_admin
                    params.push(status);
                }
                if (date) {
                    sql += " AND date = ?";
                    params.push(date);
                }

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.error("MySQL Error:", err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    return res.json({ tasks: result });
                });
            });
        });
    });
};

exports.deleteworkplacetask = (req, res) => {
    const { task_id } = req.body;
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const userId = decoded.id;

        const sqlSelectTask = "SELECT * FROM workplace_tasks WHERE id = ?";
        db.query(sqlSelectTask, [task_id], (selectErr1, selectResult1) => {
            if (selectErr1) {
                console.error("MySQL Error: ", selectErr1);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (!selectResult1 || selectResult1.length === 0) {
                return res.status(404).json({ error: "Not Found", message: "No tasks found to delete" });
            }

            const workplace_id = selectResult1[0].workplace_id;

            const sqlCheckAdmin = "SELECT is_admin FROM workplace_info WHERE id = ? AND team_members = ?";
            db.query(sqlCheckAdmin, [workplace_id, userId], (selectErr2, selectResult2) => {
                if (selectErr2) {
                    console.error("MySQL Error: ", selectErr2);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                if (!selectResult2 || selectResult2.length === 0 || parseInt(selectResult2[0].is_admin) !== 1) {
                    return res.status(403).json({ error: "Forbidden", message: "Only admins can delete workplace tasks" });
                }

                const sqlDeleteTask = "DELETE FROM workplace_tasks WHERE id = ?";
                db.query(sqlDeleteTask, [task_id], (deleteErr, deleteResult) => {
                    if (deleteErr) {
                        console.error("MySQL Error: ", deleteErr);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    return res.json({ message: "Workplace tasks deleted successfully" });
                });
            });
        });
    });
};