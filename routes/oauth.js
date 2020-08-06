// Imports
const config = require("../config");
const getToken = require("../util/getDiscordToken");
const getDiscordUser = require("../util/getDiscordUser");
const express = require("express");
const router = express.Router();

// Redirect to Discord OAuth URI
router.get("/login", (req, res) => {
    res.redirect(config.DISCORD_OAUTH_URI);
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

// URI that users get sent to after authenticating with Discord
router.get("/redirect", (req, res) => {
    // If there is no code send them back to login, this usually means they typed the URI themselves
    if (req.query.code === undefined) return res.redirect("/oauth/login");
    getToken(req.query.code).then(accessData => {
        // Comparing the scope we receive from Discord with the scope that we want
        if (accessData.scope.split(" ").sort().toString() !== config.DISCORD_SCOPE.split(" ").sort().toString()) return res.send("Invalid Scope");

        // Creating UserDiscordSession Map and storing access token in it
        let UserDiscordSession = new Map();
        UserDiscordSession["access_token"] = accessData.access_token;

        // Getting information about the user from Discord
        getDiscordUser(UserDiscordSession["access_token"]).then(discordUser => {
            UserDiscordSession["discord_id"] = discordUser.id;
            UserDiscordSession["discord_name"] = discordUser.username;
            UserDiscordSession["discord_discriminator"] = discordUser.discriminator;

            // Setting UserDiscordSession to session and redirecting user
            req.session.user = UserDiscordSession;
            res.redirect("/dash");
        }).catch(err => {
            console.error(err);
        });

    }).catch(err => {
        console.error(err);
        res.send("An unexpected error has occurred.");
    });
});

module.exports = router;