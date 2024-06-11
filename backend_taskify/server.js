const express = require("express");
const cors = require("cors");
const routes = require("./routes/authroutes");

const app = express();
app.use(express.json());

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/", routes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
