const express = require("express");
const cors = require("cors");
const routes = require("./routes/authroutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", routes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
