const jwt = require("jsonwebtoken");
const db = require("../database/database");

exports.addworkplace = (req, res) => {
    const { title, description} = req.body; 

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
    }
  
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const is_admin = 1; 

        const userId = decoded.id;

        const code = Math.floor(10000 + Math.random() * 90000);

        const sql = "INSERT INTO workplace_info (title, description, team_members, is_admin, differentiate) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [title, description, userId, is_admin, code], (insertErr, result) => {
            if (insertErr) {
                console.error("MYSQL Error: ", insertErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json({ message: "Workplace is added" });
        });
    });
};

exports.addmembers = (req, res) => {
    const { member_id } = req.body;
  
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
  
      const sqlCheckAdmin = "SELECT is_admin FROM workplace_info WHERE id = ? AND team_members = ?";
      db.query(sqlCheckAdmin, [20, userId], (selectErr, selectResult) => {
        if (selectErr) {
          console.error("MySQL Error: ", selectErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }
  
        if (selectResult.length === 0 || parseInt(selectResult[0].is_admin) !== 1) {
          return res.status(403).json({ error: "Forbidden", message: "Only admins can add members" });
        }
  
        const sqlCheckMemberExists = "SELECT * FROM workplace_info WHERE id = ? AND team_members = ?";
        db.query(sqlCheckMemberExists, [20, member_id], (checkErr, checkResult) => {
          if (checkErr) {
            console.error("MySQL Error: ", checkErr);
            return res.status(500).json({ error: "Internal Server Error" });
          }
  
          if (checkResult.length > 0) {
            return res.status(400).json({ error: "Member already exists in the workplace" });
          }
  
          const sqlAddMember = "INSERT INTO workplace_info (title, description, team_members, is_admin, differentiate) SELECT title, description, ?, 0, differentiate FROM workplace_info WHERE id = ?";
          db.query(sqlAddMember, [member_id, 20], (insertErr, insertResult) => {
            if (insertErr) {
              console.error("MySQL Error: ", insertErr);
              return res.status(500).json({ error: "Internal Server Error" });
            }
  
            return res.json({ message: "Member added to the workplace" });
          });
        });
      });
    });
  };
  
exports.seemembers = (req, res) => {
    const { fullname, email, username } = req.body;
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const sql = "SELECT differentiate FROM workplace_info WHERE id = ?";
        db.query(sql, [20], (selectErr, selectResults) => {
            if (selectErr) {
                console.error("MySQL Error: ", selectErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (selectResults.length === 0) {
                return res.status(404).json({ error: "Differentiate not found" });
            }
            
            const differentiate = selectResults[0].differentiate;

            const sql1 = "SELECT team_members FROM workplace_info WHERE differentiate = ?";
            db.query(sql1, [differentiate], (selectErr, selectResult1) => {
                if (selectErr) {
                    console.error("MySQL Error: ", selectErr);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                if (selectResult1.length === 0) {
                    return res.status(404).json({ error: "Team members not found" });
                }
                const teamMembers = selectResult1.map(row => row.team_members);

                let sqlUser = `SELECT * FROM user_signup WHERE id IN (?)`;
                const queryParams = [teamMembers];

                if (fullname || email || username) {
                    if (fullname) {
                        sqlUser += " AND Full_Name = ?";
                        queryParams.push(fullname);
                    }
                    if (email) {
                        sqlUser += " AND Email = ?";
                        queryParams.push(email);
                    }
                    if (username) {
                        sqlUser += " AND Username = ?";
                        queryParams.push(username);
                    }
                }

                db.query(sqlUser, queryParams, (err, result) => {
                    if (err) {
                        console.error("MySQL Error: ", err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    return res.json({ tasks: result });
                });
            });
        });
    });
};


exports.seeworkplace = (req, res) => {
    const { id, title, description, team_members } = req.body;
    
   const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
    }
  
    const token = authHeader.split(' ')[1];


    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        let sql = "SELECT id, title, description, team_members FROM workplace_info WHERE";

        const userId = decoded.id;

        sql += ` team_members = '${userId}'`;
        
        if (title || description || team_members) {
            sql += " AND";
            if (id) sql += ` id = '${id}'`;
            if (title) sql += ` title = '${title}'`;
            if (description) sql += ` description = '${description}'`;
            if (team_members) sql += ` team_members = '${team_members}'`;
        }

        db.query(sql, (err, result) => {
            if (err) {
                console.error("MySQL Error:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            return res.json({ workplaces: result });
        });
    });
};

exports.deleteworkplace = (req, res) => {
    const { workplace_id } = req.body;
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

        const sqlCheck = "SELECT is_admin, team_members FROM workplace_info WHERE team_members = ? AND id = ?";
        db.query(sqlCheck, [userId, workplace_id], (selectErr, selectResult1) => {
            if (selectErr) {
                console.error("MySQL Error: ", selectErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            
            if (selectResult1.length === 0 || parseInt(selectResult1[0].is_admin) !== 1) {
                return res.status(403).json({ error: "Forbidden", message: "Only admins can delete the workplace" });
            }

            const sqlCheckDifferentiate = 'SELECT differentiate FROM workplace_info WHERE id = ?';
            db.query(sqlCheckDifferentiate, [workplace_id], (selectErr, selectResult2) => {
                if (selectErr) {
                    console.error("MySQL error: ", selectErr);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                if (selectResult2.length === 0) {
                    return res.status(404).json({ error: "Not Found", message: "Workplace not found" });
                }

                const differentiate = selectResult2[0].differentiate;

                const deleteWorkplace = "DELETE FROM workplace_info WHERE differentiate = ?";
                db.query(deleteWorkplace, [differentiate], (deleteErr, deleteResult3) => {
                    if (deleteErr) {
                        console.log("MySQL Error: ", deleteErr);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    const deleteWorkplaceTasks = "DELETE FROM workplace_tasks WHERE workplace_id = ?";
                    db.query(deleteWorkplaceTasks, [workplace_id], (deleteErr2, deleteResult4) => {
                        if (deleteErr2) {
                            console.log("MySQL Error: ", deleteErr2);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }

                        return res.json({ message: "Workplace and related tasks deleted successfully" });
                    });
                });
            });
        });
    });
};