const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pass@1234",
  database: "Taskify",
});
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user_info WHERE username = ? AND password=?";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {

    // if (err) return res.json("ERROR");
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length > 0) {
      return res.json("Login Succesfully");
    } else {
      return res.json("No Record Found with this username. Please check Username or Password");
    }
  });
});

app.listen(8081, () => {
  console.log("SERVER IS RUNNING AT 8081");

});
