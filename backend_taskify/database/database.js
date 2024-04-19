const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "ayush-god",
  password: "password123",
  database: "taskify",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
  }
});

module.exports = db;
