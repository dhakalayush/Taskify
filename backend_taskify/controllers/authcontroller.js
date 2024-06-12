const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/database");

// Secret key for JWT token
const secretKey = "your_secret_key";

exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user_signup WHERE username = ?";

  db.query(sql, [username], (err, data) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(400).json({ error: "No Record Found", message: "No Record Found with this username. Please check Username or Password" });
    }

    // comparing hashed password with entered password
    const { id, Password: hashedPassword } = data[0]; // Assuming the id is retrieved from the database
    bcrypt.compare(password, hashedPassword, (bcryptErr, result) => {
      if (bcryptErr) {
        console.error("Bcrypt Error:", bcryptErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result) {
        const token = jwt.sign({ id, username }, secretKey, { expiresIn: "1h" });
        
        const decoded = jwt.decode(token);
        console.log("Decoded JWT Payload:", decoded);
        
        return res.json({ message: "Login Successfully", token: token });
      } else {
        return res.status(400).json({ error: "Incorrect Password", message: "Incorrect Password. Please try again." });
      }
    });
  });
};


exports.signup = (req, res) => {
  const { fullname, email, username, password, confirm_password } = req.body;

  // Check if email or username already exist in the database
  const checkExistingUser = "SELECT * FROM user_signup WHERE Email = ? OR Username = ?";
  db.query(checkExistingUser, [email, username], (err, results) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      // Email or username already exists
      const existingUser = results.find(user => user.Email === email || user.Username === username);
      const message = existingUser.Email === email ? "Email already exists." : "Username already exists.";
      return res.status(400).json({ error: message });
    }

    // Hash the password and proceed with signup
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Bcrypt Error:", hashErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const insertUserQuery = "INSERT INTO user_signup (Full_Name, Email, Username, Password) VALUES (?, ?, ?, ?)";
      db.query(insertUserQuery, [fullname, email, username, hashedPassword], (insertErr, result) => {
        if (insertErr) {
          console.error("MySQL Error:", insertErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json({ message: "Signup Successful" });
      });
    });
  });
};

exports.updatePassword = (req, res) => {
  const { password } = req.body;
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

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Hashing Error: ", hashErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const sql = "UPDATE user_signup SET Password = ? WHERE id = ?";
      db.query(sql, [hashedPassword, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error("MySQL Error: ", updateErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json({ message: "Password Updated Successfully" });
      });
    });
  });
};

exports.deleteProfile = (req,res)=>{
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'your_secret_key', (err, decoded)=>{
    if(err){
      return res.status(401).json({error:"Invalid token"});
    }

    const userId = decoded.id;

    const sqldelete = "DELETE FROM user_signup WHERE id = ?";
    db.query(sqldelete, [userId], (selectErr, selectResult)=>{
      if(selectErr){
        console.error("MySQL Error: ", selectErr);
        return res.status(500).json({error: "Internal Server Error"});
      }

      return res.json({message:"Profile Deleted Successfully"});
    })
  })
}

exports.seedetails = (req, res) => {
  const{fullname, email, username} = req.body;

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

    let sql = 'SELECT * FROM user_signup where id = ?';
    const queryParams = [userId];

    if(fullname || email || username){
      if(fullname){
        sql += "AND Full_Name = ?";
        queryParams.push(fullname);
      }
      if(email){
        sql += "AND Email = ?";
        queryParams.push(email);
      }
      if(username){
        sql+="AND Username = ?";
        queryParams.push(username);
      }
    }
    db.query(sql, queryParams, (err, result)=>{
      if(err){
        console.error("MySQL Error: ", err);
        return res.status(500).json({error: "Internal Server Error"});
      }

      return res.json({tasks: result});
    });
  });
};


exports.getalldata = (req,res)=>{
  const{id, name} = req.body;

  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized", message: "JWT token is required" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    let sql = 'SELECT * FROM user_signup';
    const queryParams = [];
    if(id){
      sql += "AND id = ?";
      queryParams.push(id);
    }
    if(name){
        sql += "AND Full_Name = ?";
        queryParams.push(name);
      }
    
    db.query(sql, queryParams, (err, result)=>{
      if(err){
        console.error("MySQL Error: ", err);
        return res.status(500).json({error: "Internal Server Error"});
      }

      return res.json({tasks: result});

  });
});
};