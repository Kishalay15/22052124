const express = require("express");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
