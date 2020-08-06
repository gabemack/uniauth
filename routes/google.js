const config = require("../config");
const express = require("express");
const jwt = require("jsonwebtoken");
const getGoogleToken = require("../util/getGoogleToken");
const forceDiscordAuth = require("../middleware/forceDiscordAuth");
const addUserToGuild = require("../discord/client");
const sqlDB = require("../util/sqlDB");
const router = express.Router();

let oauthuri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.GOOGLE_CLIENT_ID}&response_type=${config.GOOGLE_RESPONSE_TYPE}&scope=${config.GOOGLE_SCOPE}&redirect_uri=${config.GOOGLE_REDIRECT_URI}&hd=${config.GOOGLE_EMAIL_DOMAIN}&prompt=${config.GOOGLE_PROMPT}`;

router.get("/login", (req, res) => {
    res.redirect(oauthuri);
});

router.get("/refresh", forceDiscordAuth, (req, res) => {
    let UserDiscordSession = req.session.user;
    // Deletes user from SQLite DB
    sqlDB.deleteUser.run(UserDiscordSession["discord_id"]);
    res.redirect("/google/login");
});

router.get("/redirect", forceDiscordAuth, (req, res) => {
    getGoogleToken(req.query.code).then(googleData => {
        let UserDiscordSession = req.session.user;
        let UserGoogleSession = new Map();
        UserGoogleSession["access_token"] = googleData.access_token;

        let decodedToken = jwt.decode(googleData.id_token);

        if (decodedToken["hd"] !== config.GOOGLE_EMAIL_DOMAIN) {
            return res.render("error", {
                errorMessage: `You need to authenticate using a ${config.GOOGLE_EMAIL_DOMAIN} account.`
            });
        }

        UserGoogleSession["name"] = decodedToken["name"];
        UserGoogleSession["email"] = decodedToken["email"];

        req.session.google = UserGoogleSession;

        let UserAccount = {
            id: UserDiscordSession["discord_id"],
            gmailAddress: UserGoogleSession["email"]
        }

        addUserToGuild(UserDiscordSession["access_token"], UserDiscordSession["discord_id"], UserGoogleSession["name"], config.DISCORD_ROLES).then(body => {
            sqlDB.createUser.run(UserAccount);
            res.redirect("/dash");
        }).catch(err => {
            res.render("error", {
                errorMessage: err
            });
        });
    }).catch(err => {
        res.render("error", {
            errorMessage: "An authentication error has occurred."
        });
    });
});

module.exports = router;