// Imports
const config = require("./config");
const express = require("express");
const app = express();
const session = require("express-session");

// Routes
const oauth = require("./routes/oauth");
const dash = require("./routes/dash");
const google = require("./routes/google");

app.set('views', (__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: config.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(__dirname + "/public"));
app.use("/oauth", oauth);
app.use("/dash", dash);
app.use("/google", google);

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(config.PORT);
