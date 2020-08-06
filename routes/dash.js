const express = require("express");
const router = express.Router();
const forceAuth = require("../middleware/forceDiscordAuth");
const sqlDB = require("../util/sqlDB");

router.get("/", forceAuth, (req, res) => {
   let UserDiscordSession = req.session.user;

   let entry = sqlDB.getUser.get(UserDiscordSession["discord_id"]);
   // Set account email to undefined, if they are in the DB then fill it in
   // The EJS template handles the undefined accountEmail
   let accountEmail = undefined
   if (entry) {
      accountEmail = entry["gmailAddress"];
   }

   res.render("dash", {
      username: req.session.user["discord_name"] + "#" + req.session.user["discord_discriminator"],
      gmailAddress: accountEmail
   });
});


module.exports = router;