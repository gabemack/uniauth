const forceDiscordAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/oauth/login");
    }
    return next();
}

module.exports = forceDiscordAuth;