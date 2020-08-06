const config = {
    PORT: 8080,
    SESSION_KEY: "",
    DISCORD_CLIENT_ID: "",
    DISCORD_CLIENT_SECRET: "",
    DISCORD_GRANT_TYPE: "authorization_code",
    DISCORD_REDIRECT_URI: "URI + /oauth/redirect",
    DISCORD_SCOPE: "identify guilds.join",
    DISCORD_ROLES: [""],
    DISCORD_GUILD_ID: "",
    DISCORD_BOT_TOKEN: "",
    GOOGLE_CLIENT_ID: "",
    GOOGLE_CLIENT_SECRET: "",
    GOOGLE_GRANT_TYPE: "authorization_code",
    GOOGLE_PROMPT: "consent",
    GOOGLE_REDIRECT_URI: "URI + /google/redirect",
    GOOGLE_EMAIL_DOMAIN: "organization.com",
    GOOGLE_RESPONSE_TYPE: "code",
    GOOGLE_SCOPE: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
}

module.exports = config;