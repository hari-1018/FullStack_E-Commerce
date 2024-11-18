const express = require('express');
const errorResolver = require('./middlewares/errorResolver');
const app = express();
const userRoutes = require('./routes/user_Routes');

app.use(express.json())

app.use("/api/users", userRoutes)


app.use(errorResolver);


module.exports = app;