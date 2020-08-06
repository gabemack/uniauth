const forceGoogleAuth = (req, res, next) => {
    if (!req.session.google) {
        return res.redirect("/addGoogle");
    }
    return next();
}

module.exports = forceGoogleAuth;