const express = require("express");
const path = require("path");
const fs = require('fs');

const indexRoutes = require('./public/routes/htmlRoutes.js');
const apiRoutes = require('./public/routes/apiRoutes.js')

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

indexRoutes (app, path);
apiRoutes (app, path, fs);



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
