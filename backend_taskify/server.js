const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const bcrypt = require("bcrypt");

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
  const { username, password } = req.body;
  const sql = "SELECT * FROM user_signup WHERE username = ?";

  db.query(sql, [username], (err, data) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.json("No Record Found with this username. Please check Username or Password");
    }

    // comparing hashed password with entered password
    const hashedPassword = data[0].Password;
    bcrypt.compare(password, hashedPassword, (bcryptErr, result) => {
      if (bcryptErr) {
        console.error("Bcrypt Error:", bcryptErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result) {
        return res.json("Login Successfully");
      } else {
        return res.json("Incorrect Password");
      }
    });
  });
});


app.post("/signup", (req, res) => {
  const { fullname, email, username, password } = req.body;
  
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Bcrypt Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const sql = "INSERT INTO user_signup (Full_Name, Email, Username, Password) VALUES (?, ?, ?, ?)";
    db.query(sql, [fullname, email, username, hashedPassword], (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.json("Signup Successful");

    });
  });
});



app.listen(8080, () => {
  console.log("SERVER IS RUNNING AT 8080");

});
