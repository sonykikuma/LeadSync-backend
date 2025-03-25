require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const { initializeDatabase } = require("./db");

app.use(express.json());
app.use(cors());
initializeDatabase();

// const corsOptions = {
//   origin: "*",
//   credentials: true,

//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello, anvaya crm backend!");
});

// models
const Lead = require("./models/Lead");
const SalesAgent = require("./models/SalesAgent");
const CommentMp2 = require("./models/CommentMp2");
const TagMp2 = require("./models/TagMp2");

// routes
const leadRoutes = require("./routes/leads");
const agentRoutes = require("./routes/agents");
const commentRoutes = require("./routes/comments");
const reportRoutes = require("./routes/reports");

app.use("/leads", leadRoutes);
app.use("/agents", agentRoutes);
app.use("/comments", commentRoutes);
app.use("/reports", reportRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
