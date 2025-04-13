const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const restRoutes = require('./rest');
app.use('/api', restRoutes);

app.listen(PORT, () => {console.log("Server started on http://localhost:3000");})