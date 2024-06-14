const express = require("express");
const router = express.Router();
const controller = require("../controllers/authcontroller");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";
const taskcontroller = require("../controllers/taskscontroller");
const workplacecontroller = require("../controllers/workplacecontroller");
const workplaccetaskcontroller = require("../controllers/workplacetaskcontroller");

// JWT middleware function
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/update_password", controller.updatePassword);
router.put("/delete_profile", controller.deleteProfile);
router.get("/see_details", controller.seedetails);
router.get('/getalldata', controller.getalldata);

// Example of protected route using JWT middleware
router.get("/protected-route", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully", user: req.user });
});

router.post("/add_tasks", taskcontroller.addtasks);
router.get("/see_tasks", taskcontroller.seetasks);
router.post("/delete_tasks", taskcontroller.deleteTasks);
router.post('/update_status', taskcontroller.updatetasks);
router.get("/put_data", taskcontroller.putdata);
router.get("/see_data",taskcontroller.seedata);

router.post("/add_workplace", workplacecontroller.addworkplace);
router.get("/see_workplace", workplacecontroller.seeworkplace);
router.post("/add_members", workplacecontroller.addmembers);
router.get("/delete_workplace", workplacecontroller.deleteworkplace);
router.get("/see_members", workplacecontroller.seemembers);

router.post("/add_workplace_tasks", workplaccetaskcontroller.addwtasks);
router.get("/see_workplace_tasks", workplaccetaskcontroller.seewtasks);
router.get("/delete_workplace_tasks", workplaccetaskcontroller.deleteworkplacetask);

module.exports = router;
