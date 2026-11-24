// IC1 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
require('dotenv').config();                              // NEW — IC19: read .env and load values into process.env                 // NEW — IC19: use PORT from .env, fall back to 3000
const express = require("express");                       // load the Express web framework
const path    = require("path");                          // built-in Node module for working with file paths
const app     = express();                               // create the Express application
const PORT = process.env.PORT || 3000;  // the port your browser connects to


const cookieParser = require('cookie-parser'); //ADD - IC24
const session = require('express-session');  //ADD - IC24
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // serve every file in public/ as a static file

app.use(cookieParser());                           // ADD — IC24
app.use(session({                                  // ADD — IC24
  secret: 'ic24-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 }
}));


// IC19 — mission status route
app.get('/ic19/status', (req, res) => {                  // NEW — IC19: GET route, responds with plain text
  res.send(`Mission Zone: ${process.env.MISSION_ZONE} | Alert Level: ${process.env.ALERT_LEVEL}`);
});
// IC19 — config route (returns JSON)
app.get('/ic19/config', (req, res) => {                  // NEW — IC19: GET route, responds with JSON
  res.json({
    zone:       process.env.MISSION_ZONE,
    alert:      process.env.ALERT_LEVEL,
    port:       PORT,
    serverTime: new Date().toISOString(),
  });
});
app.use("/ic20", require("./routes/ic20-routes"));
app.use("/ic22", require("./routes/ic22-routes"));
app.use("/ic23", require("./routes/ic23-routes"));
app.use('/hw9', require('./routes/hw9-routes'));  // NEW — HW9: mount hw9 router
app.use('/hw10', require('./routes/hw10-routes'));  // NEW — HW10: mount hw10 router
app.use("/ic24", require("./routes/ic24-routes")); // ADD — IC24
app.listen(PORT, "0.0.0.0", () =>                       // 0.0.0.0 makes the server reachable from the droplet (IC2)
  console.log(`Running on http://localhost:${PORT}`)
);