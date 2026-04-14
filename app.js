// app.js
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/schedules", require("./routes/scheduleRoutes"));
app.use("/api/progress", require("./routes/exportRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(3000, () => console.log("Server jalan di 3000"));