const jwt = require("jsonwebtoken");
const db = require("../database/database");

exports.addworkplace = (req, res) => {
    const { title, description, team_members } = req.body;
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
    }
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = decoded.id;

        const sql = "INSERT INTO workplace_info (title, description, team_members, user_id) VALUES (?, ?, ?, ?)";
        db.query(sql, [title, description, team_members, userId], (insertErr, result) => {
            if (insertErr) {
                console.error("MYSQL Error: ", insertErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            return res.json({ message: "Workplace is added" });
        });
    });
};

exports.seeworkplace = (req, res) => {
    const { title, description, team_members } = req.body;

    const token = req.headers['authorization'];

    let sql = "SELECT title, description, team_members FROM workplace_info WHERE";

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = decoded.id;

        sql += ` user_id = '${userId}'`;

        if (title || description || team_members) {
            sql += " AND";

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
